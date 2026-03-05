export default function Testimonials() {
    return (
        <section className="section testimonials-section" id="testimonials">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Testimonials</span>
                    <h2 className="section-title">Trusted by Forward-Thinking Parents</h2>
                    <p className="section-subtitle">Hear from families who chose excellence.</p>
                </div>
                <div className="testimonials-section-content">
                    <div className="testimonials-list reveal">
                        <div className="bento-card wide">
                            <div className="bento-quote">"</div>
                            <div className="bento-stars">★★★★★</div>
                            <p className="bento-text">"My 7-year-old was placed in Level 4 based on proficiency — not age. That flexibility is what sets Brain Forge apart. She's thriving and actually excited about learning."</p>
                            <div className="bento-author">
                                <div className="bento-avatar">AP</div>
                                <div><div className="bento-name">Ananya Patel</div><div className="bento-role">Parent of Meera, Age 7</div></div>
                            </div>
                        </div>
                        <div className="bento-card tall">
                            <div className="bento-quote">"</div>
                            <div className="bento-stars">★★★★★</div>
                            <p className="bento-text">"The six-pillar approach is brilliant. My son doesn't just study math — he connects it with science, tech, and creativity. Brain Forge has completely transformed how he thinks."</p>
                            <div className="bento-author">
                                <div className="bento-avatar">RS</div>
                                <div><div className="bento-name">Rajesh Sharma</div><div className="bento-role">Parent of Arjun, Age 11</div></div>
                            </div>
                        </div>
                        <div className="bento-card wide">
                            <div className="bento-quote">"</div>
                            <div className="bento-stars">★★★★★</div>
                            <p className="bento-text">"Within 6 months, my daughter won her first Math Olympiad medal. The competition-readiness pathway built into Brain Forge made all the difference. Worth every penny."</p>
                            <div className="bento-author">
                                <div className="bento-avatar">PK</div>
                                <div><div className="bento-name">Priya Kumar</div><div className="bento-role">Parent of Siya, Age 9</div></div>
                            </div>
                        </div>
                    </div>

                    <div className="stats-bento-section reveal reveal-delay-2">
                        <h3 className="stats-heading">Key Numbers</h3>
                        <div className="stats-grid">
                            <div className="bento-card">
                                <div className="bento-stat">
                                    <div className="bento-stat-number" style={{ color: 'var(--blue)' }}>12</div>
                                    <div className="bento-stat-label">Mastery Levels</div>
                                </div>
                            </div>
                            <div className="bento-card">
                                <div className="bento-stat">
                                    <div className="bento-stat-number" style={{ color: 'var(--green)' }}>6</div>
                                    <div className="bento-stat-label">Learning Pillars</div>
                                </div>
                            </div>
                            <div className="bento-card">
                                <div className="bento-stat">
                                    <div className="bento-stat-number" style={{ color: 'var(--gold)' }}>🏆</div>
                                    <div className="bento-stat-label">Competition-Ready</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
