// WhatsApp de atención. Cámbialo aquí si el número ya no es el correcto.
const WHATSAPP="529601011637";
const R="Ramos florales",B="Bouquets",G="Regalos y detalles";
const P=(nombre,categoria,descripcion,precio,imagen)=>({nombre,categoria,descripcion,precio,imagen:"imagenes/"+imagen});
// Precios y fotos: edítalos aquí. precio:null muestra "Consultar precio".
const productos=[
P("Atardecer Rosado",R,"6 rosas rosadas + 3 gerberas naranjas con centro amarillo, abundante statice morado y nube.",500,"atardecer-rosado.jpg"),
P("Ramo Sutileza y Pureza",R,"5 rosas en tonos blanco y rosa suave, acompañadas de abundante follaje sólido de tono verde fresco.",350,"sutileza-y-pureza.png"),
P("Ramo Luz de Noche",R,"2 girasoles + gypsophila + solidago.",410,"ramo-luz-de-noche.png"),
P("Ramo Amor en Lila",R,"12 crisantemos pompom + gypsophila.",500,"amor-en-lila.png"),
P("Ramo Un Sol Para Ti",R,"1 girasol + nubes + envoltura del color de tu preferencia.",380,"un-sol-para-ti.png"),
P("Ramo Eres Mi Sol",R,"2 girasoles + claveles rosados + nubes + follaje verde.",450,"eres-mi-sol.jpg"),
P("Ramo Amor Dulce",R,"Una rosa roja + 6 Ferrero + nubes.",400,"amor-dulce.png"),
P("Ramo Cinco Razones Para Amarte",R,"5 rosas rojas + nubes.",360,"cinco-razones-para-amarte.png"),
P("Ramo Atardecer de Amor",R,"1 girasol + 2 rosas rojas + nubes + chocolates Ferrero Rocher.",500,"atardecer-de-amor.png"),
P("Ramo Te Quiero Soleado",R,"6 girasoles + 6 rosas + solidago.",900,"te-quiero-soleado.png"),
P("Ramo Dulce Amanecer",R,"6 rosas rosadas + crisantemos + follaje verde (solidago).",480,"dulce-amanecer.jpg"),
P("Ramo Dulce Ternura",R,"1 girasol grande + 4 rosas fucsias + astromelias + follaje verde (solidago).",500,"dulce-ternura.jpg"),
P("Ramo Amanecer Naranja",R,"1 gerbera naranja + 3 rosas blancas + gypsophila + solidago + statice morado.",410,"amanecer-naranja.png"),
P("Ramo Tres Suspiros",R,"3 rosas blancas + nubes.",360,"tres-suspiros.png"),
P("Ramo Coqueta",R,"1 gerbera + gypsophila + solidago.",350,"coqueta.png"),
P("Ramo Princesa",R,"5 rosas rosadas + gypsophila.",440,"princesa.JPG"),
P("Bouquet Pasión Eterna",B,"20 rosas rojas naturales premium + nube natural (gypsophila) + envoltura con bordes blancos + moño de listón + tarjeta personalizada.",800,"bouquet-pasion-eterna.PNG"),
P("Bouquet Pureza",B,"7 rosas blancas naturales + nube natural (gypsophila) + follaje verde + envoltura color crema + listón de satén + tarjeta personalizada.",500,"bouquet-pureza.png"),
P("Bouquet Dulce Mix",B,"Mix de chocolates (Kinder Bueno, Twix, Kit Kat, Snickers, etc.) + envoltura premium + listón decorativo + tarjeta personalizada con texto a tu elección.",800,"bouquet-dulce-mix.png"),
P("Bouquet Dulce Encanto",B,"Rosas naturales + nubes + eucalipto + mix de chocolates Kinder + envoltura premium + listón de satén + tarjeta personalizada.",1200,"bouquet-dulce-encanto.png"),
P("Huacal de Amor",G,"Cajita de madera + 8 rosas rojas naturales + nubes + letrero personalizado a tu elección + globo de corazón.",650,"huacal-de-amor.png"),
P("Bouquet de Globos Personalizado con Helio",G,"2 globos estrella + globo burbuja con globo dorado por dentro y letras personalizadas + globo plateado + globo dorado + 8 globos rojos.",1600,"bouquet-globos-helio.png"),
P("Bouquet Dulce Sorpresa",B,"Bouquet de dulces. Personaliza tu detalle y consulta disponibilidad.",null,"bouquet-dulce-sorpresa.PNG"),
P("Bouquet Esencia",B,"Un detalle floral especial. Consulta opciones y disponibilidad.",null,"bouquet-esencia.PNG"),
P("Globo Personalizable",G,"Globo personalizado con el mensaje de tu elección. Consulta medidas y disponibilidad.",null,"Globo-personalizable.PNG"),
P("Ramo de 30 Gerberas",R,"Arreglo de 30 gerberas. Consulta colores, precio y disponibilidad.",null,"treinta-gerberas.jpg")
];

