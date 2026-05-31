/* ── CUSTOM CURSOR ── */
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
gsap.ticker.add(() => {
  gsap.set(cur, { x: mx, y: my });
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  gsap.set(ring, { x: rx, y: ry });
});

/* ── SPARKS ── */
const sparksEl = document.getElementById("sparks");
for (let i = 0; i < 30; i++) {
  const s = document.createElement("div");
  s.className = "spark";
  const dx = (Math.random() - 0.5) * 200;
  s.style.setProperty("--dx", dx + "px");
  s.style.left = 20 + Math.random() * 60 + "%";
  s.style.bottom = "-10px";
  s.style.animationDelay = Math.random() * 8 + "s";
  s.style.animationDuration = 4 + Math.random() * 8 + "s";
  sparksEl.appendChild(s);
}

/* ── BG CANVAS: animated orbs + grain ── */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const orbs = Array.from({ length: 5 }, (_, i) => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: 120 + Math.random() * 200,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  hue: i < 2 ? [192, 57, 43] : [232, 184, 75],
}));

function drawBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0d0905";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  orbs.forEach((o) => {
    o.x += o.vx;
    o.y += o.vy;
    if (o.x < -o.r || o.x > canvas.width + o.r) o.vx *= -1;
    if (o.y < -o.r || o.y > canvas.height + o.r) o.vy *= -1;
    const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
    g.addColorStop(0, `rgba(${o.hue.join(",")},0.12)`);
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fill();
  });

  const imgData = ctx.createImageData(canvas.width, canvas.height);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const v = Math.random() * 18;
    imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v;
    imgData.data[i + 3] = 28;
  }
  ctx.putImageData(imgData, 0, 0);
  requestAnimationFrame(drawBg);
}
drawBg();

/* ── LOADER ── */
gsap
  .timeline()
  .from("#loader-kebab", {
    scale: 0,
    rotation: -360,
    duration: 0.8,
    ease: "back.out(1.7)",
  })
  .to(
    "#loader-bar",
    { width: "100%", duration: 1.6, ease: "power2.inOut" },
    0.3,
  )
  .from("#loader-label", { opacity: 0, y: 10, duration: 0.4 }, 0.4)
  .to(
    "#loader-kebab",
    { rotation: 15, duration: 0.08, yoyo: true, repeat: 7, ease: "none" },
    1.6,
  )
  .to(
    "#loader",
    {
      yPercent: -100,
      opacity: 0,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () =>
        (document.getElementById("loader").style.display = "none"),
    },
    2.2,
  );

/* ── HERO REVEAL ── */
gsap.set("#logo-placeholder", { scale: 0 });
// ensure the actual `<img>` is hidden until the reveal animation and use clip-path for "type" reveal
gsap.set("#logo-placeholder img", {
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
});

