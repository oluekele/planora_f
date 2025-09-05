// src/app/dashboard/admin/page.tsx
"use client";

import { useAuth } from "@/lib/useAuth";

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>
      <p>Organization: {user.organization?.name || "N/A"}</p>
    </div>
  );
}
