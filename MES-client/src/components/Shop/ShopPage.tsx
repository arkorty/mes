import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "../../lib/product.json";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
};

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className="w-[96%] md:w-[90%] mx-auto py-6 ">
      <h1 className="text-2xl font-bold mb-4">Men's Gears</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border-1 border-[#E9E9E9] rounded-lg  shadow-lg pb-2">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg px-2 font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 px-2">${product.price}</p>
            </Link>
            <div className=" w-[94%]  mx-auto">
            <button className="w-full bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
