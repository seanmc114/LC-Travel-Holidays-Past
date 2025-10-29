// Turbo: Q+ Edition — Perfect Round Celebration (confetti + banner + shake)
// Keeps all previous functionality from your last version: global tokens (cap 7, commit-on-finish),
// unlock ramp 200→…→40, Try Again, TTS/voice, identical UI/brand.
//
// Drop-in replacement for script.js

(() => {
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ===================== CONFIG =====================
  const QUESTIONS_PER_ROUND = 10;
  const PENALTY_PER_WRONG   = 30;
  const BASE_THRESH = { 1:200, 2:180, 3:160, 4:140, 5:120, 6:100, 7:80, 8:60, 9:40 };

  // Global Spanish-read tokens (cap 7, commit-on-finish)
  const GLOBAL_CHEATS_MAX = 7;
  const GLOBAL_CHEATS_KEY = "tqplus:v3:globalCheats";

  // ===================== DATA (present-based for all tenses) =====================
  // GAME 5 — Technology & Social Media (Present Continuous + Connector: además)
// Direction: English -> Spanish
// Rules applied:
// - Only final ? is used in answers (no inverted ¿)
// - Accents required
// - Capitals NOT required (script will handle)
// - Pronouns not required EXCEPT "usted" must appear when marked (formal)
// - Connector: además
// ===================================
// GAME 8 DATASET
// Theme: Travel & Holidays (Past Tense)
// Style: Short + Student-Friendly + LC Ready
// NO QUESTIONS | FAST GAMEPLAY
// ===================================

const PRESENT = {
  1: [
    { en: "Last year I went to Spain.", es: "El año pasado fui a España." },
    { en: "I travelled by plane.", es: "Viajé en avión." },
    { en: "I stayed in a hotel.", es: "Me alojé en un hotel." },
    { en: "I swam in the sea.", es: "Nadé en el mar." },
    { en: "I sunbathed on the beach.", es: "Tomé el sol en la playa." },
    { en: "I visited a small town.", es: "Visité un pueblo pequeño." },
    { en: "I bought souvenirs.", es: "Compré recuerdos." },
    { en: "I listened to music on the plane.", es: "Escuché música en el avión." },
    { en: "I relaxed a lot.", es: "Me relajé mucho." },
    { en: "I stayed for a week.", es: "Me quedé una semana." },
    { en: "I walked a lot.", es: "Caminé mucho." },
    { en: "I swam every day.", es: "Nadé cada día." },
    { en: "I ate ice cream.", es: "Comí helado." },
    { en: "I visited the beach.", es: "Visité la playa." },
    { en: "I enjoyed the trip.", es: "Disfruté del viaje." }
  ],
  2: [
    { en: "Last summer I went to France.", es: "El verano pasado fui a Francia." },
    { en: "I travelled by boat.", es: "Viajé en barco." },
    { en: "I stayed in a campsite.", es: "Me alojé en un camping." },
    { en: "I visited a museum.", es: "Visité un museo." },
    { en: "I ate in good restaurants.", es: "Comí en buenos restaurantes." },
    { en: "I drank cold drinks.", es: "Bebí bebidas frías." },
    { en: "I swam in the hotel pool.", es: "Nadé en la piscina del hotel." },
    { en: "I bought gifts for my family.", es: "Compré regalos para mi familia." },
    { en: "I travelled with my parents.", es: "Viajé con mis padres." },
    { en: "I stayed near the beach.", es: "Me alojé cerca de la playa." },
    { en: "I walked in the city.", es: "Caminé por la ciudad." },
    { en: "I took photos.", es: "Saqué fotos." },
    { en: "I visited famous places.", es: "Visité lugares famosos." },
    { en: "I tried new food.", es: "Probé comida nueva." },
    { en: "I had a good holiday.", es: "Tuve buenas vacaciones." }
  ],
  3: [
    { en: "I went to Italy last year.", es: "Fui a Italia el año pasado." },
    { en: "I travelled with my friends.", es: "Viajé con mis amigos." },
    { en: "I stayed in an apartment.", es: "Me alojé en un apartamento." },
    { en: "I visited Rome.", es: "Visité Roma." },
    { en: "I saw famous monuments.", es: "Vi monumentos famosos." },
    { en: "I swam in the hotel pool.", es: "Nadé en la piscina del hotel." },
    { en: "I ate delicious pizza.", es: "Comí pizza deliciosa." },
    { en: "I drank fresh orange juice.", es: "Bebí zumo de naranja." },
    { en: "I walked in the city centre.", es: "Caminé por el centro de la ciudad." },
    { en: "I bought a T-shirt.", es: "Compré una camiseta." },
    { en: "I visited a big stadium.", es: "Visité un estadio grande." },
    { en: "I relaxed with my friends.", es: "Me relajé con mis amigos." },
    { en: "I stayed for two weeks.", es: "Me quedé dos semanas." },
    { en: "I took many photos.", es: "Saqué muchas fotos." },
    { en: "I enjoyed the holiday.", es: "Disfruté las vacaciones." }
  ],
  4: [
    { en: "Last summer I went to Portugal.", es: "El verano pasado fui a Portugal." },
    { en: "I travelled by car with my family.", es: "Viajé en coche con mi familia." },
    { en: "I stayed in a small house.", es: "Me alojé en una casa pequeña." },
    { en: "I visited beautiful beaches.", es: "Visité playas bonitas." },
    { en: "I swam in the sea every day.", es: "Nadé en el mar cada día." },
    { en: "I ate fish and rice.", es: "Comí pescado y arroz." },
    { en: "I drank cold lemonade.", es: "Bebí limonada fría." },
    { en: "I bought things in the market.", es: "Compré cosas en el mercado." },
    { en: "I walked along the coast.", es: "Caminé por la costa." },
    { en: "I visited small villages.", es: "Visité pueblos pequeños." },
    { en: "I saw beautiful views.", es: "Vi vistas preciosas." },
    { en: "I stayed near the sea.", es: "Me alojé cerca del mar." },
    { en: "I relaxed in the sun.", es: "Me relajé al sol." },
    { en: "I took photos of the sunset.", es: "Saqué fotos de la puesta del sol." },
    { en: "I had a great time.", es: "Lo pasé muy bien." }
  ],
  5: [
    { en: "Last year I went to Galway.", es: "El año pasado fui a Galway." },
    { en: "I travelled by train.", es: "Viajé en tren." },
    { en: "I stayed in a hostel.", es: "Me alojé en un albergue." },
    { en: "I visited the Spanish Arch.", es: "Visité el Arco Español." },
    { en: "I walked beside the river.", es: "Caminé al lado del río." },
    { en: "I ate fish and chips.", es: "Comí pescado con patatas." },
    { en: "I drank hot chocolate.", es: "Bebí chocolate caliente." },
    { en: "I bought a hoodie.", es: "Compré una sudadera." },
    { en: "I stayed for three days.", es: "Me quedé tres días." },
    { en: "I listened to music in a pub.", es: "Escuché música en un pub." },
    { en: "I visited my cousins.", es: "Visité a mis primos." },
    { en: "I relaxed in the evening.", es: "Me relajé por la tarde." },
    { en: "I walked in the city centre.", es: "Caminé por el centro de la ciudad." },
    { en: "I enjoyed the trip.", es: "Disfruté del viaje." },
    { en: "I returned home on Sunday.", es: "Volví a casa el domingo." }
  ],
  6: [
    { en: "Last summer I went to Barcelona.", es: "El verano pasado fui a Barcelona." },
    { en: "I visited the Sagrada Familia.", es: "Visité la Sagrada Familia." },
    { en: "I walked down Las Ramblas.", es: "Caminé por Las Ramblas." },
    { en: "I swam at the beach.", es: "Nadé en la playa." },
    { en: "I stayed in a big hotel.", es: "Me alojé en un hotel grande." },
    { en: "I took photos of the city.", es: "Saqué fotos de la ciudad." },
    { en: "I ate tapas in a restaurant.", es: "Comí tapas en un restaurante." },
    { en: "I drank orange juice.", es: "Bebí zumo de naranja." },
    { en: "The weather was good.", es: "Hizo buen tiempo." },
    { en: "The hotel was comfortable.", es: "El hotel fue cómodo." },
    { en: "The beach was beautiful.", es: "La playa fue bonita." },
    { en: "I enjoyed the food.", es: "Disfruté la comida." },
    { en: "I visited a football stadium.", es: "Visité un estadio de fútbol." },
    { en: "I relaxed every day.", es: "Me relajé cada día." },
    { en: "It was a great holiday.", es: "Fue unas vacaciones geniales." }
  ],
  7: [
    { en: "Last year I went to Tenerife with my family.", es: "El año pasado fui a Tenerife con mi familia." },
    { en: "We stayed in an apartment near the beach.", es: "Nos alojamos en un apartamento cerca de la playa." },
    { en: "We swam in the sea every morning.", es: "Nadamos en el mar cada mañana." },
    { en: "We visited a water park.", es: "Visitamos un parque acuático." },
    { en: "We took a boat trip.", es: "Hicimos un viaje en barco." },
    { en: "The weather was fantastic.", es: "Hizo un tiempo fantástico." },
    { en: "The people were friendly.", es: "La gente fue amable." },
    { en: "The food was delicious.", es: "La comida fue deliciosa." },
    { en: "I tried Spanish omelette.", es: "Probé tortilla española." },
    { en: "I bought souvenirs for my friends.", es: "Compré recuerdos para mis amigos." },
    { en: "I relaxed by the pool.", es: "Me relajé en la piscina." },
    { en: "I took lots of photos.", es: "Saqué muchas fotos." },
    { en: "I had a great time.", es: "Lo pasé muy bien." },
    { en: "I enjoyed the trip a lot.", es: "Disfruté mucho del viaje." },
    { en: "I want to go back next year.", es: "Quiero volver el año que viene." }
  ],
  8: [
    { en: "Last summer I went to Kerry.", es: "El verano pasado fui a Kerry." },
    { en: "I stayed in a holiday home.", es: "Me alojé en una casa de vacaciones." },
    { en: "I climbed a mountain.", es: "Subí una montaña." },
    { en: "I walked in the countryside.", es: "Caminé por el campo." },
    { en: "I visited a beautiful beach.", es: "Visité una playa hermosa." },
    { en: "I ate fresh fish.", es: "Comí pescado fresco." },
    { en: "I drank tea in a café.", es: "Bebí té en un café." },
    { en: "The views were amazing.", es: "Las vistas fueron increíbles." },
    { en: "The weather was bad some days.", es: "Hizo mal tiempo algunos días." },
    { en: "I played football with my friends.", es: "Jugué al fútbol con mis amigos." },
    { en: "I read books in the evening.", es: "Leí libros por la tarde." },
    { en: "I stayed for ten days.", es: "Me quedé diez días." },
    { en: "I enjoyed nature.", es: "Disfruté de la naturaleza." },
    { en: "I rested a lot.", es: "Descansé mucho." },
    { en: "It was a peaceful holiday.", es: "Fue unas vacaciones tranquilas." }
  ],
  9: [
    { en: "Two years ago I went to Paris with my class.", es: "Hace dos años fui a París con mi clase." },
    { en: "We visited the Eiffel Tower.", es: "Visitamos la Torre Eiffel." },
    { en: "We stayed in a hotel near the city centre.", es: "Nos alojamos en un hotel cerca del centro." },
    { en: "We travelled by plane.", es: "Viajamos en avión." },
    { en: "We walked around the city.", es: "Caminamos por la ciudad." },
    { en: "We took photos of famous monuments.", es: "Sacamos fotos de monumentos famosos." },
    { en: "The trip was interesting.", es: "El viaje fue interesante." },
    { en: "The food was tasty.", es: "La comida fue sabrosa." },
    { en: "I bought gifts for my family.", es: "Compré regalos para mi familia." },
    { en: "We visited museums.", es: "Visitamos museos." },
    { en: "I learned a lot about French culture.", es: "Aprendí mucho sobre la cultura francesa." },
    { en: "I spoke a little French.", es: "Hablé un poco de francés." },
    { en: "I enjoyed the experience.", es: "Disfruté la experiencia." },
    { en: "I had a great time with my friends.", es: "Lo pasé muy bien con mis amigos." },
    { en: "I will never forget the trip.", es: "Nunca olvidaré el viaje." }
  ],
  10: [
    { en: "Last year I went on holiday with my family and it was amazing.", es: "El año pasado fui de vacaciones con mi familia y fue increíble." },
    { en: "We visited a lot of beautiful places and we learned new things.", es: "Visitamos muchos lugares bonitos y aprendimos cosas nuevas." },
    { en: "The weather was fantastic and I swam every day.", es: "Hizo un tiempo fantástico y nadé cada día." },
    { en: "The food was delicious and I tried local dishes.", es: "La comida fue deliciosa y probé platos locales." },
    { en: "We stayed in a comfortable hotel near the beach.", es: "Nos alojamos en un hotel cómodo cerca de la playa." },
    { en: "I relaxed a lot and forgot all my problems.", es: "Me relajé mucho y olvidé todos mis problemas." },
    { en: "I bought souvenirs for my friends and my family.", es: "Compré recuerdos para mis amigos y mi familia." },
    { en: "I took many photos because everything was beautiful.", es: "Saqué muchas fotos porque todo era bonito." },
    { en: "I enjoyed the holiday because I spent time with my family.", es: "Disfruté las vacaciones porque pasé tiempo con mi familia." },
    { en: "It was one of the best experiences of my life.", es: "Fue una de las mejores experiencias de mi vida." },
    { en: "I learned new things and met new people.", es: "Aprendí cosas nuevas y conocí a gente nueva." },
    { en: "The trip was unforgettable and special.", es: "El viaje fue inolvidable y especial." },
    { en: "I had a great time and I want to return one day.", es: "Lo pasé muy bien y quiero volver algún día." },
    { en: "It was a fantastic trip and I will always remember it.", es: "Fue un viaje fantástico y siempre lo recordaré." },
    { en: "I love travelling because it opens the mind.", es: "Me encanta viajar porque abre la mente." }
  ]
};

// === DATASETS bootstrap (paste directly under the PRESENT dataset) ===
const deepCopy = obj => JSON.parse(JSON.stringify(obj));

// Make a global datasets object built from PRESENT
window.DATASETS = { Present: PRESENT, Past: deepCopy(PRESENT), Future: deepCopy(PRESENT) };

// Legacy alias for code that uses bare DATASETS (not namespaced)
// Using 'var' at top-level ensures a true global in non-module scripts
var DATASETS = window.DATASETS;

  // ===================== Global cheats =====================
  const clampCheats = n => Math.max(0, Math.min(GLOBAL_CHEATS_MAX, n|0));
  function getGlobalCheats(){
    const v = localStorage.getItem(GLOBAL_CHEATS_KEY);
    if (v == null) { localStorage.setItem(GLOBAL_CHEATS_KEY, String(GLOBAL_CHEATS_MAX)); return GLOBAL_CHEATS_MAX; }
    const n = parseInt(v,10);
    return Number.isFinite(n) ? clampCheats(n) : GLOBAL_CHEATS_MAX;
  }
  function setGlobalCheats(n){ localStorage.setItem(GLOBAL_CHEATS_KEY, String(clampCheats(n))); }

 // ===================== Compare =====================
// ===================== Compare =====================
const norm = s => (s || "").trim();
const endsWithQM = s => norm(s).endsWith("?");

// Accents REQUIRED; ñ ≡ n; CAPITALS IGNORED; ignore final "." or leading "¿"
function coreKeepAccents(s) {
  let t = norm(s);

  // Remove leading inverted question mark if used
  if (t.startsWith("¿")) t = t.slice(1);

  // Remove only final punctuation ? or .
  if (t.endsWith("?") || t.endsWith(".")) t = t.slice(0, -1);

  // Treat ñ as n
  t = t.replace(/ñ/gi, "n");

  // ✅ Ignore capital letters
  t = t.toLowerCase();

  // Remove extra spaces
  return t.replace(/\s+/g, " ");
}

// Require ? only if expected answer is a question
function cmpAnswer(user, expected) {
  const expIsQ = endsWithQM(expected);
  if (expIsQ && !endsWithQM(user)) return false;
  return coreKeepAccents(user) === coreKeepAccents(expected);
}


  // ===================== Best/unlocks (per tense) =====================
  const STORAGE_PREFIX = "tqplus:v3";
  const bestKey = (tense, lvl) => `${STORAGE_PREFIX}:best:${tense}:${lvl}`;
  function getBest(tense, lvl){ const v = localStorage.getItem(bestKey(tense,lvl)); const n = v==null?null:parseInt(v,10); return Number.isFinite(n)?n:null; }
  function saveBest(tense, lvl, score){ const prev = getBest(tense,lvl); if (prev==null || score<prev) localStorage.setItem(bestKey(tense,lvl), String(score)); }
  function isUnlocked(tense, lvl){ if (lvl===1) return true; const need = BASE_THRESH[lvl-1]; const prev = getBest(tense,lvl-1); return prev!=null && (need==null || prev<=need); }

  // ===================== Helpers =====================
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  function speak(text, lang="es-ES"){ try{ if(!("speechSynthesis" in window)) return; const u=new SpeechSynthesisUtterance(text); u.lang=lang; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }
  let rec=null, recActive=false;
  function ensureRecognizer(){ const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return null; if(!rec){ rec=new SR(); rec.lang="es-ES"; rec.interimResults=false; rec.maxAlternatives=1; } return rec; }
  function startDictationFor(input,onStatus){
    const r=ensureRecognizer(); if(!r){onStatus&&onStatus(false);return;}
    if(recActive){try{r.stop();}catch{} recActive=false; onStatus&&onStatus(false);}
    try{
      r.onresult=e=>{ const txt=(e.results[0]&&e.results[0][0]&&e.results[0][0].transcript)||""; const v=txt.trim(); input.value = v.endsWith("?")?v:(v+"?"); input.dispatchEvent(new Event("input",{bubbles:true})); };
      r.onend=()=>{recActive=false; onStatus&&onStatus(false);};
      recActive=true; onStatus&&onStatus(true); r.start();
    }catch{ onStatus&&onStatus(false); }
  }
  function miniBtn(text,title){ const b=document.createElement("button"); b.type="button"; b.textContent=text; b.title=title; b.setAttribute("aria-label",title);
    Object.assign(b.style,{fontSize:"0.85rem",lineHeight:"1",padding:"4px 8px",marginLeft:"6px",border:"1px solid #ddd",borderRadius:"8px",background:"#fff",cursor:"pointer",verticalAlign:"middle"}); return b; }

  // ===================== Celebration Styles & Helpers =====================
  function injectCelebrationCSS(){
    if (document.getElementById("tqplus-anim-style")) return;
    const css = `
    @keyframes tq-burst { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(100vh) rotate(720deg); opacity:0} }
    @keyframes tq-pop { 0%{transform:scale(0.6); opacity:0} 25%{transform:scale(1.05); opacity:1} 60%{transform:scale(1)} 100%{opacity:0} }
    @keyframes tq-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
    .tq-celebrate-overlay{ position:fixed; inset:0; z-index:9999; pointer-events:none; }
    .tq-confetti{ position:absolute; width:8px; height:14px; border-radius:2px; opacity:0.95; will-change:transform,opacity; animation:tq-burst 1600ms ease-out forwards; }
    .tq-perfect-banner{ position:fixed; left:50%; top:16%; transform:translateX(-50%); padding:10px 18px; border-radius:12px; font-weight:900; font-size:28px; letter-spacing:1px;
      color:#fff; background:linear-gradient(90deg,#ff2d55,#ff9f0a); box-shadow:0 10px 30px rgba(0,0,0,0.25); animation:tq-pop 1800ms ease-out forwards; text-shadow:0 1px 2px rgba(0,0,0,0.35); }
    .tq-shake{ animation:tq-shake 650ms ease-in-out; }
    `;
    const s=document.createElement("style"); s.id="tqplus-anim-style"; s.textContent=css; document.head.appendChild(s);
  }

  function showPerfectCelebration(){
    injectCelebrationCSS();
    // overlay
    const overlay = document.createElement("div");
    overlay.className = "tq-celebrate-overlay";
    document.body.appendChild(overlay);

    // make 120 confetti bits across width
    const COLORS = ["#ff2d55","#ff9f0a","#ffd60a","#34c759","#0a84ff","#bf5af2","#ff375f"];
    const W = window.innerWidth;
    for (let i=0; i<120; i++){
      const c = document.createElement("div");
      c.className = "tq-confetti";
      const size = 6 + Math.random()*8;
      c.style.width  = `${size}px`;
      c.style.height = `${size*1.4}px`;
      c.style.left   = `${Math.random()*W}px`;
      c.style.top    = `${-20 - Math.random()*120}px`;
      c.style.background = COLORS[i % COLORS.length];
      c.style.animationDelay = `${Math.random()*200}ms`;
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      overlay.appendChild(c);
    }

    // banner
    const banner = document.createElement("div");
    banner.className = "tq-perfect-banner";
    banner.textContent = "PERFECT!";
    document.body.appendChild(banner);

    // cleanup after 2.2s
    setTimeout(()=>{ overlay.remove(); banner.remove(); }, 2200);
  }

  // ===================== UI flow =====================
  let CURRENT_TENSE = "Present";
  let quiz = [], currentLevel = null, t0=0, timerId=null, submitted=false;

  // attempt-local token tracking (commit on finish)
  let cheatsUsedThisRound = 0;
  let globalSnapshotAtStart = 0;
  const attemptRemaining = () => Math.max(0, globalSnapshotAtStart - cheatsUsedThisRound);

  function updateESButtonsState(container){
    const left = attemptRemaining();
    const esBtns = Array.from(container.querySelectorAll('button[data-role="es-tts"]'));
    esBtns.forEach(btn=>{
      const active = left>0;
      btn.disabled = !active;
      btn.style.opacity = active ? "1" : "0.5";
      btn.style.cursor  = active ? "pointer" : "not-allowed";
      btn.title = active ? `Read Spanish target (uses 1; attempt left: ${left})` : "No Spanish reads left for this attempt";
    });
  }

  function startTimer(){
    t0 = Date.now();
    clearInterval(timerId);
    timerId = setInterval(()=>{ const t=Math.floor((Date.now()-t0)/1000); const el=$("#timer"); if(el) el.textContent=`Time: ${t}s`; },200);
  }
  function stopTimer(){ clearInterval(timerId); timerId=null; return Math.floor((Date.now()-t0)/1000); }

  function renderLevels(){
    const host = $("#level-list"); if(!host) return;
    host.innerHTML = "";
    const ds = DATASETS[CURRENT_TENSE] || {};
    const available = Object.keys(ds).map(n=>parseInt(n,10)).filter(Number.isFinite).sort((a,b)=>a-b);
    available.forEach(i=>{
      const unlocked = isUnlocked(CURRENT_TENSE,i);
      const best = getBest(CURRENT_TENSE,i);
      const btn = document.createElement("button");
      btn.className="level-btn"; btn.disabled=!unlocked;
      btn.textContent = unlocked?`Level ${i}`:`🔒 Level ${i}`;
      if (unlocked && best!=null){
        const span=document.createElement("span"); span.className="best"; span.textContent=` (Best Score: ${best}s)`; btn.appendChild(span);
      }
      if (unlocked) btn.onclick=()=>startLevel(i);
      host.appendChild(btn);
    });
    host.style.display="flex"; const gm=$("#game"); if(gm) gm.style.display="none";
  }

  function startLevel(level){
    currentLevel = level; submitted=false; cheatsUsedThisRound=0; globalSnapshotAtStart=getGlobalCheats();
    const lv=$("#level-list"); if(lv) lv.style.display="none";
    const res=$("#results"); if(res) res.innerHTML="";
    const gm=$("#game"); if(gm) gm.style.display="block";

    const pool=(DATASETS[CURRENT_TENSE]?.[level])||[];
    const sample=Math.min(QUESTIONS_PER_ROUND,pool.length);
    quiz = shuffle(pool).slice(0,sample).map(it=>({prompt:it.en, answer:it.es, user:""}));

    renderQuiz(); startTimer();
  }

  function renderQuiz(){
    const qwrap=$("#questions"); if(!qwrap) return; qwrap.innerHTML="";
    quiz.forEach((q,i)=>{
      const row=document.createElement("div"); row.className="q";

      const p=document.createElement("div"); p.className="prompt"; p.textContent=`${i+1}. ${q.prompt}`;
      const controls=document.createElement("span");
      Object.assign(controls.style,{display:"inline-block",marginLeft:"6px",verticalAlign:"middle"});

      const enBtn=miniBtn("🔈 EN","Read English prompt"); enBtn.onclick=()=>speak(q.prompt,"en-GB");
      const esBtn=miniBtn("🔊 ES","Read Spanish target (uses 1 this attempt)"); esBtn.setAttribute("data-role","es-tts");
      esBtn.onclick=()=>{ if (attemptRemaining()<=0){ updateESButtonsState(qwrap); return; } speak(q.answer,"es-ES"); cheatsUsedThisRound+=1; updateESButtonsState(qwrap); };
      const micBtn=miniBtn("🎤","Dictate into this answer"); micBtn.onclick=()=>{ startDictationFor(input,(on)=>{ micBtn.style.borderColor=on?"#f39c12":"#ddd"; micBtn.style.boxShadow=on?"0 0 0 2px rgba(243,156,18,0.25)":"none"; }); };

      controls.appendChild(enBtn); controls.appendChild(esBtn); controls.appendChild(micBtn); p.appendChild(controls);

      const input=document.createElement("input"); input.type="text"; input.placeholder="Type the Spanish here (must end with ?)";
      input.oninput=e=>{ quiz[i].user=e.target.value; };
      input.addEventListener("keydown",(e)=>{ if(e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey){ if(e.code==="KeyR"){e.preventDefault();enBtn.click();} else if(e.code==="KeyS"){e.preventDefault();esBtn.click();} else if(e.code==="KeyM"){e.preventDefault();micBtn.click();} }});

      row.appendChild(p); row.appendChild(input); qwrap.appendChild(row);
    });
    updateESButtonsState(qwrap);

    const submit=$("#submit"); if(submit){ submit.disabled=false; submit.textContent="Finish & Check"; submit.onclick=finishAndCheck; }
    const back=$("#back-button"); if(back){ back.style.display="inline-block"; back.onclick=backToLevels; }
  }

  function finishAndCheck(){
    if (submitted) return; submitted=true;

    const elapsed=stopTimer();
    const inputs=$$("#questions input"); inputs.forEach((inp,i)=>{ quiz[i].user=inp.value; });

    let correct=0, wrong=0;
    quiz.forEach((q,i)=>{ const ok=cmpAnswer(q.user,q.answer); if(ok) correct++; else wrong++; inputs[i].classList.remove("good","bad"); inputs[i].classList.add(ok?"good":"bad"); inputs[i].readOnly=true; inputs[i].disabled=true; });

    const penalties = wrong*PENALTY_PER_WRONG;
    const finalScore = elapsed + penalties;

    const submit=$("#submit"); if(submit){ submit.disabled=true; submit.textContent="Checked"; }

    // Unlock message
    let unlockMsg="";
    if (currentLevel<10){
      const need=BASE_THRESH[currentLevel];
      if (typeof need==="number"){
        if (finalScore<=need) unlockMsg=`🎉 Next level unlocked! (Needed ≤ ${need}s)`;
        else unlockMsg=`🔓 Need ${finalScore-need}s less to unlock Level ${currentLevel+1} (Target ≤ ${need}s).`;
      }
    } else unlockMsg="🏁 Final level — great work!";

    // ===== Commit global tokens now =====
    const before = getGlobalCheats();
    let after = clampCheats(globalSnapshotAtStart - cheatsUsedThisRound);
    const perfect = (correct===quiz.length);
    if (perfect && after<GLOBAL_CHEATS_MAX) after = clampCheats(after+1);
    setGlobalCheats(after);

    // Results UI
    const results=$("#results"); if(!results) return;
    const summary=document.createElement("div"); summary.className="result-summary";
    summary.innerHTML =
      `<div class="line" style="font-size:1.35rem; font-weight:800;">🏁 FINAL SCORE: ${finalScore}s</div>
       <div class="line">⏱️ Time: <strong>${elapsed}s</strong></div>
       <div class="line">➕ Penalties: <strong>${wrong} × ${PENALTY_PER_WRONG}s = ${penalties}s</strong></div>
       <div class="line">✅ Correct: <strong>${correct}/${quiz.length}</strong></div>
       <div class="line" style="margin-top:8px;"><strong>${unlockMsg}</strong></div>
       <div class="line" style="margin-top:8px;">🎧 Spanish reads used this round: <strong>${cheatsUsedThisRound}</strong> &nbsp;|&nbsp; Global after commit: <strong>${after}/${GLOBAL_CHEATS_MAX}</strong></div>`;

    // Celebrate on perfect
    if (perfect){
      showPerfectCelebration();
      // subtle shake on the summary box so it "feels" like a win
      summary.classList.add("tq-shake");
      const bonusNote = document.createElement("div");
      bonusNote.className = "line";
      bonusNote.style.marginTop = "6px";
      bonusNote.innerHTML = (after>before)
        ? `⭐ Perfect round! Spanish-read tokens: ${before} → ${after} (max ${GLOBAL_CHEATS_MAX}).`
        : `⭐ Perfect round! (Spanish-read tokens already at max ${GLOBAL_CHEATS_MAX}).`;
      summary.appendChild(bonusNote);
    }

    const ul=document.createElement("ul");
    quiz.forEach(q=>{
      const li=document.createElement("li"); const ok=cmpAnswer(q.user,q.answer);
      li.className=ok?"correct":"incorrect";
      li.innerHTML = `${q.prompt} — <strong>${q.answer}</strong>` + (ok?"":` &nbsp;❌&nbsp;(you: “${q.user||""}”)`);
      ul.appendChild(li);
    });

    const again=document.createElement("button");
    again.className="try-again"; again.textContent="Try Again"; again.onclick=()=>startLevel(currentLevel);

    results.innerHTML=""; results.appendChild(summary); results.appendChild(ul); results.appendChild(again);

    saveBest(CURRENT_TENSE,currentLevel,finalScore);
    summary.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function backToLevels(){ stopTimer(); const gm=$("#game"); if(gm) gm.style.display="none"; renderLevels(); }

  // ===================== Init =====================
  document.addEventListener("DOMContentLoaded", ()=>{
    // init global cheats
    setGlobalCheats(getGlobalCheats());

    // tense switching (present-based datasets across all)
    $$("#tense-buttons .tense-button").forEach(btn=>{
      btn.addEventListener("click", e=>{
        e.preventDefault();
        const t = btn.dataset.tense || btn.textContent.trim();
        if (!DATASETS[t]) return;
        $$("#tense-buttons .tense-button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        CURRENT_TENSE = t;
        backToLevels();
      });
    });

    // default active
    const presentBtn = $(`#tense-buttons .tense-button[data-tense="Present"]`) || $$("#tense-buttons .tense-button")[0];
    if (presentBtn) presentBtn.classList.add("active");

    renderLevels();
  });
})();
