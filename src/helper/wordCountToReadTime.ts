export const calculateReadTime = (content: string | undefined) => {
  const wordCount = content?.split(" ").length || 100;

  const readTime = Math.floor(wordCount / 100);

  return readTime;
};
