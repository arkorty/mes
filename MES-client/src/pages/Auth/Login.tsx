
// // const Login = () => {
// //   return (
// //     <div>Login Page</div>
// //   )
// // }

// // export default Login


// "use client";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function Login() {
//   const [isRight, setIsRight] = useState(false);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <div className="relative flex w-full max-w-md h-64 border-2 border-black rounded-lg overflow-hidden">
//         {/* Swappable Blue Div */}
//         <motion.div
//           className="absolute top-0 h-full w-1/2 bg-blue-300 flex items-center justify-center border rounded-md"
//           animate={{ left: isRight ? "50%" : "0%" }}
//           initial={false}
//           transition={{ type: "spring", stiffness: 100, damping: 15 }}
//         >
//           <p className="text-white font-semibold">Blue Box</p>
//         </motion.div>

//         {/* Static Section */}
//         <div className="flex-1 flex items-center justify-center">
//           <div className="w-24 h-24 border-2 border-black"></div>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
//         onClick={() => setIsRight(!isRight)}
//       >
//         Signup
//       </button>
//     </div>
//   );
// }













interface SignInFormProps {
    onToggle: () => void;
  }
  
  export default function SignInForm({ onToggle }: SignInFormProps) {
    return (
      <div className="flex flex-col items-center space-y-4 w-full">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Login
        </button>
        <p className="text-sm">
          Don't have an account?{" "}
          <button className="text-blue-500 underline" onClick={onToggle}>
            Sign Up
          </button>
        </p>
      </div>
    );
  }
  