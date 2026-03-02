import { useState } from 'react';

const pillarData = {
    math: { icon: '🧮', title: 'Foundational Mathematics', desc: 'Logical reasoning, number sense & problem solving at every level.', topics: ['Number Systems', 'Geometry & Spatial', 'Algebra Foundations', 'Data & Statistics', 'Word Problems', 'Mental Math'] },
    science: { icon: '🔬', title: 'Science', desc: 'Scientific temper, observation & conceptual understanding.', topics: ['Life Sciences', 'Physical Sciences', 'Earth Science', 'Experiments', 'Scientific Method', 'Environmental Studies'] },
    english: { icon: '📖', title: 'Communicative English', desc: 'Fluency, comprehension & expressive ability.', topics: ['Grammar Mastery', 'Creative Writing', 'Comprehension', 'Vocabulary', 'Public Speaking', 'Debate Skills'] },
    cyber: { icon: '💻', title: 'Cyber Knowledge', desc: 'Digital literacy & responsible technology use.', topics: ['Block Coding', 'Programming', 'Cyber Safety', 'AI Basics', 'Web Development', 'Digital Tools'] },
    gk: { icon: '🌍', title: 'General Knowledge', desc: 'Awareness of the world, current affairs & culture.', topics: ['History', 'Geography', 'Current Affairs', 'Culture', 'Sports', 'Science & Tech'] },
    art: { icon: '🎨', title: 'Art, Craft & Personality', desc: 'Creativity, fine motor skills & life skills.', topics: ['Drawing & Painting', 'Craft Work', 'Leadership', 'Teamwork', 'Emotional Intelligence', 'Life Skills'] }
};

export default function Pillars() {
    const [modal, setModal] = useState(null);

    return (
        <>
            <section className="section" id="pillars">
                <div className="container">
                    <div className="section-header reveal"><span className="section-label">Our Foundation</span>
                        <h2 className="section-title">Six Pillars of Holistic Excellence</h2>
                        <p className="section-subtitle">A comprehensive framework designed to develop every dimension of your child's potential.</p>
                    </div>
                    <div className="pillars-wrapper">
                        <div className="pillars-hex">
                            {[
                                { key: 'math', color: 'blue', delay: 1 },
                                { key: 'science', color: 'green', delay: 2 },
                                { key: 'english', color: 'purple', delay: 3 },
                                { key: 'cyber', color: 'orange', delay: 4 },
                                { key: 'gk', color: 'pink', delay: 5 },
                                { key: 'art', color: 'gold', delay: 6 }
                            ].map(p => (
                                <div key={p.key} className={`pillar-card reveal reveal-delay-${p.delay}`} data-color={p.color} onClick={() => setModal(p.key)}>
                                    <div className="pillar-icon">{pillarData[p.key].icon}</div>
                                    <h3>{pillarData[p.key].title}</h3>
                                    <p>{pillarData[p.key].desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {modal && (
                <div className="pillar-modal active" onClick={(e) => { if (e.target.classList.contains('pillar-modal')) setModal(null); }}>
                    <div className="pillar-modal-content">
                        <button className="pillar-modal-close" onClick={() => setModal(null)}>✕</button>
                        <div className="modal-pillar-icon">{pillarData[modal].icon}</div>
                        <h3 className="modal-pillar-title">{pillarData[modal].title}</h3>
                        <p className="modal-pillar-desc">{pillarData[modal].desc}</p>
                        <div className="modal-topics">
                            {pillarData[modal].topics.map((t, i) => <span key={i} className="modal-topic-tag">{t}</span>)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
