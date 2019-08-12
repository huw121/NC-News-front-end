const convertCreatedAt = (timestamp) => {
  let [date, time] = timestamp.split('T');
  date = date.slice(2).split('-').reverse().join('-');
  time = time.slice(0, 5);
  return `${time}, ${date}`;
}

export default convertCreatedAt;