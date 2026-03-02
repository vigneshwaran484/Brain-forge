export default function Comparison() {
    const rows = [
        { label: 'Progression', bad: '✕ Age-based', good: '✓ Proficiency-based' },
        { label: 'Subjects', bad: '✕ 1–2 subjects', good: '✓ 6 integrated pillars' },
        { label: 'Thinking Skills', bad: '✕ Rarely included', good: '✓ HOTS at every level' },
        { label: 'Competition Prep', bad: '✕ Separate programs', good: '✓ Built-in pathway' },
        { label: 'Personality Dev', bad: '✕ Not included', good: '✓ Fully integrated' },
        { label: 'Art & Creativity', bad: '✕ Rarely included', good: '✓ Core component' },
        { label: 'Levels', bad: '✕ 3–4 levels', good: '✓ 12 mastery levels' },
        { label: 'Assessment', bad: '✕ Test-only', good: '✓ Multi-dimensional' },
        { label: 'Recognition', bad: '✕ Certificate', good: '✓ Grand Master Title' }
    ];

    return (
        <section className="section" id="why">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">The Comparison</span>
                    <h2 className="section-title">Why Parents Choose Brain Forge</h2>
                    <p className="section-subtitle">See how Brain Forge compares to traditional programs.</p>
                </div>
                <div className="comparison-table reveal">
                    <div className="comparison-col comparison-traditional">
                        <h3>Traditional Programs</h3>
                        {rows.map((r, i) => (
                            <div key={i} className="comp-row"><span>{r.label}</span><span style={{ color: 'var(--red)' }}>{r.bad}</span></div>
                        ))}
                    </div>
                    <div className="comparison-col comparison-brainforge">
                        <h3>✦ Brain Forge</h3>
                        {rows.map((r, i) => (
                            <div key={i} className="comp-row"><span>{r.label}</span><span style={{ color: 'var(--green)' }}>{r.good}</span></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
