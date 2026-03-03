import { useState } from 'react';

const faqs = [
    { q: 'How is Brain Forge different from traditional tuition?', a: 'Brain Forge uses a proficiency-based progression system instead of age-based levels. We integrate 6 learning pillars with Higher Order Thinking Skills at every level, and include a built-in competition readiness pathway — all things traditional tuition doesn\'t offer.' },
    { q: 'What if my child is ahead or behind for their age?', a: 'That\'s the beauty of our system! A 6-year-old who excels can advance beyond their age group, while a 10-year-old who needs support can strengthen foundations without stigma. Every child is placed according to their actual proficiency level.' },
    { q: 'How are children assessed?', a: 'We use a multi-dimensional assessment framework including formative assessments, module assessments, HOTS evaluations, portfolio reviews, and gateway exams. A minimum 75% score is required before advancing.' },
    { q: 'What competitions does Brain Forge prepare for?', a: 'Our Competition Competent and Champion tiers prepare students for IMO, ISMO, Math Kangaroo, SASMO, NSO, NSTSE, IEO, Spelling Bee, NCO, IGKO, and various quiz championships at national and international levels.' },
    { q: 'What is the time commitment?', a: 'Each session is a focused 50 minutes, structured for maximum engagement. Sessions include warm-up, concept introduction, guided practice, independent work, HOTS challenges, and a wrap-up.' },
    { q: 'How do I know which level is right for my child?', a: 'We offer a free assessment that evaluates proficiency across all six pillars. Based on the results, we recommend the ideal starting level and create a personalized learning pathway. Book your free assessment today!' }
];

export default function FAQ() {
    const [activeIdx, setActiveIdx] = useState(null);

    return (
        <section className="section" id="faq">
            <div className="container">
                <div className="section-header reveal"><span className="section-label">Questions</span>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">Everything you need to know about Brain Forge.</p>
                </div>
                <div className="faq-list">
                    {faqs.map((f, i) => (
                        <div key={i} className="reveal">
                            <div className={`faq-item${activeIdx === i ? ' active' : ''}`}>
                                <div className="faq-question" onClick={() => setActiveIdx(activeIdx === i ? null : i)}>
                                    <h4>{f.q}</h4><span className="faq-toggle">{activeIdx === i ? '−' : '+'}</span>
                                </div>
                                <div className="faq-answer"><p>{f.a}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
