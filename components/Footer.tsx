"use client"; // Ensures this runs on the client side
import Link from "next/link";

const Footer = () => {
    
    return(
<footer className="bg-[#161A20] text-[#FFFFFF] py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4"> 

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Us column */}
          <div>
            <h3 className="text-[#F5B056] font-bold text-lg md:text-xl mb-4 font-quantico">About us</h3>
            <ul className="space-y-2 font-exo2">
              <li><Link href="/aboutus" className="hover:text-[#F5B056]">About CryptoPath</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">Terms of service</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">Privacy notice</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">Terms of service</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">Contact us</Link></li>
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h3 className="text-[#F5B056] font-bold text-lg md:text-xl mb-4 font-quantico">Products</h3>
            <ul className="space-y-2 font-exo2">
              <li><Link href="#" className="hover:text-[#F5B056]">Buy Crypto</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">P2P trading</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">Trade</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">Convert</Link></li>
              
            </ul>
          </div>

          {/* Crypto calculation and Trade column */}
          <div>
            <h3 className="text-[#F5B056] font-bold text-lg md:text-xl mb-4 font-quantico">Crypto calculation</h3>
            <ul className="space-y-2 font-exo2">
              <li><Link href="#" className="hover:text-[#F5B056]">USDT to USD</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">BTC to USD</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">ETH to USD</Link></li>
            </ul>
            
          </div>

          {/* Support and Community column */}
          <div>
            <h3 className="text-[#F5B056] font-bold text-lg md:text-xl mb-4 font-quantico">Support</h3>
            <ul className="space-y-2 font-exo2 mb-6">
              <li><Link href="#" className="hover:text-[#F5B056]">Support center</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">Announcements</Link></li>
              <li><Link href="#" className="hover:text-[#F5B056]">Connect with us</Link></li>
            </ul>
           
          </div>
        </div>
      </div>

      {/* Full-width white line */}
      <div className="border-t border-gray-700 my-6 md:my-8"></div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-xs md:text-sm text-center font-exo2">
          <p>&copy; 2024 CryptoPath. All rights reserved</p>
        </div>
      </div>
    </footer>
    )
}
export default Footer;
