export const dateParser = (date: string | undefined) => {
  const inputDate: string | undefined = date;

  const parsedDate = new Date(inputDate as string);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const newDate = parsedDate.toLocaleDateString("en-US", options);
  return newDate;
};
