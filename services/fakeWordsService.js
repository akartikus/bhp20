const words = [
  {
    value: 'Jesus',
    ref: 'reference',
    indication: 'Fils de Dieu',
    isFound: false,
    level: 1,
    group: 0,
  },
  {
    value: 'Croix',
    ref: 'reference',
    indication: 'Où tout a était achevé',
    isFound: false,
    level: 1,
    group: 0,
  },
  {
    value: 'Pied',
    ref: 'reference',
    indication: 'Immulité',
    isFound: false,
    level: 1,
    group: 0,
  },
  {
    value: 'Jesus',
    ref: 'reference',
    indication: 'Fils de Dieu, level2',
    isFound: false,
    level: 2,
    group: 0,
  },
  {
    value: 'Croix',
    ref: 'reference',
    indication: 'Où tout a était achevé, level 2',
    isFound: false,
    level: 2,
    group: 0,
  },
  {
    value: 'Pied',
    ref: 'reference',
    indication: 'Immulité, level 2',
    isFound: false,
    level: 2,
    group: 0,
  },
];

export const getWords = (level) => {
  return level > 0 ? words.filter((e) => e.level === level) : words;
};
