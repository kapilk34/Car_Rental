import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white pt-16 pb-10" style={{ backgroundColor: "#111111" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 border-b-2 inline-block pb-1" style={{ borderColor: "#F4A261" }}>CarRent Pro</h3>
            <p className="text-sm mb-4" style={{ color: "#B3B3B3" }}>
              Your trusted partner for premium car rentals at affordable prices.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" aria-label="social link" className="transition duration-300 hover:text-accent" style={{ color: "#B3B3B3" }}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 inline-block pb-1" style={{ borderColor: "#F4A261" }}>Quick Links</h3>
            <ul className="space-y-2 text-sm" style={{ color: "#B3B3B3" }}>
              {["Home", "Vehicles", "About Us", "FAQ", "Contact"].map((text, i) => (
                <li key={i}>
                  <a href="#" className="transition duration-300 hover:text-accent">{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rental Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 inline-block pb-1" style={{ borderColor: "#F4A261" }}>Rentals</h3>
            <ul className="space-y-2 text-sm" style={{ color: "#B3B3B3" }}>
              {["Book a Car", "Special Offers", "Locations", "Terms & Conditions", "Privacy Policy"].map((text, i) => (
                <li key={i}>
                  <a href="#" className="transition duration-300 hover:text-accent">{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 inline-block pb-1" style={{ borderColor: "#F4A261" }}>Contact Us</h3>
            <ul className="text-sm space-y-2 mb-5" style={{ color: "#B3B3B3" }}>
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
                  className="w-full px-3 py-2 rounded-l text-sm text-white focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: "#242424",
                    focusRingColor: "#E63946"
                  }}
                  onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #E63946"}
                  onBlur={(e) => e.target.style.boxShadow = "none"}
                />
                <button
                  type="submit"
                  className="text-sm px-4 py-2 rounded-r text-white transition duration-300"
                  style={{ backgroundColor: "#E63946" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d42c3a"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#E63946"}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm" style={{ borderColor: "#2F2F2F", color: "#B3B3B3" }}>
          <p>© {new Date().getFullYear()} CarRent Pro. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {["visa.png", "mastercard.png", "paypal.png"].map((src, i) => (
              <img key={i} src={`/${src}`} alt={src.split('.')[0]} className="h-8 w-auto object-contain" style={{ filter: "brightness(0.7)" }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
