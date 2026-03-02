const tiers = [
    {
        key: 'junior', badge: 'junior', name: 'Tier 1 — Junior', icon: '🌱',
        levels: [
            { num: '01', title: 'Junior', sub: 'Foundation Building', detail: 'Number sense basics, phonics, simple experiments, digital awareness, world awareness, basic art skills.' },
            { num: '02', title: 'Junior Pro', sub: 'Deeper Exploration', detail: 'Pattern recognition, reading fluency, plant & animal sciences, coding intro, India GK, craft projects.' },
            { num: '03', title: 'Junior Master', sub: 'Advanced Foundations', detail: 'Word problems, creative writing, earth sciences, cyber safety, current events, leadership basics.' }
        ],
        gate: { text: '🎯 Gateway Exam → Senior Tier', color: 'green' }
    },
    {
        key: 'senior', badge: 'senior', name: 'Tier 2 — Senior', icon: '🌳',
        levels: [
            { num: '04', title: 'Senior', sub: 'Knowledge Expansion', detail: 'Fractions & decimals, essay writing, human body, programming basics, world geography, emotional intelligence.' },
            { num: '05', title: 'Senior Pro', sub: 'Complex Connections', detail: 'Pre-algebra, debate skills, force & energy, algorithms, history deep-dives, team leadership.' },
            { num: '06', title: 'Senior Master', sub: 'Independent Thinking', detail: 'Statistics, comprehension mastery, chemical reactions, AI basics, current affairs, public speaking.' }
        ],
        gate: { text: '🏆 Gateway Exam → Competition Tier', color: 'purple' }
    },
    {
        key: 'competition', badge: 'competition', name: 'Tier 3 — Competition Competent', icon: '🏆',
        levels: [
            { num: '07', title: 'CC Junior', sub: 'Olympiad Basics', detail: 'Competition math strategies, science olympiad prep, IEO preparation, NCO basics, quiz training.' },
            { num: '08', title: 'CC Intermediate', sub: 'National Readiness', detail: 'National-level problem sets, NSO/NSTSE prep, spelling bee, hackathon prep, advanced quiz mastery.' },
            { num: '09', title: 'CC Senior', sub: 'International Standards', detail: 'IMO/ISMO level problems, international science, global English proficiency, AI competitions.' }
        ],
        gate: { text: '👑 Gateway Exam → Champion Tier', color: 'gold' }
    },
    {
        key: 'champion', badge: 'champion', name: 'Tier 4 — Champion', icon: '👑',
        levels: [
            { num: '10', title: 'Champion Junior', sub: 'Mentorship & Mastery', detail: 'Peer mentoring, cross-domain projects, innovation challenges, research basics, portfolio building.' },
            { num: '11', title: 'Champion Intermediate', sub: 'Innovation & Leadership', detail: 'Original problem creation, teaching practice, community projects, advanced research, leadership mastery.' },
            { num: '12', title: 'Champion Senior', sub: 'Grand Master', detail: 'Personal excellence portfolio, international competition strategy, legacy project, Grand Master title achievement.' }
        ],
        gate: null
    }
];

export default function Pathway() {
    return (
        <section className="section pathway-section" id="pathway">
            <div className="pathway-bg"></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-header reveal"><span className="section-label">The Journey</span>
                    <h2 className="section-title">Your Child's Journey to Mastery</h2>
                    <p className="section-subtitle">12 meticulously designed levels across 4 progressive tiers.</p>
                </div>
                <div className="rpg-progress reveal">
                    <div className="progress-bar-wrap"><div className="progress-bar-fill" id="rpgProgress"></div></div>
                    <div className="progress-label"><span id="rpgPercent">0</span>% Journey Unlocked</div>
                </div>
                <div className="rpg-tree">
                    {tiers.map((tier, ti) => (
                        <div key={tier.key}>
                            <div className="rpg-tier" data-tier={tier.key}>
                                <div className="tier-header">
                                    <span className={`tier-badge ${tier.badge}`}>{tier.name}</span>
                                    <span className="tier-icon">{tier.icon}</span>
                                </div>
                                <div className="rpg-nodes">
                                    {tier.levels.map((lvl, li) => (
                                        <div key={lvl.num} className={`rpg-node reveal${li > 0 ? ` reveal-delay-${li}` : ''}`} data-level={lvl.num}>
                                            <div className="level-num">{lvl.num}</div>
                                            <h4>{lvl.title}</h4>
                                            <p>{lvl.sub}</p>
                                            <div className="node-expand"><div className="node-detail">{lvl.detail}</div></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {tier.gate && (
                                <div className="tier-checkpoint">
                                    <span className="checkpoint-badge" style={{
                                        background: `rgba(${tier.gate.color === 'green' ? '0,255,136' : tier.gate.color === 'purple' ? '168,85,247' : '255,215,0'}, 0.1)`,
                                        color: `var(--${tier.gate.color})`,
                                        border: `1px solid rgba(${tier.gate.color === 'green' ? '0,255,136' : tier.gate.color === 'purple' ? '168,85,247' : '255,215,0'}, 0.2)`
                                    }}>{tier.gate.text}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
