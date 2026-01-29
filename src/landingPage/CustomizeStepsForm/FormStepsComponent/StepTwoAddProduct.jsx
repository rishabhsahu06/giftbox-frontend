import { useBox } from "../CustomizeContext";
import { getAllproducts } from "../../../api/products.api";
import { useCachedFetch } from "../../hooks/useCustomizeCachedFetch";
import PageLoader from "../../../Pageloader/Pageloader";

export default function Step2AddProducts() {
  const {
    products, setProducts,
    selectedProducts, setSelectedProducts,
  } = useBox();

  const loading = useCachedFetch(products, setProducts, getAllproducts);

  const toggle = (product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p._id === product._id)
        ? prev.filter((p) => p._id !== product._id)
        : [...prev, product]
    );
  };

  // ✅ FIX: Ensure we are mapping over an array
  // If 'products' is an object (wrapper), try to access .data or .products, else default to []
  const productList = Array.isArray(products) 
    ? products 
    : (products?.data || products?.products || []);

  if (loading) return <p> <PageLoader/>Loading products..</p>;

  // Optional: Debugging - see what exactly is coming from the API
  // console.log("Product Data:", products);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
      {/* ✅ Use productList instead of products */}
      {productList.length > 0 ? (
        productList.map((p) => {
          const active = selectedProducts.some((sp) => sp?._id === p._id);
          return (
            <div
              key={p._id}
              onClick={() => toggle(p)}
              className={`p-3 border rounded-lg cursor-pointer transition ${
                active ? "border-red-500 shadow-lg" : "hover:shadow"
              }`}
            >
              <img 
                src={p?.images?.[0]} 
                className="h-40 w-full object-cover rounded" 
                alt={p?.name} 
              />
              <h4 className="mt-2 font-semibold">{p?.name}</h4>
              <p className="text-sm text-gray-500">₹{p?.discounted_price}</p>
              <button className="mt-2 text-sm text-red-500 font-semibold">
                {active ? "REMOVE" : "ADD PRODUCT"}
              </button>
            </div>
          );
        })
      ) : (
        <p className="col-span-full text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}