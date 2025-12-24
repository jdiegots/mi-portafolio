import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * StatsBackground Component
 * 
 * A subtle, data-centric background animation featuring a mathematical curve 
 * and a reordering scatter plot. Optimized for performance and readability.
 */
const StatsBackground = () => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const shouldReduceMotion = useReducedMotion();

    // Settings
    const config = {
        color: 'rgba(168, 85, 247, 0.15)', // Purple accent
        pointColor: 'rgba(255, 255, 255, 0.1)',
        curveOpacity: 0.2,
        pointCount: 30,
        speed: shouldReduceMotion ? 0 : 1,
    };

    // 1. Lifecycle: Pause when out of viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.01 } // Very sensitive to ensure it starts/stops correctly
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 2. Generate static data for points to avoid re-renders
    const points = useMemo(() => {
        return Array.from({ length: config.pointCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: 10 + Math.random() * 15,
            delay: Math.random() * -20,
        }));
    }, []);

    // 3. Mathematical path for a "Normal Distribution" curve
    const width = 1000;
    const height = 400;
    const mean = width / 2;
    const sigma = 150;

    const curvePath = useMemo(() => {
        const pathPoints = [];

        for (let x = 0; x <= width; x += 10) {
            // Gaussian function: y = A * exp(-(x - mean)^2 / (2 * sigma^2))
            const y = height - (height * 0.8 * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(sigma, 2))));
            pathPoints.push(`${x},${y}`);
        }
        return `M ${pathPoints.join(' L ')}`;
    }, [width, height, mean, sigma]);

    // If not visible, return empty container to keep observer target
    if (!isVisible) {
        return <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: -1 }} />;
    }

    return (
        <div
            ref={containerRef}
            className="stats-background-container"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                overflow: 'hidden',
                pointerEvents: 'none',
                background: 'transparent',
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 500"
                preserveAspectRatio="none"
                style={{ filter: 'blur(1px)' }}
            >
                {/* Axes - Very subtle */}
                <line x1="100" y1="450" x2="900" y2="450" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="500" y1="50" x2="500" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="5,5" />

                {/* Animated Normal Distribution Curve */}
                <motion.path
                    d={curvePath}
                    fill="none"
                    stroke={config.color}
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: config.curveOpacity }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />

                {/* Second fainted shadow curve for depth */}
                {!shouldReduceMotion && (
                    <motion.path
                        d={curvePath}
                        fill="none"
                        stroke={config.color}
                        strokeWidth="4"
                        style={{ filter: 'blur(10px)' }}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.1 }}
                        transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
                    />
                )}

                {/* Reordering Scatter Plot Points */}
                {points.map((p) => (
                    <motion.circle
                        key={p.id}
                        r={p.size}
                        fill={config.pointColor}
                        initial={{ cx: `${p.x}%`, cy: `${p.y}%`, opacity: 0 }}
                        animate={shouldReduceMotion ? { opacity: 0.2 } : {
                            cx: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`, `${p.x}%`],
                            cy: [`${p.y}%`, `${p.y + (Math.random() * 10 - 5)}%`, `${p.y}%`],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: p.delay,
                        }}
                    />
                ))}

                {/* Highlight points near the mean (the "insights") */}
                {[mean - 50, mean, mean + 50].map((mx, idx) => (
                    <motion.circle
                        key={`highlight-${idx}`}
                        cx={mx}
                        cy={150 + idx * 20}
                        r="2"
                        fill="rgba(168, 85, 247, 0.4)"
                        animate={shouldReduceMotion ? { opacity: 0.3 } : {
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: idx * 1.2
                        }}
                    />
                ))}
            </svg>

            {/* Subtle overlay gradient to blend with the existing blobs */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--bg-dark) 90%)',
                    opacity: 0.6
                }}
            />
        </div>
    );
};

export default StatsBackground;
