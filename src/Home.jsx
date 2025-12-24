import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
import {
    ChevronDown,
    BarChart3,
    Code2,
    Palette,
    ArrowRight,
    X,
    ExternalLink,
    Briefcase,
    Building2,
    GraduationCap
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatedDataIcon, AnimatedProductIcon, AnimatedCreativeIcon, AnimatedAllIcon } from "./AnimatedIcons";
import "./App.css";
import "./CoreAxes.css";
import "./SplitSection.css";
import "./Mobile.css";
import "./ProjectsHex.css";
import GaussianCurveBackground from './GaussianCurveBackground';

// Project Data (Ecosystem)
const PROJECTS_DATA = [
    {
        id: 'dentro-pleno',
        area: 'datos',
        title: "Dentro del Pleno",
        year: "2025",
        tagShort: "Scrollytelling",
        image: "/images/dentro-del-pleno.png",
        url: "https://dentrodelpleno.pages.dev",
        highlights: [
            "Resumen interactivo de 2025.",
            "Visualización de votaciones complejas.",
            "Narrativa basada en datos puros."
        ]
    },
    {
        id: 'aforolab',
        area: 'datos',
        title: "AforoLab",
        year: "2025",
        tagShort: "Analytics",
        image: "/images/aforolab.png",
        url: "https://aforolab.pages.dev",
        highlights: [
            "Métricas de asistencia a estadios.",
            "Comparativa interactiva entre clubes.",
            "Insights sobre ocupación y ticketing."
        ]
    },
    {
        id: 'wordle',
        area: 'producto',
        title: "Wordle Canario",
        year: "2022",
        tagShort: "Web App",
        image: "/images/wordle-canario-web.png",
        url: "https://wordlecanario.com",
        highlights: [
            "Éxito viral en redes sociales.",
            "Diseño ligero y adictivo.",
            "Adaptación cultural del original."
        ]
    },
    {
        id: 'fondo-segunda',
        area: 'producto',
        title: "Fondo Segunda",
        year: "2019",
        tagShort: "Editorial",
        image: "/images/pasion-colchonera.webp", // Fallback if no specific img
        url: "https://fondosegunda.com",
        highlights: [
            "Cofundador de medio referencia.",
            "Maquetación de guías digitales.",
            "Gestión de producto informativo."
        ]
    },
    {
        id: 'kike-perez',
        area: 'creativo',
        title: "Kike Pérez",
        year: "2023",
        tagShort: "Branding",
        image: "/images/kikeperez.jpg",
        highlights: [
            "Diseño de cartelería nacional.",
            "Adaptación visual para recintos.",
            "Identidad coherente para gira."
        ]
    },
    {
        id: 'pasion-colchonera',
        area: 'creativo',
        title: "Pasión Colchonera",
        year: "2021",
        tagShort: "Social Media",
        image: "/images/pasion-colchonera-banner.jpg",
        highlights: [
            "Identidad visual deportiva.",
            "Creación de recursos para redes.",
            "Branding enfocado a engagement."
        ]
    }
];

