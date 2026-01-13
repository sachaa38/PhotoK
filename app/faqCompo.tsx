"use client";
import { useState } from "react";
import Image from "next/image";

// Sous-composant pour chaque question
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-6 mb:pb-12"> {/* py-6 augmente l'espace entre les blocs de questions */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="flex w-full items-center justify-center cursor-pointer focus:outline-none group"
>
  <div className="flex items-start"> 
    {/* Conteneur de l'image : taille fixe pour ne pas décaler le texte */}
    <div className="flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center mr-2 pt-1.5">
      <Image 
        src="/Polygon 3.png" 
        alt="Triangle" 
        width={12} 
        height={12} 
        /* La rotation se fait ici, sur l'image elle-même */
        className={`transform transition-transform duration-300 object-contain scale-110 ${
          isOpen ? "rotate-[90deg]" : "rotate-[0deg]"
        }`}
      />
    </div>

    {/* Question : parfaitement alignée */}
    <span className="text-lg font-assistant font-bold uppercase tracking-wider text-gray-800 text-left">
      {question}
    </span>
  </div>
</button>

      {/* La réponse : max-w plus large que la question si nécessaire */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mx-auto ${
          isOpen 
            ? "max-h-[800px] opacity-100 mt-8 mb-4" // mt-8 augmente l'espace entre question et réponse
            : "max-h-0 opacity-0"
        }`}
        style={{ maxWidth: "900px" }} // Ici tu peux définir une largeur plus grande pour la réponse
      >
        {answer.map((p, i) => (
          <p 
            key={i} 
            className="mb-4 last:mb-0 font-assistant text-gray-600 leading-relaxed"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FaqItem