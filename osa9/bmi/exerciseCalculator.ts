interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Error {
  error: string
}

interface Rating {
  rating: number;
  description: string;
}

const ratings = [
  {rating: 1, description: "far from target"},
  {rating: 2, description: "close to target"},
  {rating: 3, description: "target reached"},
];

const rateResult = ( average: number, target: number): Rating => {
  const percentage = average / target;

  if ( percentage < 0.5) {
    return ratings[0];
  } else if (percentage < 1.0) {
    return ratings[1];
  } else {
    return ratings[2];
  }
};

const calculateExercises = ( dailyTrainingHours: Array<number>, target: number): Result => {
  const trainingHoursTotal = dailyTrainingHours.reduce(
    (hours, daysHours) => daysHours + hours, 0);

  const trainingDays = dailyTrainingHours.reduce(
    (countOfDays, daysHours) => {
      return daysHours > 0 ? countOfDays +1 : countOfDays;}, 0);

  const average = trainingHoursTotal / dailyTrainingHours.length;

  const { rating, description } = rateResult(average, target);

  return {
    periodLength: dailyTrainingHours.length,
    trainingDays: trainingDays,
    success: average > target,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average
  };
};

const main = (dailyTrainingHours: Array<number>, target: number): Result | Error => {
  try {
    return calculateExercises( dailyTrainingHours, target);
  } catch (e) {
    const errorMessage: Error = { error: `calculation unsuccessful` };
    return errorMessage; 
  }
}; 

export { main as exerciseCalculator };
