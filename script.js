// CONFIG: Edit bagian ini untuk personalisasi cepat
const CONFIG = {
  gfName: "Sayangku",
  birthdayDate: "2025-12-31T00:00:00", // Format ISO (untuk countdown), atau kosongkan ""
  typingLines: [
    "Hari ini milikmu. Dan aku milikmu setiap hari. 💗",
    "Semoga semua mimpimu mendekat satu per satu. ✨",
    "Terima kasih sudah jadi rumah ter-nyaman untuk hatiku. 🏡"
  ],
  // Link musik favorit (pastikan CORS/https). Bisa YouTube audio direct tidak disarankan; pakai file mp3 sendiri jika bisa.
  musicSrc: "https://cdn.pixabay.com/download/audio/2022/10/11/audio_2b9f4b3e3d.mp3?filename=romantic-ambient-123422.mp3",
  gallery: [
    { src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop", caption: "Tawa yang pertama kali bikin aku jatuh cinta." },
    { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1600&auto=format&fit=crop", caption: "Langit senja yang kita suka." },
    { src: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=1600&auto=format&fit=crop", caption: "Momen random, tapi rasanya hangat." }
  ],
  timeline: [
    { date: "2023-06-10", title: "Pertama Kenal", detail: "Ngobrol kikuk, tapi hangat. Siapa sangka sejauh ini?" , icon: "💬" },
    { date: "2023-08-03", title: "Kencan Pertama", detail: "Kopi, tawa, dan deg-degan.", icon: "☕" },
    { date: "2024-02-14", title: "Kukatakan Suka", detail: "Dan kamu jawab, 'Aku juga' 🥹", icon: "💘" },
    { date: "2024-12-31", title: "Resolusi Bareng", detail: "Mari kita wujudkan mimpi-mimpi kecil itu.", icon: "🌟" },
  ],
  reasons: [
    { emoji: "😊", front: "Senyummu", back: "Sederhana tapi bikin tenang." },
    { emoji: "🫶", front: "Perhatianmu", back: "Kecil-kecil, tapi kerasa banget." },
    { emoji: "🎧", front: "Selera musik", back: "Playlist kamu = mood booster." },
    { emoji: "🧠", front: "Pintar", back: "Cara kamu mikir itu keren." },
    { emoji: "🍜", front: "Partner makan", back: "Makan bareng jadi lebih enak." },
    { emoji: "😂", front: "Humor", back: "Receh? Iya. Lucu? Banget." },
    { emoji: "🤝", front: "Support", back: "Selalu ada di situ." },
    { emoji: "🌧️", front: "Sabar", back: "Bahkan saat aku drama." },
    { emoji: "💬", front: "Cerita", back: "Topiknya gak ada habisnya." },
    { emoji: "💓", front: "Hati kamu", back: "Tempat pulang paling aman." },
  ],
  quiz: [
    {
      q: "Tanggal ulang tahunku kapan? 😉",
      opts: ["1 Januari", "14 Februari", "31 Desember", "24 Juni"],
      correct: 2
    },
    {
      q: "Minuman favoritku?",
      opts: ["Teh Manis", "Kopi Susu", "Matcha Latte", "Air Putih"],
      correct: 1
    },
    {
      q: "Kalau lagi bad mood, yang paling aku butuh?",
      opts: ["Cokelat", "Pelukan kamu", "Tidur", "Jalan-jalan"],
      correct: 1
    }
  ]
};

// UTIL
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

// THEME TOGGLE
(function themeInit() {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
})();

// TYPING EFFECT
function typeLines(lines, el, speed = 40, pause = 800) {
  if (!el) return;
  let i = 0, j = 0, deleting = false;
  function tick() {
    if (!deleting) {
      el.textContent = lines[i].slice(0, j++);
      if (j <= lines[i].length) return setTimeout(tick, speed);
      deleting = true; return setTimeout(tick, pause);
    } else {
      el.textContent = lines[i].slice(0, j--);
      if (j >= 0) return setTimeout(tick, speed * 0.6);
      deleting = false; i = (i + 1) % lines.length; return setTimeout(tick, 600);
    }
  }
  tick();
}

// CONFETTI
function Confetti(canvas) {
  const ctx = canvas.getContext("2d");
  let W, H, rafId, particles = [], running = false;
  const colors = ["#ff4d8d", "#ffb3cf", "#8b5cf6", "#ffd166", "#06d6a0", "#118ab2"];
  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  window.addEventListener("resize", resize); resize();

  function addBurst(x = W / 2, y = H / 3, count = 120) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        g: 0.12 + Math.random()*0.15,
        r: 4 + Math.random() * 6,
        c: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - .5) * 0.2,
        shape: Math.random() < 0.5 ? "rect" : "circle",
        life: 120 + Math.random()*60
      });
    }
    if (!running) loop();
  }

  function loop() {
    running = true;
    ctx.clearRect(0, 0, W, H);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.vy += p.g;
      p.x += p.vx; p.y += p.vy;
      p.rot += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      if (p.shape === "rect") ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
      else { ctx.beginPath(); ctx.arc(0,0,p.r,0,Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    if (particles.length > 0 && !prefersReduced) rafId = requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0,0,W,H); }
  }
  return { burst: addBurst };
}

