import React, { useState } from 'react';
import Image from "next/image";

const FormulaireContact = ({ lang, texte, image }) => {
  const [submitted, setSubmitted] = useState(false);

  // Fonction pour gérer la soumission
  const handleSubmit = (e) => {
    setSubmitted(true);
    const form = e.currentTarget;
    
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Logique d'envoi ici
      console.log("Formulaire valide !");
    }
  };

  // Classe de base pour les inputs
  const baseInputClass = "peer w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black text-black font-assistant bg-white/80 backdrop-blur-sm transition-all";

  return (
    <section id="contact" className="relative pb-20 px-6 md:px-20 bg-white text-black flex flex-col items-center">
      <h2 className="mb-12 font-bodoni" style={{ fontSize: "32px" }}>
        {texte[lang].contact}
      </h2>
{image && ( <div className="absolute bottom-70 left-0 z-[0] pointer-events-none">
                  <Image
                    src="/images/design/Vector.png" 
                    alt="Image abstraite 1"
                    width={600}
                    height={600}
                    style={{ objectFit: 'contain' }}
                  />
                </div>)}

                 {!image && (<div className="absolute bottom-130 right-0 z-[0] pointer-events-none">
                    <Image
                      src="/images/design/Union.png" 
                      alt="Image abstraite 2"
                      width={600}
                      height={600}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>)}
         

      {/* <p className="relative z-10 font-assistant mb-8 text-gray-700 text-lg">
          {texte.texteIntro}
        </p> */}
              <div className="relative z-10 max-w-[50%] mx-auto text-center px-40">
    {texte[lang].descContact.map((p, i) => (
      <p 
        key={i} 
        className="mb-6 last:mb-0 font-assistant text-lg leading-relaxed text-gray-700"
      >
        {p}
      </p>
    ))}
  

      <form noValidate onSubmit={handleSubmit} className="relative z-20 max-w-2xl mx-auto space-y-4 text-left px-20 mt-15">
   
        {/* Nom et Prénom */}
        <div className="relative">
          <input
            type="text"
            required
            id="netp"
            name="netp"
            placeholder=" " 
            className={`${baseInputClass} ${submitted ? "invalid:border-red-500" : "border-black/50"}`}
          />
          <label htmlFor="netp" className="absolute left-4 top-3 pointer-events-none transition-all peer-placeholder-shown:block hidden text-gray-500 font-assistant">
            {texte[lang].netp} <span className="text-red-500">*</span>
          </label>
          {submitted && (
            <span className="absolute right-4 top-4 text-red-500 text-[10px] font-assistant pointer-events-none peer-invalid:opacity-100 opacity-0">
              {lang === 'fr' ? 'Ce champ est requis' : 'This field is required'}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            required
            id="email"
            name="email"
            placeholder=" "
            className={`${baseInputClass} ${submitted ? "invalid:border-red-500" : "border-black/50"}`}
          />
          <label htmlFor="email" className="absolute left-4 top-3 pointer-events-none transition-all peer-placeholder-shown:block hidden text-gray-500 font-assistant">
            {texte[lang].email} <span className="text-red-500">*</span>
          </label>
          {submitted && (
            <span className="absolute right-4 top-4 text-red-500 text-[10px] font-assistant pointer-events-none peer-invalid:opacity-100 opacity-0">
              {lang === 'fr' ? 'Email invalide' : 'Invalid email'}
            </span>
          )}
        </div>

        {/* Téléphone (Non requis) */}
        <div>
          <input
            type="tel"
            placeholder={texte[lang].tel}
            className="w-full border border-black/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black text-black font-assistant bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Ville (Non requis) */}
        <div>
          <input
            type="text"
            placeholder={texte[lang].ville}
            className="w-full border border-black/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black text-black font-assistant bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Type de prestation */}
        <div className="relative">
          <select
            required
            id="presta"
            name="presta"
            defaultValue=""
            className={`peer w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black bg-white/80 font-assistant appearance-none text-gray-500 valid:text-black transition-all ${submitted ? "invalid:border-red-500" : "border-black/50"}`}
          >
            <option value="" disabled hidden></option>
            <option value="mariage">{texte[lang].mariage}</option>
            <option value="couple">{texte[lang].couple}</option>
            <option value="famille">{texte[lang].famille}</option>
            <option value="portrait">{texte[lang].portrait}</option>
            <option value="evenement">{texte[lang].evenement}</option>
            <option value="grossesse">{texte[lang].grossesse}</option>
            <option value="entreprise">{texte[lang].entreprise}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black/50">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <label htmlFor="presta" className="absolute left-4 top-3 pointer-events-none text-gray-500 font-assistant peer-focus:hidden peer-valid:hidden transition-all">
            {texte[lang].presta} <span className="text-red-500">*</span>
          </label>
          {submitted && (
            <span className="absolute right-10 top-4 text-red-500 text-[10px] font-assistant pointer-events-none peer-invalid:opacity-100 opacity-0">
               {lang === 'fr' ? 'Requis' : 'Required'}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="relative mb-0">
          <textarea
            required
            id="message"
            name="message"
            rows={5}
            placeholder=" "
            className={`${baseInputClass} ${submitted ? "invalid:border-red-500" : "border-black/50"}`}
          ></textarea>
          <label htmlFor="message" className="absolute left-4 top-3 pointer-events-none transition-all peer-placeholder-shown:block hidden text-gray-500 font-assistant">
            {texte[lang].message} <span className="text-red-500">*</span>
          </label>
          {submitted && (
            <span className="absolute right-4 top-4 text-red-500 text-[10px] font-assistant pointer-events-none peer-invalid:opacity-100 opacity-0">
               {lang === 'fr' ? 'Message requis' : 'Message required'}
            </span>
          )}
        </div>

        {/* Mention Champs Obligatoires */}
        <div className="w-full text-right px-4">
          <span className="text-sm text-gray-500 font-assistant italic">
            <span className="text-red-500">*</span> {texte[lang].champsObligatoires}
          </span>
        </div>

        {/* Bouton Envoyer */}
     <div className="flex flex-col items-center gap-4">
  <button 
    type="submit" 
    className="w-[60%] hover:cursor-pointer bg-[#F8F8F8] text-black px-12 py-3 mb-8 rounded-lg text-lg uppercase tracking-widest font-assistant border border-black/10 transition-all duration-200 
               shadow-md hover:shadow-lg active:shadow-none hover:bg-gray-100"
  >
    {texte[lang].bouton}
  </button>
</div>
      </form>
      </div>
    </section>
  );
};

export default FormulaireContact;
