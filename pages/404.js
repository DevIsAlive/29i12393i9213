import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:scale-105 transition-transform">
          Return to Home
        </Link>
      </div>
    </div>
  );
} 