// HEARTS ON CLICK
function spawnHeart(x, y) {
  const layer = $("#hearts-layer");
  const h = document.createElement("span");
  h.textContent = "💖";
  h.style.position = "absolute";
  h.style.left = x - 10 + "px";
  h.style.top = y - 10 + "px";
  h.style.fontSize = (16 + Math.random()*16) + "px";
  h.style.transition = "transform 1.2s ease, opacity 1.2s ease";
  h.style.willChange = "transform, opacity";
  layer.appendChild(h);
  requestAnimationFrame(() => {
    h.style.transform = `translate(${(Math.random()-0.5)*60}px, -120px) scale(1.6)`;
    h.style.opacity = "0";
  });
  setTimeout(() => h.remove(), 1400);
}

// CAROUSEL
function initCarousel(items) {
  const track = $("#carouselTrack");
  const dotsWrap = $("#carouselDots");
  if (!track) return;

  // Build slides
  track.innerHTML = "";
  items.forEach((it, idx) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const img = document.createElement("img");
    img.alt = it.caption || `Foto ${idx+1}`;
    img.decoding = "async";
    img.loading = "lazy";
    img.src = it.src;
    const cap = document.createElement("div");
    cap.className = "caption";
    cap.textContent = it.caption || "";
    slide.append(img, cap);
    track.appendChild(slide);
  });

  // State
  let index = 0; const max = items.length;
  function update() {
    const x = -index * (track.clientWidth + 12); // but we use flex gap; safer with transform by width of slide
    // compute by slide width
    const slideW = track.querySelector(".slide")?.clientWidth || track.clientWidth;
    track.style.transform = `translateX(${-index * (slideW + 12)}px)`;
    $$(".dot", dotsWrap).forEach((d, i) => d.setAttribute("aria-selected", i === index ? "true" : "false"));
  }

  // Dots
  dotsWrap.innerHTML = "";
  items.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-selected", i === 0 ? "true" : "false");
    d.addEventListener("click", () => { index = i; update(); });
    dotsWrap.appendChild(d);
  });

  $(".carousel-btn.prev").addEventListener("click", () => { index = (index - 1 + max) % max; update(); });
  $(".carousel-btn.next").addEventListener("click", () => { index = (index + 1) % max; update(); });

  // Swipe
  let startX = 0, dx = 0, swiping = false;
  track.addEventListener("pointerdown", e => { swiping = true; startX = e.clientX; track.setPointerCapture(e.pointerId); });
  track.addEventListener("pointermove", e => { if (!swiping) return; dx = e.clientX - startX; track.style.transform = `translateX(calc(${-index * 100}% + ${dx}px))`; });
  track.addEventListener("pointerup", e => {
    swiping = false; if (Math.abs(dx) > 40) { index = dx < 0 ? (index+1)%max : (index - 1 + max)%max; }
    dx = 0; update();
  });
  window.addEventListener("resize", update, { passive: true });
  update();
}

