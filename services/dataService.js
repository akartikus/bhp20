import { words } from '../repository/words.json';
import { groups } from '../repository/groups.json';

export const getWords = (level, group, region) => {
  const i = region === 'fr' ? 0 : 1;
  if (group === 0) {
    return level > 0 ? words[i].filter((e) => e.level === level) : words[0];
  } else return words[i].filter((e) => e.group === group);
};

export const getGroups = () => {
  return groups;
};

export const getGroupName = (id) => {
  return groups.find((e) => {
    return e.id === id;
  });
};
