
import React, { useState, useEffect } from "react";
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
    ArrowRight
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
    const location = useLocation();

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
                        <a href="#sobre-mi">Sobre mí</a>
                        <a href="#habilidades">Habilidades</a>
                        <a href="#experiencia">Experiencia</a>
                        <a href="#proyectos">Proyectos</a>
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
                        <motion.h1 variants={fadeInUp} className="hero-title">
                            Hola, soy <span className="gradient-text">Diego Tejera :)</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="hero-lead">
                            Convierto información compleja en contenido <strong>visual, claro y útil</strong>.
                            Combino análisis de datos, diseño y estrategia para ayudar a tomar mejores decisiones.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="hero-actions">
                            <a href="#proyectos" className="btn btn-primary">Ver Proyectos</a>
                            <a href="#contacto" className="btn btn-outline">Hablemos</a>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-socials">
                            <SocialLink href="https://www.linkedin.com/in/juandiegotejerasosa/" icon={<Linkedin size={20} />} label="LinkedIn" />
                            <SocialLink href="mailto:jdiegotejeras@gmail.com" icon={<Mail size={20} />} label="Email" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-image-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
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
                {/* Projects Marquee Section (Moved Top) */}
                <section id="proyectos" className="section" style={{ paddingBottom: '2rem' }}>
                    <div className="container">
                        <h2 className="section-title">Mis proyectos</h2>
                    </div>

                    <div className="projects-marquee">
                        <div className="marquee-track">
                            {/* Set 1 */}
                            <ProjectCard
                                title="AforoLab"
                                tags="Analytics / Deporte"
                                year="2025"
                                desc="Plataforma de analítica de asistencia a los estadios de fútbol de LaLiga, con visualizaciones interactivas que permiten comparar diferentes métricas entre los clubes que componen las competiciones profesionales del fútbol español."
                                image="/images/aforolab.png"
                            />
                            <ProjectCard
                                title="Kike Pérez - La mil y pico"
                                tags="Diseño Gráfico"
                                year="2023"
                                desc="Diseño del cartel base de la gira y adaptaciones para distintas funciones y recintos, manteniendo una identidad visual común."
                                image="/images/kikeperez.jpg"
                            />
                            <ProjectCard
                                title="Wordle Canario"
                                tags="Web / Viral"
                                year="2022"
                                desc="Adaptación cultural del famoso juego. Logró viralidad y cobertura mediática, demostrando el poder de los productos digitales locales."
                                image="/images/wordle-canario-web.png"
                            />
                            <ProjectCard
                                title="Pasión Colchonera"
                                tags="Branding / Social"
                                year="2021"
                                desc="Redifición de identidad visual para perfiles sociales. Banners, templates y línea gráfica coherente."
                                image="/images/pasion-colchonera.webp"
                            />
                            <ProjectCard
                                title="Fondo Segunda"
                                tags="Editorial / Diseño"
                                year="2020"
                                desc="Co-fundación de la web Fondo Segunda, medio referencia de la Segunda División del fútbol español. Diseño editorial profesional combinando diseño, estadísticas y artículos de opinión."
                                image="/images/fondo-segunda.jpg"
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
                                    Soy graduado en <strong>Ciencia Política y de la Administración</strong>, pero mi pasión real está en la intersección entre
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
                                    <h2 className="">Todo esto empezó mucho antes de tener edad para llamarlo "trabajo"</h2>
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
                <section id="habilidades" className="section bg-dim">

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
                                        <ToolBadge type="brand-capcut" label="Cp" name="CapCut" />
                                        <ToolBadge type="brand-meta" icon={<Instagram size={14} />} name="Instagram" />
                                        <ToolBadge type="brand-tiktok" label="Tk" name="TikTok" />
                                    </div>
                                </div>

                                {/* 2. Datos y Estrategia */}
                                <div className="skill-card glass-panel">
                                    <div className="skill-header">
                                        <BarChart3 className="text-secondary" size={32} />
                                        <h3>Datos y Análisis</h3>
                                    </div>
                                    <p className="skill-desc">Capacidad para transformar datos brutos en insights claros para la toma de decisiones.</p>

                                    <div className="tool-grid">
                                        <ToolBadge type="office-xl" label="X" name="Excel Avanzado" />
                                        <ToolBadge type="office-pb" label="Pb" name="PowerBI" />
                                        <ToolBadge type="brand-qgis" label="Qg" name="QGIS (Mapas)" />
                                        <ToolBadge type="brand-spss" label="S" name="SPSS" />
                                        <ToolBadge type="office-xl" label="S" name="Google Sheets" />
                                        <ToolBadge type="text-accent" icon={<Code2 size={14} />} name="SQL" />
                                    </div>
                                </div>

                                {/* 3. Gestión y Admin */}
                                <div className="skill-card glass-panel">
                                    <div className="skill-header">
                                        <Briefcase className="text-accent" size={32} />
                                        <h3>Gestión y Comunicación</h3>
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
                <section id="experiencia" className="section">
                    <div className="container">
                        <h2 className="section-title">Trayectoria</h2>
                        <div className="timeline">
                            <TimelineItem
                                role="Trabajo Técnico-Institucional"
                                place="Prácticas · Desarrollo y Comunicación"
                                period="Diciembre 2023 – Junio 2024"
                                description="Soporte integral en tareas de comunicación y gestión técnica: redacción y maquetación de documentos, notas de prensa y administración de redes sociales. Realización de todo el ciclo de análisis de datos para informes y encuestas (recogida, depuración y visualización) y sintetización de normativas y convocatorias en criterios claros. Colaboración activa en la coordinación interna y con otras entidades."
                            />
                            <TimelineItem
                                role="Grado en Ciencia Política"
                                place="Universidade de Santiago de Compostela"
                                period="2020 – 2024"
                                description="Formación en análisis de políticas públicas y estructura institucional. Base sólida para entender la administración y la toma de decisiones."
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
                            <h2>¿Hablamos?</h2>
                            <p className="contact-lead">
                                Estoy disponible para colaborar en proyectos de comunicación, análisis de datos o diseño.
                            </p>
                            <a href="mailto:jdiegotejeras@gmail.com" className="btn btn-primary btn-large">
                                <Mail className="btn-icon" /> Enviar correo
                            </a>

                            <div className="footer-socials">
                                <a href="https://www.linkedin.com/in/juandiegotejerasosa/">LinkedIn</a>
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
        </div>
    );
}

// Sub-components for cleaner code
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

function ProjectCard({ title, tags, year, desc, image }) {
    return (
        <motion.div className="project-card" whileHover={{ y: -5 }}>
            {image && (
                <div className="project-image-container">
                    <img src={image} alt={title} />
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
                    <span className="link-text">Ver proyecto <ExternalLink size={14} /></span>
                </div>
            </div>
        </motion.div>
    );
}

export default Home;
