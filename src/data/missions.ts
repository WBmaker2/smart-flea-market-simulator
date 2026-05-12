export type MissionTone = 'need' | 'balance' | 'choice';

export type MissionDefinition = {
  id: string;
  tone: MissionTone;
  title: string;
  description: string;
};

export const missions: MissionDefinition[] = [
  {
    id: 'essentials',
    tone: 'need',
    title: '필수 물건 2개 이상',
    description: '수업에 꼭 필요한 학용품을 먼저 골라 보세요.'
  },
  {
    id: 'save-3000',
    tone: 'balance',
    title: '3,000원 이상 남기기',
    description: '사고 싶은 것과 남길 돈의 균형을 생각해 보세요.'
  },
  {
    id: 'wants-limit',
    tone: 'choice',
    title: '선택 물건 1개 이하',
    description: '간식과 장난감은 꼭 필요한지 다시 판단해 보세요.'
  }
];
