import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestionsForAge } from '../data/questionsData';
import logo from '../assets/logo.png';

const LABELS = ['A', 'B', 'C', 'D'];
const TOTAL_TIME = 45 * 60;

const GRADE_OPTIONS = [
    { grade: 1, label: 'Grade 1', ages: 'Ages 5–6', icon: '🌱', desc: 'Basic science, living things, patterns & safety' },
    { grade: 2, label: 'Grade 2', ages: 'Ages 7–8', icon: '⭐', desc: 'Sense organs, environment, transport & seasons' },
    { grade: 3, label: 'Grade 3', ages: 'Ages 9–10', icon: '🏆', desc: 'Forces, matter, planets, logic & reasoning' },
];

// ── SCREEN 1: Welcome ──────────────────────────────────────────────────────────
function WelcomeScreen({ childName, onYes, onNo }) {
    return (
        <div className="test-landing">
            <div className="test-landing-card">
                <img src={logo} alt="Brain Forge" className="test-logo" />
                <div className="landing-badge">🎉 Registration Successful</div>
                <h1 className="landing-title">Welcome, {childName}!</h1>
                <p className="landing-sub">
                    Your details have been saved. Our team will contact you shortly.
                </p>
                <div className="landing-divider"></div>
                <h2 className="landing-question">Would you like to take a<br />free sample test right now?</h2>
                <p className="landing-hint">Get a feel for Brain Forge's assessment style — takes about 20 minutes.</p>
                <div className="landing-actions">
                    <button className="btn btn-primary btn-lg" onClick={onYes}>
                        Yes, Start the Test 🚀
                    </button>
                    <button className="btn btn-outline btn-lg" onClick={onNo}>
                        No, Maybe Later
                    </button>
                </div>
                <div className="landing-features">
                    <div className="lf-item"><span>⏱</span> 45 Minutes</div>
                    <div className="lf-item"><span>📝</span> 50 Questions</div>
                    <div className="lf-item"><span>🏅</span> Instant Score</div>
                </div>
            </div>
        </div>
    );
}

