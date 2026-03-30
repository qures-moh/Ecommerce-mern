import { useEffect, useState } from "react";
import Card from "./Card";
import API from "./api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product");
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProduct =
    filter === "all" ? products : products.filter((p) => p.category === filter);
  return (
    <div className="px-6 py-10">
      <div className="flex flex-wrap gap-3 mb-8">
        {["all", "electronics", "clothing", "books", "home"].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter===cat   ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
          }`}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProduct.length >0 ? (
            filteredProduct.map((product)=>(
                <Card key={product.id} product={product}/>
            ))
        ): <p className="text-gray-500">No products found</p>}
      </div>
    </div>
  );
}
