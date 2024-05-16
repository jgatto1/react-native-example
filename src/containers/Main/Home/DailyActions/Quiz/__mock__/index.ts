import { Question, QuestionType, Quiz } from 'model/backend/quiz';

export const QUESTIONS: Question[] = [
  {
    choices: ['True', 'False'],
    correct_choice_indexes: [1],
    id: 782,
    label_a: null,
    label_b: null,
    question: "For successful addiction recovery, you need to feel motivated or it won't work. ",
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      "Don't wait! Motivation may come and go. If you have addiction, start now to reduce it no matter what you feel.",
    text_if_incorrect:
      "Don't wait! Motivation may come and go. If you have addiction, start now to reduce it no matter what you feel.",
    type: QuestionType.TRUE_FALSE,
  },
  {
    choices: ['Better', 'Worse', 'Stay the same', 'Any of the above'],
    correct_choice_indexes: [3],
    id: 778,
    label_a: null,
    label_b: null,
    question: 'As you reduce substance use, your trauma symptoms will get:',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      "There's no one pattern. Any of these are possible. But whatever arises, you can cope and recover from addiction and trauma.",
    text_if_incorrect:
      "There's no one pattern. Any of these are possible. But whatever arises, you can cope and recover from addiction and trauma.",
    type: QuestionType.MULTIPLE_CHOICE,
  },
  {
    choices: ['Intolerance', 'Increased quantity of use', 'Redrawal', 'Tolerance'],
    correct_choice_indexes: [1, 2, 5, 6],
    id: 772,
    label_a: 'Yes',
    label_b: 'No',
    question: 'Signs of addiction include:',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      'Increased quantity of use and tolerance (needing more to get the same effect) are signs of addiction.',
    text_if_incorrect:
      'Increased quantity of use and tolerance (needing more to get the same effect) are signs of addiction.',
    type: QuestionType.CATEGORIZE,
  },
  {
    choices: ['Quit all at once', 'Cut down gradually', 'Try an experiment', 'Any of the above'],
    correct_choice_indexes: [3],
    id: 784,
    label_a: null,
    label_b: null,
    question: 'Which is the best approach for addiction recovery?',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      "Any of these can work, but it depends on the person and that person's history. Work closely with your counselor to decide.",
    text_if_incorrect:
      "Any of these can work, but it depends on the person and that person's history. Work closely with your counselor to decide.",
    type: QuestionType.MULTIPLE_CHOICE,
  },
  {
    choices: ['True', 'False'],
    correct_choice_indexes: [1],
    id: 771,
    label_a: null,
    label_b: null,
    question: 'You must go to self-help groups such as AA.',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      'Self-help groups can be hugely helpful and are a terrific option. However, you can recover without going to AA.',
    text_if_incorrect:
      'Self-help groups can be hugely helpful and are a terrific option. However, you can recover without going to AA.',
    type: QuestionType.TRUE_FALSE,
  },
  {
    choices: ['30', '60', '90', 'None of the above'],
    correct_choice_indexes: [3],
    id: 775,
    label_a: null,
    label_b: null,
    question: "At __ days clean it's good to test your sobriety by being around others who use.",
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      'Never test your sobriety. Stick with recovery and strive to stay in safe situations as much as possible.',
    text_if_incorrect:
      'Never test your sobriety. Stick with recovery and strive to stay in safe situations as much as possible.',
    type: QuestionType.FILL_BLANK,
  },
  {
    choices: ['Weak character', 'Psychosomatic', 'A medical illness', 'Genetic'],
    correct_choice_indexes: [2],
    id: 785,
    label_a: null,
    label_b: null,
    question: 'Addiction is:',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      "It's a medical illness, not “weak character.” And it's not just genetic; trauma and other life events play a big role too.",
    text_if_incorrect:
      "It's a medical illness, not “weak character.” And it's not just genetic; trauma and other life events play a big role too.",
    type: QuestionType.MULTIPLE_CHOICE,
  },
  {
    choices: ['Foolishness', '"Cold turkey"', 'Harm reduction', 'Wisdom'],
    correct_choice_indexes: [2],
    id: 780,
    label_a: null,
    label_b: null,
    question: 'Going from 5 drinks a day to 2 drinks a day is an example of ___.',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      'Harm reduction (gradually reducing use) is a valid choice for some people. It may be foolish or wise (ask your counselor).',
    text_if_incorrect:
      'Harm reduction (gradually reducing use) is a valid choice for some people. It may be foolish or wise (ask your counselor).',
    type: QuestionType.FILL_BLANK,
  },
  {
    choices: ['A straight path', 'Slips', 'Cravings', 'Flashbacks'],
    correct_choice_indexes: [1, 2, 4, 7],
    id: 776,
    label_a: 'Typical',
    label_b: 'Not typical',
    question: 'What is typical of addiction recovery?',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      'Like climbing a mountain, there are challenges along the way, including slips and cravings. So prepare well for your climb!',
    text_if_incorrect:
      'Like climbing a mountain, there are challenges along the way, including slips and cravings. So prepare well for your climb!',
    type: QuestionType.CATEGORIZE,
  },
  {
    choices: ["I'm stressed", 'I lost my job', 'I had a terrible trauma', 'None of the above'],
    correct_choice_indexes: [3],
    id: 770,
    label_a: null,
    label_b: null,
    question: 'Which is an acceptable reason for using?',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      "There's never a good reason for using if you have an addiction problem. But your mind will come up with many reasons!",
    text_if_incorrect:
      "There's never a good reason for using if you have an addiction problem. But your mind will come up with many reasons!",
    type: QuestionType.MULTIPLE_CHOICE,
  },
  {
    choices: ['"I don\'t care"', '"I can handle this alone"', '"My trauma matters"', '"Quit or die"'],
    correct_choice_indexes: [0, 2, 5, 7],
    id: 773,
    label_a: 'Lead',
    label_b: "Don't lead",
    question: 'Which thoughts lead to substance use?',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      '"I don\'t care" and "I can handle this alone" are thoughts that lead to using. Stay aware and shift into recovery thinking!',
    text_if_incorrect:
      '"I don\'t care" and "I can handle this alone" are thoughts that lead to using. Stay aware and shift into recovery thinking!',
    type: QuestionType.CATEGORIZE,
  },
  {
    choices: ['Positive feelings', 'Flexibility', 'Two-handedness', 'Mixed feelings'],
    correct_choice_indexes: [3],
    id: 779,
    label_a: null,
    label_b: null,
    question: '"Ambivalence" means ____.',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      'Mixed feelings are normal in recovery, especially early on. Notice them but stick with your recovery plan.',
    text_if_incorrect:
      'Mixed feelings are normal in recovery, especially early on. Notice them but stick with your recovery plan.',
    type: QuestionType.FILL_BLANK,
  },
  {
    choices: ['True', 'False'],
    correct_choice_indexes: [0],
    id: 774,
    label_a: null,
    label_b: null,
    question: 'Trauma recovery may make you feel afraid of getting better. ',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      'Getting better may feel scary or wrong ("If I get better it\'s like my abuser won."). Notice what you feel and work on it.',
    text_if_incorrect:
      'Getting better may feel scary or wrong ("If I get better it\'s like my abuser won."). Notice what you feel and work on it.',
    type: QuestionType.TRUE_FALSE,
  },
  {
    choices: ['Deciduous', 'Sequential', 'Integrated', 'Relegated'],
    correct_choice_indexes: [2],
    id: 783,
    label_a: null,
    label_b: null,
    question: '____ treatment means working on trauma and addiction at the same time.',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      "It's recommended to work on trauma and addiction at the same time-- but safely by focusing on coping skills in the present.",
    text_if_incorrect:
      "It's recommended to work on trauma and addiction at the same time-- but safely by focusing on coping skills in the present.",
    type: QuestionType.FILL_BLANK,
  },
  {
    choices: ['It isolates you', 'It takes away your control', 'It stalls your development', 'All of the above'],
    correct_choice_indexes: [3],
    id: 781,
    label_a: null,
    label_b: null,
    question: 'How does addiction prevent healing from trauma?',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct: 'There are many different ways addiction prevents healing from trauma, including all of these.',
    text_if_incorrect: 'There are many different ways addiction prevents healing from trauma, including all of these.',
    type: QuestionType.MULTIPLE_CHOICE,
  },
  {
    choices: [
      '"If I have a slip I might as well keep using"',
      '"It\'s ineffective to violate abstinence"',
      '"Abstinence is a positive recovery approach"',
      '"Slips are a normal part of recovery"',
    ],
    correct_choice_indexes: [0],
    id: 777,
    label_a: null,
    label_b: null,
    question: 'The "abstinence violation effect" means:',
    quiz_id: 14,
    responded_correctly: null,
    text_if_correct:
      "In early recovery, it's common to let a slip turn into a full-blown relapse. Remember: if you slip, don't keep using! ",
    text_if_incorrect:
      "In early recovery, it's common to let a slip turn into a full-blown relapse. Remember: if you slip, don't keep using! ",
    type: QuestionType.MULTIPLE_CHOICE,
  },
];

export const QUIZZES: Quiz[] = [
  {
    id: 14,
    questions: QUESTIONS,
    name: 'Addiction',
    topic_id: 30,
  },
];
