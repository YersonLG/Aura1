import { useState, useEffect } from "react";
import "./App.css";
import Corazones from "./components/Corazones";
import MusicPlayer from "./components/MusicPlayer";

import foto1 from "./assets/foto1.jpeg";
import foto2 from "./assets/foto2.jpeg";
import foto3 from "./assets/foto3.jpeg";
import foto4 from "./assets/foto4.jpeg";
import foto5 from "./assets/foto5.jpeg";
import foto6 from "./assets/foto6.jpeg";
import foto7 from "./assets/foto7.jpeg";
import foto8 from "./assets/foto8.jpeg";
import foto9 from "./assets/foto9.jpeg";
import foto10 from "./assets/foto10.jpeg";
import foto11 from "./assets/foto11.jpeg";
import foto12 from "./assets/foto12.jpeg";
import foto13 from "./assets/foto13.jpeg";
import foto14 from "./assets/foto14.jpeg";
import foto15 from "./assets/foto15.jpeg";
import foto16 from "./assets/foto16.jpeg";

function App(){

const quizQuestions = [
  {
    question: "¿Fecha de nuestra relacion?",
    options: [
      { id: "a", label: "13 de marzo de 2025" },
      { id: "b", label: "13 de enero de 2024" },
      { id: "c", label: "13 de mayo de 2024" },
      { id: "d", label: "13 de agosto de 2025" },
    ],
    answer: "a",
  },
  {
    question: "¿Cuál es nuestra comida favorita para compartir?",
    options: [
      { id: "a", label: "Pizza" },
      { id: "b", label: "Tacos" },
      { id: "c", label: "Pasta" },
      { id: "d", label: "Sushi" },
    ],
    answer: "a",
  },
  {
    question: "¿Cuál es nuestro sueño mas anelado por nosotros?",
    options: [
      { id: "a", label: "Vivir juntos" },
      { id: "b", label: "Tranquilidad y amor mutuo" },
      { id: "c", label: "Tener nuestr@ familia" },
      { id: "d", label: "Vivir juntos" },
      { id: "e", label: "Todas las anteriores" },
    ],
    answer: "e",
  },
  {
    question: "¿Saga que mas nos gusta vernos en netflix?",
    options: [
      { id: "a", label: "Prision Break" },
      { id: "b", label: "Rapido y furioso" },
      { id: "c", label: "La a y la b" },
      { id: "d", label: "Ninguna" },
    ],
    answer: "c",
  },
  {
    question: "¿Cuantos hijos y amores de vida tenemos juntos?",
    options: [
      { id: "a", label: "1" },
      { id: "b", label: "3" },
      { id: "c", label: "2" },
      { id: "d", label: "Ninguno" },
    ],
    answer: "c",
  },
]

const frasesSorpresa = [
  "Te amo porque haces que cada día sea mejor.",
  "Tus ojitos son mi lugar favorito.",
  "Gracias por ser mi hogar y mi aventura y mi todo.",
  "Cada día a tu lado es un nuevo motivo para sonreír.",
  "Cumpliste mi mayor sueño y eso nadie lo puede borrar.",
  "Contigo aprendi qué significa amar mas alla del amor de verdad.",
  "Que siempre encontremos en el otro nuestra mejor compañía.",
  "Contigo, lo cotidiano se vuelve una aventura deliciosa.",
  "Tu eres es el lugar donde siempre quiero volver.",
];

const [pagina,setPagina] = useState("home")
const [mostrarPrimera,setMostrarPrimera] = useState(false)
const [showConfetti,setShowConfetti] = useState(false)
const [sorpresasReveladas, setSorpresasReveladas] = useState(Array(frasesSorpresa.length).fill(false))
const [quizIndex, setQuizIndex] = useState(0)
const [quizAnswers, setQuizAnswers] = useState(Array(quizQuestions.length).fill(null))
const [quizFinished, setQuizFinished] = useState(false)
const [lightbox, setLightbox] = useState({ open: false, index: 0, images: [], title: "" })

const inicioRelacion = new Date(2025, 2, 13, 19, 30, 0);

const calcularTiempo = () => {
  const ahora = new Date();
  let diff = ahora - inicioRelacion;
  if (diff < 0) diff = 0;

  const segundos = Math.floor(diff / 1000) % 60;
  const minutos = Math.floor(diff / 1000 / 60) % 60;
  const horas = Math.floor(diff / 1000 / 60 / 60) % 24;
  const dias = Math.floor(diff / 1000 / 60 / 60 / 24);

  return { dias, horas, minutos, segundos };
};

const calcularFechasImportantes = () => {
  const ahora = new Date();
  const diasDesde = Math.floor((ahora - inicioRelacion) / (1000 * 60 * 60 * 24));
  const anioActual = ahora.getFullYear();
  const aniversarioEste = new Date(anioActual, 2, 13, 19, 30, 0);
  const proximo = ahora > aniversarioEste ? new Date(anioActual + 1, 2, 13, 19, 30, 0) : aniversarioEste;
  const diasPara = Math.max(0, Math.ceil((proximo - ahora) / (1000 * 60 * 60 * 24)));
  return { diasDesde, diasPara, proximo };
};

const formato = (n) => String(n).padStart(2, "0");

const revelarSorpresa = (index) => {
  setSorpresasReveladas((prev) =>
    prev.map((v, i) => (i === index ? !v : false))
  );
  setShowConfetti(true);
  setTimeout(() => setShowConfetti(false), 2200);
};

const reiniciarSorpresas = () => {
  setSorpresasReveladas(Array(frasesSorpresa.length).fill(false));
  setShowConfetti(false);
};

const irASorpresa = () => {
  reiniciarSorpresas();
  setPagina("sorpresa");
};

const abrirLightbox = (imagenes, index, title) =>
  setLightbox({ open: true, images: imagenes, index, title });

const cerrarLightbox = () => setLightbox((prev) => ({ ...prev, open: false }));

const avanzarFoto = () =>
  setLightbox((prev) => ({
    ...prev,
    index: (prev.index + 1) % prev.images.length,
  }));

const retrocederFoto = () =>
  setLightbox((prev) => ({
    ...prev,
    index:
      (prev.index - 1 < 0 ? prev.images.length - 1 : prev.index - 1) %
      prev.images.length,
  }));

const responderQuiz = (id) => {
  setQuizAnswers((prev) => {
    const next = [...prev];
    next[quizIndex] = id;
    return next;
  });

  if (quizIndex + 1 < quizQuestions.length) {
    setQuizIndex(quizIndex + 1);
  } else {
    setQuizFinished(true);
  }
};

const reiniciarQuiz = () => {
  setQuizIndex(0);
  setQuizAnswers(Array(quizQuestions.length).fill(null));
  setQuizFinished(false);
};

const quizScore = quizAnswers.reduce(
  (acc, answer, i) => acc + (answer === quizQuestions[i].answer ? 1 : 0),
  0
);

const [tiempo, setTiempo] = useState(calcularTiempo());

useEffect(() => {
  const interval = setInterval(() => setTiempo(calcularTiempo()), 1000);
  return () => clearInterval(interval);
}, []);

const fechasImportantes = calcularFechasImportantes();

const recordatorios = [
  { fecha: "💖 De ahora en adelante el resto de nuestras vidas...💖", texto: "Estar siempre dandonos apoyo mutuo y muchisimo amor, tambien cuidarnos y estar para nosotros y nuestra familia...💖" },

];

const galeria1 = [
foto1,foto2,foto3,foto4,foto5,foto6
]

const galeria2 = [
foto9,foto10,foto11,foto12,foto13,foto14
]

const galeria3 = [
foto7,foto8,foto15
]

return(

<div className="app">

<Corazones/>

{/* HOME */}

{pagina==="home" && (

<div className="home">

<h1>Feliz 1 Año Mi Amor 💖</h1>

<p className="textoHome">
Hoy celebramos un año de nuestra historia.  
Un año lleno de momentos que jamás voy a olvidar.  
Esta pequeña página es solo una forma de recordarte  
lo importante que eres para mí.
</p>

<div className="botonesHome">

<button onClick={()=>setPagina("galeria1")}>
Nuestros recuerdos 📸
</button>

<button onClick={()=>setPagina("galeria3")}>
Más recuerdos ✨
</button>

<button className="btnTiempo" onClick={()=>setPagina("tiempo") }>
Tiempo juntos ⏳
</button>

<button onClick={irASorpresa}>
Sorpresa 🎁
</button>

<button onClick={()=>setPagina("quiz") }>
Juego 🧠
</button>

<button onClick={()=>setMostrarPrimera(true)}>
Nuestra primera foto 💖
</button>

</div>

</div>

)}

{/* GALERIA 1 */}

{pagina==="galeria1" && (

<div className="galeria">

<h2>Nuestros Momentos 💖</h2>

<div className="grid">
{galeria1.map((foto,i)=>(
<img
  key={i}
  src={foto}
  onClick={() => abrirLightbox(galeria1, i, "Nuestros Momentos 💖")}
  style={{cursor: "pointer"}}
/>
))}
</div>

<button className="volver" onClick={()=>setPagina("home")}>
Volver
</button>

<button className="siguiente" onClick={()=>setPagina("galeria2")}>
Ver más fotos →
</button>

</div>

)}

{/* GALERIA 2 */}

{pagina==="galeria2" && (

<div className="galeria">

<h2>Más Recuerdos Hermosos 💖</h2>

<div className="grid">
{galeria2.map((foto,i)=>(
<img
  key={i}
  src={foto}
  onClick={() => abrirLightbox(galeria2, i, "Más recuerdos hermosos ✨")}
  style={{cursor: "pointer"}}
/>
))}
</div>

<button className="volver" onClick={()=>setPagina("home")}>
Volver
</button>

</div>

)}

{/* GALERIA 3 */}

{pagina==="galeria3" && (

<div className="galeria">

<h2>Más Recuerdos Especiales ✨</h2>

<div className="grid">
{galeria3.map((foto,i)=>(
<img
  key={i}
  src={foto}
  onClick={() => abrirLightbox(galeria3, i, "Recuerdos Especiales ✨")}
  style={{cursor: "pointer"}}
/>
))}
</div>

<button className="volver" onClick={()=>setPagina("home")}>
Volver
</button>

</div>

)}

{/* TIEMPO JUNTOS */}

{pagina==="tiempo" && (

<div className="tiempo">

<h2>Tiempo juntos ⏳</h2>

<p className="subTitulo">Desde el 13 de marzo de 2025, 19:30</p>

<div className="contador">
  <div className="tiempoCard">
    <span className="tiempoValor">{formato(tiempo.dias)}</span>
    <span className="tiempoLabel">Días</span>
  </div>
  <div className="tiempoCard">
    <span className="tiempoValor">{formato(tiempo.horas)}</span>
    <span className="tiempoLabel">Horas</span>
  </div>
  <div className="tiempoCard">
    <span className="tiempoValor">{formato(tiempo.minutos)}</span>
    <span className="tiempoLabel">Minutos</span>
  </div>
  <div className="tiempoCard">
    <span className="tiempoValor">{formato(tiempo.segundos)}</span>
    <span className="tiempoLabel">Segundos</span>
  </div>
</div>

<p className="tiempoNota">Cada segundo contigo es un regalo. 💖</p>

<div className="fechaImportante">
  <h3>Fechas importantes</h3>
  <p>Hace <strong>{fechasImportantes.diasDesde}</strong> días que nos conocimos.</p>
  <p>Faltan <strong>{fechasImportantes.diasPara}</strong> días para nuestro próximo aniversario ({new Date(fechasImportantes.proximo).toLocaleDateString()}).</p>
</div>

<div className="recordatorios">
  <h3>Recordatorios</h3>
  <ul>
    {recordatorios.map((r, i) => (
      <li key={i}>
        <span className="recFecha">{r.fecha}</span> — {r.texto}
      </li>
    ))}
  </ul>
</div>

<button className="volver" onClick={()=>setPagina("home") }>
Volver
</button>

</div>

)}

{/* SORPRESA */}

{pagina==="sorpresa" && (

<div className="modalEstilo">

{showConfetti && (
  <div className="confetti">
    {Array.from({ length: 24 }).map((_, i) => (
      <span key={i} style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 1.2}s`,
        background: `hsl(${180 + Math.random() * 80}, 90%, 72%)`,
        width: `${6 + Math.random() * 10}px`,
        height: `${6 + Math.random() * 10}px`,
      }}/>
    ))}
  </div>
)}

<h2>Sorpresa 🎁</h2>

<p className="subTitulo">
  Toca alguna de las tarjetitas para descubrir un mensaje escondido.
</p>

<div className="tarjetasSorpresa">
  {frasesSorpresa.map((frase, i) => (
    <button
      key={i}
      className={`tarjetaSorpresa ${sorpresasReveladas[i] ? "revelada" : ""}`}
      onClick={() => revelarSorpresa(i)}
    >
      <span className="tarjetaTexto">
        {sorpresasReveladas[i] ? frase : "Toca para ver"}
      </span>
    </button>
  ))}
</div>

<div className="quizControles">
  <button className="volver" onClick={()=>setPagina("home") }>
    Volver
  </button>
</div>

</div>

)}

{/* QUIZ */}

{pagina==="quiz" && (

<div className="quiz">

<h2>Quiz romántico 💌</h2>

{!quizFinished ? (
  <>
    <p className="pregunta">{quizQuestions[quizIndex].question}</p>

    <div className="opciones">
      {quizQuestions[quizIndex].options.map((o) => (
        <button
          key={o.id}
          className={`opcion ${quizAnswers[quizIndex] === o.id ? "selected" : ""}`}
          onClick={() => responderQuiz(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>

    <div className="quizControles">
      <span className="quizProgreso">
        Pregunta {quizIndex + 1} de {quizQuestions.length}
      </span>
      <button className="volver" onClick={()=>setPagina("home") }>
        Volver
      </button>
    </div>
  </>
) : (
  <>
    <p className="pregunta">¡Terminaste el quiz!</p>
    <p className="resultado">
      Obtuviste <strong>{quizScore}</strong> de <strong>{quizQuestions.length}</strong> respuestas correctas.
    </p>

    <div className="quizResumen">
      {quizQuestions.map((q, i) => {
        const selected = quizAnswers[i];
        const correct = q.answer;
        const isCorrect = selected === correct;
        const selectedLabel =
          q.options.find((o) => o.id === selected)?.label || "Sin respuesta";
        const correctLabel = q.options.find((o) => o.id === correct)?.label;
        return (
          <div key={i} className={`quizFila ${isCorrect ? "correcto" : "incorrecto"}`}>
            <p className="quizPregunta">{q.question}</p>
            <p>
              Tu respuesta: <strong>{selectedLabel}</strong>
            </p>
            {!isCorrect && (
              <p>
                Correcta: <strong>{correctLabel}</strong>
              </p>
            )}
          </div>
        );
      })}
    </div>

    <div className="quizControles">
      <button className="volver" onClick={reiniciarQuiz}>
        Reiniciar quiz
      </button>
      <button className="volver" onClick={()=>setPagina("home") }>
        Volver
      </button>
    </div>
  </>
)}

</div>

)}

{/* FOTO ESPECIAL */}

{mostrarPrimera && (

<div className="modal">

<div className="modalContenido">

<h2>Nuestra Primera Foto 💖</h2>

<img src={foto16} className="fotoEspecial"/>

<p className="mensajeEspecial">

Amor...

Si pudiera congelar un momento en toda mi vida,  
sería ese en el que empezó nuestra historia.

Esa primera foto no es solo una imagen,  
es el inicio de algo que cambió completamente mi mundo.

Desde ese día llegaron las risas,  
los abrazos que curan todo,  
las conversaciones largas,  
los momentos difíciles que enfrentamos juntos  
y cada recuerdo hermoso que hemos construido.

Gracias por aparecer en mi vida.  
Gracias por quedarte.  
Gracias por hacerme sentir amado todos los días.

Este primer año a tu lado  
ha sido uno de los regalos más grandes que me ha dado la vida.

Y si Dios quiere,  
esto apenas es el comienzo de todo lo que nos falta vivir juntos.

Te amo con todo mi corazón.

Tu negrito 💖

</p>

<button onClick={()=>setMostrarPrimera(false)}>
Cerrar
</button>

</div>

</div>

)}

{lightbox.open && (
  <div className="modal lightbox">
    <div className="modalContenido lightboxContenido">
      <h2>{lightbox.title}</h2>
      <div className="lightboxInner">
        <button className="lightboxNav" onClick={retrocederFoto}>
          ←
        </button>
        <img
          src={lightbox.images[lightbox.index]}
          className="lightboxImage"
        />
        <button className="lightboxNav" onClick={avanzarFoto}>
          →
        </button>
      </div>
      <p className="lightboxContador">
        {lightbox.index + 1} / {lightbox.images.length}
      </p>
      <button onClick={cerrarLightbox}>Cerrar</button>
    </div>
  </div>
)}

<MusicPlayer />

</div>

)

}

export default App