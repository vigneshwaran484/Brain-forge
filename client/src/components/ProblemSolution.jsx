export default function ProblemSolution() {
    return (
        <section className="section problem-section" id="problem">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">The Challenge</span>
                    <h2 className="section-title">Rethinking Education</h2>
                    <p className="section-subtitle">Traditional models limit potential. Brain Forge unlocks it.</p>
                </div>
                <div className="problem-grid">
                    <div className="problem-card reveal">
                        <h3>Traditional Education Has Limitations</h3>
                        <ul className="problem-list">
                            <li><span className="icon">✕</span><span>Age-based progression ignores individual pace</span></li>
                            <li><span className="icon">✕</span><span>Limited focus on critical thinking</span></li>
                            <li><span className="icon">✕</span><span>Fragmented subject learning</span></li>
                            <li><span className="icon">✕</span><span>No competition preparation pathway</span></li>
                        </ul>
                    </div>
                    <div className="solution-card reveal reveal-delay-2">
                        <h3>The Brain Forge Difference</h3>
                        <ul className="solution-list">
                            <li><span className="icon">✓</span><span>Proficiency-based mastery progression</span></li>
                            <li><span className="icon">✓</span><span>HOTS embedded at every level</span></li>
                            <li><span className="icon">✓</span><span>6 integrated learning pillars</span></li>
                            <li><span className="icon">✓</span><span>Built-in competition readiness</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
