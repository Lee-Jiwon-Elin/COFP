import { STEP_TYPES, type Situation } from '../domain/types';

/**
 * 책의 실수 상황 예시 기반 콘텐츠.
 * `correctAnswer`는 정답의 *값*이며 옵션 순서와 무관하다.
 * UI 단에서 매 단계마다 `options`를 셔플하므로 정답 위치가 매번 달라진다.
 */
export const SITUATIONS: Situation[] = [
  {
    id: 'foot_step',
    title: '발 밟기',
    description: '친구가 지나가는데, 실수로 발을 꽉 밟아버렸어요.',
    badge: { name: '발걸음 조심', desc: '발 밟기 사과 완성', emoji: 'foot' },
    scene: 'foot',
    steps: [
      {
        type: STEP_TYPES.acknowledge,
        before: '내가 실수로 너의 발을 밟아서 너를', after: '했구나.',
        options: ['아프게', '기쁘게', '슬프게', '졸리게'], correctAnswer: '아프게',
        praise: '맞아요! 친구의 마음을 먼저 알아주는 게 첫 번째예요.'
      },
      {
        type: STEP_TYPES.apologize,
        before: '정말 미안해. 진심으로', after: '할게.',
        options: ['사과', '축하', '인사', '자랑'], correctAnswer: '사과',
        praise: '잘했어요. 미안한 마음을 솔직하게 말하는 게 사과예요.'
      },
      {
        type: STEP_TYPES.promise,
        before: '다음부터는', after: '걸어다닐게.',
        options: ['조심히', '빠르게', '시끄럽게', '거꾸로'], correctAnswer: '조심히',
        praise: '훌륭해요! 약속까지 하면 진짜 사과가 완성돼요.'
      }
    ]
  },
  {
    id: 'block_knock',
    title: '블록 엎어뜨리기',
    description: '친구가 열심히 쌓은 블록을 실수로 쓰러뜨렸어요.',
    badge: { name: '블록 친구', desc: '블록 사과 완성', emoji: 'block' },
    scene: 'block',
    steps: [
      {
        type: STEP_TYPES.acknowledge,
        before: '내가 너의 블록을 쓰러뜨려서 너를', after: '했지.',
        options: ['속상하게', '신나게', '기쁘게', '즐겁게'], correctAnswer: '속상하게',
        praise: '그렇죠. 친구가 속상했을 거예요.'
      },
      {
        type: STEP_TYPES.apologize,
        before: '정말 미안해. 진심으로', after: '할게.',
        options: ['사과', '구경', '응원', '부탁'], correctAnswer: '사과',
        praise: '잘했어요. 진심을 담은 한마디예요.'
      },
      {
        type: STEP_TYPES.promise,
        before: '다음부터는 친구 옆을', after: '지나갈게.',
        options: ['조심히', '뛰어서', '거칠게', '큰소리로'], correctAnswer: '조심히',
        praise: '약속을 지키면 친구도 더 믿어줄 거예요.'
      }
    ]
  },
  {
    id: 'water_spill',
    title: '물 엎지르기',
    description: '친구의 책상 위에 물을 엎질러서 책이 다 젖었어요.',
    badge: { name: '깨끗이 함께', desc: '물 사과 완성', emoji: 'water' },
    scene: 'water',
    steps: [
      {
        type: STEP_TYPES.acknowledge,
        before: '내가 물을 엎질러서 너의 책을', after: '만들었구나.',
        options: ['젖게', '마르게', '깨끗하게', '따뜻하게'], correctAnswer: '젖게',
        praise: '정확해요. 어떤 일이 일어났는지 알아주는 거예요.'
      },
      {
        type: STEP_TYPES.apologize,
        before: '정말 미안해. 진심으로', after: '하고 같이 닦자.',
        options: ['사과', '인사', '소개', '자랑'], correctAnswer: '사과',
        praise: '실수를 함께 해결하려는 마음, 멋져요.'
      },
      {
        type: STEP_TYPES.promise,
        before: '다음부터는 컵을', after: '들고 다닐게.',
        options: ['조심히', '한손으로', '흔들면서', '뛰면서'], correctAnswer: '조심히',
        praise: '약속까지 했으니 진짜 사과 완성!'
      }
    ]
  }
];
