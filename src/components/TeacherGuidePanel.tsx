export function TeacherGuidePanel() {
  return (
    <section className="teacher-guide-panel" aria-labelledby="teacher-guide-heading" role="region">
      <div className="section-title">
        <h2 id="teacher-guide-heading">교사용 수업안</h2>
        <p>3-4학년 사회·수학 연계 합리적 소비 활동 운영용 가이드입니다.</p>
      </div>

      <p className="teacher-guide-standard">
        성취기준: <strong>[4사07-02]</strong>, <strong>[4수01-04]</strong>
      </p>

      <div className="teacher-guide-grid">
        <article>
          <h3>20분 빠른 활동</h3>
          <ul>
            <li>도입 3분</li>
            <li>장보기 10분</li>
            <li>발표 5분</li>
            <li>정리 2분</li>
          </ul>
        </article>

        <article>
          <h3>40분 전체 수업</h3>
          <ul>
            <li>도입 5분</li>
            <li>모둠 장보기 15분</li>
            <li>활동지 작성 10분</li>
            <li>발표 7분</li>
            <li>정리 3분</li>
          </ul>
        </article>
      </div>

      <div>
        <h3>교사 발문</h3>
        <ul>
          <li>예산이 부족할 때 무엇을 먼저 포기해야 할까요?</li>
          <li>필수 소비와 선택 소비를 어떻게 구분했나요?</li>
        </ul>
      </div>
    </section>
  );
}
