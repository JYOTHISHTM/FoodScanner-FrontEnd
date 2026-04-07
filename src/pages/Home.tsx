// import { useState } from "react";
// import { fetchProduct } from "../services/productService";
// import { useAuth } from "../hooks/useAuth";




// const Home = () => {
//   const [productId, setProductId] = useState("");
//   const [product, setProduct] = useState<any>(null);
//   const { user } = useAuth();
//   const handleSearch = async () => {
//     if (!user?._id) return;
//     const res = await fetchProduct(productId, user._id);
//     setProduct(res);
//   };

//   // ✅ Health Badge
//   const getHealthStatus = (score: number) => {
//     if (score > 80) return { label: "Healthy 🟢", color: "bg-green-500" };
//     if (score > 50) return { label: "Moderate 🟡", color: "bg-yellow-500" };
//     return { label: "Unhealthy 🔴", color: "bg-red-500" };
//   };

//   // ✅ Warnings (optional)
//   const getWarnings = (data: any) => {
//     const warnings = [];
//     if (data.sugar > 20) warnings.push("⚠️ High Sugar");
//     if (data.fat > 20) warnings.push("⚠️ High Fat");
//     if (data.nova === 4) warnings.push("⚠️ Ultra Processed");
//     return warnings;
//   };

//   return (
//     <div className="p-6">
//       {/* Input */}
//       <div className="flex gap-2 mb-6">
//         <input
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           placeholder="Enter productId"
//           className="border p-2 rounded w-64"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white px-4 rounded"
//         >
//           Search
//         </button>
//       </div>

//       {product && (
//         <div className="bg-white shadow-lg rounded-xl p-6 max-w-md">

//           {/* Image */}
//           {product.data.image && (
//             <img
//               src={product.data.image}
//               alt="product"
//               className="w-32 h-32 object-contain mx-auto mb-4"
//             />
//           )}

//           {/* Name */}
//           <h2 className="text-xl font-bold text-center mb-2">
//             {product.data.name}
//           </h2>

//           {/* Health Badge */}
//           <div
//             className={`text-white text-center py-2 rounded mb-4 ${getHealthStatus(product.score).color}`}
//           >
//             {getHealthStatus(product.score).label}
//           </div>

//           <p className="text-center mb-4">Score: {product.score}</p>

//           {/* Warnings */}
//           {getWarnings(product.data).length > 0 && (
//             <div className="mb-4">
//               {getWarnings(product.data).map((warn: string, i: number) => (
//                 <p key={i} className="text-red-500 text-sm">
//                   {warn}
//                 </p>
//               ))}
//             </div>
//           )}

//           {/* Nutrition */}
//           <div className="grid grid-cols-3 gap-2 text-center mb-4">
//             <div className="bg-gray-100 p-2 rounded">
//               <p>Sugar</p>
//               <p>{Math.round(product.data.sugar || 0)}g</p>
//             </div>
//             <div className="bg-gray-100 p-2 rounded">
//               <p>Fat</p>
//               <p>{Math.round(product.data.fat || 0)}g</p>
//             </div>
//             <div className="bg-gray-100 p-2 rounded">
//               <p>Protein</p>
//               <p>{Math.round(product.data.protein || 0)}g</p>
//             </div>
//           </div>

//           {/* Optional Info */}
//           <div className="text-sm space-y-1">
//             {product.data.brand && <p>Brand: {product.data.brand}</p>}
//             {product.data.quantity && <p>Quantity: {product.data.quantity}</p>}
//             {product.data.category && <p>Category: {product.data.category}</p>}
//             {product.data.packaging && <p>Packaging: {product.data.packaging}</p>}
//           </div>

//           {/* Extra Info */}
//           <div className="mt-3 text-sm">
//             {product.data.calories && <p>Calories: {product.data.calories} kcal</p>}
//             {product.data.palmOil && <p className="text-red-500">Contains Palm Oil ⚠️</p>}
//             {product.data.veg !== undefined && (
//               <p>{product.data.veg ? "Vegetarian ✅" : "Non-Vegetarian ❌"}</p>
//             )}
//           </div>

//           {/* Insights */}
//           {product.insights?.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-semibold">Health Insights</h3>
//               {product.insights.map((item: string, i: number) => (
//                 <p key={i} className="text-sm text-red-600">
//                   {item}
//                 </p>
//               ))}
//             </div>
//           )}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;










// ----------------------------------------------------------------

// import { useState } from "react";
// import { fetchProduct } from "../services/productService";
// import { useAuth } from "../hooks/useAuth";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";

// const Home = () => {
//   const [productId, setProductId] = useState("");
//   const [product, setProduct] = useState<any>(null);
//   const [scanning, setScanning] = useState(false);

//   const { user } = useAuth();

//   const handleSearch = async () => {
//     if (!user?._id || !productId) return;

