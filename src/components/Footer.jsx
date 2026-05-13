import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 inline-block pb-1">CarRent Pro</h3>
            <p className="text-sm text-gray-300 mb-4">
              Your trusted partner for premium car rentals at affordable prices.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" aria-label="social link" className="hover:text-orange-500 transition duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-orange-500 inline-block pb-1">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Home", "Vehicles", "About Us", "FAQ", "Contact"].map((text, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-orange-500 transition duration-300">{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rental Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-orange-500 inline-block pb-1">Rentals</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Book a Car", "Special Offers", "Locations", "Terms & Conditions", "Privacy Policy"].map((text, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-orange-500 transition duration-300">{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-orange-500 inline-block pb-1">Contact Us</h3>
            <ul className="text-sm text-gray-300 space-y-2 mb-5">
              <li><span className="mr-2">📞</span> +1 (123) 456-7890</li>
              <li><span className="mr-2">✉️</span> contact@carrentpro.com</li>
              <li><span className="mr-2">📍</span> 123 Rental St, City, Country</li>
            </ul>
            <div>
              <h4 className="text-base font-medium mb-2">Newsletter</h4>
              <form className="flex w-full max-w-xs">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 rounded-l bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-sm px-4 py-2 rounded-r text-white transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright & Payments */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CarRent Pro. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {["visa.png", "mastercard.png", "paypal.png"].map((src, i) => (
              <img key={i} src={`/${src}`} alt={src.split('.')[0]} className="h-8 w-auto object-contain" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
