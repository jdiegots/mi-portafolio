
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    Linkedin,
    Mail,
    Instagram,
    ExternalLink,
    ChevronDown,
    BarChart3,
    PenTool,
    MessageSquare,
    Briefcase,
    Code2,
    Globe,
    Brain,
    Palette,
    Zap,
    ArrowRight,
    ArrowLeft,
    X,
    Maximize2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const location = useLocation();

    // Scroll / Drag Logic
    const scrollRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollPosRef = useRef(0); // Track float position

    // Auto-scroll effect
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Sync ref with current scroll on mount/updates
        scrollPosRef.current = scrollContainer.scrollLeft;

        let animationFrameId;

        const loop = () => {
            // Check if mobile
            const isMobile = window.innerWidth <= 768;

            // If user is not dragging AND NOT mobile, scroll automatically
            if (!isDown && !isMobile) {
                scrollPosRef.current += 0.3; // Slightly faster to avoid sub-pixel quantization stutter
                scrollContainer.scrollLeft = scrollPosRef.current;

                // Infinite loop check
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                    scrollPosRef.current = 0;
                }
            } else {
                // Update ref if user drags manually so it doesn't jump back
                scrollPosRef.current = scrollContainer.scrollLeft;
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isDown]);

    // Desktop Drag Handlers
    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast multiplier
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    // Touch Handlers
    const handleTouchStart = (e) => {
        setIsDown(true);
        setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDown(false);
    };

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="app-container">
            <div className="global-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
                <div className="blob blob-4"></div>
            </div>

            {/* Navigation */}
            <nav className={`navbar ${scrolled ? "scrolled" : ""} `}>
                <div className="container nav-content">
                    <div className="logo">DT.</div>
                    <div className="nav-links">
                        <a href="#proyectos">Mis proyectos</a>
                        <a href="#sobre-mi">Sobre mí</a>
                        <a href="#mi-historia">Mi historia</a>
                        <a href="#herramientas">Herramientas</a>
                        <a href="#experiencia">Trayectoria</a>
                        <a href="#contacto" className="btn-contact">Contacto</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <motion.div
                        className="hero-text"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.p variants={fadeInUp} className="hero-kicker">
                            Administración · Datos · Comunicación digital · Diseño
                        </motion.p>
                        <motion.h1
                            className="hero-title"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.2
                                    }
                                }
                            }}
                        >
                            {/* "Hola, soy" */}
                            {Array.from("Hola, soy").map((char, i) => (
                                <motion.span
                                    key={`text-${i}`}
                                    variants={{
                                        hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
                                        visible: {
                                            y: 0,
                                            opacity: 1,
                                            filter: "blur(0px)",
                                            transition: { duration: 0.4 }
                                        }
                                    }}
                                    style={{ display: "inline-block", marginRight: char === " " ? "0.25em" : "0" }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}

                            <span style={{ display: "inline-block", width: "0.25em" }}></span>

                            {/* "Diego Tejera :)" - Simplified Gradient Scale */}
                            <motion.span
                                className="name-gradient-simple"
                                variants={{
                                    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                        transition: { duration: 0.5 }
                                    }
                                }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                Diego Tejera :)
                            </motion.span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="hero-lead">
                            Busco la <strong>claridad</strong> en lo complejo. Diseño, datos y estrategia para comunicar con sentido.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="hero-actions">
                            <a href="#proyectos" className="btn btn-primary">Ver Proyectos</a>
                            <a href="#contacto" className="btn btn-outline">Hablemos</a>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-socials">
                            <SocialLink href="https://www.linkedin.com/in/juandiegotejerasosa/" icon={<LinkedInIcon size={20} />} label="LinkedIn" />
                            <SocialLink href="mailto:jdiegotejeras@gmail.com" icon={<Mail size={20} />} label="Email" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-image-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="hero-img-wrapper">
                            <img src="/images/foto-perfil.png" alt="Diego Tejera" />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="scroll-indicator"
                >
                    <ChevronDown size={24} />
                </motion.div>
            </section>

            <main>
                {/* Projects Marquee Section */}
                <section id="proyectos" className="section" style={{ paddingBottom: '2rem' }}>
                    <div className="container">
                        <h2 className="section-title">Mis proyectos</h2>
                        <div className="mobile-scroll-hint">
                            <ArrowLeft size={20} />
                            <span>Desliza para ver más</span>
                            <ArrowRight size={20} />
                        </div>
                    </div>

                    <div className="projects-grid-wrapper">
                        <div
                            className="projects-grid"
                            ref={scrollRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onTouchCancel={handleTouchEnd}
                            style={{ cursor: isDown ? 'grabbing' : 'grab' }}
                        >
                            {/* Set 1 */}
                            <ProjectCard
                                title="Dentro del Pleno"
                                tags="Datos / Scrollytelling"
                                year="2025"
                                desc="Pieza interactiva y visual, pensada como un ejercicio de scrollytelling, que resume el año 2025 en los plenos del Congreso de los Diputados."
                                image="/images/dentro-del-pleno.png"
                                projectUrl="https://dentrodelpleno.pages.dev"
                                projectLinkText="Ver Dentro del Pleno"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="AforoLab"
                                tags="Datos / Deporte"
                                year="2025"
                                desc="Plataforma de analítica de asistencia a los estadios de fútbol de LaLiga, con visualizaciones interactivas que permiten comparar diferentes métricas entre los clubes que componen las competiciones profesionales del fútbol español."
                                image="/images/aforolab.png"
                                projectUrl="https://aforolab.pages.dev"
                                projectLinkText="Visitar AforoLab"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="Kike Pérez - La mil y pico"
                                tags="Diseño Gráfico"
                                year="2023"
                                desc="Diseño del cartel base de la gira y adaptaciones para distintas funciones y recintos, manteniendo una identidad visual común."
                                image="/images/kikeperez.jpg"
                                detailImage="/images/kikeperez.jpg"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="Wordle Canario"
                                tags="Web / Viral"
                                year="2022"
                                desc="Versión canaria del juego original: un proyecto ligero y cotidiano que convirtió el léxico canario en un hábito compartido. Adivina la palabra en seis intentos."
                                image="/images/wordle-canario-web.png"
                                projectUrl="https://wordlecanario.com"
                                projectLinkText="Jugar al Wordle Canario"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="Pasión Colchonera"
                                tags="Branding / Social"
                                year="2021"
                                desc="Pasión Colchonera fue un trabajo de branding para un proyecto deportivo en redes, donde desarrollé piezas clave de identidad y presencia visual: diseños para Instagram, banner de Twitter, foto de perfil y recursos para historias destacadas."
                                image="/images/pasion-colchonera.webp"
                                detailImage="/images/pasion-colchonera-banner.jpg"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="Fondo Segunda"
                                tags="Editorial / Diseño"
                                year="2020"
                                desc="Co-fundación de la web Fondo Segunda, medio referencia de la Segunda División del fútbol español. Diseño editorial profesional combinando diseño, estadísticas y artículos de opinión. Maqueté y trabajé en el diseño de la Guía de la temporada 2019/20."
                                image="/images/fondo-segunda.jpg"
                                detailImage="/images/guia-fondo-segunda.jpeg"
                                projectUrl="https://fondosegunda.com"
                                projectLinkText="Visitar Fondo Segunda"
                                onOpenModal={setSelectedImage}
                            />

                            {/* Duplicate for Marquee Loop */}
                            <ProjectCard
                                title="Dentro del Pleno"
                                tags="Datos / Scrollytelling"
                                year="2025"
                                desc="Pieza interactiva y visual, pensada como un ejercicio de scrollytelling, que resume el año 2025 en los plenos del Congreso de los Diputados."
                                image="/images/dentro-del-pleno.png"
                                projectUrl="https://dentrodelpleno.pages.dev"
                                projectLinkText="Ver Dentro del Pleno"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="AforoLab"
                                tags="Datos / Deporte"
                                year="2025"
                                desc="Plataforma de analítica de asistencia a los estadios de fútbol de LaLiga, con visualizaciones interactivas que permiten comparar diferentes métricas entre los clubes que componen las competiciones profesionales del fútbol español."
                                image="/images/aforolab.png"
                                projectUrl="https://aforolab.pages.dev"
                                projectLinkText="Visitar AforoLab"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="Kike Pérez - La mil y pico"
                                tags="Diseño Gráfico"
                                year="2023"
                                desc="Diseño del cartel base de la gira y adaptaciones para distintas funciones y recintos, manteniendo una identidad visual común."
                                image="/images/kikeperez.jpg"
                                detailImage="/images/kikeperez.jpg"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="Wordle Canario"
                                tags="Web / Viral"
                                year="2022"
                                desc="Adaptación cultural del famoso juego. Logró viralidad y cobertura mediática, demostrando el poder de los productos digitales locales."
                                image="/images/wordle-canario-web.png"
                                projectUrl="https://wordlecanario.com"
                                projectLinkText="Jugar al Wordle Canario"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="Pasión Colchonera"
                                tags="Branding / Social"
                                year="2021"
                                desc="Redifición de identidad visual para perfiles sociales. Banners, templates y línea gráfica coherente."
                                image="/images/pasion-colchonera.webp"
                                detailImage="/images/pasion-colchonera-banner.jpg"
                                onOpenModal={setSelectedImage}
                            />
                            <ProjectCard
                                title="Fondo Segunda"
                                tags="Editorial / Diseño"
                                year="2020"
                                desc="Co-fundación de la web Fondo Segunda, medio referencia de la Segunda División del fútbol español. Diseño editorial profesional combinando diseño, estadísticas y artículos de opinión. Diseñé la Guía de la temporada 2019/20."
                                image="/images/fondo-segunda.jpg"
                                detailImage="/images/guia-fondo-segunda.jpeg"
                                projectUrl="https://fondosegunda.com"
                                projectLinkText="Visitar Fondo Segunda"
                                onOpenModal={setSelectedImage}
                            />

                        </div>
                    </div>
                </section>

                {/* About / Intro Section */}
                <section id="sobre-mi" className="section">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            className="about-grid"
                        >
                            <div className="about-text">
                                <h2>Más allá del título</h2>
                                <p>
                                    Soy graduado en <strong>Ciencia Política y de la Administración</strong>, y mi pasión está en la intersección entre
                                    lo <strong>digital</strong> y lo <strong>institucional</strong>. Me muevo cómodo entre documentos técnicos, hojas de cálculo,
                                    normativa, expedientes y líneas de tiempo de vídeo.
                                </p>
                                <p>
                                    En entornos donde la información suele ser densa, mi trabajo es actuar como <strong>"traductor"</strong>,
                                    convirtiendo datos, normas y documentos en algo claro, visual y útil, que se entienda rápido
                                    y llegue a quien tiene que llegar.
                                </p>
                                <p>
                                    Muchas de las habilidades que uso hoy las he aprendido de forma <strong>autodidacta</strong>. Suelo explorar por mi
                                    cuenta cualquier herramienta nueva, entender su lógica y adaptarla rápidamente a lo que necesito.
                                    Aprendo probando, entendiendo el sistema y aplicándolo a proyectos reales.
                                </p>
                            </div>
                            <div className="about-stats">
                                <div className="stat-item">
                                    <div className="stat-icon-wrapper">
                                        <Brain size={32} className="text-accent" />
                                    </div>
                                    <span className="stat-number">Estrategia</span>
                                    <span className="stat-label">Comprender el contexto</span>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon-wrapper">
                                        <Palette size={32} className="text-secondary" />
                                    </div>
                                    <span className="stat-number">Visual</span>
                                    <span className="stat-label">Comunicar con claridad</span>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon-wrapper">
                                        <Zap size={32} style={{ color: '#F2C811' }} />
                                    </div>
                                    <span className="stat-number">Resolución</span>
                                    <span className="stat-label">Aprender y ejecutar</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Story Section */}
                <section id="mi-historia" className="section">
                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="story-content"
                        >
                            <div className="story-banner">
                                <div className="story-text">
                                    <h2 className="">Empecé metiéndome donde no sabía... y encontrando cómo hacerlo funcionar</h2>
                                    <p>
                                        Hacía diseños, inventaba bases de datos y contaba historias sin saber por qué. <br />
                                        Años después entendí que ya estaba construyendo mi forma de pensar.
                                    </p>
                                    <Link to="/mi-historia" className="btn-text">
                                        Un poco de mi historia <ArrowRight size={18} />
                                    </Link>
                                </div>
                                <div className="story-image">
                                    <img src="/images/photo01.png" alt="Yo de pequeño trasteando con un portátil" />
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="herramientas" className="section bg-dim">

                    <div className="container">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h2 className="section-title">Mis herramientas</h2>

                            <div className="skills-grid">

                                {/* 1. Diseño y Social Media */}
                                <div className="skill-card glass-panel">
                                    <div className="skill-header">
                                        <PenTool className="text-accent" size={32} />
                                        <h3>Diseño y vídeo</h3>
                                    </div>
                                    <p className="skill-desc">Creación de contenido visual de alto impacto y gestión de formatos virales.</p>

                                    <div className="tool-grid">
                                        <ToolBadge type="adobe-ps" label="Ps" name="Photoshop" />
                                        <ToolBadge type="adobe-ai" label="Ai" name="Illustrator" />
                                        <ToolBadge type="adobe-pr" label="Pr" name="Premiere Pro" />
                                        <ToolBadge type="brand-meta" icon={<Instagram size={14} />} name="Instagram" />
                                        <ToolBadge type="brand-tiktok" label="Tk" name="TikTok" />
                                    </div>
                                </div>

                                {/* 2. Datos y Estrategia */}
                                <div className="skill-card glass-panel">
                                    <div className="skill-header">
                                        <BarChart3 className="text-secondary" size={32} />
                                        <h3>Datos y análisis</h3>
                                    </div>
                                    <p className="skill-desc">Capacidad para transformar datos brutos en insights claros para la toma de decisiones.</p>

                                    <div className="tool-grid">
                                        <ToolBadge type="office-xl" label="X" name="Excel Avanzado" />
                                        <ToolBadge type="office-pb" label="Pb" name="PowerBI" />
                                        <ToolBadge type="brand-qgis" label="Qg" name="QGIS" />
                                        <ToolBadge type="brand-spss" label="S" name="SPSS" />
                                        <ToolBadge type="office-xl" label="S" name="Google Sheets" />
                                        <ToolBadge type="text-accent" icon={<Code2 size={14} />} name="SQL" />
                                    </div>
                                </div>

                                {/* 3. Gestión y Admin */}
                                <div className="skill-card glass-panel">
                                    <div className="skill-header">
                                        <Briefcase className="text-accent" size={32} />
                                        <h3>Gestión y comunicación</h3>
                                    </div>
                                    <p className="skill-desc">Perfil administrativo con soltura en herramientas de organización y redacción técnica.</p>

                                    <div className="tool-grid">
                                        <ToolBadge type="office-wd" label="W" name="Word / Redacción" />
                                        <ToolBadge type="office-pp" label="P" name="PowerPoint" />
                                        <ToolBadge type="office-wd" icon={<Mail size={14} />} name="Outlook" />
                                        <ToolBadge type="adobe-id" label="Id" name="InDesign" />
                                        <ToolBadge type="text-secondary" icon={<Globe size={14} />} name="WordPress" />
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="trayectoria" className="section">
                    <div className="container">
                        <h2 className="section-title">Trayectoria</h2>
                        <div className="timeline">
                            <TimelineItem
                                role="Trabajo técnico-institucional"
                                place="Prácticas · Desarrollo y Comunicación"
                                period="Diciembre 2023 – Junio 2024"
                                description="Soporte integral en tareas de comunicación y gestión técnica: redacción y maquetación de documentos, notas de prensa y administración de redes sociales. Realización de todo el ciclo de análisis de datos para informes y encuestas (recogida, depuración y visualización) y sintetización de normativas y convocatorias en criterios claros. Colaboración activa en la coordinación interna y con otras entidades."
                            />
                            <TimelineItem
                                role="Grado en Ciencia Política y de la Administración"
                                place="Universidade de Santiago de Compostela"
                                period="2020 – 2024"
                                description="Formación con fuerte carga metodológica y analítica. Especialización en estadística aplicada y técnicas de investigación social (cuantitativas y cualitativas), combinada con el estudio profundo de la gestión pública, la estrategia política y la comunicación. Análisis de decisiones, comportamiento electoral y evaluación de políticas públicas."
                            />
                        </div>
                    </div>
                </section>



                {/* Contact Section */}
                <section id="contacto" className="section contact-section">
                    <div className="container text-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h2><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>¿Hablamos?</div></h2>
                            <p className="contact-lead"> <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                Estoy disponible ;)
                            </div></p>
                            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                                <a href="mailto:jdiegotejeras@gmail.com" className="btn btn-primary btn-large">
                                    <Mail className="btn-icon" /> Enviar correo
                                </a>
                                <a href="https://www.linkedin.com/in/juandiegotejerasosa/" className="btn btn-outline btn-large" target="_blank" rel="noopener noreferrer">
                                    <LinkedInIcon size={20} className="btn-icon" /> LinkedIn
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>© {new Date().getFullYear()} Juan Diego Tejera.</p>
                </div>
            </footer>

            {/* Lightbox Modal */}
            {
                selectedImage && (
                    <div className="lightbox" onClick={() => setSelectedImage(null)}>
                        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                                <X size={24} />
                            </button>
                            <img src={selectedImage} alt="Vista detallada" />
                        </div>
                    </div>
                )
            }
        </div >
    );
}

