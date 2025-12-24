import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedDataIcon = ({ isHovered }) => {
    // Paths for different states
    // "High" is the normal full bar (default state)
    // "Low" is collapsed to the axis
    const bar1 = { high: "M18 17V9", low: "M18 17V17" };
    const bar2 = { high: "M13 17V5", low: "M13 17V17" };
    const bar3 = { high: "M8 17V14", low: "M8 17V17" }; // Middle bar

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ overflow: 'visible' }}
        >
            <path d="M3 3v18h18" /> {/* Axis */}

            {/* Bar 1 */}
            <motion.path
                d={bar1.high} // Default state is High
                animate={isHovered ? { d: [bar1.high, bar1.low, bar1.high] } : { d: bar1.high }}
                transition={{ duration: 0.6, times: [0, 0.4, 1], ease: "easeInOut", delay: 0.1 }}
            />
            {/* Bar 2 - slightly delayed */}
            <motion.path
                d={bar2.high}
                animate={isHovered ? { d: [bar2.high, bar2.low, bar2.high] } : { d: bar2.high }}
                transition={{ duration: 0.6, times: [0, 0.4, 1], ease: "easeInOut", delay: 0 }}
            />
            {/* Bar 3 */}
            <motion.path
                d={bar3.high}
                animate={isHovered ? { d: [bar3.high, bar3.low, bar3.high] } : { d: bar3.high }}
                transition={{ duration: 0.6, times: [0, 0.4, 1], ease: "easeInOut", delay: 0.2 }}
            />
        </svg>
    );
};

export const AnimatedProductIcon = ({ isHovered }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ overflow: 'visible' }}
        >
            {/* Top Layer */}
            <motion.polygon
                points="12 2 2 7 12 12 22 7 12 2"
                initial={{ y: 0 }}
                animate={isHovered ? { y: [0, -6, 0, -2, 0] } : { y: 0 }}
                transition={{ duration: 0.8, times: [0, 0.3, 0.6, 0.8, 1] }}
            />
            {/* Bottom Layer */}
            <motion.polyline
                points="2 17 12 22 22 17"
                initial={{ y: 0 }}
                animate={isHovered ? { y: [0, 4, 0, 1, 0] } : { y: 0 }}
                transition={{ duration: 0.8, times: [0, 0.3, 0.6, 0.8, 1], delay: 0.1 }}
            />
            {/* Middle Layer */}
            <motion.polyline
                points="2 12 12 17 22 12"
                // Middle layer slightly stable or subtle move
                animate={isHovered ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
        </svg>
    );
};

export const AnimatedCreativeIcon = ({ isHovered }) => {
    // Magic dust particles (dots)
    const dots = [
        { cx: 15, cy: 5, r: 1 },
        { cx: 19, cy: 8, r: 1.2 },
        { cx: 11, cy: 7, r: 0.8 },
        { cx: 18, cy: 2, r: 1 },
        { cx: 22, cy: 5, r: 0.9 },
        { cx: 13, cy: 11, r: 0.7 },
        { cx: 9, cy: 4, r: 1.1 },
        { cx: 17, cy: 13, r: 0.8 },
        { cx: 21, cy: 11, r: 0.6 }
    ];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ overflow: 'visible' }}
        >
            {/* Magic Dust (Dots) - Rendered first to be behind the wand */}
            {dots.map((dot, i) => (
                <motion.circle
                    key={i}
                    cx={dot.cx}
                    cy={dot.cy}
                    r={dot.r}
                    fill="currentColor"
                    stroke="none"
                    initial={{ opacity: 0.3, scale: 0.8 }}
                    animate={isHovered ? {
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                    } : { opacity: 0.3, scale: 0.8 }} // Visible but static/subtle when not hovered
                    transition={{
                        duration: 3 + (i % 3) * 1, // Slower (3-5s)
                        repeat: Infinity, // Always breathing slightly or just on hover? User said "notarse que existe"
                        // If we want movement ONLY on hover, we keep repeat condition. 
                        // But user said "notarse que existe", implies visibility. 
                        // Let's keep the breathing ONLY on hover to distinguish states, but raise base opacity.
                        repeat: isHovered ? Infinity : 0,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Wand Path - Rendered last to be on top */}
            <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
        </svg>
    );
};

export const AnimatedAllIcon = ({ isHovered }) => {
    // Grid of squares that pulse/scale on hover
    const squares = [
        { x: 3, y: 3 },
        { x: 10, y: 3 },
        { x: 17, y: 3 },
        { x: 3, y: 10 },
        { x: 10, y: 10 },
        { x: 17, y: 10 },
        { x: 3, y: 17 },
        { x: 10, y: 17 },
        { x: 17, y: 17 }
    ];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ overflow: 'visible' }}
        >
            {squares.map((sq, i) => (
                <motion.rect
                    key={i}
                    x={sq.x}
                    y={sq.y}
                    width="5"
                    height="5"
                    rx="1"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={isHovered ? {
                        scale: [1, 1.1, 1],
                        opacity: [1, 0.7, 1]
                    } : { scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: i * 0.05,
                        ease: "easeInOut"
                    }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                />
            ))}
        </svg>
    );
};
