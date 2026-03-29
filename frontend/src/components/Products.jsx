import Card from "./Card";

export default function Products() {
      const products = [1,2,3,4,5,6];
    return(
        <div className="px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {products.map((item, index) => (
          <Card key={index} />
        ))}
            </div>

        </div>
    )
}