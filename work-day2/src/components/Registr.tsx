import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }
      console.log("User Registered Successfully!!");
      window.location.href = "/list";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-indigo-400 text-white w-full sm:max-w-md h-full sm:h-auto sm:rounded-xl rounded-none p-8 shadow-md flex flex-col gap-4"      
        >
        <h3 className="text-3xl">Sign Up</h3>

       <div className="flex flex-col gap-5 sm:flex-row">
          <label className="pr-3">First name</label>
          <input
            type="text"
            className="focus:outline-violet-500 sm:pl-2"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <label className="pr-3">Last name</label>
          <input
            type="text"
            className="focus:outline-violet-500 sm:pl-2"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <label className="pr-3">Email address</label>
          <input
            type="email"
            className="focus:outline-violet-500 sm:pl-2"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <label className="pr-3">Password</label>
          <input
            type="password"
            className="focus:outline-violet-500 sm:pl-2"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="border-1 p-1 bg-linear-to-r from-emerald-500 via-cyan-500 to-blue-500">Sign Up</button>
        <p className="forgot-password text-right">
          Already registered <a href="/login" className="underline text-sm text-blue-200">Login</a>
        </p>
      </form>
    </div>
  );
}
export default Register;