gsap
  .timeline({ delay: 2.3 })
  .to("#hero", { opacity: 1, duration: 0.01 })
  .from(
    ".corner",
    { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" },
    0,
  )
  .from(
    "#ring-svg",
    {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.6)",
    },
    0.1,
  )

  /* Letters drop in one by one */
  .to(
    ".ltr",
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.45,
      stagger: 0.09,
      ease: "back.out(2)",
      onStart() {
        gsap.set(".ltr", { y: -40, scale: 0.4, rotationX: -90 });
      },
    },
    0.7,
  )

  /* Letters scatter out */
  .to(
    "#row1 .ltr",
    {
      x: (i) => (i - 2) * 60,
      y: -50,
      opacity: 0,
      scale: 0.5,
      duration: 0.55,
      stagger: 0.06,
      ease: "power3.in",
    },
    2.2,
  )
  .to(
    "#row2 .ltr",
    {
      x: (i) => (i - 2) * 60,
      y: 50,
      opacity: 0,
      scale: 0.5,
      duration: 0.55,
      stagger: 0.06,
      ease: "power3.in",
    },
    2.2,
  )

  /* Logo bursts in */
  .to(
    "#logo-placeholder",
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1.2, 0.5)",
    },
    2.75,
  )
  // delayed "type" fade-in: clip-path animates left→right while opacity increases
  .to(
    "#logo-placeholder img",
    {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    },
    3.05,
  )

  /* Tagline + UI */
  .from(
    "#tagline h1",
    { y: 80, opacity: 0, duration: 0.8, ease: "power4.out", skewY: 4 },
    2.9,
  )
  .from(
    "#tagline p",
    { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
    3.4,
  )
  .from("#label-left, #label-right", { opacity: 0, duration: 0.8 }, 3.0)
  .from(
    "#address",
    { x: 20, opacity: 0, duration: 0.6, ease: "power2.out" },
    3.1,
  )
  .from("#nav-dots", { x: 20, opacity: 0, duration: 0.5 }, 3.0)
  .from("#scroll-hint", { y: 20, opacity: 0, duration: 0.5 }, 3.3);

/* ── LOGO RING INTERACTIONS ── */
const logoRing = document.getElementById("logo-ring");
const ringSvg = document.getElementById("ring-svg");

logoRing.addEventListener("mouseenter", () => {
  ringSvg.classList.add("hovered");
  gsap.to(cur, { scale: 2.5, duration: 0.3 });
  gsap.to(ring, { scale: 1.5, opacity: 0.8, duration: 0.3 });
});
logoRing.addEventListener("mouseleave", () => {
  ringSvg.classList.remove("hovered");
  gsap.to(cur, { scale: 1, duration: 0.3 });
  gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3 });
});

logoRing.addEventListener("click", (e) => {
  /* Flame burst */
  const burst = document.createElement("div");
  burst.className = "flame-burst";
  burst.style.left = e.clientX + "px";
  burst.style.top = e.clientY + "px";
  document.body.appendChild(burst);
  gsap.to(burst, {
    width: 400,
    height: 400,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    onComplete: () => burst.remove(),
  });

  /* Ring bounce */
  gsap
    .timeline()
    .to("#logo-ring", { scale: 0.88, duration: 0.1, ease: "power2.in" })
    .to("#logo-ring", {
      scale: 1.12,
      duration: 0.3,
      ease: "elastic.out(2, 0.4)",
    })
    .to("#logo-ring", { scale: 1, duration: 0.2 });

  /* Logo pulse */
  gsap
    .timeline()
    .to("#logo-placeholder", { scale: 0.88, duration: 0.1, ease: "power2.in" })
    .to("#logo-placeholder", {
      scale: 1.08,
      duration: 0.3,
      ease: "elastic.out(2, 0.4)",
    })
    .to("#logo-placeholder", { scale: 1, duration: 0.2 });

  /* Extra sparks */
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.setProperty("--dx", (Math.random() - 0.5) * 300 + "px");
    s.style.left = 40 + Math.random() * 20 + "%";
    s.style.bottom = "40%";
    s.style.animationDuration = 1.5 + Math.random() * 1.5 + "s";
    s.style.animationDelay = "0s";
    sparksEl.appendChild(s);
    setTimeout(() => s.remove(), 3000);
  }
});

/* ── MOUSE PARALLAX ── */
document.addEventListener("mousemove", (e) => {
  const cx = (e.clientX / window.innerWidth - 0.5) * 2;
  const cy = (e.clientY / window.innerHeight - 0.5) * 2;
  gsap.to("#logo-wrap", {
    x: cx * 14,
    y: cy * 10,
    duration: 1.4,
    ease: "power2.out",
  });
  gsap.to("#tagline", {
    x: cx * 8,
    y: cy * 5,
    duration: 1.6,
    ease: "power2.out",
  });
  gsap.to(".corner.tl", { x: cx * -5, y: cy * -5, duration: 1.2 });
  gsap.to(".corner.tr", { x: cx * 5, y: cy * -5, duration: 1.2 });
  gsap.to(".corner.bl", { x: cx * -5, y: cy * 5, duration: 1.2 });
  gsap.to(".corner.br", { x: cx * 5, y: cy * 5, duration: 1.2 });
});

/* ── RING BREATHE ── */
gsap.to("#ring-svg circle:nth-child(3)", {
  opacity: 0.6,
  duration: 2,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
});
