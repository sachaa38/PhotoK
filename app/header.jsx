import {poppins, prata, spartan} from "./layout";
import texte from "./texte"


function Header({lang}) {

    return(
    <nav className="font-spartan text-black flex space-x-8 text-lg">
      <a href="#" className="hover:text-gray-400 transition-colors text-center">{texte[lang].accueil}</a>
      <a href="#about" className="flex flex-wrap hover:text-gray-400 transition-colors text-center">{texte[lang].apropos}</a>
      <a href="#price" className="flex flex-wrap hover:text-gray-400 transition-colors text-center">{texte[lang].tarif}</a>
      <a href="#gallery" className="hover:text-gray-400 transition-colors text-center">{texte[lang].galerie}</a>
      <a href="#contact" className="hover:text-gray-400 transition-colors text-center">{texte[lang].contact}</a>
    </nav>
        )
}

export default Header


// "Poppins", Sans-serif
// "Prata", Sans-serif
// "League Spartan", Sans-serif