// TIMELINE
function initTimeline(items) {
  const list = $(".timeline");
  list.innerHTML = "";
  items.forEach(it => {
    const li = document.createElement("li");
    const dot = document.createElement("div"); dot.className = "dot"; dot.textContent = it.icon || "🌟";
    const content = document.createElement("div");
    const h3 = document.createElement("h3"); h3.textContent = it.title;
    const time = document.createElement("time");
    time.dateTime = it.date;
    try {
      time.textContent = new Date(it.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    } catch { time.textContent = it.date; }
    const p = document.createElement("p"); p.textContent = it.detail;
    content.append(h3, time, p);
    li.append(dot, content);
    list.appendChild(li);
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.2 });
  $$(".timeline li").forEach(li => obs.observe(li));
}

// REASONS
function initReasons(items) {
  const grid = $("#reasonsGrid");
  grid.innerHTML = "";
  items.forEach((it, idx) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Alasan ${idx+1}`);
    const front = document.createElement("div");
    front.className = "face front";
    front.innerHTML = `<div><div class="emoji">${it.emoji}</div><div>${it.front}</div></div>`;
    const back = document.createElement("div");
    back.className = "face back";
    back.innerHTML = `<div>${it.back}</div>`;
    card.append(front, back);
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    card.addEventListener("keypress", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.classList.toggle("flipped"); }});
    grid.appendChild(card);
  });
}

// QUIZ
function initQuiz(quiz) {
  const card = $("#quizCard");
  let idx = 0, score = 0;

  function render() {
    if (idx >= quiz.length) {
      card.innerHTML = `
        <div class="quiz-q">Skor kamu: ${score}/${quiz.length} 🥳</div>
        <p>Kamu memang yang paling ngerti aku! Hadiah: pelukan ekstra hari ini. 🤗</p>
        <div><button class="btn primary" id="replayQuiz">Ulangi</button></div>
      `;
      $("#replayQuiz").addEventListener("click", () => { idx = 0; score = 0; render(); });
      confetti.burst(innerWidth/2, innerHeight/3, 180);
      return;
    }
    const q = quiz[idx];
    card.innerHTML = `
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-opts">
        ${q.opts.map((o,i)=>`<button data-i="${i}" class="">${o}</button>`).join("")}
      </div>
      <div class="quiz-progress">Pertanyaan ${idx+1} dari ${quiz.length}</div>
    `;
    $$(".quiz-opts button", card).forEach(btn => {
      btn.addEventListener("click", () => {
        const i = +btn.dataset.i;
        const correct = i === q.correct;
        btn.classList.add(correct ? "correct" : "wrong");
        if (correct) score++;
        // lock
        $$(".quiz-opts button", card).forEach(b => b.disabled = true);
        setTimeout(() => { idx++; render(); }, 700);
      });
    });
  }
  render();
}

// WISH WALL
const WISH_KEY = "wish_notes_v1";
function loadWishes() { try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch { return []; } }
function saveWishes(arr) { localStorage.setItem(WISH_KEY, JSON.stringify(arr)); }
function randomRotation() { return (Math.random() * 10 - 5).toFixed(2) + "deg"; }
function renderWishes() {
  const board = $("#wishBoard");
  const arr = loadWishes();
  board.innerHTML = "";
  arr.forEach((t, idx) => {
    const note = document.createElement("div"); note.className = "sticky"; note.style.setProperty("--rot", randomRotation());
    note.textContent = t;
    const del = document.createElement("button"); del.className = "del"; del.title = "Hapus"; del.setAttribute("aria-label","Hapus");
    del.textContent = "✖";
    del.addEventListener("click", () => {
      const cur = loadWishes(); cur.splice(idx,1); saveWishes(cur); renderWishes();
    });
    note.appendChild(del);
    board.appendChild(note);
  });
}

// COUNTDOWN
function startCountdown(dateStr) {
  const el = $("#countdown");
  if (!dateStr) { el.textContent = ""; return; }
  function tick() {
    const diff = new Date(dateStr) - new Date();
    if (diff <= 0) { el.textContent = "Selamat ulang tahun! 🎂"; return; }
    const d = Math.floor(diff/86400000);
    const h = Math.floor(diff%86400000/3600000);
    const m = Math.floor(diff%3600000/60000);
    const s = Math.floor(diff%60000/1000);
    el.textContent = `Menuju hari spesial: ${d}h ${h}j ${m}m ${s}d`;
    requestAnimationFrame(() => setTimeout(tick, 500));
  }
  tick();
}

// AUDIO
function initAudio(src) {
  const audio = $("#bgm");
  const btn = $("#playPauseBtn");
  if (!src) {
    btn.disabled = true; btn.textContent = "🎵 (Tidak ada musik)"; return;
  }
  audio.src = src;
  let playing = false;

  async function toggle() {
    if (!playing) {
      try {
        await audio.play();
        playing = true;
        btn.textContent = "⏸️ Pause";
        btn.setAttribute("aria-pressed","true");
      } catch (e) {
        console.warn("Autoplay blocked", e);
      }
    } else {
      audio.pause(); playing = false;
      btn.textContent = "▶️ Musik";
      btn.setAttribute("aria-pressed","false");
    }
  }
  btn.addEventListener("click", toggle);

  // iOS/Safari unlock on first interaction
  const unlock = () => { audio.play().then(()=>{ audio.pause(); }).catch(()=>{}); window.removeEventListener("touchstart", unlock); window.removeEventListener("click", unlock); };
  window.addEventListener("touchstart", unlock, { once: true });
  window.addEventListener("click", unlock, { once: true });
}

// THEME
$("#themeToggle").addEventListener("click", () => {
  const html = document.documentElement;
  const cur = html.getAttribute("data-theme");
  const next = cur === "moon" ? "romantic" : "moon";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  $("#themeToggle").setAttribute("aria-pressed", next === "moon" ? "true" : "false");
});

// MAIN
const confetti = Confetti($("#confetti-canvas"));

document.addEventListener("DOMContentLoaded", () => {
  // Names
  $("#gfName").textContent = CONFIG.gfName;
  $("#nameInLetter").textContent = CONFIG.gfName;
  $("#nameInFooter").textContent = CONFIG.gfName;

  // Typing
  typeLines(CONFIG.typingLines, $("#typing"));

  // Countdown
  startCountdown(CONFIG.birthdayDate);

  // Audio
  initAudio(CONFIG.musicSrc);

  // Build sections
  initCarousel(CONFIG.gallery);
  initTimeline(CONFIG.timeline);
  initReasons(CONFIG.reasons);
  initQuiz(CONFIG.quiz);
  renderWishes();

  
  // Envelope
  const env = $(".envelope");
  const toggleEnv = () => {
    const isOpen = env.classList.toggle("open");
    env.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen && !prefersReduced) confetti.burst(innerWidth/2, innerHeight/2, 220);
  };
  env.addEventListener("click", toggleEnv);
  env.addEventListener("keypress", e => { if (e.key === "Enter") toggleEnv(); });

  // Celebrate button
  $("#celebrateBtn").addEventListener("click", () => confetti.burst(innerWidth/2, innerHeight/3, 200));

  // Hearts on click/tap
  document.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    spawnHeart(e.clientX, e.clientY);
  });

  // Wish form
  $("#wishForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = $("#wishInput").value.trim();
    if (!val) return;
    const arr = loadWishes(); arr.unshift(val); saveWishes(arr);
    $("#wishInput").value = "";
    renderWishes();
  });
  $("#clearWishes").addEventListener("click", () => {
    if (confirm("Hapus semua pesan?")) { saveWishes([]); renderWishes(); }
  });

  // Accessibility focus outline only on keyboard
  function handleFirstTab(e) {
    if (e.key === "Tab") {
      document.body.classList.add("user-is-tabbing");
      window.removeEventListener("keydown", handleFirstTab);
    }
  }
  window.addEventListener("keydown", handleFirstTab);
});