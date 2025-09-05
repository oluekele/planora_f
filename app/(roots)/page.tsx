
// 'use client';
// import Navbar from '@/components/Navbar';
// import useParallax from '@/hooks/useParallax';
// import Link from 'next/link';

// export default function Home() {
//   const bgRef = useParallax(0.3);
//   return (
//     <>
//       <Navbar />
//       <main className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        
//         {/* Background with parallax */}
//         <div 
//           ref={bgRef}
//           className="absolute inset-0 bg-cover bg-center bg-gradient-to-br from-blue-300  to-purple-400" 
          
//         ></div>

//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60"></div>

//         {/* Content */}
//         <section className="relative z-10 flex flex-col justify-center items-center text-center space-y-6">
//           <h1 className="text-5xl md:text-6xl font-bold text-white animate-fade-in">
//             Welcome to Planora
//           </h1>
//           <p className="text-lg md:text-xl text-white/80 animate-fade-in">
//             Manage projects, teams, and tasks with ease.
//           </p>
//           <Link href="/signup" className="btn btn-primary btn-lg animate-fade-in">
//             Get Started
//           </Link>
//         </section>
//       </main>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { api } from "@/lib/api";
import { useEffect } from "react";


export default function Home() {
  // const [result, setResult] = useState([]);
   
 useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await api('/users'); // backend API
      console.log('user data', data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
  
}, []);


  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-600 to-purple-900 text-black cont">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center px-4 pt-24 space-y-8">
        <h1 className="text-5xl font-bold animate-fade-in">
          Welcome to Planora
        </h1>
        <p className="text-lg text-muted animate-fade-in delay-200">
          Organize your projects and teams efficiently.
        </p>
        <Link href="/signup" className="btn btn-primary animate-fade-in delay-400 cursor-pointer">
          Get Start
        </Link>
      </main>
      {/* <div className="absolute inset-0">
        <Image
          src="/landing-bg.jpg" width={120} height={100}
          alt="Landing Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div> */}
    </div>
  );
}
