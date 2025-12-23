import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';
import translationGL from './locales/gl/translation.json';

// Recursos de traducción
const resources = {
    es: {
        translation: translationES
    },
    en: {
        translation: translationEN
    },
    gl: {
        translation: translationGL
    }
};

i18n
    // Detectar idioma del usuario
    .use(LanguageDetector)
    // Pasar i18n a react-i18next
    .use(initReactI18next)
    // Inicializar
    .init({
        resources,
        fallbackLng: 'es', // Idioma por defecto si no detecta otro
        debug: true, // Útil para ver en consola si faltan traducciones

        interpolation: {
            escapeValue: false // React ya protege contra XSS
        }
    });

export default i18n;