//     const res = await fetchProduct(productId, user._id);
//     setProduct(res);
//   };

//   // ✅ Handle scan result
//   const handleScan = async (barcode: string) => {
//     setScanning(false);
//     setProductId(barcode);

//     if (!user?._id) return;

//     const res = await fetchProduct(barcode, user._id);
//     setProduct(res);
//   };

//   // ✅ Health Badge
//   const getHealthStatus = (score: number) => {
//     if (score > 80) return { label: "Healthy 🟢", color: "bg-green-500" };
//     if (score > 50) return { label: "Moderate 🟡", color: "bg-yellow-500" };
//     return { label: "Unhealthy 🔴", color: "bg-red-500" };
//   };

//   const getWarnings = (data: any) => {
//     const warnings = [];
//     if (data.sugar > 20) warnings.push("⚠️ High Sugar");
//     if (data.fat > 20) warnings.push("⚠️ High Fat");
//     if (data.nova === 4) warnings.push("⚠️ Ultra Processed");
//     return warnings;
//   };

//   return (
//     <div className="p-6">

//       {/* Input + Buttons */}
//       <div className="flex gap-2 mb-6">
//         <input
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           placeholder="Enter productId"
//           className="border p-2 rounded w-64"
//         />

//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white px-4 rounded"
//         >
//           Search
//         </button>

//         {/* ✅ Scan Button */}
//         <button
//           onClick={() => setScanning(true)}
//           className="bg-green-500 text-white px-4 rounded"
//         >
//           Scan 📷
//         </button>
//       </div>

//       {/* ✅ Scanner Modal */}
//       {/* ✅ Scanner Modal */}
// {scanning && (
//   <div className="mb-4">
//     <BarcodeScannerComponent
//       width={300}
//       height={300}
//       onUpdate={(err, result) => {
//         if (err) {
//           console.error("Scanner Error:", err);
//           return;
//         }

//         if (result) {
//           // Safe way to get barcode text (handles both old and new versions)
//           const barcodeText = result.getText ? result.getText() : (result as any).text;

//           if (barcodeText) {
//             handleScan(barcodeText);
//           }
//         }
//       }}
//     />
//     <button
//       onClick={() => setScanning(false)}
//       className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
//     >
//       Close Scanner
//     </button>
//   </div>
// )}

//       {/* Product Card */}
//       {product && (
//         <div className="bg-white shadow-lg rounded-xl p-6 max-w-md">

//           {product.data.image && (
//             <img
//               src={product.data.image}
//               alt="product"
//               className="w-32 h-32 object-contain mx-auto mb-4"
//             />
//           )}

//           <h2 className="text-xl font-bold text-center mb-2">
//             {product.data.name}
//           </h2>

//           <div
//             className={`text-white text-center py-2 rounded mb-4 ${getHealthStatus(product.score).color}`}
//           >
//             {getHealthStatus(product.score).label}
//           </div>

//           <p className="text-center mb-4">Score: {product.score}</p>

//           {getWarnings(product.data).length > 0 && (
//             <div className="mb-4">
//               {getWarnings(product.data).map((warn: string, i: number) => (
//                 <p key={i} className="text-red-500 text-sm">
//                   {warn}
//                 </p>
//               ))}
//             </div>
//           )}

//           <div className="grid grid-cols-3 gap-2 text-center mb-4">
//             <div className="bg-gray-100 p-2 rounded">
//               <p>Sugar</p>
//               <p>{Math.round(product.data.sugar || 0)}g</p>
//             </div>
//             <div className="bg-gray-100 p-2 rounded">
//               <p>Fat</p>
//               <p>{Math.round(product.data.fat || 0)}g</p>
//             </div>
//             <div className="bg-gray-100 p-2 rounded">
//               <p>Protein</p>
//               <p>{Math.round(product.data.protein || 0)}g</p>
//             </div>
//           </div>

//           <div className="text-sm space-y-1">
//             {product.data.brand && <p>Brand: {product.data.brand}</p>}
//             {product.data.quantity && <p>Quantity: {product.data.quantity}</p>}
//             {product.data.category && <p>Category: {product.data.category}</p>}
//             {product.data.packaging && <p>Packaging: {product.data.packaging}</p>}
//           </div>

//           <div className="mt-3 text-sm">
//             {product.data.calories && <p>Calories: {product.data.calories} kcal</p>}
//             {product.data.palmOil && <p className="text-red-500">Contains Palm Oil ⚠️</p>}
//             {product.data.veg !== undefined && (
//               <p>{product.data.veg ? "Vegetarian ✅" : "Non-Vegetarian ❌"}</p>
//             )}
//           </div>

//           {product.insights?.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-semibold">Health Insights</h3>
//               {product.insights.map((item: string, i: number) => (
//                 <p key={i} className="text-sm text-red-600">
//                   {item}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;