function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'datos', 'producto', 'creativo'
    const [hoveredFilter, setHoveredFilter] = useState(null);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location]);

    const handleProjectClick = (project) => {
        if (selectedProject?.id === project.id) {
            setSelectedProject(null);
        } else {
            setSelectedProject(project);
        }
    };

    // Calculate number of columns based on window width
    const getColumns = () => {
        if (typeof window === 'undefined') return 4;
        const width = window.innerWidth;
        if (width >= 1200) return 4;
        if (width >= 768) return 3;
        if (width >= 480) return 2;
        return 1;
    };

    // Filter projects
    const filteredProjects = filter === 'all'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(p => p.area === filter);

    // Mouse tracking for gradient animation
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="app-container">
            <div className="global-background">
                {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className={`blob blob-${n}`}></div>)}
            </div>

            {/* Top Language Bar */}
            <div className={`lang-top-bar ${scrolled ? 'hidden' : ''}`}>
                <div className="lang-switcher">
                    {['es', 'gl', 'en'].map(lng => (
                        <React.Fragment key={lng}>
                            <button
                                onClick={() => changeLanguage(lng)}
                                className={i18n.language === lng || i18n.language?.startsWith(lng) ? 'active' : ''}
                            >
                                <img src={`/flags/${lng}.png`} alt={lng} className="lang-flag" /> {lng.toUpperCase()}
                            </button>
                            {lng !== 'en' && <span className="lang-separator">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <div className="container nav-content">
                    <div className="logo">DT.</div>
                    <div className="nav-links">
                        <a href="#contacto" className="btn-contact">{t('navbar.contact')}</a>
                    </div>
                </div>
            </nav>

            <section className="hero">
                <GaussianCurveBackground />
                <div className="container hero-content" style={{ justifyContent: 'center' }}>
                    <motion.div className="hero-text" initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <motion.p variants={fadeInUp} className="hero-kicker" style={{ alignSelf: 'flex-start', textAlign: 'left' }}>
                            {t('hero.role')}<br />
                            <span style={{ display: 'block', marginTop: '4px' }}>{t('hero.sub_role')}</span>
                        </motion.p>
                        <motion.h1 className="hero-title" variants={fadeInUp}>
                            {t('hero.greeting')} <span className="name-gradient-simple">{t('hero.name')}</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="hero-lead">{t('hero.lead')}</motion.p>
                        <motion.div variants={fadeInUp} className="hero-actions" style={{ justifyContent: 'center' }}>
                            <a href="#proyectos" className="btn btn-primary">{t('hero.cta_projects')}</a>
                            <a href="#contacto" className="btn btn-outline">{t('hero.cta_talk')}</a>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="hero-socials" style={{ justifyContent: 'center' }}>
                            <SocialLink href="https://linkedin.com/in/juandiegotejerasosa/" icon={<LinkedInIcon size={20} />} label="LinkedIn" />
                            <SocialLink href="mailto:jdiegotejeras@gmail.com" icon={<MailFilledIcon size={20} />} label="Email" />
                        </motion.div>
                    </motion.div>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="scroll-indicator">
                    <ChevronDown size={24} />
                </motion.div>
            </section>

            <main>
                <motion.section id="sobre-mi" className="section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
                    <div className="container">
                        <div className="about-grid">
                            <div className="about-text">
                                <h2>{t('sections.about_title')}</h2>
                                <p><Trans i18nKey="sections.about_intro">Soy graduado en <strong>Ciencia Política</strong>...</Trans></p>
                                <p><Trans i18nKey="sections.about_translator">Mi trabajo es actuar como <strong>"traductor"</strong>...</Trans></p>
                            </div>
                            <div className="about-image-container">
                                <div className="hero-img-wrapper" style={{ width: '300px', height: '380px', margin: '0 auto' }}>
                                    <img src="/images/foto-perfil.png" alt="Diego" style={{ borderRadius: '12px', objectFit: 'cover', width: '100%', height: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* PROJECTS SECTION - Minimalist with Icon Filters */}
                <motion.section id="proyectos" className="projects-section section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
                    <div className="container">
                        <div className="projects-section-header">
                            <h2 className="section-title">{t('sections.projects_title')}</h2>
                            <motion.p
                                className="projects-section-subtitle"
                                key={hoveredFilter || filter}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                {(hoveredFilter || filter) === 'all' && t('axes.allprojects_desc')}
                                {(hoveredFilter || filter) === 'datos' && t('axes.data_desc')}
                                {(hoveredFilter || filter) === 'producto' && t('axes.product_desc')}
                                {(hoveredFilter || filter) === 'creativo' && t('axes.creative_desc')}
                            </motion.p>
                        </div>

                        {/* Filter Icons (Centered) */}
                        <div className="filter-icons-container">
                            <FilterIcon
                                icon={<AnimatedAllIcon isHovered={hoveredFilter === 'all'} />}
                                label={t('axes.all_title')}
                                isActive={filter === 'all'}
                                onClick={() => setFilter('all')}
                                onHover={() => setHoveredFilter('all')}
                                onLeave={() => setHoveredFilter(null)}
                            />
                            <FilterIcon
                                icon={<AnimatedDataIcon isHovered={hoveredFilter === 'datos'} />}
                                label={t('axes.data_title')}
                                isActive={filter === 'datos'}
                                onClick={() => setFilter('datos')}
                                onHover={() => setHoveredFilter('datos')}
                                onLeave={() => setHoveredFilter(null)}
                            />
                            <FilterIcon
                                icon={<AnimatedProductIcon isHovered={hoveredFilter === 'producto'} />}
                                label={t('axes.product_title')}
                                isActive={filter === 'producto'}
                                onClick={() => setFilter('producto')}
                                onHover={() => setHoveredFilter('producto')}
                                onLeave={() => setHoveredFilter(null)}
                            />
                            <FilterIcon
                                icon={<AnimatedCreativeIcon isHovered={hoveredFilter === 'creativo'} />}
                                label={t('axes.creative_title')}
                                isActive={filter === 'creativo'}
                                onClick={() => setFilter('creativo')}
                                onHover={() => setHoveredFilter('creativo')}
                                onLeave={() => setHoveredFilter(null)}
                            />
                        </div>

                        {/* Unified Project Grid */}
                        <UnifiedProjectGrid
                            projects={filteredProjects}
                            selectedProject={selectedProject}
                            onProjectClick={handleProjectClick}
                            getColumns={getColumns}
                        />
                    </div>
                </motion.section>

                {/* SPLIT SECTION: Tools & Experience */}
                <motion.section id="herramientas" className="section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
                    <div className="container">
                        <div className="split-content-container">
                            <div className="split-col-left">
                                <h2 className="section-title-small">{t('sections.tools_title')}</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                                    {t('sections.tools_subtitle')}
                                </p>
                                <div className="skills-grid">
                                    <SkillCard
                                        icon={<BarChart3 size={32} />}
                                        title={t('sections.tools_data_title')}
                                        desc={t('sections.tools_data_desc')}
                                        tools={[
                                            { name: "Python", logo: "https://cdn.simpleicons.org/python" },
                                            { name: "R", logo: "https://cdn.simpleicons.org/r" },
                                            { name: "SQL", logo: "https://cdn.simpleicons.org/postgresql" },
                                            { name: "Excel", logo: "https://img.icons8.com/color/48/microsoft-excel-2019.png" },
                                            { name: "Power BI", logo: "https://img.icons8.com/color/48/power-bi.png" }
                                        ]}
                                    />
                                    <SkillCard
                                        icon={<Palette size={32} />}
                                        title={t('sections.tools_design_title')}
                                        desc={t('sections.tools_design_desc')}
                                        tools={[
                                            { name: "Premiere", logo: "https://img.icons8.com/color/48/adobe-premiere-pro.png" },
                                            { name: "Photoshop", logo: "https://img.icons8.com/color/48/adobe-photoshop.png" },
                                            { name: "After Effects", logo: "https://img.icons8.com/color/48/adobe-after-effects.png" },
                                            { name: "InDesign", logo: "https://img.icons8.com/color/48/adobe-indesign.png" },
                                            { name: "CapCut", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Capcut-icon.svg/960px-Capcut-icon.svg.png" }
                                        ]}
                                    />
                                    <SkillCard
                                        icon={<Code2 size={32} />}
                                        title={t('sections.tools_management_title')}
                                        desc={t('sections.tools_management_desc')}
                                        tools={[
                                            { name: "Notion", logo: "https://cdn.simpleicons.org/notion" },
                                            { name: "Office 365", logo: "https://img.icons8.com/color/48/microsoft-office-2019.png" },
                                            { name: "Wordpress", logo: "https://cdn.simpleicons.org/wordpress" }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="split-divider"></div>
                            <div className="split-col-right" id="trayectoria">
                                <h2 className="section-title-small">{t('sections.experience_title')}</h2>
                                <div className="timeline">
                                    <TimelineItem
                                        role={t('timeline.csif.role')}
                                        place={t('timeline.csif.place')}
                                        period={t('timeline.csif.period')}
                                        description={t('timeline.csif.desc')}
                                        icon={<img src="/images/logos/csif.png" alt="CSIF" />}
                                    />
                                    <TimelineItem
                                        role={t('timeline.practices.role')}
                                        place={t('timeline.practices.place')}
                                        period={t('timeline.practices.period')}
                                        description={t('timeline.practices.desc')}
                                        icon={<Briefcase size={20} />}
                                    />
                                    <TimelineItem
                                        role={t('timeline.degree.role')}
                                        place={t('timeline.degree.place')}
                                        period={t('timeline.degree.period')}
                                        description={t('timeline.degree.desc')}
                                        icon={<img src="/images/logos/usc.png" alt="USC" style={{ padding: '5px', objectFit: 'contain' }} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section id="mi-historia" className="section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
                    <div className="container"><div className="story-content"><div className="story-banner">
                        <div className="story-text">
                            <h2>{t('sections.story_title')}</h2>
                            <p>{t('sections.story_desc')}</p>
                            <Link to="/mi-historia" className="btn-text">{t('sections.story_cta')} <ArrowRight size={18} /></Link>
                        </div>
                        <div className="story-image"><img src="/images/photo01.png" alt="Historia" /></div>
                    </div></div></div>
                </motion.section>

                <motion.section id="contacto" className="section contact-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
                    <div className="container text-center">
                        <h2>{t('sections.contact_title')}</h2>
                        <p className="contact-lead">{t('sections.contact_lead')}</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                            <a href="mailto:jdiegotejeras@gmail.com" className="btn btn-primary btn-large"><MailFilledIcon size={20} className="btn-icon" /> {t('sections.send_email')}</a>
                            <a href="https://linkedin.com/in/juandiegotejerasosa/" className="btn btn-outline btn-large" target="_blank" rel="noopener noreferrer"><LinkedInIcon size={20} className="btn-icon" /> LinkedIn</a>
                        </div>
                    </div>
                </motion.section>
            </main>

            <footer><div className="container"><p>© {new Date().getFullYear()} Juan Diego Tejera.</p></div></footer>
        </div>
    );
}

// Sub-components
function FilterIcon({ icon, label, isActive, onClick, onHover, onLeave }) {
    return (
        <div
            className={`filter-icon ${isActive ? 'active' : ''}`}
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className="filter-icon-graphic">{icon}</div>
            <div className="filter-icon-label">{label}</div>
        </div>
    );
}

function UnifiedProjectGrid({ projects, selectedProject, onProjectClick, getColumns }) {
    return (
        <>
            <div className="projects-compact-grid">
                {projects.map((project, idx) => (
                    <ProjectTile
                        key={project.id}
                        project={project}
                        isActive={selectedProject?.id === project.id}
                        onClick={() => onProjectClick(project)}
                        idx={idx}
                    />
                ))}
            </div>

            {/* Modal for project details */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => onProjectClick(selectedProject)}
                />
            )}
        </>
    );
}

function ProjectTile({ project, isActive, onClick, idx }) {
    return (
        <motion.div
            className={`project-tile ${isActive ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.4,
                delay: idx * 0.03,
                ease: "easeInOut"
            }}
            onClick={onClick}
            role="button"
            aria-expanded={isActive}
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className="project-tile-image">
                <img src={project.image} alt={project.title} />
            </div>

            <div className="project-tile-overlay">
                <span className="project-tile-tag">{project.tagShort}</span>
                <h3 className="project-tile-title">{project.title}</h3>
            </div>

            <div className="project-tile-expand-hint">+</div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }) {
    return (
        <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
        >
            <motion.div
                className="project-modal-content"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="project-modal-close"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    <X size={24} />
                </button>

                <div className="project-modal-header">
                    <div className="project-modal-image">
                        <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-modal-info">
                        <span className="project-modal-meta">{project.tagShort} • {project.year}</span>
                        <h2 className="project-modal-title">{project.title}</h2>
                    </div>
                </div>

                <div className="project-modal-body">
                    <ul className="project-modal-highlights">
                        {project.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                        ))}
                    </ul>

                    <div className="project-modal-actions">
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-modal-btn project-modal-btn-primary"
                            >
                                Ver proyecto <ExternalLink size={18} />
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="project-modal-btn project-modal-btn-secondary"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Icons and Helpers
const LinkedInIcon = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
const MailFilledIcon = ({ size = 24 }) => <svg width={size} height={size} viewBox="1 3 22 18" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>;
const SocialLink = ({ href, icon, label }) => <a href={href} className="social-link" target="_blank" rel="noopener noreferrer">{icon}</a>;
const SkillCard = ({ icon, title, desc, tools }) => (
    <motion.div className="skill-card glass-panel" whileHover={{ y: -5 }}>
        <div className="skill-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
        {tools && (
            <div className="skill-pills">
                {tools.map((tool, i) => (
                    <span key={i} className="skill-pill">
                        <img
                            src={tool.logo}
                            alt=""
                            style={{
                                width: '12px',
                                height: '12px',
                                marginRight: '6px',
                                verticalAlign: 'middle',
                                display: 'inline-block'
                            }}
                        />
                        {tool.name}
                    </span>
                ))}
            </div>
        )}
    </motion.div>
);
const TimelineItem = ({ role, place, period, description, icon }) => (
    <div className="timeline-item">
        <div className="timeline-marker">
            {icon}
        </div>
        <div className="timeline-content">
            <span className="timeline-date">{period}</span>
            <h3>{role}</h3>
            <h4>{place}</h4>
            <p>{description}</p>
        </div>
    </div>
);
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default Home;
