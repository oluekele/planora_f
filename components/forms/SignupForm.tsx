"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";

type Mode = "PERSONAL" | "ORGANIZATION" | "LINK";

interface SignupFormData {
  mode: Mode;
  organizationName?: string;
  organizationSlug?: string;
  role?: "OWNER" | "ADMIN" | "MEMBER" | "CLIENT" | "PERSONAL";
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignupForm() {
  const [mode, setMode] = useState<Mode>("PERSONAL");
  const [form, setForm] = useState<SignupFormData>({
  mode: "PERSONAL",
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

  const mutation = useMutation({
  mutationFn: async () => {
    console.log("Submitting signup form:", form);
    const { data } = await api.post("/auth/register", form);
    return data;
  },
  onSuccess: (data) => {
    alert(data.message);
    const { role, accountType } = data.user;
    if (accountType === "PERSONAL") window.location.href = "/dashboard/personal";
    else if (["OWNER", "ADMIN"].includes(role)) window.location.href = "/dashboard/admin";
    else if (role === "MEMBER") window.location.href = "/dashboard/member";
    else if (role === "CLIENT") window.location.href = "/dashboard/client";
  },
  onError: (err) => {
    alert(err.message || "Signup failed. Please try again.");
  },
});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl text-black shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>

      {/* Mode selection */}
      <label htmlFor="mode" className="sr-only">
        Select Account Type
      </label>
      <select
        id="mode"
        name="mode"
        className="w-full border rounded p-2 mb-4"
        value={mode}
        onChange={(e) => {
          const m = e.target.value as Mode;
          setMode(m);
          setForm({ ...form, mode: m });
        }}
      >
        <option value="PERSONAL">Personal Account</option>
        <option value="ORGANIZATION">Create Organization</option>
        <option value="LINK">Join Organization</option>
      </select>

      {/* ORG CREATION */}
      {mode === "ORGANIZATION" && (
        <>
          <input
            name="organizationName"
            placeholder="Organization Name"
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
          />
          <input
            name="organizationSlug"
            placeholder="Custom Slug (optional)"
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
          />
          <label htmlFor="role" className="sr-only">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
          >
            <option value="OWNER">Owner</option>
            <option value="ADMIN">Admin</option>
          </select>
        </>
      )}

      {/* ORG JOIN */}
      {mode === "LINK" && (
        <>
          <input
            name="organizationSlug"
            placeholder="Organization Slug"
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
          />
          <label htmlFor="role" className="sr-only">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
          >
            <option value="ADMIN">Admin</option>
            <option value="MEMBER">Member</option>
            <option value="CLIENT">Client</option>
          </select>
        </>
      )}

      {/* Common fields */}
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full border rounded p-2 mb-4"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border rounded p-2 mb-4"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full border rounded p-2 mb-4"
      />
      <input
        name="passwordConfirm"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Registering..." : "Sign Up"}
      </button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log In
        </Link>
      </p>
    </form>
  );
}
