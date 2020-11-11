/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();
const jsonParser = bodyParser.json();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!weight || !height){
    res.status(400).send({error: 'invalid arguments'});
  } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({error: 'provided values were not numbers'});
  } else {
    const result = bmiCalculator([String(height), String(weight)]);
    res.send(result);
  }
});

app.post('/exercises', jsonParser, (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  if (!body.daily_exercises || !body.target){
    res.status(400).send({error: 'parameters missing'});
  } else if (!Array.isArray(body.daily_exercises) || isNaN(Number(body.target)) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    !body.daily_exercises.length || !body.daily_exercises.every((item: unknown) => typeof item === 'number')) {
    res.status(400).send({error: 'malformatted parameters'});
  } else {
    const result = exerciseCalculator(body.daily_exercises, body.target);
    res.send(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});