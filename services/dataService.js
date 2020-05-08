import { words } from '../repository/words.json';
import { groups } from '../repository/groups.json';

export const getWords = (level, group) => {
  if (group === 0)
    return level > 0 ? words.filter((e) => e.level === level) : words;
  else return words.filter((e) => e.group === group);
};

export const getGroups = () => {
  return groups;
};

export const getGroupName = (id) => {
  return groups.find((e) => {
    return e.id === id;
  });
};
