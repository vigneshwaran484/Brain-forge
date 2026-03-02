import { useState } from 'react';

export default function Enrollment() {
    const [form, setForm] = useState({ childName: '', age: '', parentName: '', phone: '', email: '', interestLevel: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) setSubmitted(true);
        } catch (err) {
            console.error('Enrollment error:', err);
        }
        setLoading(false);
    };

    return (
        <section className="section" id="enroll">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Get Started</span>
                    <h2 className="section-title">Begin Your Child's Mastery Journey</h2>
                    <p className="section-subtitle">Book a free assessment to discover your child's current proficiency level.</p>
                </div>
                <div className="enroll-wrapper">
                    <div className="enroll-info reveal">
                        <h3>Start with a Free Assessment</h3>
                        <p>Discover where your child stands and get a personalized learning pathway recommendation from our education experts.</p>
                        <div className="enroll-badges">
                            <div className="enroll-badge"><div className="eb-icon">🚫</div><span>No Age Discrimination</span></div>
                            <div className="enroll-badge"><div className="eb-icon">🛤️</div><span>Personalized Learning Path</span></div>
                            <div className="enroll-badge"><div className="eb-icon">🏆</div><span>Competition Preparation Included</span></div>
                            <div className="enroll-badge"><div className="eb-icon">📊</div><span>Detailed Proficiency Report</span></div>
                        </div>
                    </div>
                    {submitted ? (
                        <div className="enroll-form reveal reveal-delay-2" style={{ textAlign: 'center', padding: '60px 40px' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
                            <h3 style={{ color: 'var(--green)', marginBottom: '12px' }}>Assessment Booked!</h3>
                            <p style={{ color: 'var(--text-muted)' }}>We'll contact you shortly to schedule your child's free assessment.</p>
                        </div>
                    ) : (
                        <form className="enroll-form reveal reveal-delay-2" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group"><label>Child's Name</label><input type="text" name="childName" value={form.childName} onChange={handleChange} required /></div>
                                <div className="form-group"><label>Age</label><input type="number" name="age" min="5" max="14" value={form.age} onChange={handleChange} required /></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group"><label>Parent Name</label><input type="text" name="parentName" value={form.parentName} onChange={handleChange} required /></div>
                                <div className="form-group"><label>Phone</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required /></div>
                            </div>
                            <div className="form-group"><label>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
                            <div className="form-group"><label>Interest Level</label>
                                <select name="interestLevel" value={form.interestLevel} onChange={handleChange} required>
                                    <option value=""></option>
                                    <option>Junior Tier (Levels 1-3)</option>
                                    <option>Senior Tier (Levels 4-6)</option>
                                    <option>Competition Competent (Levels 7-9)</option>
                                    <option>Champion Tier (Levels 10-12)</option>
                                    <option>Not sure — Need assessment</option>
                                </select>
                            </div>
                            <div className="form-group"><label>Message (Optional)</label><textarea name="message" value={form.message} onChange={handleChange}></textarea></div>
                            <button type="submit" className="btn btn-primary btn-lg magnetic" disabled={loading}>
                                {loading ? 'Submitting...' : 'Book Free Assessment →'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
