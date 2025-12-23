import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ScrollableProjectList = ({ children }) => {
    const { t } = useTranslation();
    const listRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (listRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
            const hasOverflow = scrollWidth > clientWidth;
            setShowArrows(hasOverflow);
            setCanScrollLeft(scrollLeft > 0);
            // Use a small tolerance for float calculation
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);

        const list = listRef.current;
        if (list) {
            list.addEventListener('scroll', checkScroll);
        }

        // Give content time to load/render sizes
        const timeout = setTimeout(checkScroll, 100);

        return () => {
            window.removeEventListener('resize', checkScroll);
            if (list) list.removeEventListener('scroll', checkScroll);
            clearTimeout(timeout);
        };
    }, [children]);

    const scroll = (direction) => {
        if (listRef.current) {
            const { current } = listRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="scrollable-projects-container" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
            {showArrows && (
                <button
                    className={`projects-scroll-arrow ${!canScrollLeft ? 'disabled' : ''}`}
                    onClick={() => scroll('left')}
                    style={{
                        position: 'absolute',
                        left: '-15px',
                        zIndex: 10,
                        opacity: canScrollLeft ? 1 : 0,
                        pointerEvents: canScrollLeft ? 'auto' : 'none'
                    }}
                    aria-label={t('navigation.scroll_left')}
                    disabled={!canScrollLeft}
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            <div className="node-projects-list" ref={listRef}>
                {children}
            </div>

            {showArrows && (
                <button
                    className={`projects-scroll-arrow ${!canScrollRight ? 'disabled' : ''}`}
                    onClick={() => scroll('right')}
                    style={{
                        position: 'absolute',
                        right: '-15px',
                        zIndex: 10,
                        opacity: canScrollRight ? 1 : 0,
                        pointerEvents: canScrollRight ? 'auto' : 'none'
                    }}
                    aria-label={t('navigation.scroll_right')}
                    disabled={!canScrollRight}
                >
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
};

export default ScrollableProjectList;
