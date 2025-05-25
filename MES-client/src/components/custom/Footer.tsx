const Footer = () => {
  const navigationLinks = [
    { title: "Home", path: "/#" },
    { title: "Events", path: "/events" },
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact" },
    //{ title: "Categories", path: "#" },
    //{ title: "Services", path: "#" },
  ];

  return (
    <footer className="bg-[#164734] text-gray-50">
      <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/footerlogo.png"
            alt="Mountain Expedition Supply"
            className="h-12 mb-4"
          />
          <p className="uppercase font-light tracking-tight">
            Mountain Expedition Supply
          </p>
        </div>

        {/* Visit Us Section */}
        <div>
          <h3 className="text-lg font-semibold">Visit us!</h3>
          <p className="mt-2 leading-6 tracking-tighter">
            <span className="font-semibold">Connecticut</span>
            <br />
            847 W. Main Street, Branford, <br />
            Connecticut, 06405
          </p>
        </div>

        {/* Store Hours Section */}
        <div>
          <h3 className="text-lg font-semibold">Store Hours</h3>
          <p className="mt-2 leading-6 tracking-tighter">
            Mon - Fri: 10am - 6pm <br />
            Saturday: 10am - 5pm <br />
            Sunday: 11am - 4pm
          </p>
        </div>

        {/* Navigation Section */}
        <div>
          <h3 className="text-lg font-semibold">Navigation</h3>
          <ul className="mt-2 space-y-2 leading-6 tracking-tighter">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Services
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#222222] text-gray-300 text-sm py-2">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Links */}
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
          
            <img src="/image 28.png" className="bg-cover" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
