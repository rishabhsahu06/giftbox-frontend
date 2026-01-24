// import React, { useEffect, useState } from "react";
// import { customizedcategory } from "../api/category.api";
// import { getAllproducts } from "../api/products.api";

// const CustomizedPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [description, setDescription] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch all products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await getAllproducts();
//         const allProducts = Array.isArray(res?.data?.products)
//           ? res.data.products
//           : [];
//         setProducts(allProducts);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch products");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Toggle selection for a product
//   const toggleProduct = (product) => {
//     setSelectedProducts((prev) =>
//       prev.some((p) => p._id === product._id)
//         ? prev.filter((p) => p._id !== product._id)
//         : [...prev, product]
//     );
//   };

//   // Open modal for selected products
//   const openModal = () => {
//     if (selectedProducts.length === 0) {
//       alert("Please select at least one product first.");
//       return;
//     }
//     setModalOpen(true);
//   };

//   // Submit selected products with description
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!description.trim()) {
//       alert("Please enter a description.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const productIds = selectedProducts.map((p) => p._id);
//       await customizedcategory(productIds, description); // send array + description
//       alert(`${selectedProducts.length} products added to hamper!`);
//       setSelectedProducts([]);
//       setDescription("");
//       setModalOpen(false);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add products to hamper.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-gray-900">All Products</h1>

//       {loading && <p>Loading products...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Top submit button */}
//     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
//   {/* Title */}
//   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 relative">
//     <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 animate-pulse drop-shadow-md">
//       Create Your Own Hamper
//     </span>
//   </h1>

//   {/* Submit Button */}
//   <button
//     onClick={openModal}
//     disabled={selectedProducts.length === 0}
//     className={`py-2.5 px-6 rounded-full text-sm sm:text-base font-semibold shadow-md transition-all duration-300 ${
//       selectedProducts.length === 0
//         ? "bg-gray-300 cursor-not-allowed text-gray-600"
//         : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg hover:shadow-green-500/40 animate-glow"
//     }`}
//   >
//     Submit Selected ({selectedProducts.length})
//   </button>
// </div>

// <style>
// {`
//   @keyframes glow {
//     0%, 100% {
//       box-shadow: 0 0 10px rgba(16, 185, 129, 0.6),
//                   0 0 20px rgba(16, 185, 129, 0.4),
//                   0 0 30px rgba(16, 185, 129, 0.2);
//     }
//     50% {
//       box-shadow: 0 0 20px rgba(16, 185, 129, 0.8),
//                   0 0 40px rgba(16, 185, 129, 0.5),
//                   0 0 60px rgba(16, 185, 129, 0.3);
//     }
//   }

//   .animate-glow {
//     animation: glow 2s infinite ease-in-out;
//   }
// `}
// </style>


//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Select</th>
//               <th className="p-2 border">Image</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Description</th>
//               <th className="p-2 border">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod) => {
//               const isChecked = selectedProducts.some((p) => p._id === prod._id);
//               return (
//                 <tr
//                   key={prod._id}
//                   className={`transition-colors ${isChecked ? "bg-blue-50" : ""}`}
//                 >
//                   <td className="p-2 border text-center">
//                     <input
//                       type="checkbox"
//                       checked={isChecked}
//                       onChange={() => toggleProduct(prod)}
//                       className="w-4 h-4 accent-blue-500"
//                     />
//                   </td>
//                   <td className="p-2 border text-center">
//                     <img
//                       src={prod.images?.[0] || ""}
//                       alt={prod.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </td>
//                   <td className="p-2 border">{prod.name}</td>
//                   <td className="p-2 border">{prod.description}</td>
//                   <td className="p-2 border">
//                     ₹{prod.discounted_price || prod.mrp_price}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative shadow-xl">
//             <button
//               onClick={() => setModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-bold mb-4">
//               Add {selectedProducts.length} Product(s) to Hamper
//             </h2>

//             <ul className="mb-4 max-h-40 overflow-y-auto space-y-1">
//               {selectedProducts.map((p) => (
//                 <li key={p._id} className="flex items-center gap-2">
//                   <img
//                     src={p.images?.[0] || ""}
//                     alt={p.name}
//                     className="w-8 h-8 object-cover rounded"
//                   />
//                   <span>{p.name}</span>
//                 </li>
//               ))}
//             </ul>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter description for selected products"
//                 className="border rounded-lg p-2 w-full resize-none"
//                 rows={4}
//                 required
//               />
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="bg-green-500 hover:bg-green-600 text-white py-2 rounded shadow-lg transition-all duration-300"
//               >
//                 {submitting ? "Adding..." : "Submit"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomizedPage;
