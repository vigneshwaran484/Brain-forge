import { useState } from 'react';

const tierData = {
    junior: {
        label: '🌱 Junior Tier', span: '— Levels 1–3', desc: 'Building strong foundations across all pillars',
        subjects: [
            { icon: '🧮', title: 'Mathematics', accent: 'blue', pills: ['Number sense', 'Pattern recognition', 'Intro to geometry', 'Word problems'] },
            { icon: '🔬', title: 'Science', accent: 'green', pills: ['Living vs non-living', 'Plant & animal basics', 'Weather & seasons', 'Simple experiments'] },
            { icon: '📖', title: 'English', accent: 'purple', pills: ['Phonics & reading', 'Sentence building', 'Storytelling', 'Vocabulary basics'] },
            { icon: '💻', title: 'Cyber', accent: 'orange', pills: ['Digital awareness', 'Block coding intro', 'Internet safety', 'Basic tools'] },
            { icon: '🌍', title: 'General Knowledge', accent: 'pink', pills: ['India basics', 'World awareness', 'Famous people', 'Festivals & culture'] },
            { icon: '🎨', title: 'Art & Personality', accent: 'gold', pills: ['Drawing basics', 'Craft projects', 'Teamwork', 'Self-expression'] }
        ]
    },
    senior: {
        label: '🌳 Senior Tier', span: '— Levels 4–6', desc: 'Expanding knowledge and building independent thinking',
        subjects: [
            { icon: '🧮', title: 'Mathematics', accent: 'blue', pills: ['Fractions & decimals', 'Geometry & mensuration', 'Pre-algebra', 'Data & statistics'] },
            { icon: '🔬', title: 'Science', accent: 'green', pills: ['Human body', 'Force & energy', 'Chemical reactions', 'Earth & ecology'] },
            { icon: '📖', title: 'English', accent: 'purple', pills: ['Essay writing', 'Debate & speaking', 'Comprehension', 'Grammar mastery'] },
            { icon: '💻', title: 'Cyber', accent: 'orange', pills: ['Programming basics', 'Cyber ethics', 'Web development', 'Digital tools'] },
            { icon: '🌍', title: 'General Knowledge', accent: 'pink', pills: ['World geography', 'History deep-dives', 'Current events', 'Science & tech GK'] },
            { icon: '🎨', title: 'Art & Personality', accent: 'gold', pills: ['Emotional intelligence', 'Team leadership', 'Drawing & painting', 'Public presentation'] }
        ]
    },
    competition: {
        label: '🏆 Competition Tier', span: '— Levels 7–9', desc: 'Olympiad-level preparation and national readiness',
        subjects: [
            { icon: '🧮', title: 'Olympiad Math', accent: 'blue', pills: ['Combinatorics', 'Number theory', 'Competition strategies', 'International problems'] },
            { icon: '🔬', title: 'Science Olympiad', accent: 'green', pills: ['NSO/NSTSE prep', 'Advanced experiments', 'Research methods', 'Scientific papers'] },
            { icon: '📖', title: 'English Mastery', accent: 'purple', pills: ['IEO preparation', 'Spelling bee', 'Literary analysis', 'Global proficiency'] },
            { icon: '💻', title: 'Cyber Tech', accent: 'orange', pills: ['Algorithms & logic', 'Hackathon prep', 'AI & ML basics', 'NCO mastery'] },
            { icon: '🌍', title: 'Quiz Mastery', accent: 'pink', pills: ['IGKO prep', 'Quiz championship', 'Advanced current affairs', 'Speed rounds'] },
            { icon: '🎨', title: 'Creative Excellence', accent: 'gold', pills: ['Art Olympiad', 'Design thinking', 'Portfolio building', 'Innovation projects'] }
        ]
    },
    champion: {
        label: '👑 Champion Tier', span: '— Levels 10–12', desc: 'Mastery, mentorship, and the path to Grand Master',
        subjects: [
            { icon: '🧮', title: 'Advanced Research', accent: 'blue', pills: ['Original problems', 'Cross-domain projects', 'Math research', 'Publication prep'] },
            { icon: '🔬', title: 'Science Innovation', accent: 'green', pills: ['Research papers', 'Innovation challenges', 'Lab mastery', 'Science fairs'] },
            { icon: '📖', title: 'Communication', accent: 'purple', pills: ['Teaching practice', 'Content creation', 'Oratory mastery', 'Published writing'] },
            { icon: '💻', title: 'Tech Innovation', accent: 'orange', pills: ['Full-stack projects', 'AI applications', 'Open source', 'Tech leadership'] },
            { icon: '🌍', title: 'Global Awareness', accent: 'pink', pills: ['International strategy', 'Community impact', 'Legacy projects', 'World citizenship'] },
            { icon: '🎨', title: 'Grand Master', accent: 'gold', pills: ['Excellence portfolio', 'Peer mentoring', 'Leadership legacy', 'Grand Master title'] }
        ]
    }
};

const tierKeys = ['junior', 'senior', 'competition', 'champion'];
const tierIcons = { junior: '🌱', senior: '🌳', competition: '🏆', champion: '👑' };
const tierLabels = { junior: 'Junior', senior: 'Senior', competition: 'Competition', champion: 'Champion' };
const tierLevels = { junior: 'Levels 1–3', senior: 'Levels 4–6', competition: 'Levels 7–9', champion: 'Levels 10–12' };

export default function CurriculumTimeline() {
    const [active, setActive] = useState('junior');
    const activeIdx = tierKeys.indexOf(active);
    const fillWidth = `${(activeIdx / (tierKeys.length - 1)) * 100}%`;

    return (
        <section className="section" id="curriculum">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Explore</span>
                    <h2 className="section-title">Explore Our Comprehensive Curriculum</h2>
                    <p className="section-subtitle">Click on each tier to discover what your child will learn.</p>
                </div>
                <div className="curr-timeline reveal">
                    <div className="curr-track">
                        <div className="curr-track-line"></div>
                        <div className="curr-track-fill" style={{ width: fillWidth }}></div>
                    </div>
                    <div className="curr-stops">
                        {tierKeys.map(k => (
                            <button key={k} className={`curr-stop${active === k ? ' active' : ''}`} onClick={() => setActive(k)}>
                                <div className="stop-dot"></div>
                                <div className="stop-icon">{tierIcons[k]}</div>
                                <div className="stop-label">{tierLabels[k]}</div>
                                <div className="stop-levels">{tierLevels[k]}</div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="curr-panels">
                    {tierKeys.map(k => (
                        <div key={k} className={`curr-panel${active === k ? ' active' : ''}`}>
                            <div className="panel-header">
                                <h3>{tierData[k].label} <span>{tierData[k].span}</span></h3>
                                <p>{tierData[k].desc}</p>
                            </div>
                            <div className="subject-grid">
                                {tierData[k].subjects.map((s, i) => (
                                    <div key={i} className="subject-card" data-accent={s.accent}>
                                        <div className="subject-icon">{s.icon}</div>
                                        <h4>{s.title}</h4>
                                        <div className="topic-pills">
                                            {s.pills.map((p, j) => <span key={j}>{p}</span>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
