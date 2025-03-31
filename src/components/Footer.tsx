import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amber-200 py-4">
      <div className="container mx-auto text-center text-amber-900">
        <p>&copy; {new Date().getFullYear()} Trouves-Tout - Tous droits réservés</p>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="#" className="hover:text-amber-600 transition duration-300">Mentions légales</a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-600 transition duration-300">Conditions générales</a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-600 transition duration-300">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;