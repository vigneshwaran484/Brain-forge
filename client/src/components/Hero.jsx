import { useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

export default function Hero() {
    const canvasRef = useRef(null);
    const canvas3dRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvas3d = canvas3dRef.current;
        if (!canvas || !canvas3d) return;

        const ctx = canvas.getContext('2d');
        const ctx3d = canvas3d.getContext('2d');
        let particles = [];
        let animId;
        const isMobile = window.innerWidth < 768;

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            if (!isMobile) {
                canvas3d.width = 500;
                canvas3d.height = 500;
            }
        }
        resize();

        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);

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

        const count = isMobile ? 40 : 80;
        for (let i = 0; i < count; i++) particles.push(new Particle());

        let angle = 0;
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
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Mouse attraction
            if (!isMobile) {
                const mx = mouseRef.current.x;
                const my = mouseRef.current.y;
                particles.forEach(p => {
                    const dx = mx - p.x;
                    const dy = my - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mx, my);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist / 200)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });

                // 3D wireframe drawing
                ctx3d.clearRect(0, 0, 500, 500);
                angle += 0.008;
                const cx = 250, cy = 250;
                const verts = [];
                const size = 80 + Math.sin(angle * 2) * 10;
                for (let i = 0; i < 12; i++) {
                    const lat = Math.acos(-1 + (2 * i) / 11);
                    const lon = Math.sqrt(12 * Math.PI) * lat + angle;
                    verts.push({
                        x: cx + size * Math.cos(lon) * Math.sin(lat) + Math.sin(angle + i) * 30,
                        y: cy + size * Math.sin(lon) * Math.sin(lat) + Math.cos(angle + i) * 20,
                        z: size * Math.cos(lat)
                    });
                }
                const shiftX = (mx - window.innerWidth / 2) / 50;
                const shiftY = (my - window.innerHeight / 2) / 50;
                verts.forEach(v => { v.x += shiftX; v.y += shiftY; });

                for (let i = 0; i < verts.length; i++) {
                    for (let j = i + 1; j < verts.length; j++) {
                        const dx = verts[i].x - verts[j].x;
                        const dy = verts[i].y - verts[j].y;
                        if (Math.sqrt(dx * dx + dy * dy) < size * 1.8) {
                            const depth = (verts[i].z + verts[j].z) / (size * 2);
                            ctx3d.beginPath();
                            ctx3d.moveTo(verts[i].x, verts[i].y);
                            ctx3d.lineTo(verts[j].x, verts[j].y);
                            ctx3d.strokeStyle = `rgba(0, 240, 255, ${0.1 + depth * 0.15})`;
                            ctx3d.lineWidth = 0.8;
                            ctx3d.stroke();
                        }
                    }
                }
                verts.forEach(v => {
                    const depth = (v.z + size) / (size * 2);
                    ctx3d.beginPath();
                    ctx3d.arc(v.x, v.y, 2 + depth * 2, 0, Math.PI * 2);
                    ctx3d.fillStyle = `rgba(0, 240, 255, ${0.2 + depth * 0.4})`;
                    ctx3d.fill();
                });
            }

            animId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
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
            <div className="hero-3d"><canvas ref={canvas3dRef}></canvas></div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-logo-wrapper reveal">
                        <img src={logo} alt="Brain Forge" className="hero-main-logo" />
                    </div>
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

