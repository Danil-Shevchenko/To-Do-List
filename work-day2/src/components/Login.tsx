import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/list";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-400 text-white w-full sm:max-w-md h-full sm:h-auto sm:rounded-xl rounded-none p-8 shadow-md flex flex-col gap-4"      
      >
        <h3 className="text-3xl">Login</h3>

        <div className="flex flex-col gap-5 sm:flex-row">
          <label className="pr-4">Email address</label>
          <input
            type="email"
            className="focus:outline-violet-500 pl-2"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <label className="pr-4">Password</label>
          <input
            type="password"
            className="focus:outline-violet-500 pl-2"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="border-1 p-1 bg-linear-to-r from-emerald-500 via-cyan-500 to-blue-500">
          Submit
        </button>
        <p className="forgot-password text-right">
          New user{" "}
          <a href="/register" className="underline text-sm text-blue-200">
            Register Here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
