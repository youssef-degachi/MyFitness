import React, { useState } from "react";
import axios from "axios";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const chgeUrl = useNavigate();
  // after create user should go to login first
  const goToLogin = () => {
    chgeUrl("/login");
  };

  // register new user
  const registerMutation = useMutation({
    mutationFn: async (userData: {
      fullname: string;
      email: string;
      password: string;
    }) => {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData,
      );
      return response.data;
    },
    onSuccess: () => {
      alert("User Created");
      goToLogin();
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Failed to register");
    },
  });

  // after submit check if user field is empty or no
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    if (!fullname || !email || !password) {
      alert("All fields are required");
      return;
    }
    // call api that create user in DB
    registerMutation.mutate({ fullname, email, password });
    goToLogin();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Register</h1>
      {/* start form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          {/* fullname field */}
          <label className="block text-white font-bold mb-2">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        {/* email field */}
        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Email</label>
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
          <label className="block text-white font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
            required
          />
          {/* if have an account login */}
          <div className="text-center mt-4">
            <p className="text-sm text-white">
              have an account?{" "}
              <Link href="/login" className="text-white">
                login
              </Link>
            </p>
          </div>
        </div>
        {/* submit the form */}
        <div className="flex justify-center">
          <button
            onClick={goToLogin}
            type="submit"
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-slate-900"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