// ── SCREEN 2: Level Selection ──────────────────────────────────────────────────
function LevelScreen({ childName, onSelect }) {
    return (
        <div className="test-landing">
            <div className="test-landing-card level-card">
                <img src={logo} alt="Brain Forge" className="test-logo" />
                <h1 className="landing-title">Choose Your Level</h1>
                <p className="landing-sub">Select the grade that best matches {childName}'s current class.</p>
                <div className="grade-options">
                    {GRADE_OPTIONS.map(g => (
                        <button key={g.grade} className="grade-option-btn" onClick={() => onSelect(g.grade)}>
                            <span className="grade-icon">{g.icon}</span>
                            <div className="grade-info">
                                <span className="grade-label">{g.label}</span>
                                <span className="grade-ages">{g.ages}</span>
                                <span className="grade-desc">{g.desc}</span>
                            </div>
                            <span className="grade-arrow">→</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── SCREEN 3: Test ─────────────────────────────────────────────────────────────
function TestScreen({ childName, grade, onFinish }) {
    const { questions } = getQuestionsForAge(grade <= 7 ? 6 : grade <= 9 ? 8 : 10);
    // resolve from grade directly
    const gradeMap = { 1: 6, 2: 8, 3: 10 };
    const { questions: qs } = getQuestionsForAge(gradeMap[grade] || 8);
    const total = qs.length;

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(Array(total).fill(null));
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [animDir, setAnimDir] = useState('');

    const handleSubmit = useCallback(() => {
        let s = 0;
        selected.forEach((ans, i) => { if (ans === qs[i].answer) s++; });
        onFinish({ score: s, total, selected, questions: qs, grade });
    }, [selected, qs, total, grade, onFinish]);

    useEffect(() => {
        if (timeLeft <= 0) { handleSubmit(); return; }
        const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
        return () => clearTimeout(t);
    }, [timeLeft, handleSubmit]);

    const goTo = (dir) => {
        setAnimDir(dir > 0 ? 'slide-left' : 'slide-right');
        setTimeout(() => { setCurrent(p => p + dir); setAnimDir(''); }, 200);
    };

    const handleSelect = (optIdx) => {
        const copy = [...selected];
        copy[current] = optIdx;
        setSelected(copy);
    };

    const answered = selected.filter(s => s !== null).length;
    const progressPct = ((current + 1) / total) * 100;
    const timeFmt = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
    const timerWarning = timeLeft < 120;
    const q = qs[current];

    return (
        <div className="test-page">
            <header className="test-header">
                <div className="test-header-inner">
                    <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
                        <img src={logo} alt="Brain Forge" className="logo-img" />
                        <span>Brain Forge</span>
                    </a>
                    <div className="test-meta">
                        <div className="test-student-tag">
                            <span className="dot" style={{ background: '#00FF88' }}></span>
                            {childName} · Grade {grade}
                        </div>
                    </div>
                    <div className={`test-timer ${timerWarning ? 'timer-warn' : ''}`}>
                        <span className="timer-icon">⏱</span> {timeFmt}
                    </div>
                </div>
                <div className="test-overall-bar">
                    <div className="test-overall-fill" style={{ width: `${(answered / total) * 100}%` }}></div>
                </div>
            </header>

            <main className="test-main">
                <div className="test-progress-row">
                    <span className="test-q-label">Question {current + 1} <span className="test-q-of">of {total}</span></span>
                    <span className="test-answered-tag">{answered} answered</span>
                </div>
                <div className="test-progress-track">
                    <div className="test-progress-fill" style={{ width: `${progressPct}%` }}></div>
                </div>

                <div className={`question-card ${animDir}`}>
                    <div className="q-number-badge">Q{current + 1}</div>
                    <p className="question-text">{q.q}</p>
                    <div className="options-grid">
                        {q.options.map((opt, i) => (
                            <button key={i} className={`option-btn ${selected[current] === i ? 'selected' : ''}`} onClick={() => handleSelect(i)}>
                                <span className="opt-label">{LABELS[i]}</span>
                                <span className="opt-text">{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="test-nav">
                    <button className="btn btn-outline" onClick={() => goTo(-1)} disabled={current === 0}>← Previous</button>
                    <div className="test-dot-row">
                        {qs.map((_, i) => (
                            <button key={i}
                                className={`test-dot ${i === current ? 'active' : ''} ${selected[i] !== null ? 'done' : ''}`}
                                onClick={() => { setAnimDir(i > current ? 'slide-left' : 'slide-right'); setTimeout(() => { setCurrent(i); setAnimDir(''); }, 200); }}
                            />
                        ))}
                    </div>
                    {current < total - 1
                        ? <button className="btn btn-primary" onClick={() => goTo(1)}>Next →</button>
                        : <button className="btn btn-primary" onClick={handleSubmit}>Submit 🎯</button>
                    }
                </div>
            </main>
        </div>
    );
}

// ── SCREEN 4: Result ───────────────────────────────────────────────────────────
function ResultScreen({ childName, score, total, grade, onRetry }) {
    const pct = Math.round((score / total) * 100);

    const getLevel = () => {
        if (pct >= 80) return { label: 'Champion', color: '#FFD700', icon: '🏆', msg: 'Exceptional! Ready for advanced levels.' };
        if (pct >= 60) return { label: 'Proficient', color: '#00FF88', icon: '⭐', msg: 'Great work! A solid foundation to build on.' };
        if (pct >= 40) return { label: 'Developing', color: '#00F0FF', icon: '📈', msg: 'Good start! Our program will accelerate your growth.' };
        return { label: 'Beginner', color: '#A855F7', icon: '🌱', msg: "Every champion starts somewhere. Let's build together!" };
    };

    const level = getLevel();
    const circumference = 2 * Math.PI * 54;

    return (
        <div className="test-result-page">
            <div className="test-result-card">
                <img src={logo} alt="Brain Forge" className="test-logo" />
                <div className="result-icon">{level.icon}</div>
                <h1 className="result-title">Assessment Complete!</h1>
                <p className="result-name">{childName}'s Result · Grade {grade}</p>

                <div className="result-score-ring">
                    <svg viewBox="0 0 120 120" className="score-svg">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                        <circle cx="60" cy="60" r="54" fill="none" stroke={level.color} strokeWidth="10"
                            strokeDasharray={`${circumference * pct / 100} ${circumference}`}
                            strokeLinecap="round" transform="rotate(-90 60 60)"
                            style={{ transition: 'stroke-dasharray 1.5s ease', filter: `drop-shadow(0 0 8px ${level.color})` }} />
                    </svg>
                    <div className="score-center">
                        <span className="score-num">{score}</span>
                        <span className="score-den">/{total}</span>
                    </div>
                </div>

                <div className="result-badge-row">
                    <div className="result-badge" style={{ borderColor: level.color, color: level.color }}>{level.label}</div>
                    <div className="result-badge">{pct}% Score</div>
                    <div className="result-badge">Grade {grade} Level</div>
                </div>
                <p className="result-msg">{level.msg}</p>

                <div className="result-stats-grid">
                    <div className="result-stat"><span className="rs-val" style={{ color: '#00FF88' }}>{score}</span><span className="rs-label">Correct</span></div>
                    <div className="result-stat"><span className="rs-val" style={{ color: '#FF4444' }}>{total - score}</span><span className="rs-label">Wrong</span></div>
                    <div className="result-stat"><span className="rs-val" style={{ color: '#00F0FF' }}>{pct}%</span><span className="rs-label">Score</span></div>
                    <div className="result-stat"><span className="rs-val" style={{ color: '#A855F7' }}>G{grade}</span><span className="rs-label">Level</span></div>
                </div>

                <div className="result-actions">
                    <a href="/#enroll" className="btn btn-primary btn-lg">Book Actual Assessment →</a>
                    <button className="btn btn-outline btn-lg" onClick={onRetry}>Try Another Level</button>
                </div>
                <p className="result-footer">Our educators will personally assess {childName} and design a custom learning plan.</p>
            </div>
        </div>
    );
}

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────────
export default function SampleTest() {
    const location = useLocation();
    const navigate = useNavigate();
    const { childName = 'Student' } = location.state || {};

    const [screen, setScreen] = useState('welcome'); // welcome | level | test | result
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [result, setResult] = useState(null);

    const handleFinish = (res) => { setResult(res); setScreen('result'); };
    const handleRetry = () => { setResult(null); setSelectedGrade(null); setScreen('level'); };
    const handleNo = () => navigate('/');

    if (screen === 'welcome') return <WelcomeScreen childName={childName} onYes={() => setScreen('level')} onNo={handleNo} />;
    if (screen === 'level') return <LevelScreen childName={childName} onSelect={(g) => { setSelectedGrade(g); setScreen('test'); }} />;
    if (screen === 'test') return <TestScreen childName={childName} grade={selectedGrade} onFinish={handleFinish} />;
    if (screen === 'result') return <ResultScreen childName={childName} score={result.score} total={result.total} grade={result.grade} onRetry={handleRetry} />;
}
