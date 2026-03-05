import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
            <div className="container">
                <a href="#" className="nav-logo">
                    <img src={logo} alt="Brain Forge" className="logo-img" />
                    <span>Brain Forge</span>
                </a>
                <div className={`nav-links${open ? ' open' : ''}`} id="navLinks">
                    <a href="#pillars" onClick={() => setOpen(false)}>Pillars</a>
                    <a href="#pathway" onClick={() => setOpen(false)}>Pathway</a>
                    <a href="#competition" onClick={() => setOpen(false)}>Competitions</a>
                    <a href="#curriculum" onClick={() => setOpen(false)}>Curriculum</a>
                    <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
                    <div className="mobile-cta-only">
                        <a href="#enroll" className="btn btn-primary" onClick={() => setOpen(false)}>Book Free Assessment</a>
                    </div>
                </div>
                <div className="nav-cta">
                    <a href="/Brain-Forge-Brochure.pdf" download="Brain-Forge-Brochure.pdf" className="btn btn-outline magnetic">Download Brochure</a>
                    <a href="#enroll" className="btn btn-primary magnetic">Book Free Assessment</a>
                </div>
                <div className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
                    <span></span><span></span><span></span>
                </div>
            </div>
        </nav>
    );
}
