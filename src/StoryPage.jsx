
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./App.css";

function StoryPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="app-container">
            <div className="global-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <nav className="navbar" style={{ position: 'sticky' }}>
                <div className="container nav-content">
                    <Link to="/" className="logo">DT.</Link>
                    <div className="nav-links">
                        <Link to="/" className="btn-text" style={{ fontSize: '0.9rem' }}>
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Volver al inicio
                        </Link>
                    </div>
                </div>
            </nav>

            <section className="section" style={{ paddingTop: '4rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: '1.1' }}>
                            Empecé metiéndome donde no sabía... <br />
                            <span className="gradient-text">y encontrando cómo hacerlo funcionar.</span>
                        </h1>

                        <div className="story-full-content" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>

                            <div style={{ marginBottom: '3rem', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <img src="/images/photo01.png" alt="Yo de pequeño" style={{ width: '100%', display: 'block', filter: 'grayscale(100%) contrast(1.1)' }} />
                                <p style={{ padding: '1rem', fontSize: '0.9rem', opacity: 0.7, textAlign: 'center', margin: 0, background: 'rgba(0,0,0,0.3)' }}>
                                    El origen de todo: trasteando con tecnología mucho antes de entenderla.
                                </p>
                            </div>

                            <p style={{ marginBottom: '2rem' }}>
                                Si hay que ponerle un punto de origen a todo esto, está en un <strong>aburrimiento que hoy casi ha desaparecido</strong>. Ese aburrimiento que no se anestesia con una pantalla infinita y te obliga a inventarte algo propio para no volverte loco. En ese territorio raro donde un niño se queda a solas con su cabeza y un ordenador, empezaron lo que ahora llamo “mis primeras torpezas útiles”.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                En casa había dos ordenadores y yo los usaba con la confianza temeraria de alguien que todavía no sabe lo que cuesta arreglar nada. Me sentaba, abría ventanas, descargaba música y películas con el Ares, trasteaba con un <strong>Photoshop de otra era</strong> y montaba mis primeros vídeos con el MovieMaker como si estuviera dirigiendo Hollywood desde un cuarto cualquiera. Con diez años llegó mi primer portátil propio, un Sony VAIO naranja que parecía una nave espacial de juguete. Yo lo miraba como si me hubieran entregado un superpoder. Y claro, con el superpoder venía la parte peligrosa, instalar cosas raras porque sí, confiar en archivos con nombres sospechosos, creer que si el icono aparecía en el escritorio entonces el universo me daba la razón. A veces salía bien. Otras veces el portátil empezaba a ir lento y yo me quedaba mirándolo como si me hubiera decepcionado un amigo. Pero siempre con la misma esperanza de fondo, la de encontrar la herramienta exacta, el editor justo, el atajo perfecto, que me dejara hacer por fin lo que en mi cabeza ya parecía posible.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                En esos programas yo tocaba cosas sin saber qué eran. Movía capas sin entender por qué existían, cambiaba colores porque sí y me parecía perfectamente razonable pasarme una tarde entera intentando que algo “se viera bien” sin tener la menor idea de qué demonios significaba exactamente “bien”. Era una mezcla de <strong>intuición infantil y cabezonería estética</strong>. Si quedaba decente, yo sentía que había descubierto un secreto. Si quedaba horrible, lo volvía a intentar como si el mundo dependiera de ese archivo.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Poco después descubrí el placer de <strong>ordenar información</strong>. Empecé a guardar datos en un archivo Excel. Resultados, historiales, partidos, nombres, cifras que no importaban a nadie más que a mí. Era mi manera de construir una narrativa privada donde yo decidía qué era importante y qué no. Estaba intentando convertir un pequeño caos en algo legible. Una estadística dejaba de ser un número perdido entre celdas y pasaba a ser una historia diminuta con principio y final. Todo aquello lo hice a mano, con paciencia de relojero sin reloj, sin saber que más adelante una línea de código podría hacer en minutos, segundos, lo que a mí me llevó años construir con la seriedad absurda de un niño que todavía no sospecha que está entrenando para su vida adulta.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                La adolescencia fue un momento un poco más ruidoso. Crecí con las redes sociales y tuve la sensación de que ellas crecían conmigo. Con doce años abrí mi primera cuenta en lo que antes era Twitter, un sitio donde todo parecía pasar a la vez. Una jungla.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Un par de años después llegó la parte más seria, aunque yo todavía no la llamara así. Empecé a darme cuenta de que la gente me leía de verdad. No como quien pasa por encima, sino como quien se queda un segundo más de la cuenta. Empezaron a llegar mensajes privados de cuentas que no sé cómo llamar sin exagerar, una mezcla de “medio pequeño” y “gente con una web y ganas”, y terminé redactando para espacios independientes.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                El salto más serio fue <strong>VAVEL</strong>. Ahí ya había un equipo real, un calendario, un plan semanal. Ahí no era escribir por escribir. Ahí era aprender que la escritura también puede ser oficio, ritmo y responsabilidad. Tener un sitio donde esperan tu texto cambia la manera en que te sientas a escribir.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Y mientras eso ocurría, yo seguía en lo que pasó a ser en un terreno casi natural, que era abrir cuentas en Twitter y volcar ahí mis obsesiones. Una para informar sobre la Segunda División, otra para convertir en algo legible todos esos datos que llevaba años recogiendo a mano. Era un intento ingenuo, sí, de hacer pasar por interesante algo que probablemente solo me importaba a mí, pero también era otra cosa igual de importante: poder tener un lugar donde podía contar lo que me interesaba a mi manera. No solo informar, sino elegir el enfoque, el tono, el detalle que me parecía relevante. Esa ingenuidad tenía también algo que hoy veo valioso. La <strong>intención de comunicar</strong>. Con el tiempo esa intención se volvió intuición. Empecé a entender que comunicar no era solo hablar más alto o escribir más bonito, sino elegir qué mostrar, cómo ordenarlo y en qué momento soltarlo para que, de repente, sin saber muy bien por qué, a alguien le importara.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                En ese tramo aparecieron señales bastante claras de que no estaba simplemente jugando en solitario. Por un lado, hice un diseño para un amigo que jugaba en los juveniles de uno de los equipos más grandes de Canarias y, de repente, como si alguien hubiera abierto una compuerta, otros chicos empezaron a escribirme para pedirme lo mismo. Algunos hoy están en clubes profesionales, pero entonces eran solo pibes que querían tener un diseño bonito en Instagram. Por otro lado, una de esas cuentas de Twitter sirvió para que un señor me hablara con una idea que sonaba enorme para la edad que yo tenía: levantar un medio grande de Segunda División. Éramos tres al principio, él, otro pibe que por aquel entonces tenía la misma edad que yo —unos 15 o 16 años— y yo. Y luego se sumó mucha más gente con un talento bestial hasta convertir aquello en una referencia de la segunda categoría profesional del fútbol español.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Y estos detalles, cuando eres joven, te da un golpe raro en el pecho. No es “fama”, si aquello se le podía llamar “fama”, ni éxito. Era algo más simple y más fuerte: que alguien te elija porque lo que haces le sirve, y que un archivo que tú abriste una tarde por aburrimiento tenga utilidad real en una vida que no es la tuya.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Ahí es cuando las redes sociales empezaron a ser un laboratorio con jaulas abiertas. Aprendí que el contenido tiene vida propia, que no se deja domesticar del todo. Había cosas que publicaba convencido de que iban a funcionar y todo lo contrario. Había otras que subía casi como relleno y salían disparadas con una vitalidad que, ni mucho menos, merecía. Hay que tener instinto para elegir temas, y también entender que el instinto no es un Dios fiable. A veces acierta y te hace parecer listo. Y otras veces te deja solo con una duda doméstica y cruel: si lo que escribiste era una tontería o si simplemente hoy el mundo tenía otra cosa en la cabeza.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Aquí es cuando descubrí algo que me rompió la cabeza de la mejor manera. Que lo que yo había tardado años en construir a mano —aquella base de datos con partidos, resultados, goles, con paciencia de monje y obsesión de niño— podía hacerse en un rato con unas pocas líneas de código. Fue como descubrir un atajo secreto en un videojuego que llevabas jugando toda la vida. Y ahí me cambió un poco la forma de pensar: si consigo <strong>convertir algo pesado en algo ligero sin perder el sentido</strong>, estoy aportando. No importa que la primera vez tarde dos horas en hacer funcionar una cosa, si esa cosa me ahorra diez horas futuras. Empecé a ver el aprendizaje como una inversión doméstica. Un esfuerzo grande hoy para no volver a sufrir mañana.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Luego llegó la universidad y con ella esa sensación rara de que el mundo se abre en muchas direcciones a la vez, como si te hubieran quitado una pared que ni sabías que estaba ahí. Elegí <strong>Ciencia Política</strong> porque era, sin saberlo, la carrera más parecida a mi cabeza. Un sitio donde no te obligan a casarte con una sola cosa, donde puedes mirar las instituciones, la sociedad, los datos, el comportamiento humano y la comunicación como partes de un mismo mapa. Y Santiago de Compostela también tuvo algo de decisión simbólica. Salir de casa, cambiar de paisaje, irte a una ciudad donde llueve más de lo que uno cree posible, te pone en una disposición distinta. No vas solo a estudiar. Vas a aprender a estar en otro lugar y a mirar lo tuyo desde fuera. A veces eso es tan formativo como cualquier asignatura.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Y entonces ocurrió el episodio que, visto a posteriori, parece un cuento escrito por alguien con demasiado tiempo libre. Un fin de semana, aquellos en los que me quedaba solo en Santiago de Compostela, me encontré con un repositorio en GitHub con el código del <strong>Wordle</strong>. Mi obsesión por trastear con programas me llevó a la costumbre de acumular programas en el ordenador que no uso al 100 por 100, pero que me gusta tener ahí, como quien guarda herramientas “por si un día”. Ahí tenía en una gaveta digital el Visual Studio Code. Y, sin saber programar, me dio por abrir aquel código y pensar, con la temeridad tranquila de los curiosos, que por qué no hacerlo canario. No era “no saber un poco”, sino no saber de verdad. Abrí archivos como quien desarma un reloj sin tener la menor idea de relojería. Toqué cosas. Rompí otras. Arreglé algunas por pura suerte. Metí palabras canarias, cambié detalles de la interfaz y lo publiqué sin demasiada ceremonia.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Y funcionó.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Esa es la parte que siempre suena fácil cuando se cuenta rápido, pero por dentro fue un caos precioso. Explotó como explotan las cosas de internet, que es un modo mucho más doméstico y más raro. Gente escribiéndote por la mañana para preguntarte por qué no se había actualizado la palabra. Con entrevistas improvisadas en medios locales. Con mensajes de desconocidos que te hablan con una confianza enorme solo porque les has metido un pequeño hábito en la rutina. Con noches, también, en las que descubres que la diversión tiene responsabilidades absurdas. Ahí aprendí dos cosas a la vez: lo bonito no es que algo se haga difícil, sino que lo difícil se vuelva sencillo sin perder el sentido. Que un sistema pesado se convierta en un gesto ligero. Que lo artesanal encuentre un atajo limpio. Que si lo haces bien, el atajo no solo ahorra tiempo, sino que mejora la calidad. Y que la <strong>curiosidad puede convertirse en algo real</strong>.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Lo bonito de esa historia no es la viralidad. Eso se evapora. Lo bonito es que encaja con mi patrón de siempre. Yo no soy el que espera a saberlo todo antes de empezar. Soy el que entra con dudas pero decidido, aprende lo básico, lo prueba en la realidad y lo empuja hasta que deja de ser un experimento y se convierte en algo usable. Esa manera de aprender tiene algo de <strong>desorden controlado y algo de oficio</strong>. Y, por mucho que uno quiera, no se enseña bien en un manual porque no empieza en la teoría, sino en la necesidad nerviosa de ver si una cosa puede funcionar. Y en la terquedad de hacer que funcione.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Después de eso, todo empezó a verse más unido. Los diseños infantiles, las bases de datos casi obsesivas, los carteles de adolescente, los días de redes en los que intentas adivinar qué va a funcionar, el juego que se te va de las manos y te obliga a aprender más de lo que tenías previsto. Todo era la misma historia escrita con distintas herramientas. La historia de alguien que necesita <strong>tocar las cosas para entenderlas</strong>.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Llevo años haciendo lo mismo con diferentes excusas. Me encuentro con algo que podría ser más claro, más rápido, más entendible o más bonito, y me entra una especie de picor mental. Me pongo a ello. Lo recorto, lo ordeno, lo traduzco, lo empaqueto. Si algo tarda una hora, busco que tarde treinta minutos. Si tarda treinta, busco que tarde quince.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Pero, obviamente, no siempre es así. A veces las cosas necesitan su proceso, su cocción lenta, su tiempo bien gastado. Y ahí también me sé quedar. Porque una cosa es recortar lo innecesario y otra muy distinta es amputar lo importante. Siempre he sentido que la calidad no está reñida con la eficiencia. Está reñida con el desorden.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Yo suelo aportar de una manera bastante concreta: aprendo rápido, conecto lo que está suelto y bajo las ideas a tierra hasta que dejan de ser una intención y se convierten en algo real y usable. Es el tipo de trabajo que busca empujar todo hacia delante.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                La parte más graciosa de todo esto es que empezó cuando yo creía que solo estaba jugando. Que hacía cosas para matar el tiempo. Que no había ninguna dirección. Y resulta que sí la había. Solo que no era una flecha recta. Era un hilo. Un hilo raro, hecho de curiosidad, aburrimiento, fútbol, datos, diseño, intuición y una tendencia natural a intentar dejar las cosas un poco mejor de lo que las encontré.
                            </p>

                            <p style={{ marginBottom: '2rem' }}>
                                Y supongo que al final esa es la única coherencia que me importa: que ese niño que abría programas como quien abre cajones prohibidos no ha desaparecido, solo ha aprendido a darle un poco de orden a su curiosidad. Sigo metiéndome donde no sé, pero con mejor brújula; sigo buscando atajos, pero sin traicionar el sentido; sigo intentando que lo difícil se vuelva claro y que lo pesado se vuelva ligero sin perder alma. Y si hoy puedo aportar algo a un equipo o a un proyecto, es precisamente eso: la <strong>mezcla rara de intuición y método, de hambre por entender y calma para pulir</strong>, de ganas de hacer que las cosas funcionen mejor sin necesidad de convertirlo en un espectáculo.
                            </p>

                            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                                <Link to="/#contacto" className="btn btn-primary">
                                    ¿Trabajamos juntos?
                                </Link>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </section>

            <footer>
                <div className="container" style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
                    <p>© {new Date().getFullYear()} Juan Diego Tejera.</p>
                </div>
            </footer>
        </div>
    );
}

export default StoryPage;
