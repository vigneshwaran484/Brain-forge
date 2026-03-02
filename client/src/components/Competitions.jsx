export default function Competitions() {
    const comps = [
        { icon: '📐', title: 'Mathematics', badges: ['IMO', 'ISMO', 'Math Kangaroo', 'SASMO'] },
        { icon: '🧪', title: 'Science', badges: ['NSO', 'NSTSE', 'Science Olympiad'] },
        { icon: '✍️', title: 'English', badges: ['IEO', 'Spelling Bee', 'Essay Comp.'] },
        { icon: '🖥️', title: 'Cyber', badges: ['NCO', 'Hackathons', 'AI Challenge'] },
        { icon: '🌐', title: 'General Knowledge', badges: ['IGKO', 'Quiz Champs', 'Current Affairs'] },
        { icon: '🎨', title: 'Art, Craft & Personality', badges: ['IADO', 'Art Olympiad', 'Craft Challenge'] }
    ];

    return (
        <section className="section competition-section" id="competition">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Excel &amp; Compete</span>
                    <h2 className="section-title">Built-In Competition Excellence Pathway</h2>
                    <p className="section-subtitle">Prepare your child for national &amp; international recognition.</p>
                </div>
                <div className="competition-grid">
                    {comps.map((c, i) => (
                        <div key={i} className={`comp-card reveal reveal-delay-${i + 1}`}>
                            <div className="comp-icon">{c.icon}</div>
                            <h4>{c.title}</h4>
                            <div className="comp-badges">
                                {c.badges.map((b, j) => <span key={j} className="comp-badge">{b}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
