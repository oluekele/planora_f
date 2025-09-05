// // src/lib/useAuth.ts
// "use client";

// import { useEffect, useState } from "react";
// import { api } from "./api";
// import { AuthUser } from "@/types/auth";

// export function useAuth() {
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     api
//       .get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => {
//         console.log("Fetched user data:", res.data.user);
//         setUser(res.data.user);
//       })
//       .catch((err) => {
//         console.error("Failed /auth/me:", err);
//         console.log("Failed to fetch user data" + err.message);
//         localStorage.removeItem("token");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return { user, setUser, loading };
// }


"use client";
import { useEffect, useState } from "react";
import { api } from "./api";
import { AuthUser } from "@/types/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ only run on client

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("Fetched user data:", res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Failed /auth/me:", err);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, setUser, loading };
}
