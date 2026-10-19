/* ===== BRÜDER — общие скрипты для всех страниц ===== */

/* Reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* Мобильное меню */
function toggleMenu(){document.querySelector('.nav-links').classList.toggle('open')}

/* Форма записи (демо) */
function bookSubmit(e){
  e.preventDefault();
  const m=document.getElementById('okMsg');
  if(m)m.style.display='block';
  e.target.reset();
}

/* ===== Чат-помощник (на правилах, работает офлайн) ===== */
const KB=[
  {k:['стрижк','постричь'],a:'Мужская стрижка — 1 500 ₽ (45 мин). Стрижка + моделирование бороды — 2 400 ₽ (70 мин). Детская — 1 100 ₽.'},
  {k:['бород','моделир'],a:'Моделирование бороды — 1 200 ₽. Форма, окантовка опасной бритвой, при желании камуфляж седины.'},
  {k:['брит','бритьё','опасн'],a:'Королевское бритьё опасной бритвой с горячим полотенцем и маслами — 1 800 ₽ (50 мин). Настоящий ритуал 🪒'},
  {k:['цен','стоим','прайс','сколько'],a:'Прайс:\n• Стрижка — 1 500 ₽\n• Стрижка + борода — 2 400 ₽\n• Королевское бритьё — 1 800 ₽\n• Борода — 1 200 ₽\n• Детская — 1 100 ₽'},
  {k:['час','график','работает','скольки','откры','выходн'],a:'Работаем ежедневно с 10:00 до 22:00. Приём строго по записи.'},
  {k:['адрес','где','доехать','находит','метро'],a:'Мы в центре: Москва, ул. Тверская, 18. В двух минутах от метро.'},
  {k:['мастер','барбер','кто'],a:'У нас три мастера: Игорь (топ-барбер, 12 лет), Станислав (классика и бритьё), Руслан (фейды). Записаться можно к конкретному или к любому свободному.'},
  {k:['запис','брон','время'],a:'Записаться можно на странице «Контакты» — форма «Забронируйте кресло», или по телефону +7 (900) 111-22-33.'},
  {k:['ребен','ребён','детск','сын'],a:'Детская стрижка для джентльменов до 10 лет — 1 100 ₽. Терпеливые мастера и мультики 😊'},
  {k:['привет','здрав','добр'],a:'Здравствуйте! 👋 Подскажу по услугам, ценам и записи в BRÜDER. Что интересует?'},
  {k:['спасиб','благодар'],a:'Всегда рады! Ждём вас в BRÜDER 💈'},
];
const CHIPS=['Цены','Стрижка + борода','Мастера','Часы работы','Записаться'];
function addMsg(t,who){
  const d=document.createElement('div');d.className='msg '+who;d.textContent=t;
  const b=document.getElementById('chatBody');b.appendChild(d);b.scrollTop=b.scrollHeight;
}
function answer(q){
  const s=q.toLowerCase();
  for(const it of KB){if(it.k.some(k=>s.includes(k)))return it.a;}
  return 'Подскажу по услугам, ценам, мастерам и записи. Или звоните: +7 (900) 111-22-33. Что интересует?';
}
function sendChat(){
  const i=document.getElementById('chatInput');const v=i.value.trim();if(!v)return;
  addMsg(v,'user');i.value='';setTimeout(()=>addMsg(answer(v),'bot'),350);
}
function chipClick(c){addMsg(c,'user');setTimeout(()=>addMsg(answer(c),'bot'),300);}
let chatInit=false;
function toggleChat(){
  const c=document.getElementById('chat');c.classList.toggle('open');
  if(!chatInit){
    chatInit=true;
    addMsg('Здравствуйте! 👋 Я администратор BRÜDER. Подскажу по услугам, ценам и записи. Что вас интересует?','bot');
    const ch=document.getElementById('chips');
    CHIPS.forEach(c=>{const b=document.createElement('button');b.className='chip';b.textContent=c;b.onclick=()=>chipClick(c);ch.appendChild(b);});
  }
}
