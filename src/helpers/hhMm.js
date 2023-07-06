function checkTime(i) {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
}

const ud = JSON.parse(localStorage.ud ?? '{}');

export default function toHhMm(string) {
  console.log(ud.accountInfo.timeZone);
  const timeZone = ud.accountInfo.timeZone ?? Intl.DateTimeFormat().resolvedOptions();
  // const today = new Date(string * 1000);
  const today = new Date(
    new Date(string * 1000).toLocaleString('en-US', {
      timeZone,
    })
  );

  // let h = today.getHours();
  // let m = today.getMinutes();

  return today.toLocaleTimeString();
}
