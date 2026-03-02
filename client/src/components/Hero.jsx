import { useEffect, useRef } from 'react';

export default function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        const count = window.innerWidth < 768 ? 40 : 80;
        for (let i = 0; i < count; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <section className="hero" id="hero">
            <div className="hero-canvas"><canvas ref={canvasRef}></canvas></div>
            <div className="hero-bg">
                <div className="hero-gradient hero-gradient-1"></div>
                <div className="hero-gradient hero-gradient-2"></div>
                <div className="hero-gradient hero-gradient-3"></div>
                <div className="hero-grid"></div>
                <div className="scanline"></div>
            </div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge"><span className="dot"></span> Now Enrolling — Ages 5 to 14</div>
                    <h1>Forging Young Minds<br /><span className="highlight gradient-text">for Tomorrow</span></h1>
                    <p className="hero-sub">Where Proficiency Defines Progress, Not Age</p>
                    <p className="hero-tagline">12 Levels · 6 Pillars · 1 Mission — Excellence.</p>
                    <div className="hero-ctas">
                        <a href="#pillars" className="btn btn-primary btn-lg magnetic">Explore Our Program ↓</a>
                        <a href="#enroll" className="btn btn-outline btn-lg magnetic">Book Free Assessment</a>
                    </div>
                    <div className="hero-trust">
                        <div className="trust-badge"><span className="badge-icon">🎓</span> Ages 5–14</div>
                        <div className="trust-badge"><span className="badge-icon">📊</span> 12 Mastery Levels</div>
                        <div className="trust-badge"><span className="badge-icon">🏆</span> Competition Ready</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
