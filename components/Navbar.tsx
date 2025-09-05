'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href="/" className="text-xl font-bold text-primary ">
          Planora
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-card-bg p-4 space-y-2 animate-slide-in">
          <Link href="/signup" className="btn btn-primary w-full text-center">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
