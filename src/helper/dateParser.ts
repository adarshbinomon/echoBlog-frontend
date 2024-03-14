export const dateParser = (date: Date | undefined) => {
  const inputDate: Date | undefined = date;

  const parsedDate = new Date(inputDate as Date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const newDate = parsedDate.toLocaleDateString("en-IN", options);
  return newDate;
};
