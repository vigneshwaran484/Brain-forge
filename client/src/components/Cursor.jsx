import { useEffect, useRef } from 'react';

export default function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const trailRef = useRef([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) return;

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
        };

        const animateRing = () => {
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.left = `${ringPos.current.x}px`;
                ringRef.current.style.top = `${ringPos.current.y}px`;
            }
            requestAnimationFrame(animateRing);
        };

        const handleMouseEnter = () => ringRef.current?.classList.add('hovering');
        const handleMouseLeave = () => ringRef.current?.classList.remove('hovering');

        const attachHoverListeners = () => {
            const targets = document.querySelectorAll('a, button, .pillar-card, .rpg-node, .faq-question, .comp-card, .feature-card, .assess-card, .delivery-mode, .social-icon, .bento-card');
            targets.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        // Magnetic effect logic
        const handleMagnetic = (e) => {
            const btn = e.currentTarget;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        };
        const resetMagnetic = (e) => {
            e.currentTarget.style.transform = '';
        };

        const attachMagneticListeners = () => {
            const magnetics = document.querySelectorAll('.magnetic');
            magnetics.forEach(el => {
                el.addEventListener('mousemove', handleMagnetic);
                el.addEventListener('mouseleave', resetMagnetic);
            });
        };

        // Cursor trail
        const createTrail = () => {
            if (trailRef.current.length >= 8) {
                const old = trailRef.current.shift();
                old.remove();
            }
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.cssText = `left:${mousePos.current.x}px;top:${mousePos.current.y}px;width:4px;height:4px;background:rgba(0,240,255,0.3);opacity:0.4;transition:opacity 0.5s ease, transform 0.5s ease;`;
            document.body.appendChild(p);
            trailRef.current.push(p);
            requestAnimationFrame(() => {
                p.style.opacity = '0';
                p.style.transform = 'scale(0)';
            });
            setTimeout(() => {
                if (p.parentNode) p.remove();
                const idx = trailRef.current.indexOf(p);
                if (idx > -1) trailRef.current.splice(idx, 1);
            }, 500);
        };

        const trailInterval = setInterval(createTrail, 60);

        window.addEventListener('mousemove', onMouseMove);
        animateRing();
        attachHoverListeners();
        attachMagneticListeners();

        // Re-attach listeners on route change or major DOM updates if needed
        // For simple landing page, one set is usually enough or use MutationObserver
        const observer = new MutationObserver(() => {
            attachHoverListeners();
            attachMagneticListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            clearInterval(trailInterval);
            observer.disconnect();
            trailRef.current.forEach(p => p.remove());
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dotRef}></div>
            <div className="cursor-ring" ref={ringRef}></div>
        </>
    );
}
