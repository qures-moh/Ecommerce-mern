import { useState } from "react";
import API from "./api";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const [success, setSuccess] = useState("");
  const handleLoginOrSignUp = async () => {
    try {
      setError("");
    setSuccess("");

      if(isLogin){
      const res = await API.post("/user/login",{
        email,password
      });
      setEmail("");
      setPassword("");
        
      setSuccess("Login successful ✅");
      console.log("Loginsuccesfull",res.data);
    }else{
      const res = await API.post("/user/register", {
        name,
        email,
        password,
      });
      console.log("Signup successful", res.data);
       setSuccess("Account created successfully 🚀");
      setEmail("");
      setPassword("");
      setName("");
    }
    } catch (err) {
      console.log("Login failed");
      setError(err.response?.data?.message || "Something went wrong ❌");
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500 ">
        <div className="text-center text-white px-10"></div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Shop 🛒</h1>
        <p className="text-lg opacity-90">
          Discover amazing products at the best prices.
        </p>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100-100">
        <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-96 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-3 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={name}
              onChange={(e) =>{setName(e.target.value); setError("")}}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setError("")}}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={password}
  onChange={(e) => setPassword(e.target.value)}

          />
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={() => handleLoginOrSignUp()}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          {error &&<p className=" mt-2 flex justify-center items-center text-red-500 text-lg">{error}</p>}
          {success && (
  <p className="text-green-600 text-sm mb-2 text-center">
    {success}
  </p>
)}
          <p className="text-sm mt-2 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 cursor-pointer ml-1 font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
