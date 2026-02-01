import React, { useState, useRef } from 'react';
import Image from "next/image";
import emailjs from '@emailjs/browser';

const FormulaireContact = ({ lang, texte, image }: { lang: string; texte: any; image: any }) => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!formRef.current?.checkValidity()) {
      return;
    }

    emailjs.sendForm(
      'service_6hs0nto',
      'template_p3lkxus',
      formRef.current,
      'zE9bIRzXYvWQriraN'
    )
    .then((result) => {
      alert(lang === 'fr' ? "Message envoyé avec succès !" : "Message sent successfully!");
      formRef.current?.reset();
      setSubmitted(false);
    }, (error) => {
      alert(lang === 'fr' ? "Erreur lors de l'envoi." : "Error during sending.");
    });
  };

  // Consistent input styling
  const inputClass = "w-full border border-gray-200 rounded-[14px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black text-black text-[18px] font-assistant font-light bg-white placeholder:text-black/50";

  return (
    <section id="contact" className="relative py-16 md:pb-20 px-6 bg-white text-black flex flex-col items-center">
      <h2 className="pt-6 md:pt-0 mb-8 md:mb-12 font-bodoni text-2xl md:text-[32px] text-center z-1">
        {texte[lang].contact}
      </h2>

      {image && (
        <div className="hidden md:block absolute bottom-70 left-0 z-[0] pointer-events-none">
          <Image
            src="/images/design/Vector.png"
            alt="Image abstraite 1"
            width={500}
            height={500}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      {!image && (
        <div className="hidden md:block absolute bottom-130 right-0 z-[0] pointer-events-none">
          <Image
            src="/images/design/Union.png"
            alt="Image abstraite 2"
            width={500}
            height={500}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-[300px] md:max-w-[500px] mx-auto text-center">
        {/* Mobile: Short text */}
        <div className="md:hidden">
          <p className="mb-3 font-assistant font-light text-[18px] leading-[29px] text-[#1e2939] text-center">
            {texte[lang].descContact[0]}
          </p>
          <p className="mb-3 font-assistant font-light text-[18px] leading-[29px] text-black text-center">
            ekaterina.cheliadinova@gmail.com
          </p>
          <p className="font-assistant font-light text-[14px] leading-[20px] text-[#1e2939] text-center">
            {lang === 'fr'
              ? "Je vous invite à me décrire votre projet, la date envisagée et le lieu."
              : "Please describe your project, planned date, and location."}
          </p>
        </div>

        {/* Desktop: Full text */}
        <div className="hidden md:block">
          {texte[lang].descContact.map((p: string, i: number) => (
            <p
              key={i}
              className="mb-3 font-assistant font-light text-[18px] leading-[29px] text-[#1e2939] text-center"
            >
              {p}
            </p>
          ))}
        </div>

        <form ref={formRef} noValidate onSubmit={handleSubmit} className="relative mt-8 z-20 mx-auto space-y-3 text-left">

          {/* Nom et Prénom */}
          <input
            type="text"
            required
            id="netp"
            name="netp"
            placeholder={`${texte[lang].netp} *`}
            className={`${inputClass} ${submitted ? "invalid:border-red-500" : ""}`}
          />

          {/* Email */}
          <input
            type="email"
            required
            id="email"
            name="email"
            placeholder={`${texte[lang].email} *`}
            className={`${inputClass} ${submitted ? "invalid:border-red-500" : ""}`}
          />

          {/* Téléphone */}
          <input
            type="tel"
            name="tel"
            placeholder={texte[lang].tel}
            className={inputClass}
          />

          {/* Ville */}
          <input
            type="text"
            name="ville"
            placeholder={texte[lang].ville}
            className={inputClass}
          />

          {/* Type de prestation */}
          <div className="relative">
            <select
              required
              id="presta"
              name="presta"
              defaultValue=""
              className={`w-full border border-gray-200 rounded-[14px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black bg-white font-assistant font-light text-[18px] appearance-none text-black/50 valid:text-black ${submitted ? "invalid:border-red-500" : ""}`}
            >
              <option value="" disabled>{texte[lang].presta} *</option>
              <option value="mariage">{texte[lang].mariage}</option>
              <option value="couple">{texte[lang].couple}</option>
              <option value="famille">{texte[lang].famille}</option>
              <option value="portrait">{texte[lang].portrait}</option>
              <option value="evenement">{texte[lang].evenement}</option>
              <option value="grossesse">{texte[lang].grossesse}</option>
              <option value="entreprise">{texte[lang].entreprise}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black/50">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <textarea
            required
            id="message"
            name="message"
            rows={5}
            placeholder={`${texte[lang].message} *`}
            className={`${inputClass} ${submitted ? "invalid:border-red-500" : ""}`}
          />

          {/* Mention Champs Obligatoires */}
          <div className="w-full text-right">
            <span className="text-[12px] text-red-500 font-assistant">
              * {texte[lang].champsObligatoires}
            </span>
          </div>

          {/* Bouton Envoyer */}
          <button
            type="submit"
            className="w-full hover:cursor-pointer bg-[#f5f5f5] text-black px-12 py-3 rounded-[14px] text-[18px] font-assistant font-light border border-gray-300 transition-all duration-200 shadow-md hover:shadow-lg active:shadow-none hover:bg-gray-100"
          >
            {texte[lang].bouton}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormulaireContact;
