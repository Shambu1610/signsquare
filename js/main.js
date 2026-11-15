// Featured projects (photos in assets/work). Full portfolio lives in Google Drive.
const WORK = [
  { n: "46", t: "Badr Al Samaa Medical Centre: illuminated façade", c: "Outdoor" },
  { n: "35", t: "Enterprise: backlit logo wall", c: "Indoor" },
  { n: "21", t: "Burjeel ambulance: full vehicle wrap", c: "Vehicle" },
  { n: "04", t: "Restaurant pole sign: acrylic LED", c: "Outdoor" },
  { n: "02", t: "Rakaz: reception branding", c: "Indoor" },
  { n: "23", t: "EO Presidents' Meeting: stage backdrop", c: "Expo & Events" },
  { n: "36", t: "Lift door wraps: illustrated vinyl", c: "Interior" },
  { n: "44", t: "Next Five Ventures: brushed metal logo", c: "Craft" },
  { n: "30", t: "Restaurant & Coffee Shop: LED channel letters", c: "Outdoor" },
  { n: "10", t: "Majan University College: exhibition stand", c: "Expo & Events" },
  { n: "42", t: "Glass frosting: entrance doors", c: "Interior" },
  { n: "15", t: "Shell V-Power: custom 3D trophy", c: "Craft" },
];

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
}, { rootMargin: "0px 0px -40px 0px" });

const gallery = document.getElementById("gallery");
gallery.innerHTML = WORK.map((w, i) => `
  <figure class="tile" tabindex="0" data-i="${i}">
    <img src="assets/work/w${w.n}.jpg" alt="${w.t}" loading="lazy">
    <figcaption><small>${w.c}</small>${w.t}</figcaption>
  </figure>`).join("");
gallery.querySelectorAll(".tile").forEach((t) => io.observe(t));

// Lightbox
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let cur = 0;
function show(i) {
  cur = (i + WORK.length) % WORK.length;
  const w = WORK[cur];
  lbImg.src = `assets/work/w${w.n}.jpg`;
  lbImg.alt = w.t;
  lbCap.textContent = `${w.c} · ${w.t}`;
}
function openLb(i) { show(i); lb.hidden = false; document.body.style.overflow = "hidden"; }
function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
gallery.addEventListener("click", (e) => { const t = e.target.closest(".tile"); if (t) openLb(+t.dataset.i); });
gallery.addEventListener("keydown", (e) => { const t = e.target.closest(".tile"); if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openLb(+t.dataset.i); } });
lb.querySelector(".lightbox__close").onclick = closeLb;
lb.querySelector(".lightbox__prev").onclick = () => show(cur - 1);
lb.querySelector(".lightbox__next").onclick = () => show(cur + 1);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowRight") show(cur + 1);
  if (e.key === "ArrowLeft") show(cur - 1);
});

// Nav
const nav = document.querySelector(".nav");
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 10), { passive: true });
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => { if (e.target.tagName === "A") { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", false); } });

// Reveal on scroll
document.querySelectorAll(".section__head, .about__grid, .service, .process li, .faq__list, .contact > *").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});

// Quote form: opens WhatsApp with the enquiry prefilled (no backend needed)
const WHATSAPP = "96800000000"; // TODO: replace with real number
document.getElementById("quoteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const msg = `Hello Sign Square,\n\nName: ${d.get("name")}\nContact: ${d.get("contact")}\nService: ${d.get("service")}\n\n${d.get("message") || ""}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  document.getElementById("formNote").textContent = "Opening WhatsApp with your enquiry…";
});

document.getElementById("year").textContent = new Date().getFullYear();
