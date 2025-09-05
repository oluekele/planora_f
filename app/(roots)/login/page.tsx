// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("http://localhost:4000/api/v1/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Login failed");
//       localStorage.setItem("token", data.token);
//       router.push("/dashboard"); 
//     } catch (err) {
//       console.error(err);
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-400 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <input
//           className="input"
//           type="email"
//           placeholder="Email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="input"
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button className={`btn btn-primary ${loading ? "btn-loading" : ""}`} disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         {/* Alread don't have an account */}
//         <p className="text-center text-sm text-muted">
//           Don&apos;t have an account?{" "}
//           <a href="/signup" className="text-primary hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }


// src/app/login/page.tsx
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm />
    </div>
  );
}