// Si una foto no carga, prueba otras extensiones (png, jpg, jpeg, mayúsculas) antes de ocultarla.
function fb(i){const E=["png","jpg","jpeg","PNG","JPG","JPEG","webp"],n=+(i.dataset.n||0);if(n>=E.length){i.style.visibility="hidden";return}i.dataset.n=n+1;i.src=i.src.replace(/\.[A-Za-z]+(\?.*)?$/,"."+E[n])}
const $=s=>document.querySelector(s)||{};const has=s=>!!document.querySelector(s);const on=(s,ev,f)=>{const e=document.querySelector(s);if(e)e.addEventListener(ev,f)};
const wa=m=>"https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(m);
const mxn=n=>n.toLocaleString("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0});
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
let cat="Todos",vista=[],li=0,cart={};
try{cart=JSON.parse(localStorage.getItem("kiora-pedido")||"{}")}catch(e){}
const guardar=()=>{try{localStorage.setItem("kiora-pedido",JSON.stringify(cart))}catch(e){}};
const byName=n=>productos.find(p=>p.nombre===n);
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),1800)}

function filtros(){
  const cs=["Todos",...new Set(productos.map(p=>p.categoria))];
  $("#filters").innerHTML=cs.map(c=>`<button type="button" class="filter${c===cat?" on":""}" data-c="${c}">${c}</button>`).join("");
}
const CK={"Ramos florales":"k1","Bouquets":"k2","Regalos y detalles":"k3"};
const card=(p,i)=>`
  <article class="product">
    <button type="button" class="pimg" data-z="${i}" aria-label="Ampliar foto de ${p.nombre}">
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="fb(this)">
      ${p.precio==null?"<i>A cotizar</i>":""}
    </button>
    <div class="pinfo">
      <span class="cat ${CK[p.categoria]||""}">${p.categoria}</span><h3>${p.nombre}</h3>
      <p class="pdesc">${p.descripcion}</p>
      <span class="price">${p.precio==null?"Consultar precio":mxn(p.precio)}</span>
      <div class="row">
        <button type="button" class="btn" data-add="${p.nombre}">Agregar al pedido</button>
        <a class="btn line" target="_blank" rel="noopener" aria-label="Preguntar por ${p.nombre}" href="${wa("Hola, Kiora. Me interesa: "+p.nombre+". ¿Me compartes precio y disponibilidad?")}">Preguntar</a>
      </div>
    </div>
  </article>`;
