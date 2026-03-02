export default function Proficiency() {
    return (
        <section className="section" id="proficiency">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Our Philosophy</span>
                    <h2 className="section-title">Progress at Your Pace, Not Your Age</h2>
                    <p className="section-subtitle">Every child achieves real mastery before advancing.</p>
                </div>
                <div className="proficiency-grid">
                    <div className="reveal">
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: '20px' }}>Traditional System</h3>
                        <div className="prof-ladder">
                            {['Grade 8 — Age 13 only', 'Grade 7 — Age 12 only', 'Grade 6 — Age 11 only', 'Grade 5 — Age 10 only', 'Grade 4 — Age 9 only', 'Grade 3 — Age 8 only'].map((g, i) => (
                                <div key={i} className="rung">{g}</div>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#FF4444', marginTop: '12px', textAlign: 'center' }}>Rigid. One-size-fits-all.</p>
                    </div>
                    <div className="proficiency-messages reveal reveal-delay-2">
                        <div className="prof-msg"><span className="msg-icon">🚀</span><h4>6-year-old excels?</h4><p>Move forward to the next mastery level — no waiting.</p></div>
                        <div className="prof-msg"><span className="msg-icon">🤝</span><h4>10-year-old needs support?</h4><p>Build foundations without stigma — at their own pace.</p></div>
                        <div className="prof-msg"><span className="msg-icon">🎯</span><h4>Every child achieves REAL mastery</h4><p>75% minimum score required before advancing to the next level.</p></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
