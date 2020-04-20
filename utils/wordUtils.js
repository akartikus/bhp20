export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
export const NUM_TRY = 3;

export const wordToMap = (word) => {
  return Array.from(word.toUpperCase()).map((e) => {
    return { value: e, isUsed: false };
  });
};

export const isWordFound = (word) => {
  return word.map((e) => e.isUsed).reduce((acc, v) => acc && v, true);
};