function catalogo(){
  const q=norm($("#q").value.trim()),o=$("#sort").value;
  vista=productos.filter(p=>(cat==="Todos"||p.categoria===cat)&&(!q||norm(p.nombre+" "+p.descripcion).includes(q)));
  if(o)vista.sort((a,b)=>((a.precio??1e9)-(b.precio??1e9))*(o==="asc"?1:-1));
  $("#count").textContent=vista.length+(vista.length===1?" detalle":" detalles");
  $("#products").innerHTML=vista.length?vista.map(card).join(""):`<p class="empty">No encontramos ese detalle. Prueba con otra palabra o <a href="personalizados.html" style="color:var(--rose);text-decoration:underline">cuéntanos tu idea</a>.</p>`;
}
function destacados(){
  vista=["Ramo Te Quiero Soleado","Bouquet Pasión Eterna","Ramo Princesa","Huacal de Amor","Bouquet Dulce Encanto","Ramo Dulce Amanecer"].map(byName).filter(Boolean);
  $("#destacados").innerHTML=vista.map(card).join("");
}

function pedido(){
  const ks=Object.keys(cart).filter(k=>byName(k)&&cart[k]>0);
  let total=0,nq=0,n=0;
  $("#items").innerHTML=ks.length?ks.map(k=>{const p=byName(k),c=cart[k];n+=c;if(p.precio==null)nq++;else total+=p.precio*c;
    return `<li><img src="${p.imagen}" alt="" onerror="fb(this)"><div class="n">${p.nombre}<small>${p.precio==null?"A cotizar":mxn(p.precio*c)}</small></div>
    <div class="qty"><button type="button" data-m="${k}" aria-label="Quitar uno">−</button><span>${c}</span><button type="button" data-p="${k}" aria-label="Agregar uno">+</button></div></li>`}).join(""):`<li class="note" style="display:block;padding:30px 0;text-align:center">Aún no agregas nada. Elige algo del catálogo ♡</li>`;
  const dom=$("#cEntrega").value==="Entrega a domicilio",z=D[$("#cZona").value]||D[0];
  $("#zonaWrap").style.display=dom?"block":"none";
  const urg=$("#cUrg").checked,fee=dom&&ks.length&&z.c!=null?z.c+(urg?URGENTE:0):0;total+=fee;const ev=fee?"Incluye envío de "+mxn(fee)+". ":dom&&ks.length&&z.c==null?"Envío por confirmar (desde "+mxn(ENVIO_BASE)+"). ":"";
  $("#cnt").textContent=n;$("#total").textContent=mxn(total);
  $("#totNote").textContent=ev+(nq?nq+(nq>1?" artículos":" artículo")+" por cotizar no está incluido. El precio final se confirma por WhatsApp.":"El precio final se confirma por WhatsApp.");
  const s=$("#sendCart");s.style.opacity=ks.length?1:.5;s.style.pointerEvents=ks.length?"auto":"none";
  const nombre=$("#cNombre").value.trim(),fecha=$("#cFecha").value;
  const lineas=ks.map(k=>{const p=byName(k);return "• "+cart[k]+" × "+p.nombre+(p.precio==null?" (por cotizar)":" — "+mxn(p.precio*cart[k]))}).join("\n");
  s.href=wa("¡Hola, Kiora Flores y Detalles! 🌷\n\nQuiero hacer este pedido:\n"+lineas+"\n\nTotal de referencia: "+mxn(total)+(nq?" + "+nq+" por cotizar":"")+(nombre?"\nNombre: "+nombre:"")+(fecha?"\nPara el día: "+fecha:"")+"\n"+$("#cEntrega").value+(dom?" — "+z.n+(z.c==null?" (envío por confirmar)":" (envío "+mxn(z.c+(urg?URGENTE:0))+(urg?", urgente":"")+")"):"")+"\n\n¿Me confirmas disponibilidad?");
  guardar();
}
const cambiar=(k,d)=>{cart[k]=Math.max(0,(cart[k]||0)+d);if(!cart[k])delete cart[k];pedido()};
function drawer(on){$("#drawer").classList.toggle("on",on);$("#veil").classList.toggle("on",on);if(on)$("#closeCart").focus()}

function lb(i){
  li=(i+vista.length)%vista.length;const p=vista[li];
  $("#lbImg").dataset.n=0;$("#lbImg").style.visibility="visible";$("#lbImg").src=p.imagen;$("#lbImg").alt=p.nombre;
  $("#lbCap").textContent=p.nombre+" · "+(p.precio==null?"Consultar precio":mxn(p.precio));
  $("#lb").classList.add("on");
}

