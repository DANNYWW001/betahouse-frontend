import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import betaLogo from "../assets/beta.png";

const Footer = () => {
  const scrollToSection = (targetId) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const headerOffset = 80; 
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <footer id="footer-section" className="layout bg-[#035A33] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row lg:justify-between gap-10">
        <div className="flex-1 max-w-sm">
          <img src={betaLogo} alt="BetaHouse Logo" className="mb-4 w-28" />
          <p className="text-sm mb-6">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>

          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> 95 Tinubu Estate, Lekki, Lagos
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> +234 675 8935 675
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope /> support@rentbetahouse.com
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-1 gap-8 sm:gap-12 lg:justify-between">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a href="#">Home</a>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("properties-section")}
                  className="text-left hover:underline"
                >
                  Properties
                </button>
              </li>

              <li>
                <a href="#">About</a>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("footer-section")}
                  className="text-left hover:underline"
                >
                  Contact us
                </button>
              </li>

              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="font-bold text-lg mb-4">More</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a href="#">Agents</a>
              </li>
              <li>
                <a href="#">Affordable Houses</a>
              </li>
              <li>
                <a href="#">FAQ’s</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Popular Search</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a href="#">Apartment for sale</a>
              </li>
              <li>
                <a href="#">Apartment for rent</a>
              </li>
              <li>
                <a href="#">3 bedroom flat</a>
              </li>
              <li>
                <a href="#">Bungalow</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-400 py-6 px-30 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center md:text-left">
          © 2023 Betahouse | Designed by Micheal.fg
        </p>
        <a href="#" className="hover:underline text-center md:text-right">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
