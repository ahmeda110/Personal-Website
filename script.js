// WHEN HTML FULLT LOADS AND PARSES
document.addEventListener("DOMContentLoaded", init);

//ALL THE SELECIONS FOR COMPONENTS TO WORK WITH
const tabs = document.querySelectorAll('.experience__tab');
const tabsContainer = document.querySelector('.experience__tab-container');
const tabsContent = document.querySelectorAll('.experience__content');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const slidenum = document.querySelector('.page-tracker');



function init() {

  //TYPED EFFECT IN LANDING PAGE
  var typed = new Typed(".typed", {
    strings: ["SWE Student", 'BBA Student', 'Enthusiast'],

    typeSpeed: 55,
    backSpeed: 40,
    loop: true
  });

  //SMOOTH SCROLLING FOR NAVIGATION ITEMS WHEN CLICKED
  document.querySelector('.nav_links').addEventListener('click', function (e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: "smooth"
    });
  });

  //SLIDER (IMPLEMENTED FOR: 
  //         BUTTONS, ARROW KEYS, DRAGGING AND SCROLLING ON MOBILE)
  const slider = document.querySelector(".slider");
  const paragraphs = Array.from(document.querySelectorAll(".text"));
  const buttons = Array.from(document.querySelectorAll(".left, .right"));

  let sliderIndex = 0;

  buttons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      sliderIndex += index === 0 ? -1 : 1;
      if (sliderIndex >= paragraphs.length) sliderIndex = 0;
      if (sliderIndex < 0) sliderIndex = paragraphs.length - 1;
      slidenum.textContent = `${sliderIndex + 1}/3`;
      const currentParagraph = paragraphs[sliderIndex];
      slider.scrollTo({
        left: sliderIndex * currentParagraph.clientWidth
      });
    });
  });

  //MAP FROM THE LEAFLET LIBRARY IN ABOUT ME
  var map = L.map('map').setView([51.07, -114.0652801], 7);

  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }).addTo(map);

  L.marker([51.044308, -114.0652801]).addTo(map)
    .bindPopup('I am located in Calgary, Canada')
    .openPopup();


  // TAB SWITCHING LOGIC IN EXPERIENCE
  tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.experience__tab');

    if (!clicked) return;

    tabs.forEach(t => t.classList.remove('experience__tab--active'));
    tabsContent.forEach(c => c.classList.remove('experience__content--active'));
    clicked.classList.add('experience__tab--active');
    document
      .querySelector(`.experience__content--${clicked.dataset.tab}`)
      .classList.add('experience__content--active');
  });

  // OPENING AND CLOSING MODELS IN THE CONTACT ME FORM
  const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

}

// GSAP ANIMATIONS FOR LANDING PAGE
gsap.registerPlugin(ScrollTrigger);
var t1 = gsap.timeline();

t1.from('.content', {
  y: '-30',
  opacity: 0,
  duration: 2,
  ease: Power4.easeOut
})

t1.from('.stagger', {
  opacity: 0,
  y: -50,
  stagger: .3,
  ease: Power4.easeOut,
  duration: 2
}, "-=1.5")

gsap.from(".transition2", {
  scrollTrigger: {
    trigger: '.transition2',
    start: "top bottom"
  },
  y: 100,
  opacity: 0,
  duation: 3,
  stagger: .4
})

gsap.from(".transition1", {
  scrollTrigger: {
    trigger: '.transition1',
    start: "top bottom"
  },
  y: 50,
  opacity: 0,
  duation: 1.5,
  stagger: .3
})