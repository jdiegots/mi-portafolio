import React, { useState, useEffect, useRef } from "react";
import ScrollableProjectList from "./ScrollableProjectList";
import { useTranslation, Trans } from "react-i18next";
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
    Maximize2,
    Layers,
    Wand2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatedDataIcon, AnimatedProductIcon, AnimatedCreativeIcon } from "./AnimatedIcons";
import "./App.css";
import "./CoreAxes.css";
import "./HorizontalCards.css";
import "./SplitSection.css";

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
    const [activeIcon, setActiveIcon] = useState(null);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

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

            {/* Top Language Bar */}
            <div className={`lang-top-bar ${scrolled ? 'hidden' : ''}`}>
                <div className="lang-switcher">
                    <button
                        onClick={() => changeLanguage('es')}
                        className={i18n.language === 'es' || i18n.language?.startsWith('es') ? 'active' : ''}
                        title="Español"
                    >
                        <img src="/flags/es.png" alt="Español" className="lang-flag" /> ES
                    </button>
                    <span className="lang-separator">|</span>
                    <button
                        onClick={() => changeLanguage('gl')}
                        className={i18n.language === 'gl' || i18n.language?.startsWith('gl') ? 'active' : ''}
                        title="Galego"
                    >
                        <img src="/flags/gl.png" alt="Galego" className="lang-flag" /> GL
                    </button>
                    <span className="lang-separator">|</span>
                    <button
                        onClick={() => changeLanguage('en')}
                        className={i18n.language === 'en' || i18n.language?.startsWith('en') ? 'active' : ''}
                        title="English"
                    >
                        <img src="/flags/en.png" alt="English" className="lang-flag" /> EN
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className={`navbar ${scrolled ? "scrolled" : ""} `}>
                <div className="container nav-content">
                    <div className="logo">DT.</div>
                    <div className="nav-links">
                        <a href="#proyectos">{t('navbar.projects')}</a>
                        <a href="#sobre-mi">{t('navbar.about')}</a>
                        <a href="#mi-historia">{t('navbar.story')}</a>
                        <a href="#herramientas">{t('navbar.tools')}</a>
                        <a href="#experiencia">{t('navbar.experience')}</a>
                        <a href="#contacto" className="btn-contact">{t('navbar.contact')}</a>
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
                            {t('hero.role')}<br />
                            <span style={{ display: 'block', marginTop: '4px' }}>{t('hero.sub_role')}</span>
                        </motion.p>
                        <motion.h1
                            key={i18n.language}
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
                            {Array.from(t('hero.greeting')).map((char, i) => (
                                <motion.span
                                    key={`text-${i}-${i18n.language}`}
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: {
                                            y: 0,
                                            opacity: 1,
                                            transition: { duration: 0.4 }
                                        }
                                    }}
                                    style={{ display: "inline-block", marginRight: char === " " ? "0.25em" : "0" }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}

                            <span style={{ display: "inline-block", width: "0.25em" }}></span>

                            {/* Name - Simplified Gradient Scale */}
                            <motion.span
                                className="name-gradient-simple"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.5 }
                                    }
                                }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {t('hero.name')}
                            </motion.span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="hero-lead">
                            {t('hero.lead')}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="hero-actions">
                            <a href="#proyectos" className="btn btn-primary">{t('hero.cta_projects')}</a>
                            <a href="#contacto" className="btn btn-outline">{t('hero.cta_talk')}</a>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-socials">
                            <SocialLink href="https://www.linkedin.com/in/juandiegotejerasosa/" icon={<LinkedInIcon size={20} />} label="LinkedIn" />
                            <SocialLink href="mailto:jdiegotejeras@gmail.com" icon={<MailFilledIcon size={20} />} label="Email" />
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
                {/* Axes Section */}
                {/* Core Axes Section (Rows) */}
                {/* Axes Section */}
                <section className="core-axes-section" id="proyectos">
                    <div className="container" style={{ maxWidth: '1400px', marginBottom: '4rem' }}>
                        <h2 className="section-title">{t('sections.projects_title')}</h2>
                    </div>

                    <div className="core-axes-container">

                        {/* ROW 1: DATOS */}
                        <div className="core-axis-row">
                            {/* Wide Header */}
                            <div
                                className="core-header-wide"
                                onMouseEnter={() => setActiveIcon('data')}
                                onMouseLeave={() => setActiveIcon(null)}
                                onClick={() => setActiveIcon('data')}
                            >
                                <div className="header-content-left">
                                    <div className="header-icon-wrapper">
                                        <AnimatedDataIcon isHovered={activeIcon === 'data'} />
                                    </div>
                                    <div className="header-text">
                                        <h3>{t('axes.data_title')}</h3>
                                        <p>{t('axes.data_desc')}</p>
                                    </div>
                                </div>
                                <Link to="/datos" className="header-cta">
                                    {t('axes.data_cta')} <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* Projects List */}
                            <ScrollableProjectList>
                                <ProjectCard
                                    title="Dentro del Pleno"
                                    tags="Datos / Scrollytelling"
                                    year="2025"
                                    desc={t('projects.dentro_del_pleno.desc')}
                                    image="/images/dentro-del-pleno.png"
                                    projectUrl="https://dentrodelpleno.pages.dev"
                                    projectLinkText={t('projects.dentro_del_pleno.link')}
                                    onOpenModal={setSelectedImage}
                                />
                                <ProjectCard
                                    title="AforoLab"
                                    tags="Datos / Deporte"
                                    year="2025"
                                    desc={t('projects.aforolab.desc')}
                                    image="/images/aforolab.png"
                                    projectUrl="https://aforolab.pages.dev"
                                    projectLinkText={t('projects.aforolab.link')}
                                    onOpenModal={setSelectedImage}
                                />
                            </ScrollableProjectList>
                        </div>

                        {/* ROW 2: PRODUCTO */}
                        <div className="core-axis-row">
                            <div
                                className="core-header-wide"
                                onMouseEnter={() => setActiveIcon('product')}
                                onMouseLeave={() => setActiveIcon(null)}
                                onClick={() => setActiveIcon('product')}
                            >
                                <div className="header-content-left">
                                    <div className="header-icon-wrapper">
                                        <AnimatedProductIcon isHovered={activeIcon === 'product'} />
                                    </div>
                                    <div className="header-text">
                                        <h3>{t('axes.product_title')}</h3>
                                        <p>{t('axes.product_desc')}</p>
                                    </div>
                                </div>
                                <Link to="/producto" className="header-cta">
                                    {t('axes.product_cta')} <ArrowRight size={16} />
                                </Link>
                            </div>

                            <ScrollableProjectList>
                                <ProjectCard
                                    title="Wordle Canario"
                                    tags="Web / Viral"
                                    year="2022"
                                    desc={t('projects.wordle_canario.desc')}
                                    image="/images/wordle-canario-web.png"
                                    projectUrl="https://wordlecanario.com"
                                    projectLinkText={t('projects.wordle_canario.link')}
                                    onOpenModal={setSelectedImage}
                                />
                            </ScrollableProjectList>
                        </div>

                        {/* ROW 3: CREATIVIDAD */}
                        <div className="core-axis-row">
                            <div
                                className="core-header-wide"
                                onMouseEnter={() => setActiveIcon('creative')}
                                onMouseLeave={() => setActiveIcon(null)}
                                onClick={() => setActiveIcon('creative')}
                            >
                                <div className="header-content-left">
                                    <div className="header-icon-wrapper">
                                        <AnimatedCreativeIcon isHovered={activeIcon === 'creative'} />
                                    </div>
                                    <div className="header-text">
                                        <h3>{t('axes.creative_title')}</h3>
                                        <p>{t('axes.creative_desc')}</p>
                                    </div>
                                </div>
                                <Link to="/contenido" className="header-cta">
                                    {t('axes.creative_cta')} <ArrowRight size={16} />
                                </Link>
                            </div>

                            <ScrollableProjectList>
                                <ProjectCard
                                    title="Kike Pérez"
                                    tags="Diseño Gráfico"
                                    year="2023"
                                    desc={t('projects.kike_perez.desc')}
                                    image="/images/kikeperez.jpg"
                                    detailImage="/images/kikeperez.jpg"
                                    onOpenModal={setSelectedImage}
                                />
                                <ProjectCard
                                    title="Pasión Colchonera"
                                    tags="Branding / Social"
                                    year="2021"
                                    desc={t('projects.pasion_colchonera.desc')}
                                    image="/images/pasion-colchonera.webp"
                                    detailImage="/images/pasion-colchonera-banner.jpg"
                                    onOpenModal={setSelectedImage}
                                />
                            </ScrollableProjectList>
                        </div>

                    </div>
                </section>

                {/* NEW SPLIT SECTION: Tools (Left) & Experience (Right) */}
                <section className="section">
                    <div className="container" style={{ maxWidth: '1400px' }}>
                        <div className="split-content-container">

                            {/* LEFT COLUMN: Tools */}
                            <div className="split-col-left">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                >
                                    <h2 className="section-title">{t('sections.tools_title')}</h2>

                                    <div className="skills-grid">

                                        {/* 1. Datos y Estrategia */}
                                        <div className="skill-card glass-panel">
                                            <div className="skill-header">
                                                <BarChart3 className="text-secondary" size={28} />
                                                <h3>{t('sections.tools_data_title')}</h3>
                                            </div>
                                            <p className="skill-desc" style={{ marginBottom: '1rem' }}>{t('sections.tools_data_desc')}</p>
                                            <div className="tool-grid">
                                                <ToolBadge type="office-xl" label="X" name="Excel" />
                                                <ToolBadge type="office-pb" label="Pb" name="PowerBI" />
                                                <ToolBadge type="text-accent" icon={<Code2 size={14} />} name="SQL" />
                                                <ToolBadge type="text-warning" label="Py" name="Python" />
                                                <ToolBadge type="brand-qgis" label="Qg" name="QGIS" />
                                                <ToolBadge type="brand-spss" label="S" name="SPSS" />
                                            </div>
                                        </div>

                                        {/* 2. Diseño y Vídeo */}
                                        <div className="skill-card glass-panel">
                                            <div className="skill-header">
                                                <PenTool className="text-accent" size={28} />
                                                <h3>{t('sections.tools_design_title')}</h3>
                                            </div>
                                            <p className="skill-desc" style={{ marginBottom: '1rem' }}>{t('sections.tools_design_desc')}</p>
                                            <div className="tool-grid">
                                                <ToolBadge type="adobe-ps" label="Ps" name="Photoshop" />
                                                <ToolBadge type="adobe-ai" label="Ai" name="Illustrator" />
                                                <ToolBadge type="adobe-pr" label="Pr" name="Premiere Pro" />
                                                <ToolBadge type="text-accent" label="Fi" name="Figma" />
                                                <ToolBadge type="adobe-id" label="Id" name="InDesign" />
                                            </div>
                                        </div>

                                        {/* 3. Gestión y Comunicación */}
                                        <div className="skill-card glass-panel">
                                            <div className="skill-header">
                                                <Briefcase className="text-accent" size={28} />
                                                <h3>{t('sections.tools_management_title')}</h3>
                                            </div>
                                            <p className="skill-desc" style={{ marginBottom: '1rem' }}>{t('sections.tools_management_desc')}</p>
                                            <div className="tool-grid">
                                                <ToolBadge type="office-wd" label="W" name="Word" />
                                                <ToolBadge type="office-pp" label="P" name="PowerPoint" />
                                                <ToolBadge type="office-wd" icon={<Mail size={14} />} name="Outlook" />
                                                <ToolBadge type="text-secondary" icon={<Globe size={14} />} name="WordPress" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* DIVIDER */}
                            <div className="split-divider"></div>

                            {/* RIGHT COLUMN: Experience */}
                            <div className="split-col-right">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                >
                                    <h2 className="section-title">{t('sections.experience_title')}</h2>
                                    <div className="timeline">
                                        <TimelineItem
                                            role={t('timeline.practices.role')}
                                            place={t('timeline.practices.place')}
                                            period="Diciembre 2023 – Junio 2024"
                                            description={t('timeline.practices.desc')}
                                        />
                                        <TimelineItem
                                            role={t('timeline.degree.role')}
                                            place={t('timeline.degree.place')}
                                            period="2020 – 2024"
                                            description={t('timeline.degree.desc')}
                                        />
                                        <TimelineItem
                                            role="Co-fundador / Diseño"
                                            place="Fondo Segunda"
                                            period="2020"
                                            description={t('projects.fondo_segunda.desc')}
                                        />
                                    </div>
                                </motion.div>
                            </div>

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
                                <h2>{t('sections.about_title')}</h2>
                                <p>
                                    <Trans i18nKey="sections.about_intro">
                                        Soy graduado en <strong>Ciencia Política y de la Administración</strong>, y mi pasión está en la intersección entre
                                        lo <strong>digital</strong> y lo <strong>institucional</strong>. Me muevo cómodo entre documentos técnicos, hojas de cálculo,
                                        normativa, expedientes y líneas de tiempo de vídeo.
                                    </Trans>
                                </p>
                                <p>
                                    <Trans i18nKey="sections.about_translator">
                                        En entornos donde la información suele ser densa, mi trabajo es actuar como <strong>"traductor"</strong>,
                                        convirtiendo datos, normas y documentos en algo claro, visual y útil, que se entienda rápido
                                        y llegue a quien tiene que llegar.
                                    </Trans>
                                </p>
                                <p>
                                    <Trans i18nKey="sections.about_autodidact">
                                        Muchas de las habilidades que uso hoy las he aprendido de forma <strong>autodidacta</strong>. Suelo explorar por mi
                                        cuenta cualquier herramienta nueva, entender su lógica y adaptarla rápidamente a lo que necesito.
                                        Aprendo probando, entendiendo el sistema y aplicándolo a proyectos reales.
                                    </Trans>
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
                                    <h2 className="">{t('sections.story_title')}</h2>
                                    <p>
                                        {t('sections.story_desc')}
                                    </p>
                                    <Link to="/mi-historia" className="btn-text">
                                        {t('sections.story_cta')} <ArrowRight size={18} />
                                    </Link>
                                </div>
                                <div className="story-image">
                                    <img src="/images/photo01.png" alt="Yo de pequeño trasteando con un portátil" />
                                </div>
                            </div>

                        </motion.div>
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
                            <h2><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{t('sections.contact_title')}</div></h2>
                            <p className="contact-lead"> <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {t('sections.contact_lead')}
                            </div></p>
                            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                                <a href="mailto:jdiegotejeras@gmail.com" className="btn btn-primary btn-large">
                                    <MailFilledIcon size={20} className="btn-icon" /> {t('sections.send_email')}
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

const MailFilledIcon = ({ size = 24, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="1 3 22 18"
        fill="currentColor"
        className={className}
    >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

// Sub-components for cleaner code
const LinkedInIcon = ({ size = 24, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
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
                    <img src={image} alt={title} draggable="false" loading="lazy" />
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
