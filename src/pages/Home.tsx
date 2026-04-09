


import { useState, useEffect } from "react";
import { fetchProduct } from "../services/productService";
import { useAuth } from "../hooks/useAuth";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Home = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [detectedCode, setDetectedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const { user } = useAuth();

  // ✅ Fix camera permission issue
  useEffect(() => {
    if (scanning) {
      setTimeout(() => setCameraReady(true), 300);
    } else {
      setCameraReady(false);
    }
  }, [scanning]);

  // ✅ Search
  const handleSearch = async () => {
    if (!user?._id || !productId) return;

    setLoading(true);
    try {
      const res = await fetchProduct(productId, user._id);
      setProduct(res);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Scan
  const handleScan = async (barcode: string) => {
    setScanning(false);
    setProductId(barcode);

    if (!user?._id) return;

    setLoading(true);
    try {
      const res = await fetchProduct(barcode, user._id);
      setProduct(res);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Health Status
  const getHealthStatus = (score: number) => {
    if (score > 8) return { label: "Healthy 🟢", color: "bg-green-500" };
    if (score > 5) return { label: "Moderate 🟡", color: "bg-yellow-500" };
    return { label: "Unhealthy 🔴", color: "bg-red-500" };
  };

  // ✅ Warnings
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

    return userAllergies.filter((allergy) =>
      ingredients.includes(allergy.toLowerCase())
    );
  };

  const matchedAllergies = checkAllergies(
    product?.data,
    user?.allergies || []
  );

  return (
    <div className="p-6 bg-gray-200">

      {/* TOP CARD */}
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
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className={`px-5 py-3 rounded-xl text-white ${loading
                ? "bg-gray-400"
                : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          <button
            onClick={() => {
              setDetectedCode("");
              setScanning(true);
            }}
            className="bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200"
          >
            📷 Scan Product
          </button>
        </div>

        {/* RIGHT (SCANNER BOX) */}
        <div className="w-full lg:w-80 bg-gray-50 border-2 border-dashed border-green-200 rounded-2xl flex items-center justify-center p-4">

          {!scanning && (
            <div className="text-gray-400 text-center">
              <div className="text-3xl">📊</div>
              <p>Waiting for scanner...</p>
            </div>
          )}

          {scanning && cameraReady && (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                Scanning barcode...
              </p>

              <BarcodeScannerComponent
                width={250}
                height={250}
                facingMode="environment"
                onUpdate={(_, result) => {
                  if (result) {
                    const text = result.getText
                      ? result.getText()
                      : (result as any).text;

                    if (text) {
                      setDetectedCode(text);
                      handleScan(text);
                    }
                  }
                }}
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

      {/* PRODUCT DETAILS */}
      {product && (
        <div className="mt-8 grid lg:grid-cols-3 auto-rows-fr gap-6 items-stretch">

          {/* PRODUCT INFO */}
          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-5 flex gap-4">
            <img
              src={product.data.image}
              className="w-24 h-24 object-contain"
            />

            <div>
              <p className="text-green-600 text-xs font-semibold">
                SCANNED PRODUCT
              </p>

              <h2 className="text-lg font-bold">
                {product.data.name}
              </h2>

              <p className="text-sm text-gray-500">
                {product.data.quantity}
              </p>

              <div className="grid grid-cols-2 gap-x-4 text-xs mt-3 text-gray-600">
                <p>Brand: {product.data.brand || "-"}</p>
                <p>Category: {product.data.category || "-"}</p>
                <p>Barcode: {product.data.barcode || "-"}</p>
              </div>
            </div>
          </div>

          {/* SCORE */}
          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-5 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500 mb-2">Safety Score</p>

            <div className="w-20 h-20 rounded-full border-4 border-yellow-400 flex items-center justify-center text-lg font-bold">
              {product.score}/10
            </div>

            <p
              className={`text-white text-xs mt-2 px-2 py-1 rounded ${getHealthStatus(product.score).color
                }`}
            >
              {getHealthStatus(product.score).label}
            </p>
          </div>

          {/* PERSONALIZED ALLERGY CHECK */}
     {/* PERSONALIZED ALLERGY CHECK */}
<div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition p-5 h-full flex flex-col">

  <h3 className="font-semibold mb-4 flex items-center gap-2">
    🧠 Personalized Check
  </h3>

  {matchedAllergies.length > 0 ? (
    <div className="space-y-3">

      {/* ALERT BOX */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-3">
        <p className="text-red-600 font-semibold">
          ⚠️ Allergen Detected
        </p>
        <p className="text-xs text-red-400">
          This product contains ingredients matching your profile
        </p>
      </div>

      {/* LIST */}
      <div className="flex flex-wrap gap-2">
        {matchedAllergies.map((item: string, i: number) => (
          <span
            key={i}
            className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium"
          >
            {item}
          </span>
        ))}
      </div>

    </div>
  ) : (
    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
      <p className="text-green-600 font-semibold">
        ✅ No аллерgens found
      </p>
      <p className="text-xs text-green-500">
        This product is safe based on your profile
      </p>
    </div>
  )}
</div>

          {/* NUTRITION */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl hover:shadow-2xl p-5 h-full">
            <h3 className="font-semibold mb-3">
              Nutrition Information
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

              <div className="bg-gray-100 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Calories</p>
                <p className="font-bold">
                  {product.data.calories} kcal
                </p>
              </div>

              <div className="bg-red-50 p-3 rounded-xl">
                <p className="text-xs text-red-500">Fat</p>
                <p className="font-bold">
                  {product.data.fat} g
                </p>
              </div>

              <div className="bg-yellow-50 p-3 rounded-xl">
                <p className="text-xs text-yellow-600">Sugar</p>
                <p className="font-bold">
                  {product.data.sugar} g
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-xl">
                <p className="text-xs text-green-600">Protein</p>
                <p className="font-bold">
                  {product.data.protein} g
                </p>
              </div>
            </div>
          </div>

          {/* RISKS */}
          {/* RISKS */}
<div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition p-5 h-full flex flex-col">

  <h3 className="font-semibold mb-4 flex items-center gap-2">
    ⚠️ Additives & Risks
  </h3>

  <div className="space-y-3">

    {/* WARNINGS */}
    {getWarnings(product.data).map((w: string, i: number) => (
      <div
        key={i}
        className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2"
      >
        <span className="text-red-500 text-lg">⚠️</span>
        <p className="text-red-600 text-sm font-medium">{w}</p>
      </div>
    ))}

    {/* INSIGHTS */}
    {product.insights?.map((item: string, i: number) => (
      <div
        key={i}
        className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-center gap-2"
      >
        <span className="text-orange-500 text-lg">⚡</span>
        <p className="text-orange-600 text-sm font-medium">
          {item}
        </p>
      </div>
    ))}

    {/* EMPTY STATE */}
    {getWarnings(product.data).length === 0 &&
      (!product.insights || product.insights.length === 0) && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3">
          <p className="text-green-600 text-sm">
            ✅ No major risks detected
          </p>
        </div>
      )}
  </div>
</div>

        </div>
      )}
    </div>
  );
};

export default Home;