"use client";


import Image from "next/image";
import { useState, useEffect } from "react";
import imagesCaroussel, {imagesGalerie} from "./data"
import Header from "./header";

export default function Home() {

   const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = droite, -1 = gauche
  const visibleCount = 3;
  const totalSteps = imagesCaroussel.length - visibleCount;
  const [scrolled, setScrolled] = useState(false);

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
  const [modalGalerie, setModalGalerie] = useState(false)
  const handleShowMore = () => {
    if(modalGalerie){
      setVisibleCountGalerie(imagesGalerie.length); // affiche toutes les photos
      
    }
    else {
      setVisibleCountGalerie(6)
    }
    
    setModalGalerie(!modalGalerie)
  };


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
      <h1
        className="font-poppins text-black transition-all"
        style={{
          fontSize: scrolled ? "1.5rem" : "3rem",
        //   transition: "font-size 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        Katia Photo
      </h1>
      <div
        // style={{
        //   marginTop: scrolled ? "0" : "1rem",
        //   transition: "margin 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        // }}
      >
        <Header />
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
            Photographe de Mariage
          </h1>
          <p className="font-spartan mt-4 text-lg md:text-xl text-black">
            Immortalisez vos plus beaux souvenirs, ici nous pouvons mettre une déscription générale de ton métier
          </p>
        </div>
      {/* ======== A PROPOS ======== */}
      <section id="about" className="py-20 px-6 md:px-20 text-center bg-gray-50 text-black">
        <h2 className="text-4xl font-semibold mb-6 uppercase tracking-wide font-prata">
          À propos
        </h2>
        <p className="font-spartan max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
          Passionné par la photographie depuis plus de dix ans, je capture les
          instants les plus précieux de votre vie. Chaque regard, chaque sourire
          et chaque émotion sont figés dans le temps avec élégance et authenticité.
        </p>
      </section>

      {/* ======== GALERIE ======== */}
        <section id="gallery" className="py-20 px-6 md:px-20 bg-white text-black">
      <h2 className="text-4xl font-semibold mb-10 text-center uppercase tracking-wide font-prata">
        Galerie
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
          {modalGalerie ? (<button
            onClick={handleShowMore}
            className="bg-black text-white px-6 py-3 rounded-full uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Afficher plus
          </button>):(<button
            onClick={handleShowMore}
            className="bg-black text-white px-6 py-3 rounded-full uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Afficher Moins
          </button>)}
        </div>
      )}
    </section>

    {/* ======== TARIF ======== */}

    <section id="price" className="py-20 px-6 md:px-20 bg-gray-50 text-black text-center">
  <h2 className="text-4xl font-semibold mb-12 uppercase tracking-wide font-prata">
    Tarifs
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Tarif Basique */}
    <div className="border border-gray-200 rounded-lg p-8 shadow hover:shadow-lg transition-shadow">
      <h3 className="text-2xl font-semibold mb-4 font-poppins">Basique</h3>
      <p className="text-gray-600 mb-6 font-spartan">Séance courte, 1 lieu, 2 heures</p>
      <p className="text-3xl font-bold mb-6 font-poppins">250€</p>
      <ul className="text-left mb-6 space-y-2 font-spartan">
        <li>✅ 50 photos retouchées</li>
        <li>✅ Galerie en ligne</li>
        <li>✅ Déplacement inclus (Grenoble)</li>
      </ul>
      {/* <button className="bg-black text-white px-6 py-3 rounded-full uppercase tracking-wide hover:bg-gray-800 transition-colors">
        Réserver
      </button> */}
    </div>

    {/* Tarif Standard */}
    <div className="border border-gray-200 rounded-lg p-8 shadow hover:shadow-lg transition-shadow">
      <h3 className="text-2xl font-semibold mb-4 font-poppins">Standard</h3>
      <p className="text-gray-600 mb-6 font-spartan">Séance moyenne, 2 lieux, 4 heures</p>
      <p className="text-3xl font-bold mb-6 font-poppins">450€</p>
      <ul className="text-left mb-6 space-y-2 font-spartan">
        <li>✅ 100 photos retouchées</li>
        <li>✅ Galerie en ligne</li>
        <li>✅ Déplacement inclus</li>
        <li>✅ Album numérique</li>
      </ul>
      {/* <button className="bg-black text-white px-6 py-3 rounded-full uppercase tracking-wide hover:bg-gray-800 transition-colors">
        Réserver
      </button> */}
    </div>

    {/* Tarif Premium */}
    <div className="border border-gray-200 rounded-lg p-8 shadow hover:shadow-lg transition-shadow">
      <h3 className="text-2xl font-semibold mb-4 font-poppins">Premium</h3>
      <p className="text-gray-600 mb-6 font-spartan">Séance complète, journée entière</p>
      <p className="text-3xl font-bold mb-6 font-poppins">800€</p>
      <ul className="text-left mb-6 space-y-2 font-spartan">
        <li>✅ Toutes les photos retouchées</li>
        <li>✅ Galerie en ligne</li>
        <li>✅ Déplacement partout en France</li>
        <li>✅ Album physique inclus</li>
      </ul>
      {/* <button className="bg-black text-white px-6 py-3 rounded-full uppercase tracking-wide hover:bg-gray-800 transition-colors">
        Réserver
      </button> */}
    </div>
  </div>
</section>


      {/* ======== CONTACT ======== */}
 <section id="contact" className="py-20 px-6 md:px-20 bg-white text-black text-center">
  <h2 className="text-4xl font-semibold mb-6 uppercase tracking-wide font-prata">
    Contact
  </h2>
  <p className="font-spartan mb-8 text-gray-700 text-lg">
    Pour toute demande de reportage ou de séance photo, n’hésitez pas à me
    contacter.
  </p>

  {/* Coordonnées */}
  <div className="mb-12 space-y-2">
    <p className="font-spartan text-lg">
      📧 Email : <a href="mailto:contact@photographe-mariage.com" className="text-blue-600 underline">contact@photographe-mariage.com</a>
    </p>
    <p className="font-spartan text-lg">
      📞 Téléphone : <a href="tel:+33612345678" className="text-blue-600 underline">06 12 34 56 78</a>
    </p>
    <p className="font-spartan text-lg">
      📍 Adresse : 12 Rue des Fleurs, 38000 Grenoble, France
    </p>
  </div>

  {/* Formulaire de contact */}
  <form className="max-w-2xl mx-auto space-y-4 text-left">
    <div>
      <label className="block mb-1 font-semibold" htmlFor="name">Nom</label>
      <input
        type="text"
        id="name"
        placeholder="Votre nom"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
    <div>
      <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Votre email"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
    <div>
      <label className="block mb-1 font-semibold" htmlFor="message">Message</label>
      <textarea
        id="message"
        rows={5}
        placeholder="Votre message"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      ></textarea>
    </div>
    <div className="text-center">
      <button
        type="submit"
        className="bg-black text-white px-8 py-3 rounded-full text-lg uppercase tracking-wide hover:bg-gray-800 transition-colors"
      >
        Envoyer
      </button>
    </div>
  </form>
</section>


      {/* ======== FOOTER ======== */}
      <footer className="bg-black text-gray-500 text-center py-6 text-sm">
        © {new Date().getFullYear()} Photographe de Mariage – Tous droits réservés.
      </footer>
    </div>
  );
}
