const withZero = (time) => (time < 10 ? `0${time}` : time);

const log = (msg) => {
  const time = new Date();
  const prefix = `${withZero(time.getHours())}:${withZero(time.getMinutes())}:${withZero(
    time.getSeconds(),
  )}`;
  if (typeof msg === 'string') {
    console.log(`\n[${prefix}]: ${msg}\n`);
    return;
  }

  console.log(`\n[${prefix}]: `);
  console.log(msg);
  console.log('\n');
};

module.exports = log;
