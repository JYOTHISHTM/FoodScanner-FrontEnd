import { useParams } from "react-router-dom";

const ProductInfo = () => {
  const { id } = useParams();

  return <h1>Product Info: {id}</h1>;
};

export default ProductInfo;