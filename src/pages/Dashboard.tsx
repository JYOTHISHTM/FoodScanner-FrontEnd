// Dashboard.tsx
import { useState } from "react";
import { fetchProduct } from "../services/productService";

const Dashboard = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<any>(null);

  const handleSearch = async () => {
    const res = await fetchProduct(barcode);
    setProduct(res);
  };

  return (
    <div>
      <input
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Enter barcode"
      />
      <button onClick={handleSearch}>Search</button>

      {product && (
        <div>
          <h2>{product.data.name}</h2>
          <p>Score: {product.score}</p>
          <p>Sugar: {product.data.sugar}</p>
          <p>Fat: {product.data.fat}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;