import React, { useEffect, useState } from 'react';
import { Cloud, Droplets } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out motion-reduce:transition-none ${
        scrolled 
          ? 'bg-cream/80 backdrop-blur-sm shadow-subtle' 
          : 'bg-gray'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* LEFT: Built on Bolt.new */}
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-800 hover:underline font-medium"
          >
            Build on Bolt.new
          </a>
        </div>
      </div>
      
      <div className="container mx-top px-0.9 py-0.9">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className="flex items-center space-x-8 ml-1">
            <div className="relative">
              <Cloud className="w-11 h-11 text-sage" />
              <Droplets className="w-5 h-5 text-softblue absolute -bottom-1 -right-1" />
            </div>
            
            <h1 className="text-2xl md:text-10xl font-quicksand font-bold text-darkgray">
              MINDSHOWER
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;