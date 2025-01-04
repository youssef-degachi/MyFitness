import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const chgeUrl = useNavigate();
  // after login go to index
  const goToIndex = () => {
    chgeUrl("/");
  };

  const login = async () => {
    try {
      // call the api to login
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      // if api is successful save userId and fullName in localStorage
      if (response.status === 200) {
        const { userId, message } = response.data;
        localStorage.setItem("userId", userId);
        localStorage.setItem("fullName", response.data.fullname);
        // show that is sign in succ
        alert(message);
      } else {
        // show there a problem
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to log in");
    }
  };

  // after submit test if the email and psw field empty or no
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    // call login function to login for specified user
    await login();
  };

  //! i try using tanstack query but it's fail i will  try this later
  //   const login = useMutation({
  //     mutationFn: async (email: string, password: string) => {
  //     try {
  //       const response = await axios.post('http://localhost:5000/api/login', {
  //         email,
  //         password,
  //       })

  //     } catch (error) {
  //       console.error('Error:', error)
  //       alert('Failed to log in')
  //     }
  //   },
  //   onSuccess: (data) => {
  //     localStorage.setItem('userId', data.userId);
  //     localStorage.setItem('fullName', data.fullname);
  //     navigate('/');
  //   }
  // })
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white ">Login</h1>
      {/* start form  i useState because there just two field*/}
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-900 shadow-md rounded-lg p-6"
      >
        {/* email field */}
        <div className="mb-4">
          <label className="block text-white font-bold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        {/* psw field */}
        <div className="mb-4">
          <label className="block text-white font-bold ">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        {/* sign up if you do'nt have account */}
        <div className="text-center my-4">
          <p className="text-sm text-gray">
            Don't have an account?{" "}
            <Link href="/register" className="text-white">
              Sign up
            </Link>
          </p>
        </div>
        {/* submit  go to index and save the user  */}
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={goToIndex}
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-slate-900"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
