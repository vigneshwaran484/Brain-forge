export default function Footer() {
    return (
        <>
            <section className="final-cta" id="final-cta">
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="reveal"><span className="section-label">Ready?</span>
                        <h2 className="section-title">Ready to Forge Excellence?</h2>
                        <p className="section-subtitle">Start your child's journey from Curious to Champion.</p>
                    </div>
                    <div className="final-cta-buttons reveal reveal-delay-2">
                        <a href="#enroll" className="btn btn-primary btn-lg magnetic">Book Free Assessment →</a>
                        <a href="#" className="btn btn-outline btn-lg magnetic">Download Brochure</a>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <a href="#" className="nav-logo" style={{ marginBottom: '8px' }}>
                                <div className="logo-icon">🧠</div>Brain Forge
                            </a>
                            <p>Forging Young Minds for Tomorrow. A proficiency-based educational program for children aged 5–14.</p>
                            <div className="footer-newsletter"><input type="email" placeholder="Subscribe to newsletter..." /><button>Subscribe</button></div>
                            <div className="footer-socials" style={{ marginTop: '16px' }}>
                                <div className="social-icon" title="Facebook">f</div>
                                <div className="social-icon" title="Instagram">ig</div>
                                <div className="social-icon" title="Twitter">𝕏</div>
                                <div className="social-icon" title="YouTube">▶</div>
                                <div className="social-icon" title="LinkedIn">in</div>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h4>Quick Links</h4><a href="#pillars">The 6 Pillars</a><a href="#pathway">12-Level Pathway</a><a href="#competition">Competition Prep</a><a href="#enroll">Free Assessment</a><a href="#faq">FAQ</a>
                        </div>
                        <div className="footer-col">
                            <h4>Programs</h4><a href="#pathway">Junior Tier</a><a href="#pathway">Senior Tier</a><a href="#pathway">Competition Competent</a><a href="#pathway">Champion Tier</a>
                        </div>
                        <div className="footer-col">
                            <h4>Contact</h4><a href="mailto:hello@brainforge.in">hello@brainforge.in</a><a href="tel:+919876543210">+91 98765 43210</a><a href="#enroll">Book Assessment</a>
                        </div>
                    </div>
                    <div className="footer-tagline">Made with 💜 for young minds</div>
                    <div className="footer-bottom"><span>© 2025 Brain Forge. All rights reserved.</span>
                        <div className="footer-legal"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
                    </div>
                </div>
            </footer>
        </>
    );
}
