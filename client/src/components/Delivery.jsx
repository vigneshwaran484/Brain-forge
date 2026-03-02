export default function Delivery() {
    const timeline = [
        { time: '5 min', title: 'Warm-Up', desc: 'Brain teaser' },
        { time: '15 min', title: 'Concept Intro', desc: 'Interactive teaching' },
        { time: '10 min', title: 'Guided Practice', desc: 'Worked examples' },
        { time: '10 min', title: 'Independent', desc: 'Solo problem-solving' },
        { time: '5 min', title: 'HOTS Challenge', desc: 'Critical thinking' },
        { time: '5 min', title: 'Wrap-Up', desc: 'Key takeaways' }
    ];
    const modes = [
        { icon: '🏫', text: 'Classroom Sessions' }, { icon: '📚', text: 'Proprietary Workbooks' },
        { icon: '💻', text: 'Digital Platform' }, { icon: '🏠', text: 'Home Practice' },
        { icon: '🔬', text: 'Project-Based Learning' }, { icon: '🚌', text: 'Field Trips' }
    ];

    return (
        <section className="section delivery-section" id="delivery">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">How It Works</span>
                    <h2 className="section-title">How Brain Forge Works</h2>
                    <p className="section-subtitle">A 50-minute session designed for maximum engagement and learning.</p>
                </div>
                <div className="timeline reveal">
                    {timeline.map((t, i) => (
                        <div key={i} className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-time">{t.time}</div>
                            <div className="timeline-title">{t.title}</div>
                            <div className="timeline-desc">{t.desc}</div>
                        </div>
                    ))}
                </div>
                <div className="delivery-modes reveal">
                    {modes.map((m, i) => (
                        <div key={i} className="delivery-mode"><span className="mode-icon">{m.icon}</span><span>{m.text}</span></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
