"use client"; // Ensures this runs on the client side
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for open/close
import { useRouter } from "next/navigation";
import { Search } from "lucide-react"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("")
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (address) {
      router.push(`/search/?address=${address}`);
    }
  };

  return (
    <header className="flex items-center bg-black h-16 px-4">
      {/* Logo */}
      <div className="text-white mr-auto ml-4 text-2xl font-bold">
        <h1>
        Crypto<span className="text-[#F5B056]">Path<sub>&copy;</sub></span>
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center items-center space-x-6">
        <Link href="/" className="text-white text-sm uppercase hover:text-[#F5B056] transition">
          Home
        </Link>
        <Link href="/transactions" className="text-white text-sm uppercase hover:text-[#F5B056] transition">
          Transactions
        </Link>
        <a href="mailto:cryptopath@gmail.com" className="text-white text-sm uppercase hover:text-[#F5B056] transition">
          Support
        </a>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search wallet..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 pl-10 rounded-md text-black border border-gray-300 focus:outline-none"
          />
          <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16}/>
          </button>
        </form>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-0 w-64 bg-black text-white p-6 shadow-lg md:hidden z-50 w-screen">
          <nav className="flex flex-col space-y-4 text-center text-xl">
            <Link href="/" className="text-sm uppercase hover:text-[#F5B056] transition" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/transactions" className="text-sm uppercase hover:text-[#F5B056] transition" onClick={() => setIsOpen(false)}>
              Transactions
            </Link>
            <a href="mailto:cryptopath@gmail.com" className="text-sm uppercase hover:text-[#F5B056] transition" onClick={() => setIsOpen(false)}>
              Support
            </a>
            <form onSubmit={handleSearch} className="relative flex justify-center mt-4 pt-2">
              <input
                type="text"
                placeholder="Search wallet..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 pl-10 rounded-md text-black border border-gray-300 focus:outline-none w-3/4"
              />
              <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={25} />
              </button>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
