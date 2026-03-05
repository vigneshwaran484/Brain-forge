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

        let animId;
        const animateRing = () => {
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.left = `${ringPos.current.x}px`;
                ringRef.current.style.top = `${ringPos.current.y}px`;
            }
            animId = requestAnimationFrame(animateRing);
        };
        animateRing();

        const handleMouseEnter = () => ringRef.current?.classList.add('hovering');
        const handleMouseLeave = () => ringRef.current?.classList.remove('hovering');

        const handleMagnetic = (e) => {
            const btn = e.currentTarget;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        };
        const resetMagnetic = (e) => { e.currentTarget.style.transform = ''; };

        const attachListeners = () => {
            document.querySelectorAll('a, button, .pillar-card, .faq-question').forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
            document.querySelectorAll('.magnetic').forEach(el => {
                el.addEventListener('mousemove', handleMagnetic);
                el.addEventListener('mouseleave', resetMagnetic);
            });
        };
        attachListeners();

        // Trail
        let trailInterval = setInterval(() => {
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.cssText = `left:${mousePos.current.x}px;top:${mousePos.current.y}px;width:5px;height:5px;background:rgba(0,240,255,0.35);border-radius:50%;position:fixed;pointer-events:none;z-index:10003;transition:opacity 0.5s,transform 0.5s;`;
            document.body.appendChild(p);
            trailRef.current.push(p);
            requestAnimationFrame(() => { p.style.opacity = '0'; p.style.transform = 'scale(0)'; });
            setTimeout(() => { p.remove(); trailRef.current = trailRef.current.filter(x => x !== p); }, 500);
        }, 60);

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
            clearInterval(trailInterval);
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