on("#filters","click",e=>{const b=e.target.closest("[data-c]");if(b){cat=b.dataset.c;filtros();catalogo()}});
on("#q","input",catalogo);on("#sort","change",catalogo);
document.addEventListener("click",e=>{
  const a=e.target.closest("[data-add]"),z=e.target.closest("[data-z]");
  if(a){cambiar(a.dataset.add,1);toast("Agregado a tu pedido ♡")}
  if(z)lb(+z.dataset.z);
});
on("#items","click",e=>{const m=e.target.closest("[data-m]"),p=e.target.closest("[data-p]");if(m)cambiar(m.dataset.m,-1);if(p)cambiar(p.dataset.p,1)});
["#cNombre","#cFecha","#cEntrega","#cZona","#cUrg"].forEach(s=>$(s).addEventListener("input",pedido));
on("#openCart","click",()=>drawer(true));
on("#closeCart","click",()=>drawer(false));
on("#veil","click",()=>drawer(false));
on("#lbClose","click",()=>$("#lb").classList.remove("on"));
on("#lbPrev","click",()=>lb(li-1));on("#lbNext","click",()=>lb(li+1));
on("#lb","click",e=>{if(e.target.id==="lb")e.currentTarget.classList.remove("on")});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){$("#lb").classList.remove("on");drawer(false)}
  if($("#lb").classList.contains("on")){if(e.key==="ArrowLeft")lb(li-1);if(e.key==="ArrowRight")lb(li+1)}
});
on("#menu","click",e=>{const o=$("#nav").classList.toggle("on");e.currentTarget.setAttribute("aria-expanded",o)});
on("#nav","click",()=>$("#nav").classList.remove("on"));