// Sub-components for cleaner code
const LinkedInIcon = ({ size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

function SocialLink({ href, icon, label }) {
    return (
        <a href={href} className="social-link" aria-label={label} target="_blank" rel="noopener noreferrer">
            {icon}
        </a>
    );
}


function ToolBadge({ type, label, icon, name }) {
    return (
        <div className="tool-badge" title={name}>
            <span className={`brand-box ${type}`}>
                {icon || label}
            </span>
            <span>{name}</span>
        </div>
    );
}

function SkillCard({ icon, title, desc }) {
    return (
        <motion.div className="skill-card glass-panel" whileHover={{ y: -5 }}>
            <div className="skill-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </motion.div>
    );
}

function TimelineItem({ role, place, period, description }) {
    return (
        <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
                <span className="timeline-date">{period}</span>
                <h3>{role}</h3>
                <h4>{place}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
}

function ProjectCard({ title, tags, year, desc, image, projectUrl, projectLinkText, detailImage, onOpenModal }) {

    // Handler for viewing detail
    const handleViewDetail = (e) => {
        if (!projectUrl && onOpenModal && (detailImage || image)) {
            e.preventDefault();
            onOpenModal(detailImage || image);
        }
    };

    return (
        <motion.div className="project-card" whileHover={{ y: -5 }}>
            {image && (
                <div
                    className="project-image-container"
                    onClick={handleViewDetail}
                    style={{ cursor: !projectUrl ? 'pointer' : 'default' }}
                >
                    <img src={image} alt={title} draggable="false" />
                    {/* Optional overlay hint for clickable images */}
                    {!projectUrl && (
                        <div className="image-overlay-hint">
                            <Maximize2 size={24} color="#fff" />
                        </div>
                    )}
                </div>
            )}
            <div className="project-content">
                <div className="project-header">
                    <span className="project-tags">{tags}</span>
                    <span className="project-year">{year}</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>

                <div className="project-footer">
                    {/* If it's a web project, show standard link. If it's design, show "Ver imagen/detalle" triggering modal */}
                    {projectUrl ? (
                        <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="link-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            {projectLinkText || "Visitar web"} <ExternalLink size={14} />
                        </a>
                    ) : (
                        <button
                            className="link-text-btn"
                            onClick={(e) => { e.preventDefault(); onOpenModal(detailImage || image); }}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}
                        >
                            Ver proyecto <Maximize2 size={14} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default Home;
