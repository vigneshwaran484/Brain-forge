import { useState } from 'react';

const FormGroup = ({ label, type, name, value, onChange, required, min, max, isTextArea }) => {
    const [isFocused, setIsFocused] = useState(false);
    const isFilled = value !== '';

    return (
        <div className={`form-group ${isFocused ? 'focused' : ''} ${isFilled ? 'filled' : ''}`}>
            <label>{label}</label>
            {isTextArea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    min={min}
                    max={max}
                />
            )}
        </div>
    );
};
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
                        <div className="enroll-form reveal reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '400px' }}>
                            <div style={{ width: '64px', height: '64px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                <span style={{ fontSize: '2rem' }}>✓</span>
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-white)', marginBottom: '12px' }}>Response Successfully Saved</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '300px' }}>Our education experts will review your details and contact you via email shortly to schedule your free assessment.</p>
                        </div>
                    ) : (
                        <form className="enroll-form reveal reveal-delay-2" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <FormGroup label="Child's Name" name="childName" value={form.childName} type="text" onChange={handleChange} required />
                                <FormGroup label="Age" name="age" value={form.age} type="number" min="5" max="14" onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <FormGroup label="Parent Name" name="parentName" value={form.parentName} type="text" onChange={handleChange} required />
                                <FormGroup label="Phone" name="phone" value={form.phone} type="tel" onChange={handleChange} required />
                            </div>
                            <FormGroup label="Email" name="email" value={form.email} type="email" onChange={handleChange} required />
                            <div className={`form-group ${form.interestLevel ? 'filled' : ''}`}>
                                <label>Interest Level</label>
                                <select name="interestLevel" value={form.interestLevel} onChange={handleChange} required>
                                    <option value=""></option>
                                    <option>Junior Tier (Levels 1-3)</option>
                                    <option>Senior Tier (Levels 4-6)</option>
                                    <option>Competition Competent (Levels 7-9)</option>
                                    <option>Champion Tier (Levels 10-12)</option>
                                    <option>Not sure — Need assessment</option>
                                </select>
                            </div>
                            <FormGroup label="Message (Optional)" name="message" value={form.message} isTextArea onChange={handleChange} />
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
