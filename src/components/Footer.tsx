const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          
          {/* Brand */}
          <div>
            <h1 className="text-lg font-semibold text-black tracking-wide border border-gray-300 inline-block px-3 py-1 rounded-lg">
              FOODSCANNER
            </h1>
            <p className="text-gray-500 text-sm mt-3 max-w-sm">
              Scan food products, check nutrition scores, and make healthier choices easily.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div>
              <h3 className="font-medium text-black mb-3">Company</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="hover:text-black cursor-pointer">About</li>
                <li className="hover:text-black cursor-pointer">Careers</li>
                <li className="hover:text-black cursor-pointer">Blog</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-black mb-3">Support</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="hover:text-black cursor-pointer">Help Center</li>
                <li className="hover:text-black cursor-pointer">Privacy</li>
                <li className="hover:text-black cursor-pointer">Terms</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-black mb-3">Contact</h3>
              <ul className="space-y-2 text-gray-500">
                <li>Email: support@foodscanner.com</li>
                <li className="hover:text-black cursor-pointer">Contact Us</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FoodScanner. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-black cursor-pointer">Privacy</span>
            <span className="hover:text-black cursor-pointer">Terms</span>
            <span className="hover:text-black cursor-pointer">Contact</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;