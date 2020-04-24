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
  {
    value: 'Adventure',
    ref: 'reference',
    indication: 'Adventure group 1',
    isFound: false,
    level: 2,
    group: 1,
  },
  {
    value: 'Adventure',
    ref: 'reference',
    indication: 'Adventure group 1 azertyuiop',
    isFound: false,
    level: 2,
    group: 1,
  },
  {
    value: 'Adventure',
    ref: 'reference',
    indication: 'Adventure group 1 jzkfhizegfi',
    isFound: false,
    level: 2,
    group: 1,
  },
  {
    value: 'Adventure',
    ref: 'reference',
    indication: 'Adventure group 2 zkfugzeiufze',
    isFound: false,
    level: 2,
    group: 2,
  },
  {
    value: 'Adventure',
    ref: 'reference',
    indication: 'Adventure group 2 ziufizuefzeze',
    isFound: false,
    level: 2,
    group: 2,
  },
  {
    value: 'Adventure',
    ref: 'reference',
    indication: 'Adventure group 3 lkfhzlezrf',
    isFound: false,
    level: 2,
    group: 3,
  },
  {
    value: 'Adventure',
    ref: 'reference',
    indication: 'Adventure group 3 zlfzfz',
    isFound: false,
    level: 2,
    group: 3,
  },
];

const groups = [
  { id: 1, label: 'Adventure 1', isEnable: true },
  { id: 2, label: 'Adventure 2', isEnable: true },
  { id: 3, label: 'Adventure 3', isEnable: false },
];

export const getWords = (level, group) => {
  if (group === 0)
    return level > 0 ? words.filter((e) => e.level === level) : words;
  else return words.filter((e) => /*e.level === level && */ e.group === group);
};
export const getGroups = () => {
  return groups;
};
