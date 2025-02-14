'use client';

import Link from 'next/link';
import NetworkStats from '@/components/ui/NetworkStats';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function TransactionExplorer() {
  return (
    <div className="relative min-h-screen text-white font-exo2">
      <ParticlesBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-center items-center bg-black h-16 px-4">
          <div className="text-white mr-auto ml-4 text-2xl font-bold">
            <h1>
              CryptoPath<sub>&copy;</sub>
            </h1>
          </div>
          <nav className="hidden md:flex justify-center items-center space-x-6">
            <Link href="/" className="text-white text-sm uppercase hover:text-blue-500 transition">
              Home
            </Link>
            <Link href="/transactions" className="text-white text-sm uppercase hover:text-blue-500 transition">
              Transactions
            </Link>
            <Link href="/about" className="text-white text-sm uppercase hover:text-blue-500 transition">
              About Us
            </Link>
            <a
              href="mailto:cryptopath@gmail.com"
              className="text-white text-sm uppercase hover:text-blue-500 transition"
            >
              Support
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <div className="container mx-auto p-4">
          <NetworkStats />
        </div>
      </div>
    </div>
  );
}
