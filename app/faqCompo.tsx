"use client";
import { useState } from "react";

// Sous-composant pour chaque question
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pb-12"> {/* py-6 augmente l'espace entre les blocs de questions */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-center text-center focus:outline-none group"
      >
        <div className="flex items-center">
          {/* Le triangle à gauche de la question */}
          <span 
            className={`transform transition-transform duration-300 text-[10px] mr-4 ${
              isOpen ? "rotate-180" : "rotate-90"
            }`}
          >
            ▲
          </span>

          {/* Question en GRAS et CENTRÉE */}
          <span className="text-lg font-assistant font-bold uppercase tracking-wider text-gray-800">
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