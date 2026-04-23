import { useEffect, useState } from "react";
import Card from "./Card";
import API from "./api";
import ShimmerUi from "./ShimarUi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/product");
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const filteredProduct =
    filter === "all" ? products : products.filter((p) => p.category === filter);
  return (
    
    <div className="px-6 py-10">
     <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{loading
  ? [...Array(4)].map((_, i) => <ShimmerUi key={i} />)
  : products.slice(0, 8).map((product) => (
      <Card key={product._id} product={product} setRefresh={setRefresh} />
    ))}
 
</div>
</section>
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
      <h2 className="text-2xl font-bold mb-6">
  {filter === "all" ? "All Products" : `${filter.toUpperCase()} Products`}
</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
  // 🔥 SHIMMER HERE
  [...Array(8)].map((_, i) => <ShimmerUi key={i} />)
) : filteredProduct.length > 0 ? (
  filteredProduct.map((product) => (
    <Card key={product._id} product={product} setRefresh={setRefresh}/>
  ))
) : (
  <p className="text-gray-500">No products found</p>
)}
      </div>
    </div>
  );
}
