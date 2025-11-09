import {poppins, prata, spartan} from "./layout";


function Header() {
    return(
    <nav className="font-spartan text-black flex space-x-8 text-lg">
      <a href="#" className="hover:text-gray-400 transition-colors text-center">Accueil</a>
      <a href="#about" className="flex flex-wrap hover:text-gray-400 transition-colors text-center">À propos de moi</a>
      <a href="#price" className="flex flex-wrap hover:text-gray-400 transition-colors text-center">Tarifs</a>
      <a href="#gallery" className="hover:text-gray-400 transition-colors text-center">Galerie</a>
      <a href="#contact" className="hover:text-gray-400 transition-colors text-center">Contact</a>
    </nav>
        )
}

export default Header


// "Poppins", Sans-serif
// "Prata", Sans-serif
// "League Spartan", Sans-serif