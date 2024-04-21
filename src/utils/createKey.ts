export const createKey = () => {
  // give me a 24 character key
  return Math.random().toString(36).substring(2, 24);
};
