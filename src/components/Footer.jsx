import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-surface text-text-primary pt-16 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 pb-1 border-b-2 border-accent inline-block">DriveSphere</h3>
            <p className="text-sm text-text-secondary mb-4">
              Your trusted partner for premium car rentals at affordable prices.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" aria-label="social link" className="text-text-secondary hover:text-accent transition duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-1 border-b-2 border-accent inline-block">Quick Links</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              {['Home', 'Vehicles', 'About Us', 'FAQ', 'Contact'].map((text, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-accent transition duration-300">{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rental Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-1 border-b-2 border-accent inline-block">Rentals</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              {['Book a Car', 'Special Offers', 'Locations', 'Terms & Conditions', 'Privacy Policy'].map((text, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-accent transition duration-300">{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-1 border-b-2 border-accent inline-block">Contact Us</h3>
            <ul className="text-sm space-y-2 mb-5 text-text-secondary">
              <li><span className="mr-2">📞</span> +1 (123) 456-7890</li>
              <li><span className="mr-2">✉️</span> contact@drivesphere.com</li>
              <li><span className="mr-2">📍</span> 123 Rental St, City, Country</li>
            </ul>
            <div>
              <h4 className="text-base font-medium mb-2 text-text-primary">Newsletter</h4>
              <form className="flex w-full max-w-xs">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 rounded-l text-sm bg-card border border-border text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="text-sm px-4 py-2 rounded-r text-white bg-primary hover:opacity-90 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} DriveSphere. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {['visa.png', 'mastercard.png', 'paypal.png'].map((src, i) => (
              <img key={i} src={`/${src}`} alt={src.split('.')[0]} className="h-8 w-auto object-contain opacity-50" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
