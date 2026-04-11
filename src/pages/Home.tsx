import { useState, useRef } from "react";
import { fetchProduct } from "../services/productService";
import { useAuth } from "../hooks/useAuth";
import { BrowserMultiFormatReader } from "@zxing/browser";
import type { IScannerControls } from "@zxing/browser";


const Home = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [detectedCode, setDetectedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  // ✅ ZXing refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);


  const startScanner = async (videoEl: HTMLVideoElement) => {
    const codeReader = new BrowserMultiFormatReader();
    console.log("🚀 startScanner called", videoEl);  // is scanner even starting?
    
    try {
      const controls = await codeReader.decodeFromVideoDevice(
        undefined,
        videoEl,
        (result, err) => {
          console.log("📡 callback fired");  // is the callback firing at all?
          
          if (result) {
            console.log("✅ SCANNED:", result.getText());
            handleScan(result.getText());
            setScanning(false);
          }
          
          if (err) {
            if (err.name === "NotFoundException") {
              console.log("👀 still looking...");  // you should see this every frame
            } else {
              console.log("💥 real error:", err.name, err.message);
            }
          }
        }
      );
      console.log("🎥 controls ready:", controls);
      controlsRef.current = controls;
    } catch (err) {
      console.log("💀 CAMERA FAILED:", err);
    }
};

  // This callback ref fires the moment the <video> mounts in the DOM
const isStartingRef = useRef(false); // 👈 add this

const videoCallbackRef = (el: HTMLVideoElement | null) => {
  videoRef.current = el;
  if (el) {
    if (isStartingRef.current) return; // 👈 block the second call
    isStartingRef.current = true;
    startScanner(el);
  } else {
    controlsRef.current?.stop();
    controlsRef.current = null;
    isStartingRef.current = false; // 👈 reset on unmount
  }
};

  // DELETE your old useEffect entirely


  // ✅ Manual Search
  const handleSearch = async () => {
    const cleanId = productId.trim();

    if (!user?._id || !cleanId) return;

    setLoading(true);
    try {
      const res = await fetchProduct(cleanId, user._id);
      console.log("manual result:", res);
      setProduct(res);
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Scan Search
  const handleScan = async (barcode: string) => {
    setProductId(barcode);
    setDetectedCode(barcode);

    if (!user?._id) return;

    setLoading(true);
    try {
      const res = await fetchProduct(barcode, user._id);
      console.log("scan result:", res);
      setProduct(res);
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI helpers
  const getHealthStatus = (score: number) => {
    if (score > 8) return { label: "Healthy 🟢", color: "bg-green-500" };
    if (score > 5) return { label: "Moderate 🟡", color: "bg-yellow-500" };
    return { label: "Unhealthy 🔴", color: "bg-red-500" };
  };

  const getWarnings = (data: any) => {
    const warnings = [];
    if (data.sugar > 20) warnings.push("High Sugar");
    if (data.fat > 20) warnings.push("High Fat");
    if (data.nova === 4) warnings.push("Ultra Processed");
    return warnings;
  };

  const checkAllergies = (product: any, userAllergies: string[]) => {
    if (!product || !userAllergies) return [];
    const ingredients = (product.ingredients || "").toLowerCase();
    return userAllergies.filter((a) =>
      ingredients.includes(a.toLowerCase())
    );
  };

  const matchedAllergies = checkAllergies(
    product?.data,
    user?.allergies || []
  );

  return (
    <div className="p-6 bg-gray-200">
      {/* TOP */}
      <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Check Your Food</h2>
          <p className="text-gray-500 mb-6">
            Instant nutritional quality analysis
          </p>

          <div className="flex gap-2 mb-4">
            <input
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID"
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-5 py-3 bg-green-500 text-white rounded-xl"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          <button
            onClick={() => {
              console.log("OPEN SCANNER");
              setDetectedCode("");
              setScanning(true);
            }}
            className="bg-green-100 text-green-700 px-4 py-2 rounded-xl"
          >
            📷 Scan Product
          </button>
        </div>

        {/* RIGHT - SCANNER */}
        <div className="w-full lg:w-80 bg-gray-50 border-2 border-dashed rounded-2xl flex items-center justify-center p-4">

          {!scanning && (
            <div className="text-gray-400 text-center">
              <div className="text-3xl">📊</div>
              <p>Waiting for scanner...</p>
            </div>
          )}

          {scanning && (
            <div className="text-center">
              <p className="text-sm mb-2">Scanning barcode...</p>

              <video
                ref={videoCallbackRef}  // 👈 change this
                autoPlay
                muted
                playsInline
                className="w-[250px] h-[250px] object-cover rounded-lg border"
              />
              <button
                onClick={() => setScanning(false)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Close
              </button>

              {detectedCode && (
                <p className="text-green-600 mt-2 text-sm">
                  {detectedCode}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT */}
      {product && (
        <div className="mt-8 grid lg:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <img src={product.data.image} className="w-24 h-24" />
            <h2 className="font-bold">{product.data.name}</h2>
            <p>{product.data.brand}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p>Score</p>
            <h2 className="text-xl">{product.score}/10</h2>
            <span className={`text-white px-2 py-1 rounded ${getHealthStatus(product.score).color}`}>
              {getHealthStatus(product.score).label}
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3>Allergy Check</h3>

            {matchedAllergies.length > 0 ? (
              <div className="text-red-500">
                {matchedAllergies.join(", ")}
              </div>
            ) : (
              <div className="text-green-500">Safe</div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;