on("#orderForm","submit",e=>{
  e.preventDefault();
  window.open(wa("¡Hola, Kiora Flores y Detalles! 🌷\n\nQuiero un pedido personalizado.\nNombre: "+$("#nombre").value.trim()+"\nOcasión: "+$("#ocasion").value+"\nFecha: "+$("#fecha").value+"\nPresupuesto: $"+$("#presupuesto").value+" MXN\nMi idea: "+$("#idea").value.trim()),"_blank");
});
const manana=new Date(Date.now()+864e5).toISOString().slice(0,10);
["#fecha","#cFecha"].forEach(s=>$(s).min=manana);
$("#contactBtn").href=wa("Hola, Kiora. Me gustaría conocer su catálogo.");
$("#waFloat").href=wa("Hola, Kiora. Quiero información sobre sus flores.");
if(has("#slides")){
// Portada: cada slide muestra un producto del catálogo (por nombre). Edita textos aquí.
const portada=[
{light:true,t:"Regala flores,<br>regala emociones.",p:"Ramos, bouquets y regalos personalizados para esa persona especial. Cada detalle cuenta una historia."},
{n:"Ramo Te Quiero Soleado",t:"Para quien<br>es tu sol.",p:"Seis girasoles y seis rosas con solidago, para alegrar su día."},
{n:"Bouquet Pasión Eterna",t:"Veinte rosas para<br>decirlo todo.",p:"Rosas rojas naturales premium con tarjeta personalizada."},
{n:"Bouquet Dulce Encanto",t:"Flores y chocolates,<br>en un solo regalo.",p:"Rosas naturales, eucalipto y chocolates Kinder en un mismo bouquet."},
{n:"Huacal de Amor",t:"Un huacal<br>lleno de amor.",p:"8 rosas rojas en caja de madera, con letrero personalizado y globo de corazón."},
{n:"Ramo Dulce Amanecer",t:"Suave como<br>un amanecer.",p:"6 rosas rosadas con crisantemos y follaje verde."}
].filter(x=>!x.n||byName(x.n));
let hi=0,ht;
const col=`<div class="collage" aria-hidden="true">${["Ramo Coqueta","Ramo Te Quiero Soleado","Ramo Princesa"].filter(byName).map(n=>`<img src="${byName(n).imagen}" alt="" onerror="fb(this)">`).join("")}</div>`;
const arco=(n,c)=>byName(n)?`<img class="${c}" src="${byName(n).imagen}" alt="${byName(n).nombre}" onerror="fb(this)">`:"";
const chip=(n,c)=>byName(n)?`<span class="chip ${c}"><b>${n}</b>${mxn(byName(n).precio)}</span>`:"";
$("#slides").innerHTML=portada.map((x,i)=>{
  if(x.light)return `<div class="slide light on" aria-hidden="false"><span class="blob"></span><div class="hero-in"><h1>${x.t}</h1><p>${x.p}</p>
  <div class="btns"><a href="catalogo.html" class="btn">Ver el catálogo</a><a href="personalizados.html" class="btn line">Crear uno a mi gusto</a></div>
  <ul class="facts"><li><b>Entrega en Villahermosa</b>desde $50</li><li><b>Aparta con 50%</b>el resto al entregar</li><li><b>Diseños a tu gusto</b>según tu presupuesto</li></ul></div>
  <div class="arches" aria-hidden="true">${arco("Ramo Coqueta","a1")}${arco("Ramo Princesa","a2")}${chip("Ramo Coqueta","c1")}${chip("Ramo Princesa","c2")}</div></div>`;
  const pr=x.n?byName(x.n):null,img=pr?pr.imagen:x.img;
  const tit=i?`<h2>${x.t}</h2>`:`<h1>${x.t}</h1>`;
  return `<div class="slide${i?"":" on"}${pr?" blur":""}" aria-hidden="${i?"true":"false"}">${pr?`<div class="bg" style="--img:url('${img}')"></div>`:`<img class="bgi" src="${img}" alt="" onerror="fb(this)">`}
  <div class="hero-in">${pr?`<span class="tag">${pr.nombre} · ${pr.precio==null?"Consultar precio":mxn(pr.precio)}</span>`:""}${tit}<p>${x.p}</p>
  <div class="btns">${pr?`<button type="button" class="btn" data-ver="${pr.nombre}">Ver este detalle</button><button type="button" class="btn ghost" data-hadd="${pr.nombre}">Agregar al pedido</button>`:`<a href="catalogo.html" class="btn">Ver el catálogo</a><a href="personalizados.html" class="btn ghost">Crear uno a mi gusto</a>`}</div>
  ${pr?"":`<ul class="chips"><li>Flores frescas</li><li>Pedidos con agenda</li><li>Regalos personalizados</li></ul>`}</div>
  ${pr?`<img class="photo" src="${img}" alt="${pr.nombre}" onerror="fb(this)">`:col}</div>`}).join("");
$("#dots").innerHTML=portada.map((x,i)=>`<button type="button" class="${i?"":"on"}" data-h="${i}" aria-label="Ir a la imagen ${i+1}"></button>`).join("");
function ir(i){
  hi=(i+portada.length)%portada.length;
  $("#inicio").classList.toggle("lt",!!portada[hi].light);
  document.querySelectorAll(".slide").forEach((e,k)=>{e.classList.toggle("on",k===hi);e.setAttribute("aria-hidden",k!==hi)});
  document.querySelectorAll("#dots button").forEach((e,k)=>e.classList.toggle("on",k===hi));
  auto(true);
}
function auto(on){clearInterval(ht);if(on)ht=setInterval(()=>ir(hi+1),5500)}
const hero=$("#inicio");
hero.addEventListener("click",e=>{
  const d=e.target.closest("[data-h]"),v=e.target.closest("[data-ver]"),a=e.target.closest("[data-hadd]");
  if(d)ir(+d.dataset.h);
  if(a){cambiar(a.dataset.hadd,1);toast("Agregado a tu pedido ♡")}
  if(v)location.href="catalogo.html?q="+encodeURIComponent(v.dataset.ver);
});
on("#hPrev","click",()=>ir(hi-1));on("#hNext","click",()=>ir(hi+1));
let tx=0;hero.addEventListener("touchstart",e=>{tx=e.touches[0].clientX},{passive:true});
hero.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)ir(hi+(d<0?1:-1))});
$("#inicio").classList.toggle("lt",!!portada[0].light);auto(true);
}
// Tarifario de envío (MXN). Edita precios y colonias aquí. d:true muestra "desde".
const ENVIO_BASE=50,URGENTE=20;
const zonas=[
{z:"Zona 1 · Local",c:50,l:["Nueva Villahermosa","Loma Linda","Linda Vista","El Águila","Florida","Jesús García","López Mateos"]},
{z:"Zona 2 · Centro",c:50,l:["Centro Histórico","Zona Luz","Plaza de Armas","Parque Juárez","Reforma","Mayito","Guayabal","Atasta"]},
{z:"Zona 3 · Tamulté",c:60,l:["Tamulté de las Barrancas"]},
{z:"Zona 4 · Intermedia",c:65,l:["Primero de Mayo","FOVISSSTE","18 de Marzo","Punta Brava"]},
{z:"Zona 5 · Comercial",c:75,l:["Tabasco 2000","Galerías","City Center","La Choca","Carrizal"]},
{z:"Zona 6 · Oriente",c:85,l:["Gaviotas Norte","Gaviotas Sur","La Manga","Casa Blanca","Tierra Colorada"]},
{z:"Zona 7 · Periférica",c:110,d:true,l:["Indeco","Lagunas","Ciudad Industrial","Miguel Hidalgo","Sabina"]}
];
const puntos=[["Plaza de Armas",50],["Parque Juárez",50],["Parque Tomás Garrido",50],["Parque La Pólvora",60],["Plaza Crystal",65],["Parque La Choca",75],["City Center",75],["Plaza Las Américas",75]];
const D=[];
zonas.forEach(g=>g.l.forEach(n=>D.push({n,c:g.c,g:g.z,d:g.d})));
puntos.forEach(([n,c])=>D.push({n:"Punto: "+n,c,g:"Puntos de entrega"}));
D.push({n:"Otra colonia de Villahermosa",c:null,g:"Otra zona"});
const pz=x=>x.c==null?"te confirmamos":(x.d?"desde ":"")+mxn(x.c);
const opZ=[...new Set(D.map(x=>x.g))].map(g=>`<optgroup label="${g}">`+D.map((x,i)=>x.g===g?`<option value="${i}">${x.n} — ${pz(x)}</option>`:"").join("")+"</optgroup>").join("");
$("#cZona").innerHTML=opZ;$("#zSel").innerHTML=opZ;
$("#zList").innerHTML=zonas.map(g=>`<li><span><b>${g.z}</b><br><small>${g.l.join(", ")}</small></span><b>${g.d?"desde ":""}${mxn(g.c)}</b></li>`).join("")+`<li><span><b>Puntos de entrega</b><br><small>${puntos.map(p=>p[0]+" "+mxn(p[1])).join(" · ")}</small></span></li>`;
function zona(){const z=D[$("#zSel").value];
  $("#zRes").innerHTML=z.c==null?"Te confirmamos el costo por WhatsApp (desde "+mxn(ENVIO_BASE)+").":"Envío a <b>"+z.n+"</b>: <b>"+pz(z)+"</b>";
  $("#zWa").href=wa("Hola, Kiora. Quiero una entrega en: "+z.n+". ¿Me confirmas el costo de envío?")}
on("#zSel","change",zona);if(has("#zSel"))zona();
const qs=new URLSearchParams(location.search);
if(qs.get("cat"))cat=qs.get("cat");
if(qs.get("q")&&has("#q"))$("#q").value=qs.get("q");
if(qs.get("ocasion")&&has("#ocasion"))$("#ocasion").value=qs.get("ocasion");
if(has("#products")){filtros();catalogo()}
if(has("#destacados"))destacados();
pedido();
