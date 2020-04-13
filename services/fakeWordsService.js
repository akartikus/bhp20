const words = [
  {
    value: 'Jesus',
    ref: 'reference',
    indication: 'Fils de Dieu',
    level: 1,
    group: 0,
  },
  {
    value: 'Croix',
    ref: 'reference',
    indication: 'Où tout a était achevé',
    level: 1,
    group: 0,
  },
  {
    value: 'Pied',
    ref: 'reference',
    indication: 'Immulité',
    level: 1,
    group: 0,
  },
  {
    value: 'Jesus',
    ref: 'reference',
    indication: 'Fils de Dieu, level2',
    level: 2,
    group: 0,
  },
  {
    value: 'Croix',
    ref: 'reference',
    indication: 'Où tout a était achevé, level 2',
    level: 2,
    group: 0,
  },
  {
    value: 'Pied',
    ref: 'reference',
    indication: 'Immulité, level 2',
    level: 2,
    group: 0,
  },
];

export const getWords = (level) => {
  return words.filter((e) => e.level === level);
};
