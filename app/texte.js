const texte = {
  fr: {
    accueil: "Accueil",
    apropos: "À propos de moi",
    tarif: "Tarifs",
    galerie: "Galerie",
    contact: "Contact",
    titre1: "Photographe de mariage",
    desc_titre1: "Je fais des supers photos, promis !",
    desc_apropos:
      "Me voila, en chair et en os, bien présent. Vous ne me verrez pas mais vous entendrez les clics de mon nouveau Sonny Flash XXXL Carbon Gun XV pif paf pouf",
    afficherPlus: "Afficher plus",
    afficherMoins: "Afficher moins",

    // 💼 Offres (tarifs)
    offres: [
      {
        titre: "Basique",
        description: "Séance courte, 1 lieu, 2 heures",
        prix: "250€",
        details: [
          "50 photos retouchées",
          "Galerie en ligne",
          "Déplacement inclus (Grenoble)"
        ]
      },
      {
        titre: "Standard",
        description: "Séance moyenne, 2 lieux, 4 heures",
        prix: "450€",
        details: [
          "100 photos retouchées",
          "Galerie en ligne",
          "Déplacement inclus",
          "Album numérique"
        ]
      },
      {
        titre: "Premium",
        description: "Séance complète, journée entière",
        prix: "800€",
        details: [
          "Toutes les photos retouchées",
          "Galerie en ligne",
          "Déplacement partout en France",
          "Album physique inclus"
        ]
      }
    ],

    // 📬 Section Contact
    contactSection: {
      titre: "Contact",
      texteIntro:
        "Pour toute demande de reportage ou de séance photo, n’hésitez pas à me contacter.",
      email: {
        label: "Email",
        valeur: "contact@photographe-mariage.com"
      },
      telephone: {
        label: "Téléphone",
        valeur: "06 12 34 56 78"
      },
      adresse: {
        label: "Adresse",
        valeur: "12 Rue des Fleurs, 38000 Grenoble, France"
      },
      form: {
        nom: "Nom",
        email: "Email",
        message: "Message",
        placeholderNom: "Votre nom",
        placeholderEmail: "Votre email",
        placeholderMessage: "Votre message",
        bouton: "Envoyer"
      }
    },

    // 🧾 Footer
    footer: {
      texte: `© ${new Date().getFullYear()} Photographe de Mariage – Tous droits réservés.`
    }
  },

  en: {
    accueil: "Home",
    apropos: "About me",
    tarif: "Pricing",
    galerie: "Gallery",
    contact: "Contact",
    titre1: "Wedding Photographer",
    desc_titre1: "I take amazing photos, I promise!",
    desc_apropos:
      "Here I am, in the flesh — you won’t see me, but you’ll hear the clicks of my brand new Sonny Flash XXXL Carbon Gun XV pif paf pow!",
    afficherPlus: "Show more",
    afficherMoins: "Show less",

    // 💼 Offers (pricing)
    offres: [
      {
        titre: "Basic",
        description: "Short session, 1 location, 2 hours",
        prix: "€250",
        details: [
          "50 edited photos",
          "Online gallery",
          "Travel included (Grenoble)"
        ]
      },
      {
        titre: "Standard",
        description: "Medium session, 2 locations, 4 hours",
        prix: "€450",
        details: [
          "100 edited photos",
          "Online gallery",
          "Travel included",
          "Digital album"
        ]
      },
      {
        titre: "Premium",
        description: "Full session, all day",
        prix: "€800",
        details: [
          "All photos edited",
          "Online gallery",
          "Travel across France",
          "Physical album included"
        ]
      }
    ],

    // 📬 Contact section
    contactSection: {
      titre: "Contact",
      texteIntro:
        "For any wedding or photoshoot inquiry, feel free to get in touch.",
      email: {
        label: "Email",
        valeur: "contact@wedding-photographer.com"
      },
      telephone: {
        label: "Phone",
        valeur: "+33 6 12 34 56 78"
      },
      adresse: {
        label: "Address",
        valeur: "12 Rue des Fleurs, 38000 Grenoble, France"
      },
      form: {
        nom: "Name",
        email: "Email",
        message: "Message",
        placeholderNom: "Your name",
        placeholderEmail: "Your email",
        placeholderMessage: "Your message",
        bouton: "Send"
      }
    },

    // 🧾 Footer
    footer: {
      texte: `© ${new Date().getFullYear()} Wedding Photographer – All rights reserved.`
    }
  }
};

export default texte;
