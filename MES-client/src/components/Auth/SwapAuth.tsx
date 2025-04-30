import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, User, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { registerUser, loginUser } from "../../api/index";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import toast from "react-hot-toast";

export default function SwapAuth() {
  const [, setUser] = useAtom(userAtom);
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: 1,
    address: "",
    picture: "",
  });

  // SignIn State
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  // Handle SignIn Submit

  const handleSignUpSubmit = async (
    e: FormEvent<HTMLFormElement>,
    signUpData: {
      name: string;
      email: string;
      mobile: string;
      password: string;
      role?: number;
      address?: string;
      picture?: string;
    }
  ) => {
    e.preventDefault();

    const { name, email, password } = signUpData;
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const { data, error } = await registerUser({
        ...signUpData,
        role: signUpData.role || 1,
        address: signUpData.address || "",
        picture: signUpData.picture || "",
      });

      if (error) {
        toast.error(`Sign Up Failed: ${error}`);
        return;
      }

      if (data?.data?.user && data?.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.user._id);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setUser(data.data.user);

        toast.success("Account created successfully! 🎉");
        navigate(-1);
      } else {
        toast.error("Unexpected error during signup. Please try again.");
      }
    } catch (err) {
      console.error("Sign Up Exception:", err);
      toast.error("Something went wrong during Sign Up!");
    }
  };

  const handleSignInSubmit = async (
    e: FormEvent<HTMLFormElement>,
    signInData: { email: string; password: string }
  ) => {
    e.preventDefault();

    const { email, password } = signInData;
    if (!email || !password) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      // eslint-disable-next-line prefer-const
      let { data, error } = await loginUser(signInData);

      console.log("Login Data:", error);

      if (error) {
        toast.error(`Login Failed: ${error.message ?? error}`);
        return;
      }

      if (data?.data?.user && data?.data?.token) {
        data.data.user.token = data?.data.token;
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.user._id);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setUser(data.data.user);

        toast.success(`Welcome back, ${data.data.user.name || "User"}! 👋`);
        navigate(-1);
      } else {
        toast.error("Unexpected error during login. Please try again.");
      }
    } catch (err) {
      console.error("Sign In Exception:", err);
      toast.error("Something went wrong during Login!");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="relative mx-auto h-[600px] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl sm:h-[550px]">
        <div className="absolute inset-0 flex ">
          <motion.div
            className="hidden md:flex relative z-10 items-center justify-center bg-[#164734] text-white"
            initial={{ width: "50%", left: 0 }}
            animate={{
              width: ["50%", "50%"],
              left: isSignUp ? "50%" : "0%",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full max-w-md p-8 text-center ">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isSignUp ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 flex flex-col items-center justify-center p-8 ${
                  isSignUp ? "pointer-events-none" : ""
                }`}
              >
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center text-sm font-medium mb-6 hover:underline cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> BACK
                </button>

                <h2 className="mb-6 text-3xl font-bold">Welcome Back!</h2>
                <p className="mb-8">
                  Sign in to access your account and continue your journey with
                  us
                </p>
                <Button
                  variant="outline"
                  className="border-white text-blue-800 white hover:bg-white hover:text-blue-600 cursor-pointer"
                  onClick={toggleForm}
                >
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-green-500 opacity-20"></div>
                <div className="absolute -top-46 -right-4 h-40 w-40 rounded-full bg-green-400 opacity-20"></div>
                <div className="absolute bottom-12 left-74 h-24 w-24 rounded-full bg-green-300 opacity-20"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isSignUp ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 flex flex-col items-center justify-center p-8 ${
                  isSignUp ? "" : "pointer-events-none"
                }`}
              >
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center text-sm font-medium mb-6 hover:underline cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> BACK
                </button>

                <h2 className="mb-6 text-3xl font-bold">Hello, Friend!</h2>
                <p className="mb-8">
                  Already have an account? Sign in to continue your experience
                </p>
                <Button
                  variant="outline"
                  className="border-white text-blue-800 hover:bg-white hover:text-blue-600 cursor-pointer"
                  onClick={toggleForm}
                >
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                
                <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-green-500 opacity-20"></div>
                <div className="absolute -top-46 -right-4 h-40 w-40 rounded-full bg-green-400 opacity-20"></div>
                <div className="absolute bottom-12 left-74 h-24 w-24 rounded-full bg-green-300 opacity-20"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Sign In Form */}
          <motion.div
            className="absolute flex w-full md:w-[50%] items-center justify-center"
            initial={{ left: "50%" }}
            animate={{
              left: isSignUp ? "0%" : window.innerWidth < 768 ? "0%" : "50%",
              opacity: isSignUp ? 1 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="w-full max-w-4xl p-4 md:p-6">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isSignUp ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className={`${isSignUp ? "pointer-events-none" : ""}`}
              >
                <div className="flex justify-between items-center w-full mb-6 md:hidden">
                  <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm font-medium hover:underline cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> BACK
                  </button>
                  <Button
                    variant="outline"
                    className=" text-xs md:text-sm border-blue-600 text-blue-600 hover:bg-blue-50 w-[56%]"
                    onClick={toggleForm}
                  >
                    Create Account <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>

                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                  Sign In
                </h2>
                <p className="mb-8 text-gray-600">
                  Please sign in to your account
                </p>

                <form
                  onSubmit={(e) => handleSignInSubmit(e, signInData)}
                  className="space-y-4"
                >
                  <div className="space-y-2 ">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={signInData.email}
                        onChange={(e) =>
                          setSignInData({
                            ...signInData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={signInData.password}
                        onChange={(e) =>
                          setSignInData({
                            ...signInData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                    Sign In
                  </Button>
                </form>
              </motion.div>
            </div>
          </motion.div>

          {/* Sign Up Form */}
          <motion.div
            className="absolute flex w-full md:w-1/2 items-center justify-center"
            initial={{ left: "100%" }}
            animate={{
              left: isSignUp ? "0%" : "100%",
              opacity: isSignUp ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="w-full max-w-md p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isSignUp ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${isSignUp ? "" : "pointer-events-none"}`}
              >
                <div className="flex justify-between items-center w-full mb-6 md:hidden">
                  <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm font-medium hover:underline cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> BACK
                  </button>
                  <Button
                    variant="outline"
                    className="text-sm border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
                    onClick={toggleForm}
                  >
                    Sign In <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>

                <h2 className=" mb-4  text-xl md:text-3xl font-bold text-gray-900">
                  Create Account
                </h2>
                <p className=" mb-6  text-gray-600">
                  Sign up to get started with our platform
                </p>

                <form
                  onSubmit={(e) => handleSignUpSubmit(e, signUpData)}
                  className=" space-y-2 md:space-y-4 text-sm md:text-base"
                >
                  <div className=" space-y-1 md:space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className="pl-10"
                        value={signUpData.name}
                        onChange={(e) =>
                          setSignUpData({ ...signUpData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={signUpData.email}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2 ">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10"
                        value={signUpData.password}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 mt-2 md:mt-0"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                    Create Account
                  </Button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
