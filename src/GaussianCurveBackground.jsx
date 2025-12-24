import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * GaussianCurveBackground
 * 
 * A high-performance canvas-based background that renders a minimalist
 * Gaussian curve reacting to mouse movement with spring physics.
 */
const GaussianCurveBackground = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const shouldReduceMotion = useReducedMotion();

    // Settings
    const config = {
        lineColor: 'rgba(168, 85, 247, 0.25)', // Purple/White blend
        glowColor: 'rgba(168, 85, 247, 0.1)',
        pointCount: 160,
        mouseRadius: 150,
        mouseStrength: 0.4,
        springStiffness: 0.08,
        damping: 0.85,
        breathingSpeed: 0.001,
        breathingAmplitude: 15
    };

    // State for points and interaction
    const pointsRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const timeRef = useRef(0);
    const drawProgressRef = useRef(0);

    // Initial drawing animation
    useEffect(() => {
        const startTime = Date.now();
        const duration = 2000; // 2 seconds

        const animateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            drawProgressRef.current = progress;

            if (progress < 1) {
                requestAnimationFrame(animateProgress);
            }
        };

        requestAnimationFrame(animateProgress);
    }, []);

    // 1. Intersection Observer to pause when not visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // 2. Initialize Points and Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const rect = containerRef.current.getBoundingClientRect();

            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const ctx = canvas.getContext('2d');
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            // Initialize/Re-initialize points
            const newPoints = [];
            const spacing = rect.width / (config.pointCount - 1);
            const mean = rect.width / 2;
            const sigma = rect.width * 0.15;
            const amplitude = rect.height * 0.4;
            const baseline = rect.height * 0.7;

            for (let i = 0; i < config.pointCount; i++) {
                const x = i * spacing;
                // Gaussian Formula: y = baseline - A * exp(-(x-mu)^2 / 2sigma^2)
                const yBase = baseline - amplitude * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(sigma, 2)));
                newPoints.push({
                    x,
                    yBase,
                    yCurrent: yBase,
                    yTarget: yBase,
                    velocity: 0
                });
            }
            pointsRef.current = newPoints;
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 3. Mouse Movement Tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // 4. Animation Loop
    useEffect(() => {
        let animationFrameId;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const render = () => {
            if (!isVisible || shouldReduceMotion) {
                // Just draw static if needed and stop loop
                if (shouldReduceMotion) drawStatic();
                return;
            }

            timeRef.current += config.breathingSpeed;
            const h = canvas.height / window.devicePixelRatio;
            const w = canvas.width / window.devicePixelRatio;

            ctx.clearRect(0, 0, w, h);

            // Update Points Physics
            const points = pointsRef.current;
            const mouse = mouseRef.current;

            for (let i = 0; i < points.length; i++) {
                const p = points[i];

                // 1. Breathing effect target
                const breath = Math.sin(timeRef.current + i * 0.05) * config.breathingAmplitude;
                const currentBase = p.yBase + breath;

                // 2. Mouse influence
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.yCurrent;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let mouseOffset = 0;

                if (dist < config.mouseRadius) {
                    const influence = Math.exp(-Math.pow(dist, 2) / (2 * Math.pow(config.mouseRadius * 0.5, 2)));
                    // Push down or pull up factor
                    mouseOffset = (mouse.y - p.yBase) * influence * config.mouseStrength;
                }

                const targetY = currentBase + mouseOffset;

                // 3. Spring physics
                const force = (targetY - p.yCurrent) * config.springStiffness;
                p.velocity += force;
                p.velocity *= config.damping;
                p.yCurrent += p.velocity;
            }

            // Draw Path
            ctx.beginPath();
            ctx.strokeStyle = config.lineColor;
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = config.lineColor;

            // Calculate how many points to draw based on progress
            const progress = drawProgressRef.current;
            const pointsToDraw = Math.floor(points.length * progress);
            const actualPoints = pointsToDraw || points.length;

            ctx.moveTo(points[0].x, points[0].yCurrent);

            // Use quadratic curves for smoothness
            for (let i = 0; i < Math.min(actualPoints - 1, points.length - 1); i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].yCurrent + points[i + 1].yCurrent) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].yCurrent, xc, yc);
            }

            ctx.stroke();

            // Cleanup shadow for performance on other elements if any
            ctx.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(render);
        };

        const drawStatic = () => {
            const h = canvas.height / window.devicePixelRatio;
            const w = canvas.width / window.devicePixelRatio;
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
            ctx.strokeStyle = config.lineColor;
            ctx.lineWidth = 1.5;
            const points = pointsRef.current;
            if (points.length === 0) return;
            ctx.moveTo(points[0].x, points[0].yBase);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].yBase);
            }
            ctx.stroke();
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isVisible, shouldReduceMotion]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    opacity: 0.8
                }}
            />
            {/* Removed the bottom fade div to allow global background integration */}
        </div>
    );
};

export default GaussianCurveBackground;
