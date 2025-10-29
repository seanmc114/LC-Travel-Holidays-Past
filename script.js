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

const PRESENT = {
  1: [
    { en: "I like healthy food.", es: "A mí me gusta la comida sana." },
    { en: "I don’t like junk food.", es: "A mí no me gusta la comida basura." },
    { en: "Do you like fruit?", es: "A ti te gusta la fruta?" },
    { en: "I like vegetables.", es: "A mí me gustan las verduras." },
    { en: "I like water.", es: "A mí me gusta el agua." },
    { en: "Do you like milk?", es: "A ti te gusta la leche?" },
    { en: "I don’t like sweets.", es: "A mí no me gustan los dulces." },
    { en: "Do you like fish?", es: "A ti te gusta el pescado?" },
    { en: "I like bread.", es: "A mí me gusta el pan." },
    { en: "I don’t like fizzy drinks.", es: "A mí no me gustan los refrescos." },
    { en: "Do you like salad?", es: "A ti te gusta la ensalada?" },
    { en: "I like chicken.", es: "A mí me gusta el pollo." },
    { en: "I don’t like coffee.", es: "A mí no me gusta el café." },
    { en: "Do you like tea?", es: "A ti te gusta el té?" },
    { en: "I like healthy snacks.", es: "A mí me gustan los tentempiés saludables." }
  ],
  2: [
    { en: "I like apples because they are healthy.", es: "A mí me gustan las manzanas porque son sanas." },
    { en: "I don’t like coffee because it is bitter.", es: "A mí no me gusta el café porque es amargo." },
    { en: "Do you like vegetables because they are healthy?", es: "A ti te gustan las verduras porque son sanas?" },
    { en: "I like chicken because it is good for my body.", es: "A mí me gusta el pollo porque es bueno para mi cuerpo." },
    { en: "I don’t like chocolate because it has a lot of sugar.", es: "A mí no me gusta el chocolate porque tiene mucho azúcar." },
    { en: "Do you like bananas because they give you energy?", es: "A ti te gustan los plátanos porque te dan energía?" },
    { en: "I like rice because it is simple.", es: "A mí me gusta el arroz porque es simple." },
    { en: "I don’t like fast food because it is unhealthy.", es: "A mí no me gusta la comida rápida porque es malsana." },
    { en: "Do you like yogurt because it is tasty?", es: "A ti te gusta el yogur porque es rico?" },
    { en: "I like eggs because they have protein.", es: "A mí me gustan los huevos porque tienen proteína." },
    { en: "I don’t like energy drinks because they are artificial.", es: "A mí no me gustan las bebidas energéticas porque son artificiales." },
    { en: "I like salads because they are fresh.", es: "A mí me gustan las ensaladas porque son frescas." },
    { en: "Do you like pasta because it is quick?", es: "A ti te gusta la pasta porque es rápida?" },
    { en: "I like water because it is healthy.", es: "A mí me gusta el agua porque es saludable." },
    { en: "I don’t like sausages because they are fatty.", es: "A mí no me gustan las salchichas porque son grasientas." }
  ],
  3: [
    { en: "I like to eat healthy food every day.", es: "A mí me gusta comer comida sana cada día." },
    { en: "I don’t like to skip breakfast.", es: "A mí no me gusta saltarme el desayuno." },
    { en: "Do you like to drink water at school?", es: "A ti te gusta beber agua en el colegio?" },
    { en: "I like to eat fruit in the morning.", es: "A mí me gusta comer fruta por la mañana." },
    { en: "I don’t like to eat late.", es: "A mí no me gusta comer tarde." },
    { en: "Do you like to cook at home?", es: "A ti te gusta cocinar en casa?" },
    { en: "I like to cook with my mother.", es: "A mí me gusta cocinar con mi madre." },
    { en: "I don’t like to eat alone.", es: "A mí no me gusta comer solo." },
    { en: "Do you like to eat in the canteen?", es: "A ti te gusta comer en el comedor?" },
    { en: "I like to eat pasta on Fridays.", es: "A mí me gusta comer pasta los viernes." },
    { en: "I don’t like to drink fizzy drinks at lunch.", es: "A mí no me gusta beber refrescos en la comida." },
    { en: "Do you like to try new foods?", es: "A ti te gusta probar comidas nuevas?" },
    { en: "I like to prepare my lunch.", es: "A mí me gusta preparar mi almuerzo." },
    { en: "I don’t like to waste food.", es: "A mí no me gusta desperdiciar comida." },
    { en: "Do you like to help in the kitchen?", es: "A ti te gusta ayudar en la cocina?" }
  ],
  4: [
    { en: "I like sport.", es: "A mí me gusta el deporte." },
    { en: "I don’t like running.", es: "A mí no me gusta correr." },
    { en: "Do you like cycling?", es: "A ti te gusta montar en bicicleta?" },
    { en: "I like basketball because it is fun.", es: "A mí me gusta el baloncesto porque es divertido." },
    { en: "I don’t like swimming because it is cold.", es: "A mí no me gusta nadar porque hace frío." },
    { en: "Do you like to exercise?", es: "A ti te gusta hacer ejercicio?" },
    { en: "I like to go walking with my family.", es: "A mí me gusta ir a caminar con mi familia." },
    { en: "I don’t like gyms.", es: "A mí no me gustan los gimnasios." },
    { en: "Do you like team sports?", es: "A ti te gustan los deportes de equipo?" },
    { en: "I like football because it is exciting.", es: "A mí me gusta el fútbol porque es emocionante." },
    { en: "I like yoga to relax.", es: "A mí me gusta el yoga para relajarme." },
    { en: "Do you like to dance as exercise?", es: "A ti te gusta bailar como ejercicio?" },
    { en: "I don’t like to train in the rain.", es: "A mí no me gusta entrenar bajo la lluvia." },
    { en: "Do you like PE at school?", es: "A ti te gusta la educación física en el colegio?" },
    { en: "I like walking to school when it is sunny.", es: "A mí me gusta caminar al colegio cuando hace sol." }
  ],
  5: [
    { en: "I like to take care of my health.", es: "A mí me gusta cuidar mi salud." },
    { en: "I don’t like stress.", es: "A mí no me gusta el estrés." },
    { en: "Do you like to relax after school?", es: "A ti te gusta relajarte después del colegio?" },
    { en: "I like to sleep eight hours.", es: "A mí me gusta dormir ocho horas." },
    { en: "I don’t like to go to bed late.", es: "A mí no me gusta acostarme tarde." },
    { en: "In my opinion, sport is important.", es: "En mi opinión, el deporte es importante." },
    { en: "I think healthy food is good for you.", es: "Creo que la comida sana es buena para ti." },
    { en: "Do you like to take breaks when you study?", es: "A ti te gusta hacer descansos cuando estudias?" },
    { en: "From my point of view, sleep is key.", es: "Desde mi punto de vista, el sueño es clave." },
    { en: "I like to drink water during the day.", es: "A mí me gusta beber agua durante el día." },
    { en: "Do you like healthy habits?", es: "A ti te gustan los hábitos saludables?" },
    { en: "It is important for me to feel good.", es: "Es importante para mí sentirme bien." },
    { en: "I don’t like feeling tired.", es: "A mí no me gusta sentirme cansado." },
    { en: "I think fast food is unhealthy.", es: "Creo que la comida rápida es malsana." },
    { en: "In my opinion, balance is the best.", es: "En mi opinión, el equilibrio es lo mejor." }
  ],
  6: [
    { en: "I like healthy food more than fast food.", es: "A mí me gusta la comida sana más que la comida rápida." },
    { en: "Do you like to exercise in the morning or in the evening?", es: "A ti te gusta hacer ejercicio por la mañana o por la tarde?" },
    { en: "I don’t like energy drinks because they are unhealthy.", es: "A mí no me gustan las bebidas energéticas porque son malsanas." },
    { en: "I like to play football with my friends after school.", es: "A mí me gusta jugar al fútbol con mis amigos después del colegio." },
    { en: "Do you like to go to the gym with friends?", es: "A ti te gusta ir al gimnasio con amigos?" },
    { en: "I don’t like skipping meals because it is bad for my health.", es: "A mí no me gusta saltarme comidas porque es malo para mi salud." },
    { en: "I like salads but I prefer pasta.", es: "A mí me gustan las ensaladas pero prefiero la pasta." },
    { en: "Do you like going for walks with your family?", es: "A ti te gusta salir a caminar con tu familia?" },
    { en: "I don’t like staying at home all weekend.", es: "A mí no me gusta quedarme en casa todo el fin de semana." },
    { en: "Do you like doing sports at school?", es: "A ti te gusta hacer deporte en el colegio?" },
    { en: "I think that fresh food is better than processed food.", es: "Creo que la comida fresca es mejor que la comida procesada." },
    { en: "In my opinion, rest is essential.", es: "En mi opinión, el descanso es esencial." },
    { en: "Do you like cooking simple healthy recipes?", es: "A ti te gusta cocinar recetas sanas y simples?" },
    { en: "I don’t like eating too much sugar.", es: "A mí no me gusta comer demasiado azúcar." },
    { en: "From my point of view, exercise reduces stress.", es: "Desde mi punto de vista, el ejercicio reduce el estrés." }
  ],
  7: [
    { en: "I like to have a balanced lifestyle.", es: "A mí me gusta tener un estilo de vida equilibrado." },
    { en: "I don’t like eating late at night.", es: "A mí no me gusta cenar tarde." },
    { en: "Do you like to cook healthy meals?", es: "A ti te gusta cocinar comidas sanas?" },
    { en: "I like swimming because it keeps me fit.", es: "A mí me gusta nadar porque me mantiene en forma." },
    { en: "I don’t like smoking because it is dangerous.", es: "A mí no me gusta fumar porque es peligroso." },
    { en: "Do you like drinking tea instead of coffee?", es: "A ti te gusta beber té en lugar de café?" },
    { en: "I like fruit, especially bananas.", es: "A mí me gusta la fruta, especialmente los plátanos." },
    { en: "I don’t like eating too much sugar.", es: "A mí no me gusta comer demasiado azúcar." },
    { en: "Do you like helping others stay healthy?", es: "A ti te gusta ayudar a otros a mantenerse sanos?" },
    { en: "I like walking to school when it is sunny.", es: "A mí me gusta caminar al colegio cuando hace sol." },
    { en: "In my opinion, mental health matters.", es: "En mi opinión, la salud mental importa." },
    { en: "I think that balance helps me study better.", es: "Creo que el equilibrio me ayuda a estudiar mejor." },
    { en: "Do you like to switch off your phone to relax?", es: "A ti te gusta apagar el móvil para relajarte?" },
    { en: "I don’t like feeling pressure every day.", es: "A mí no me gusta sentir presión cada día." },
    { en: "From my point of view, fresh air is good for me.", es: "Desde mi punto de vista, el aire fresco es bueno para mí." }
  ],
  8: [
    { en: "I like sport but I prefer football.", es: "A mí me gusta el deporte pero prefiero el fútbol." },
    { en: "I don’t like alcohol because it is unhealthy.", es: "A mí no me gusta el alcohol porque es malsano." },
    { en: "Do you like drinking water instead of fizzy drinks?", es: "A ti te gusta beber agua en lugar de refrescos?" },
    { en: "I like going to the gym to improve my strength.", es: "A mí me gusta ir al gimnasio para mejorar mi fuerza." },
    { en: "I don’t like eating fast food because it has too much fat.", es: "A mí no me gusta comer comida rápida porque tiene demasiada grasa." },
    { en: "Do you like exercising outdoors?", es: "A ti te gusta hacer ejercicio al aire libre?" },
    { en: "I like doing yoga to relax.", es: "A mí me gusta hacer yoga para relajarme." },
    { en: "I don’t like staying in bed all day.", es: "A mí no me gusta quedarme en la cama todo el día." },
    { en: "Do you like the idea of a healthy mind and body?", es: "A ti te gusta la idea de una mente y un cuerpo sanos?" },
    { en: "I like to avoid stress when possible.", es: "A mí me gusta evitar el estrés cuando es posible." },
    { en: "In my opinion, cooking at home is healthier.", es: "En mi opinión, cocinar en casa es más saludable." },
    { en: "I think that sleep helps my mental health.", es: "Creo que el sueño ayuda a mi salud mental." },
    { en: "Do you like helping your family cook healthy food?", es: "A ti te gusta ayudar a tu familia a cocinar comida sana?" },
    { en: "I don’t like screens before bed.", es: "A mí no me gustan las pantallas antes de acostarme." },
    { en: "From my point of view, fresh fruit is the best dessert.", es: "Desde mi punto de vista, la fruta fresca es el mejor postre." }
  ],
  9: [
    { en: "I like healthy food because it gives me energy and helps me study.", es: "A mí me gusta la comida sana porque me da energía y me ayuda a estudiar." },
    { en: "I don’t like fizzy drinks because they are full of sugar and artificial ingredients.", es: "A mí no me gustan los refrescos porque están llenos de azúcar e ingredientes artificiales." },
    { en: "Do you like doing sport because it helps you relax and stay fit?", es: "A ti te gusta hacer deporte porque te ayuda a relajarte y mantenerte en forma?" },
    { en: "I like walking because it is easy and free.", es: "A mí me gusta caminar porque es fácil y gratis." },
    { en: "I don’t like going to bed late because I feel tired the next day.", es: "A mí no me gusta acostarme tarde porque me siento cansado al día siguiente." },
    { en: "Do you like cooking healthy meals with your family?", es: "A ti te gusta cocinar comidas sanas con tu familia?" },
    { en: "I like eating vegetables because they are full of vitamins.", es: "A mí me gustan las verduras porque están llenas de vitaminas." },
    { en: "I don’t like skipping meals because it is bad for my health.", es: "A mí no me gusta saltarme comidas porque es malo para mi salud." },
    { en: "Do you like going to the gym after school?", es: "A ti te gusta ir al gimnasio después del colegio?" },
    { en: "I like avoiding stress by playing sport or listening to music.", es: "A mí me gusta evitar el estrés haciendo deporte o escuchando música." },
    { en: "In my opinion, fresh food tastes better than fast food.", es: "En mi opinión, la comida fresca sabe mejor que la comida rápida." },
    { en: "I think breathing exercises help me relax.", es: "Creo que los ejercicios de respiración me ayudan a relajarme." },
    { en: "Do you like keeping a routine to sleep well?", es: "A ti te gusta mantener una rutina para dormir bien?" },
    { en: "I don’t like spending all day on my phone.", es: "A mí no me gusta pasar todo el día con el móvil." },
    { en: "From my point of view, balance is more important than perfection.", es: "Desde mi punto de vista, el equilibrio es más importante que la perfección." }
  ],
  10: [
    { en: "I like to live a healthy life because it helps my body and my mind.", es: "A mí me gusta llevar una vida sana porque ayuda a mi cuerpo y a mi mente." },
    { en: "I don’t like fast food because it is unhealthy and expensive.", es: "A mí no me gusta la comida rápida porque es malsana y cara." },
    { en: "Do you like healthy food even though it can be expensive sometimes?", es: "A ti te gusta la comida sana aunque puede ser cara a veces?" },
    { en: "I like doing sport because it keeps me happy and active.", es: "A mí me gusta hacer deporte porque me mantiene feliz y activo." },
    { en: "I don’t like smoking because it is dangerous for health.", es: "A mí no me gusta fumar porque es peligroso para la salud." },
    { en: "Do you like cooking healthy meals to improve your diet?", es: "A ti te gusta cocinar comidas sanas para mejorar tu dieta?" },
    { en: "I like eating fruit every day because it gives me vitamins.", es: "A mí me gusta comer fruta cada día porque me da vitaminas." },
    { en: "I don’t like spending all day on my phone because it is unhealthy.", es: "A mí no me gusta pasar todo el día con el móvil porque es malsano." },
    { en: "Do you like going to the gym to improve your strength?", es: "A ti te gusta ir al gimnasio para mejorar tu fuerza?" },
    { en: "I like to relax and sleep well because it is important for mental health.", es: "A mí me gusta relajarme y dormir bien porque es importante para la salud mental." },
    { en: "In my opinion, small habits make a big difference.", es: "En mi opinión, los hábitos pequeños marcan una gran diferencia." },
    { en: "I think that a healthy routine is possible for everyone.", es: "Creo que una rutina saludable es posible para todos." },
    { en: "From my point of view, balance is the key to happiness.", es: "Desde mi punto de vista, el equilibrio es la clave de la felicidad." },
    { en: "Do you like helping your friends make healthy choices?", es: "A ti te gusta ayudar a tus amigos a tomar decisiones saludables?" },
    { en: "I don’t like wasting time at night because I prefer to rest.", es: "A mí no me gusta perder el tiempo por la noche porque prefiero descansar." }
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
