export const wordToMap = (word) => {
  return Array.from(word.toUpperCase()).map((e) => {
    return { value: e, isUsed: false };
  });
};