// ------------------------------------------------------------------------------------------



import { useState } from "react";
import { fetchProduct } from "../services/productService";
import { useAuth } from "../hooks/useAuth";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Home = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [detectedCode, setDetectedCode] = useState(""); // ✅ for testing detection

  const { user } = useAuth();

  const handleSearch = async () => {
    if (!user?._id || !productId) return;

    const res = await fetchProduct(productId, user._id);
    setProduct(res);
  };

  // ✅ Handle scan result
  const handleScan = async (barcode: string) => {
    console.log("✅ FINAL SCAN:", barcode);

    setScanning(false);
    setProductId(barcode);

    if (!user?._id) return;

    const res = await fetchProduct(barcode, user._id);
    setProduct(res);
  };

  // ✅ Health Badge
  const getHealthStatus = (score: number) => {
    if (score > 80) return { label: "Healthy 🟢", color: "bg-green-500" };
    if (score > 50) return { label: "Moderate 🟡", color: "bg-yellow-500" };
    return { label: "Unhealthy 🔴", color: "bg-red-500" };
  };

  const getWarnings = (data: any) => {
    const warnings = [];
    if (data.sugar > 20) warnings.push("⚠️ High Sugar");
    if (data.fat > 20) warnings.push("⚠️ High Fat");
    if (data.nova === 4) warnings.push("⚠️ Ultra Processed");
    return warnings;
  };

  return (
    <div className="p-6">

      {/* Input + Buttons */}
      <div className="flex gap-2 mb-6">
        <input
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter productId"
          className="border p-2 rounded w-64"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Search
        </button>

        <button
          onClick={() => {
            setDetectedCode("");
            setScanning(true);
          }}
          className="bg-green-500 text-white px-4 rounded"
        >
          Scan 📷
        </button>
      </div>

      {/* ✅ Scanner */}
      {scanning && (
        <div className="mb-4">

          <p className="text-sm text-gray-500 mb-2">
            Scanning... point camera at barcode
          </p>

          <BarcodeScannerComponent
            width={300}
            height={300}
            facingMode="environment" // ✅ use back camera
            onUpdate={(err, result) => {
              // ❌ ignore errors (normal behavior)

              if (result) {
                const text = result.getText
                  ? result.getText()
                  : (result as any).text;

                if (text) {
                  console.log("✅ DETECTED:", text); // 👈 confirm detection
                  setDetectedCode(text);

                  handleScan(text); // call API
                }
              }
            }}
          />

          {/* ✅ Close */}
          <button
            onClick={() => setScanning(false)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Close Scanner
          </button>

          {/* ✅ Show detected code */}
          {detectedCode && (
            <p className="text-green-600 mt-2">
              Detected: {detectedCode}
            </p>
          )}
        </div>
      )}

      {/* Product Card */}
      {product && (
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-md">

          {product.data.image && (
            <img
              src={product.data.image}
              alt="product"
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
          )}

          <h2 className="text-xl font-bold text-center mb-2">
            {product.data.name}
          </h2>

          <div
            className={`text-white text-center py-2 rounded mb-4 ${getHealthStatus(product.score).color}`}
          >
            {getHealthStatus(product.score).label}
          </div>

          <p className="text-center mb-4">Score: {product.score}</p>

          {getWarnings(product.data).length > 0 && (
            <div className="mb-4">
              {getWarnings(product.data).map((warn: string, i: number) => (
                <p key={i} className="text-red-500 text-sm">
                  {warn}
                </p>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 text-center mb-4">
            <div className="bg-gray-100 p-2 rounded">
              <p>Sugar</p>
              <p>{Math.round(product.data.sugar || 0)}g</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p>Fat</p>
              <p>{Math.round(product.data.fat || 0)}g</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p>Protein</p>
              <p>{Math.round(product.data.protein || 0)}g</p>
            </div>
          </div>

          <div className="text-sm space-y-1">
            {product.data.brand && <p>Brand: {product.data.brand}</p>}
            {product.data.quantity && <p>Quantity: {product.data.quantity}</p>}
            {product.data.category && <p>Category: {product.data.category}</p>}
            {product.data.packaging && <p>Packaging: {product.data.packaging}</p>}
          </div>

          <div className="mt-3 text-sm">
            {product.data.calories && <p>Calories: {product.data.calories} kcal</p>}
            {product.data.palmOil && (
              <p className="text-red-500">Contains Palm Oil ⚠️</p>
            )}
            {product.data.veg !== undefined && (
              <p>{product.data.veg ? "Vegetarian ✅" : "Non-Vegetarian ❌"}</p>
            )}
          </div>

          {product.insights?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Health Insights</h3>
              {product.insights.map((item: string, i: number) => (
                <p key={i} className="text-sm text-red-600">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;





