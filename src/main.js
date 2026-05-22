import "./style.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kate Woff",
  jobTitle: "Junior Backend Developer",
  description:
    "Portfolio de Kate Woff, junior backend developer, presentant ses projets, experiences et temoignages.",
  image: new URL("./assets/img/home-img.png", import.meta.url).href,
  url: window.location.href,
  knowsAbout: [
    "Backend development",
    "API development",
    "JavaScript",
    "Web development",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Junior Backend Developer",
    occupationLocation: {
      "@type": "Country",
      name: "Belgium",
    },
  },
  workExample: [
    {
      "@type": "CreativeWork",
      name: "Demo API generator",
      description:
        "Projet de portfolio autour de la generation d'API de demonstration.",
    },
    {
      "@type": "CreativeWork",
      name: "Useful sandboxes",
      description:
        "Projet de portfolio autour d'environnements de test et de prototypage.",
    },
    {
      "@type": "CreativeWork",
      name: "Success side projects",
      description:
        "Projet de portfolio autour de projets personnels et experimentations web.",
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  review: [
    {
      "@type": "Review",
      reviewBody:
        "Temoignage client a propos du travail de developpement web de Kate Woff.",
      author: {
        "@type": "Person",
        name: "Stephan Clark",
        jobTitle: "CEO at Earlybird",
      },
    },
  ],
};

const addStructuredData = (data) => {
  const scriptId = "person-structured-data";
  const currentScript = document.getElementById(scriptId);
  const script = currentScript || document.createElement("script");

  script.id = scriptId;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);

  if (!currentScript) {
    document.head.appendChild(script);
  }
};

addStructuredData(structuredData);

const switchBtn = document.querySelector("#switch");

if (switchBtn) {
  switchBtn.addEventListener("change", () => {
    document.documentElement.classList.toggle("dark", switchBtn.checked);
  });
}

const cards = document.querySelectorAll(".card");

function isTextTruncated(text) {
  return text.scrollWidth > text.clientWidth;
}

function syncCardState(card) {
  const text = card.querySelector(".text-truncate");
  const seeMore = card.querySelector(".see-more");
  const seeLess = card.querySelector(".see-less");

  if (!text || !seeMore || !seeLess) {
    return;
  }

  text.classList.remove("is-open");
  seeLess.classList.add("hidden");
  seeMore.classList.toggle("hidden", !isTextTruncated(text));
}

function closeAllCards() {
  cards.forEach((card) => {
    syncCardState(card);
  });
}

function checkTruncate() {
  cards.forEach((card) => {
    syncCardState(card);
  });
}

cards.forEach((card) => {
  const text = card.querySelector(".text-truncate");
  const seeMore = card.querySelector(".see-more");
  const seeLess = card.querySelector(".see-less");

  if (!text || !seeMore || !seeLess) {
    return;
  }

  seeMore.addEventListener("click", () => {
    closeAllCards();

    text.classList.add("is-open");
    seeMore.classList.add("hidden");
    seeLess.classList.remove("hidden");
  });

  seeLess.addEventListener("click", () => {
    text.classList.remove("is-open");
    seeLess.classList.add("hidden");
    syncCardState(card);
  });
});

checkTruncate();

window.addEventListener("resize", checkTruncate);
