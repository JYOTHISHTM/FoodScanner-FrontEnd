import { useState } from "react";
import { fetchProduct } from "../services/productService";

const Home = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<any>(null);

  const handleSearch = async () => {
    const res = await fetchProduct(barcode);
    setProduct(res);
  };

  // ✅ Health Badge
  const getHealthStatus = (score: number) => {
    if (score > 80) return { label: "Healthy 🟢", color: "bg-green-500" };
    if (score > 50) return { label: "Moderate 🟡", color: "bg-yellow-500" };
    return { label: "Unhealthy 🔴", color: "bg-red-500" };
  };

  // ✅ Warnings (optional)
  const getWarnings = (data: any) => {
    const warnings = [];
    if (data.sugar > 20) warnings.push("⚠️ High Sugar");
    if (data.fat > 20) warnings.push("⚠️ High Fat");
    if (data.nova === 4) warnings.push("⚠️ Ultra Processed");
    return warnings;
  };

  return (
    <div className="p-6">
      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode"
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {product && (
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-md">

          {/* Image */}
          {product.data.image && (
            <img
              src={product.data.image}
              alt="product"
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
          )}

          {/* Name */}
          <h2 className="text-xl font-bold text-center mb-2">
            {product.data.name}
          </h2>

          {/* Health Badge */}
          <div
            className={`text-white text-center py-2 rounded mb-4 ${getHealthStatus(product.score).color}`}
          >
            {getHealthStatus(product.score).label}
          </div>

          <p className="text-center mb-4">Score: {product.score}</p>

          {/* Warnings */}
          {getWarnings(product.data).length > 0 && (
            <div className="mb-4">
              {getWarnings(product.data).map((warn: string, i: number) => (
                <p key={i} className="text-red-500 text-sm">
                  {warn}
                </p>
              ))}
            </div>
          )}

          {/* Nutrition */}
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

          {/* Optional Info */}
          <div className="text-sm space-y-1">
            {product.data.brand && <p>Brand: {product.data.brand}</p>}
            {product.data.quantity && <p>Quantity: {product.data.quantity}</p>}
            {product.data.category && <p>Category: {product.data.category}</p>}
            {product.data.packaging && <p>Packaging: {product.data.packaging}</p>}
          </div>

          {/* Extra Info */}
          <div className="mt-3 text-sm">
            {product.data.calories && <p>Calories: {product.data.calories} kcal</p>}
            {product.data.palmOil && <p className="text-red-500">Contains Palm Oil ⚠️</p>}
            {product.data.veg !== undefined && (
              <p>{product.data.veg ? "Vegetarian ✅" : "Non-Vegetarian ❌"}</p>
            )}
          </div>

          {/* Insights */}
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