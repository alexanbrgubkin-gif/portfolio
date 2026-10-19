/* ===== ГаражПро — общие скрипты ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

function toggleMenu(){document.querySelector('.nav-links').classList.toggle('open')}
function bookSubmit(e){e.preventDefault();const m=document.getElementById('okMsg');if(m)m.style.display='block';e.target.reset();}

/* Чат-помощник (на правилах, офлайн) */
const KB=[
  {k:['масл','замена масла'],a:'Замена масла и масляного фильтра — от 1 500 ₽. Работа занимает ~40 минут. Можно со своим маслом.'},
  {k:['цен','стоим','прайс','сколько'],a:'Основные цены:\n• Замена масла — от 1 500 ₽\n• Диагностика — 1 200 ₽\n• Колодки — от 1 400 ₽\n• Развал-схождение — 2 500 ₽\n• ТО — от 3 500 ₽\nТочную цену назовём после диагностики.'},
  {k:['диагност','ошибк','чек','горит'],a:'Компьютерная диагностика по 30 пунктам — 1 200 ₽. А при дальнейшем ремонте у нас — бесплатно.'},
  {k:['час','график','работает','скольки','выходн','откры'],a:'Работаем Пн–Пт 9:00–20:00, Сб 10:00–18:00, Вс — выходной.'},
  {k:['адрес','где','доехать','находит','парков'],a:'Мы находимся: г. Москва, ул. Примерная, 10. Въезд со двора, есть парковка.'},
  {k:['гаранти'],a:'Гарантия на все работы — 2 года, на запчасти — по гарантии производителя.'},
  {k:['шин','колес','колёс','резин','переобу'],a:'Шиномонтаж — от 2 800 ₽ за комплект. Сезонное хранение шин — 3 000 ₽/сезон с мойкой.'},
  {k:['запис','время','приехать'],a:'Записаться можно на странице «Контакты» или по телефону +7 (900) 000-00-00. Подберём время в тот же день.'},
  {k:['ходов','подвеск','стук'],a:'Ремонт ходовой — от 2 000 ₽. Диагностику стука при ремонте делаем бесплатно.'},
  {k:['кондиц','фреон','холод'],a:'Заправка кондиционера — от 2 500 ₽, с проверкой на утечки.'},
  {k:['двигател','мотор','грм','капремонт'],a:'Ремонт двигателя — от 5 000 ₽, от замены ремня ГРМ до капремонта. Работаем с любыми марками.'},
  {k:['то','техобслуж','обслуж'],a:'ТО по регламенту — от 3 500 ₽. Заменим жидкости и расходники по пробегу вашего авто, напомним о следующем.'},
  {k:['привет','здрав','добр'],a:'Здравствуйте! 👋 Я помогу с ценами, услугами и записью в «ГаражПро». Что вас интересует?'},
  {k:['спасиб','благодар'],a:'Пожалуйста! Будем рады видеть вас в «ГаражПро» 🔧'},
];
const CHIPS=['Цены','Диагностика','Часы работы','Адрес','Записаться'];
function addMsg(t,who){const d=document.createElement('div');d.className='msg '+who;d.textContent=t;
  const b=document.getElementById('chatBody');b.appendChild(d);b.scrollTop=b.scrollHeight;}
function answer(q){const s=q.toLowerCase();for(const it of KB){if(it.k.some(k=>s.includes(k)))return it.a;}
  return 'Я подскажу по услугам, ценам, графику и записи. Также можно позвонить: +7 (900) 000-00-00. Что именно интересует?';}
function sendChat(){const i=document.getElementById('chatInput');const v=i.value.trim();if(!v)return;
  addMsg(v,'user');i.value='';setTimeout(()=>addMsg(answer(v),'bot'),350);}
function chipClick(c){addMsg(c,'user');setTimeout(()=>addMsg(answer(c),'bot'),300);}
let chatInit=false;
function toggleChat(){const c=document.getElementById('chat');c.classList.toggle('open');
  if(!chatInit){chatInit=true;addMsg('Здравствуйте! 👋 Я онлайн-помощник «ГаражПро». Подскажу по ценам, услугам и записи — что вас интересует?','bot');
    const ch=document.getElementById('chips');CHIPS.forEach(c=>{const b=document.createElement('button');b.className='chip';b.textContent=c;b.onclick=()=>chipClick(c);ch.appendChild(b);});}}
