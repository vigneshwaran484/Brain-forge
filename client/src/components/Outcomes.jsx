export default function Outcomes() {
    const stats = [
        { target: 12, label: 'Mastery Levels' },
        { target: 6, label: 'Core Pillars' },
        { target: 75, suffix: '%', label: 'Min. Advancement Score' },
        { target: 100, suffix: '%', label: 'Holistic Development' }
    ];
    const tags = ['🏅 Competition Ready', '🧠 Critical Thinkers', '💬 Confident Communicators', '💻 Digital Natives', '🔧 Creative Problem Solvers'];

    return (
        <section className="section" id="outcomes">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Results</span>
                    <h2 className="section-title">Measurable Excellence</h2>
                    <p className="section-subtitle">Clear benchmarks. Real outcomes. Proven framework.</p>
                </div>
                <div className="stats-row">
                    {stats.map((s, i) => (
                        <div key={i} className={`stat-card reveal reveal-delay-${i + 1}`}>
                            <div className="stat-number" data-target={s.target} data-suffix={s.suffix || ''}>{s.target}{s.suffix || ''}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
                <div className="outcomes-tags reveal">
                    {tags.map((t, i) => <div key={i} className="outcome-tag">{t}</div>)}
                </div>
            </div>
        </section>
    );
}
