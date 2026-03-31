const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 w-full">
      
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        <p className="text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>

        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-gray-400">Privacy</a>
          <a href="#" className="hover:text-gray-400">Terms</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>

      </div>

    </footer>
  );
};

export default Footer;