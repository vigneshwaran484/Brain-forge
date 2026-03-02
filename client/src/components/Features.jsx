export default function Features() {
    const features = [
        { icon: '⚙️', title: 'HOTS Integration', desc: 'Higher Order Thinking Skills embedded at every level. Children don\'t just memorize — they analyze, evaluate, and create.' },
        { icon: '🚀', title: 'Project-Based Learning', desc: 'Monthly cross-domain projects with real-world application of knowledge. Learn by doing, not just reading.' },
        { icon: '💻', title: 'Digital Platform', desc: 'Interactive online portal for practice, assessments, and progress tracking. Learn anytime, anywhere.' },
        { icon: '📈', title: 'Personalized Pace', desc: 'Individual learning curves respected. Advance when ready, strengthen when needed — no pressure, no stigma.' }
    ];

    return (
        <section className="section features-section" id="features">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Experience</span>
                    <h2 className="section-title">The Brain Forge Experience</h2>
                    <p className="section-subtitle">What makes learning with us truly different.</p>
                </div>
                <div className="features-grid">
                    {features.map((f, i) => (
                        <div key={i} className={`feature-card reveal reveal-delay-${i + 1}`}>
                            <div className="feature-icon">{f.icon}</div><h3>{f.title}</h3><p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
