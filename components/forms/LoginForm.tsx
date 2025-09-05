"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/login", form);
      return data;
    },
    onSuccess: (data) => {
      console.log("Before setting token:", data.token);
      localStorage.setItem("token", data.token);
      console.log("After setting token:", localStorage.getItem("token"));
      const { role, accountType, isApproved } = data.user;
      console.log("User role:", role);
      console.log("Account type:", accountType);
      console.log("Is approved:", isApproved);
      console.log("Full user data:", data.user);
      console.log("Full response data:", data.token);
      if (!isApproved) {
        alert("Your account is pending approval by the organization.");
        return;
      }

      if (accountType === "PERSONAL") {
        router.push("/dashboard/personal");
      } else if (accountType === "ORGANIZATION" && ["OWNER", "ADMIN"].includes(role)) {
        router.push("/dashboard/admin");
      } else if (role === "MEMBER") {
        router.push("/dashboard/member");
      } else if (role === "CLIENT") {
        router.push("/dashboard/client");
      }

      
      // if (accountType === "PERSONAL") {
      //   router.push("/dashboard/personal");
      // } else if (accountType === "ORGANIZATION" && ["OWNER", "ADMIN"].includes(role)) {
      //   router.push("/dashboard/admin");
      // } else if (role === "MEMBER") {
      //   router.push("/dashboard/member");
      // } else if (role === "CLIENT") {
      //   router.push("/dashboard/client");
      // }

      // if (accountType === "PERSONAL") window.location.href = "/dashboard/personal";
      // else if (["OWNER", "ADMIN"].includes(role)) window.location.href = "/dashboard/admin";
      // else if (role === "MEMBER") window.location.href = "/dashboard/member";
      // else if (role === "CLIENT") window.location.href = "/dashboard/client";
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
      className="bg-white p-6 rounded-2xl text-black shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border rounded p-2 mb-4"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
