const carouselContainer = document.querySelector(".carousel-container");
const cardsTrack = document.querySelector(".cards-track");
const originalCards = Array.from(cardsTrack.children);
const profilesContainer = document.querySelector(".profiles-container");
const profilesTrack = document.querySelector(".profiles-track");
const originalProfiles = Array.from(profilesTrack.children);
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Smooth scroll to consultation section on service card click
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");
  const consultationSection = document.getElementById("consultation");

  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      if (consultationSection) {
        consultationSection.scrollIntoView({
          behavior: "smooth",
          block: "start", // Aligns the top of the section with the top of the viewport
        });
      }
    });
  });
});

// Duplicate for cards
const cardClones = originalCards.map((card) => card.cloneNode(true));
cardClones.forEach((clone) => cardsTrack.prepend(clone));
const cardClones2 = originalCards.map((card) => card.cloneNode(true));
cardClones2.forEach((clone) => cardsTrack.appendChild(clone));

// Duplicate for profiles
const profileClones = originalProfiles.map((profile) =>
  profile.cloneNode(true)
);
profileClones.forEach((clone) => profilesTrack.prepend(clone));
const profileClones2 = originalProfiles.map((profile) =>
  profile.cloneNode(true)
);
profileClones2.forEach((clone) => profilesTrack.appendChild(clone));

// Calculate steps
let cardsItemWidth = originalCards[0].offsetWidth;
let cardsGap = parseFloat(getComputedStyle(cardsTrack).gap) || 0;
let cardsStep = cardsItemWidth + cardsGap;
let cardsLoopLength = originalCards.length * cardsStep;
let cardsPos = -cardsLoopLength;
cardsTrack.style.transform = `translateX(${cardsPos}px)`;

let profilesItemWidth = originalProfiles[0].offsetWidth;
let profilesGap = parseFloat(getComputedStyle(profilesTrack).gap) || 0;
let profilesStep = profilesItemWidth + profilesGap;
let profilesLoopLength = originalProfiles.length * profilesStep;
let profilesPos = -profilesLoopLength;
profilesTrack.style.transform = `translateX(${profilesPos}px)`;

const handleCardsTransitionEnd = () => {
  cardsTrack.style.transition = "none";
  if (cardsPos <= -2 * cardsLoopLength) {
    cardsPos += cardsLoopLength;
  } else if (cardsPos >= 0) {
    cardsPos -= cardsLoopLength;
  }
  cardsTrack.style.transform = `translateX(${cardsPos}px)`;
  setTimeout(() => {
    cardsTrack.style.transition = "transform 0.5s ease";
  }, 0);
};

const handleProfilesTransitionEnd = () => {
  profilesTrack.style.transition = "none";
  if (profilesPos <= -2 * profilesLoopLength) {
    profilesPos += profilesLoopLength;
  } else if (profilesPos >= 0) {
    profilesPos -= profilesLoopLength;
  }
  profilesTrack.style.transform = `translateX(${profilesPos}px)`;
  setTimeout(() => {
    profilesTrack.style.transition = "transform 0.5s ease";
  }, 0);
};

cardsTrack.addEventListener("transitionend", handleCardsTransitionEnd);
profilesTrack.addEventListener("transitionend", handleProfilesTransitionEnd);

const nextSlide = () => {
  cardsPos -= cardsStep;
  cardsTrack.style.transform = `translateX(${cardsPos}px)`;
  profilesPos -= profilesStep;
  profilesTrack.style.transform = `translateX(${profilesPos}px)`;
};

const prevSlide = () => {
  cardsPos += cardsStep;
  cardsTrack.style.transform = `translateX(${cardsPos}px)`;
  profilesPos += profilesStep;
  profilesTrack.style.transform = `translateX(${profilesPos}px)`;
};

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

window.addEventListener("resize", () => {
  cardsItemWidth = document.querySelector(".card").offsetWidth;
  cardsGap = parseFloat(getComputedStyle(cardsTrack).gap) || 0;
  cardsStep = cardsItemWidth + cardsGap;
  cardsLoopLength = originalCards.length * cardsStep;
  cardsPos = -cardsLoopLength;
  cardsTrack.style.transition = "none";
  cardsTrack.style.transform = `translateX(${cardsPos}px)`;

  profilesItemWidth = document.querySelector(".profile-img").offsetWidth;
  profilesGap = parseFloat(getComputedStyle(profilesTrack).gap) || 0;
  profilesStep = profilesItemWidth + profilesGap;
  profilesLoopLength = originalProfiles.length * profilesStep;
  profilesPos = -profilesLoopLength;
  profilesTrack.style.transition = "none";
  profilesTrack.style.transform = `translateX(${profilesPos}px)`;
});

const langSwitch = document.getElementById("langSwitch");

langSwitch.addEventListener("change", () => {
  if (langSwitch.checked) {
    window.location.href = "arabic.html"; // Go to Arabic when toggled
  }
});

// const arabicLangSwitch = document.getElementById("arabicLangSwitch");

// Ensure toggle is checked by default on Arabic page
// arabicLangSwitch.checked = true;

// Redirect to English when unchecked
arabicLangSwitch.addEventListener("change", (e) => {
  if (e.target.checked) {
    window.location.href = "index.html"; // Go to English
  }
  // if (!e.target.checked) {
  //   window.location.href = "index.html"; // Go to English
  // }
});

const carousel = document.getElementById("carousel-2");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const card = carousel.querySelector(".dr-card");
const cardStyle = getComputedStyle(card);
const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight) + 20;
const visibleCards = Math.floor(carousel.offsetWidth / card.offsetWidth);

let currentIndex = 0;

function updateCarousel() {
  carousel.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
}

nextBtn.addEventListener("click", () => {
  const maxIndex = carousel.children.length - visibleCards;
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = maxIndex;
  }
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
});

document.addEventListener("DOMContentLoaded", () => {
  const heroBottom = document.querySelector(".hero-bottom");
  const footer = document.querySelector(".footer");

  if (!heroBottom || !footer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Footer visible → hide hero-bottom
          heroBottom.style.display = "none";
        } else {
          // Footer not visible → show hero-bottom
          heroBottom.style.display = "";
        }
      });
    },
    { threshold: 0.1 } // Adjust trigger sensitivity
  );

  observer.observe(footer);
});
