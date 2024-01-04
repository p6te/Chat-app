export const formatDate = (timestamp: number) => {
  const currentDay = new Date();
  const date = new Date(timestamp * 1000);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  if (timestamp === 0) {
    return "";
  }

  if (Date.now() / 1000 - timestamp < 30) {
    return "a few seconds ago";
  }

  return date.toDateString() === currentDay.toDateString()
    ? `${hours}:${minutes}`
    : `${day}-${month}-${year}`;
};
