import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center">
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
          404 - Page Not Found
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <span className="px-6 py-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg font-bold text-white shadow-glow hover:shadow-glow-lg transform transition-all duration-300 inline-block">
            Return to Home
          </span>
        </Link>
      </div>
    </div>
  );
} 