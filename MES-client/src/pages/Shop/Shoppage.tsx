// import ShopPage from "../../components/Shop/ShopPage"
// import prdtbg from "../../assets/Shop/shopbg.png"


// const Shoppage = () => {
//   return (
//     <div className=" mb-12">

// <div className="relative w-ful -mt-4 mb-6">
//         <img
//           src={prdtbg}
//           alt="Men's Gear Banner"
//           className="object-cover brightness-75"
          
//         />
//         <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
//           <div className="text-xs text-white uppercase tracking-wider">HOME / MEN / MOUNTAIN</div>
//           <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">MEN&apos;S GEARS</h1>
//         </div>
//       </div>

//         <div>
//             <ShopPage />
//         </div>
//     </div>
//   )
// }

// export default Shoppage








// import { useEffect, useState } from "react";
// import prdtbg from "../../assets/Shop/shopbg.png";
// import ShopPage from "../../components/Shop/ShopPage";

// const Shoppage = () => {
//   const [showModal, setShowModal] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState<"men" | "women" | "all">("all");

//   // Optional: prevent scrolling when modal open
//   useEffect(() => {
//     if (showModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [showModal]);

//   const handleSelectCategory = (category: "men" | "women" | "all") => {
//     setSelectedCategory(category);
//     setShowModal(false); // Hide modal after selection
//   };

//   return (
//     <div className="mb-12">
//       {/* Banner */}
//       <div className="relative w-full -mt-4 mb-6">
//         <img
//           src={prdtbg}
//           alt="Men's Gear Banner"
//           className="object-cover brightness-75"
//         />
//         <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
//           <div className="text-xs text-white uppercase tracking-wider">
//             HOME / MEN / MOUNTAIN
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
//             MEN&apos;S GEARS
//           </h1>
//         </div>
//       </div>

//       {/* Render ShopPage without backend logic */}
//       <div>
//         {/* <ShopPage selectedCategory={selectedCategory} /> */}
//         <ShopPage />
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-8 w-80 text-center shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">Select a Category</h2>
//             <div className="flex flex-col gap-4">
//               <button
//                 onClick={() => handleSelectCategory("men")}
//                 className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//               >
//                 Men's Gear
//               </button>
//               <button
//                 onClick={() => handleSelectCategory("women")}
//                 className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
//               >
//                 Women's Gear
//               </button>
//               <button
//                 onClick={() => handleSelectCategory("all")}
//                 className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
//               >
//                 All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Shoppage;












import { useState, useEffect } from "react";

const WelcomePage = () => {
  const [showModal, setShowModal] = useState(true);
  const [userResponse, setUserResponse] = useState<string | null>(null);

  // Optional: prevent scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const handleResponse = (response: string) => {
    setUserResponse(response);
    setShowModal(false); // Close modal after response is selected
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-80 text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you happy?</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleResponse("Yes")}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Yes
              </button>
              <button
                onClick={() => handleResponse("No")}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
              >
                No
              </button>
              <button
                onClick={() => handleResponse("Maybe")}
                className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition"
              >
                Maybe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      {!showModal && userResponse && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Welcome!</h1>
          <p className="mt-4 text-xl">
            {userResponse === "Yes"
              ? "We're so happy to hear that! 😊"
              : userResponse === "No"
              ? "Sorry to hear that! 😞"
              : "It's okay, we understand! 🤔"}
          </p>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
