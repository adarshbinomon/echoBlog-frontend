export const calculateReadTime = (content: string) => {
  const wordCount = content.split(" ").length;

  const readTime = Math.floor(wordCount / 100);

  return readTime;
};

