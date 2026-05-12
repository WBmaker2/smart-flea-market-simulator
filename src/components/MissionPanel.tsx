import { CircleHelp, Trophy } from 'lucide-react';
import { missions, type MissionDefinition } from '../data/missions';

type MissionPanelProps = {
  completed: Record<string, boolean>;
};

export function MissionPanel({ completed }: MissionPanelProps) {
  return (
    <section className="mission-panel" aria-labelledby="mission-heading" role="region">
      <div className="section-title">
        <h2 id="mission-heading">미션 카드</h2>
        <span>교실 미션</span>
      </div>

      <ul className="mission-list" aria-live="polite" aria-atomic="true" aria-label="미션 달성 상태">
        {missions.map((mission: MissionDefinition) => {
          const isComplete = completed[mission.id] ?? false;
          return (
            <li
              key={mission.id}
              className={`mission-card ${isComplete ? 'is-complete' : 'is-in-progress'}`}
              aria-label={`${mission.title} ${isComplete ? '달성' : '도전 중'}`}
            >
              <div className="mission-title-row">
                <CircleHelp aria-hidden="true" size={18} />
                <strong>{mission.title}</strong>
              </div>
              <p>{mission.description}</p>
              <div className={`mission-status ${isComplete ? 'mission-status-complete' : 'mission-status-in-progress'}`}>
                {isComplete ? (
                  <span>
                    <Trophy aria-hidden="true" size={16} />
                    달성
                  </span>
                ) : (
                  <span>도전 중</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
