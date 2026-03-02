export default function Assessment() {
    const assessCards = [
        { icon: '📝', title: 'Formative Assessment', desc: 'Ongoing tracking of daily learning progress' },
        { icon: '📦', title: 'Module Assessment', desc: 'Topic-level mastery verification' },
        { icon: '📊', title: 'Level Assessment', desc: 'Readiness evaluation for advancement' },
        { icon: '🧠', title: 'HOTS Assessment', desc: 'Critical thinking & higher-order growth' },
        { icon: '📂', title: 'Portfolio Review', desc: 'Holistic development documentation' },
        { icon: '🚪', title: 'Gateway Exams', desc: 'Tier advancement evaluations' }
    ];
    const recognitions = [
        { icon: '📜', text: 'Level Certificates' }, { icon: '🏅', text: 'Badges' },
        { icon: '🏆', text: 'Tier Trophies' }, { icon: '⭐', text: 'Brain Forge Star Awards' },
        { icon: '🛡️', text: 'Champion Shields' }, { icon: '👑', text: 'Grand Master Title', highlight: true }
    ];

    return (
        <section className="section assessment-section" id="assessment">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Assessment</span>
                    <h2 className="section-title">Multi-Dimensional Assessment Framework</h2>
                    <p className="section-subtitle">We measure growth across every dimension, not just test scores.</p>
                </div>
                <div className="assess-grid">
                    {assessCards.map((c, i) => (
                        <div key={i} className={`assess-card reveal reveal-delay-${i + 1}`}>
                            <div className="assess-icon">{c.icon}</div><h4>{c.title}</h4><p>{c.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="section-header reveal" style={{ marginBottom: '32px' }}>
                    <span className="section-label">Recognition</span>
                    <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Celebrate Every Achievement</h2>
                </div>
                <div className="recognition-grid reveal">
                    {recognitions.map((r, i) => (
                        <div key={i} className={`recognition-item${r.highlight ? ' highlight' : ''}`}>
                            <span className="rec-icon">{r.icon}</span> {r.text}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
