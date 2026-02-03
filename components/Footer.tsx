import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-stone-900 text-center">
      <div className="container mx-auto px-4">
        <h3 className="font-display text-2xl text-stone-600 mb-4">HOUSE CASHIMI</h3>
        <p className="text-stone-700 text-sm mb-8">
          "Money over Honor, Life over Money."
        </p>
        <div className="text-stone-800 text-xs">
          &copy; {new Date().getFullYear()} Project Cashimi. All visual concepts are for demonstration.
        </div>
      </div>
    </footer>
  );
};

export default Footer;