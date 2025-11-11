"use client";


import Image from "next/image";
import { useState, useEffect } from "react";
import imagesCaroussel, {imagesGalerie} from "./data"
import Header from "./header";
import texte from "./texte"

export default function Home() {

   const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = droite, -1 = gauche
  const visibleCount = 3;
  const totalSteps = imagesCaroussel.length - visibleCount;
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("fr")
  const offres = texte[lang].offres;
  const t = texte[lang].contactSection;

  // TITRE

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => {
        if (prev === totalSteps) {
          setDirection(-1); // change de sens à la fin
          return prev - 1;
        } else if (prev === 0 && direction === -1) {
          setDirection(1); // repart à droite au début
          return prev + 1;
        } else {
          return prev + direction;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSteps, direction]);

  // Galerie

  const [visibleCountGalerie, setVisibleCountGalerie] = useState(6); // affiche 6 photos au départ
  const [modalGalerie, setModalGalerie] = useState(true)
  const handleShowMore = () => {
    if(modalGalerie){
      setVisibleCountGalerie(imagesGalerie.length); // affiche toutes les photos
      
    }
    else {
      setVisibleCountGalerie(6)
    }
    
    setModalGalerie(!modalGalerie)
  };

  const changeLang = () => {
    if(lang === 'fr') {
      setLang('en')
    } else if (lang === 'en'){
      setLang('fr')
    }
    
  }


  return (
    <div className="min-h-screen bg-white text-white font-sans">
    <div
      className={`w-full z-50 bg-white ${
        scrolled
          ? "fixed top-0 flex flex-row items-center justify-between shadow-md px-8 py-2"
          : "flex flex-col items-center justify-center px-8 py-6 mb-0"
      }`}
      // style={{
      //   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      // }}
    >
    <div className="flex flex-col items-center justify-center">
  <h1
    className="font-poppins text-black transition-all"
    style={{
      fontSize: scrolled ? "1.5rem" : "3rem",
    }}
  >
    Katia Photo
  </h1>
  <button
    onClick={changeLang}
    className="text-black hover:cursor-pointer"
  >
    FR | EN
  </button>
</div>

      <div
        // style={{
        //   marginTop: scrolled ? "0" : "1rem",
        //   transition: "margin 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        // }}
      >
        <Header lang={lang}/>
      </div>
    </div>

{scrolled && (<div className="h-38">test</div>)}
    {/* ======== HERO CAROUSEL ======== */}
   
   <section className={`w-full h-[90vh] overflow-hidden bg-white flex items-center`}>
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(startIndex * 100) / visibleCount}%)`,
            width: `${(imagesCaroussel.length * 100) / visibleCount}%`,
          }}
        >
          {imagesCaroussel.map((img, idx) => (
            <div
              key={idx}
              className="relative flex-[0_0_33.3333%] h-full px-1"
            >
              <Image
                src={`/images/caroussel/${img}.jpg`}
                alt={`Photo ${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

  <div className="py-20 px-6 md:px-20 flex flex-col items-center justify-center text-center mt-20">
          <h1 className="text-5xl text-black font-thin md:text-7xl font-poppins tracking-wide uppercase">
            {texte[lang].titre1}
          </h1>
          <p className="font-spartan mt-4 text-lg md:text-xl text-black">
            {texte[lang].desc_titre1}
          </p>
        </div>
      {/* ======== A PROPOS ======== */}
      <section id="about" className="py-20 px-6 md:px-20 text-center bg-gray-50 text-black">
        <h2 className="text-4xl font-semibold mb-6 uppercase tracking-wide font-prata">
          {texte[lang].apropos}
        </h2>
        <p className="font-spartan max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
          {texte[lang].desc_apropos}
        </p>
      </section>

      {/* ======== GALERIE ======== */}
        <section id="gallery" className="py-20 px-6 md:px-20 bg-white text-black">
      <h2 className="text-4xl font-semibold mb-10 text-center uppercase tracking-wide font-prata">
        {texte[lang].galerie}
      </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
  {imagesGalerie.slice(0, visibleCountGalerie).map((image, i) => (
    <div
      key={i}
      className="relative w-full h-120 overflow-hidden shadow-lg"
    >
      <Image
        src={`/images/galerie/${image}.jpg`}
        alt={`Photo ${i + 1}`}
        fill
        className="object-cover transform transition-transform duration-700 ease-in-out hover:scale-115"
        priority={i === 0}
      />
    </div>
  ))}
</div>


      {visibleCount < imagesGalerie.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleShowMore}
            className="bg-black text-white px-6 py-3 rounded-full uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            {modalGalerie ? texte[lang].afficherPlus : texte[lang].afficherMoins}
          </button>
      
        </div>
      )}
    </section>

    {/* ======== TARIF ======== */}

    <section id="price" className="py-20 px-6 md:px-20 bg-gray-50 text-black text-center">
  <h2 className="text-4xl font-semibold mb-12 uppercase tracking-wide font-prata">
    {texte[lang].tarif}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Tarif Basique */}
     {offres.map((offre, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-8 shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-2xl font-semibold mb-4 font-poppins">{offre.titre}</h3>
            <p className="text-gray-600 mb-6 font-spartan">{offre.description}</p>
            <p className="text-3xl font-bold mb-6 font-poppins">{offre.prix}</p>
            <ul className="text-left mb-6 space-y-2 font-spartan">
              {offre.details.map((detail, i) => (
                <li key={i}>✅ {detail}</li>
              ))}
            </ul>
          </div>
        ))}
  </div>
</section>


      {/* ======== CONTACT ======== */}
<section id="contact" className="py-20 px-6 md:px-20 bg-white text-black text-center">
      <h2 className="text-4xl font-semibold mb-6 uppercase tracking-wide font-prata">
        {t.titre}
      </h2>
      <p className="font-spartan mb-8 text-gray-700 text-lg">{t.texteIntro}</p>

      <div className="mb-12 space-y-2">
        <p className="font-spartan text-lg">
          📧 {t.email.label} :{" "}
          <a href={`mailto:${t.email.valeur}`} className="text-blue-600 underline">
            {t.email.valeur}
          </a>
        </p>
        <p className="font-spartan text-lg">
          📞 {t.telephone.label} :{" "}
          <a href={`tel:${t.telephone.valeur}`} className="text-blue-600 underline">
            {t.telephone.valeur}
          </a>
        </p>
        <p className="font-spartan text-lg">
          📍 {t.adresse.label} : {t.adresse.valeur}
        </p>
      </div>

      {/* <form className="max-w-2xl mx-auto space-y-4 text-left">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">{t.form.nom}</label>
          <input
            type="text"
            id="name"
            placeholder={t.form.placeholderNom}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="email">{t.form.email}</label>
          <input
            type="email"
            id="email"
            placeholder={t.form.placeholderEmail}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="message">{t.form.message}</label>
          <textarea
            id="message"
            rows={5}
            placeholder={t.form.placeholderMessage}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-full text-lg uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            {t.form.bouton}
          </button>
        </div>
      </form> */}
    </section>


      {/* ======== FOOTER ======== */}
      <footer className="bg-black text-gray-500 text-center py-6 text-sm">
        © {new Date().getFullYear()} Photographe de Mariage – Tous droits réservés.
      </footer>
    </div>
  );
}
