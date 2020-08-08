const express = require('express');
const app = express();

const leapYear = year => {
  if((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)){
    return `<h2>This year is leap 😎</h2>`;
  } else {
    return `<h2>This year is not leap 🤔</h2>`;
  }
}

app.get('/', (req, res) => {
  res.send(`
    <h1>Leap year</h1>
    <h2>Please, put the year in the url, in the finish like this /2000</h2>
  `);
});

app.get('/:year', (req, res) => {
  const year = Number(req.params.year);
  res.send(leapYear(year));
});

app.listen(3000, () => {
  console.log('Server listen at the url http://localhost:3000');
});