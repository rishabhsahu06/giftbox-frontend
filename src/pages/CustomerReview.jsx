// import React from "react";
// import { Star } from "lucide-react";

// const reviews = [
//   {
//     id: 1,
//     name: "Aarav Sharma",
//     photo: "https://randomuser.me/api/portraits/men/32.jpg",
//     review: "The product quality is just amazing! Fits perfectly and looks premium. Highly recommended!",
//     rating: 5,
//     location: "Mumbai",
//   },
//   {
//     id: 2,
//     name: "Priya Verma",
//     photo: "https://randomuser.me/api/portraits/women/45.jpg",
//     review: "Loved the packaging and quick delivery. Fabric is super comfortable and stylish. Will order again!",
//     rating: 5,
//     location: "Delhi",
//   },
//   {
//     id: 3,
//     name: "Rohan Patel",
//     photo: "https://randomuser.me/api/portraits/men/67.jpg",
//     review: "Worth every penny! This has become my favorite fashion brand. Customer support is also great!",
//     rating: 5,
//     location: "Ahmedabad",
//   },
//   {
//     id: 4,
//     name: "Neha Singh",
//     photo: "https://randomuser.me/api/portraits/women/56.jpg",
//     review: "Got so many compliments wearing this dress. Modern and classy design! Perfect for work too.",
//     rating: 5,
//     location: "Bangalore",
//   },
//   {
//     id: 5,
//     name: "Kunal Mehta",
//     photo: "https://randomuser.me/api/portraits/men/78.jpg",
//     review: "The fit and finish is outstanding. Delivery was quick, packaging was premium!",
//     rating: 5,
//     location: "Pune",
//   },
// ];

// const StarRating = ({ rating }) => (
//   <div className="flex items-center gap-1 mb-2">
//     {[...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < rating
//             ? "fill-yellow-400 text-yellow-400"
//             : "fill-gray-300 text-gray-300"
//         }`}
//       />
//     ))}
//   </div>
// );

// const CustomerReviews = () => {
//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 overflow-hidden">
//       {/* Section Header */}
//       <div className="max-w-6xl mx-auto text-center mb-10">
//         <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
//           What Our{" "}
//           <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
//             Customers Say
//           </span>
//         </h2>
//         <p className="text-gray-600 text-sm md:text-lg">
//           Real words from people who love our products ✨
//         </p>
//       </div>

//       {/* Marquee Container */}
//       <div className="relative w-full overflow-hidden">
//         <div className="flex w-max animate-marquee gap-6">
//           {[...reviews, ...reviews].map((review, idx) => (
//             <div
//               key={idx}
//               className="w-72 flex-shrink-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-md border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1"
//             >
//               <div className="p-5 flex flex-col h-full">
//                 {/* User Info */}
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={review.photo}
//                     alt={review.name}
//                     className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
//                   />
//                   <div className="ml-3">
//                     <h4 className="font-semibold text-gray-900 text-sm">
//                       {review.name}
//                     </h4>
//                     <p className="text-xs text-gray-500">{review.location}</p>
//                   </div>
//                 </div>

//                 {/* Rating */}
//                 <StarRating rating={review.rating} />

//                 {/* Review Text */}
//                 <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-4">
//                   "{review.review}"
//                 </p>

//                 {/* Verified Badge */}
//                 <span className="mt-auto inline-block text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full self-start">
//                   ✓ Verified Purchase
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Animation Style */}
//       <style jsx>{`
//         .animate-marquee {
//           display: flex;
//           animation: marquee 30s linear infinite;
//         }
//         @keyframes marquee {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CustomerReviews;
import React from "react";
import imag1 from "../assets/blog/blog-1.png"
import imag2 from "../assets/blog/blog-2.png"
import imag3 from "../assets/blog/blog-3.png"
const BlogPost = () => {
  const blogsData = [
    {
      id: 1,
      description: "10 Stunning Diwali Decoration Ideas for a Festive Home",
      image:imag1 ,
    },
    {
      id: 2,
      description: "Perfect Diwali Gift Ideas to Light Up Your Loved Ones’ Faces",
      image: imag2,
    },
    {
      id: 3,
      description: "Traditional Diwali Sweets Recipes You Must Try This Season",
      image: imag3,
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full mt-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Diwali Blog Posts
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover festive ideas, recipes, and gifts to make your Diwali extra special ✨
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {blogsData.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Blog Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.description}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Blog Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug group-hover:text-rose-600 transition-colors duration-300">
                  {blog.description}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 text-base sm:text-lg font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            VIEW ALL
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
