const BMIcategories = [
  {'name': 'Very severely underweight',
  'lowerBound': 0},
  {'name': 'Severely underweight',
  'lowerBound': 15},
  {'name': 'Underweight',
  'lowerBound': 16},
  {'name': 'Normal (healthy weight)',
  'lowerBound': 18.5},
  {'name': 'Overweight',
  'lowerBound': 25},
  {'name': 'Obese Class I (Moderately obese)',
  'lowerBound': 30},
  {'name': 'Obese Class II (Severely obese)',
  'lowerBound': 35},
  {'name': 'Obese Class III (Very severely obese)',
  'lowerBound': 40},
];

interface BmiParams {
  height: number;
  weight: number;
}

interface BmiResult {
  height: number;
  weight: number;
  bmi: string;
}

interface BmiError {
  error: string;
}

const parseArgs = (args: Array<string>): BmiParams => {
  return {
    height: Number(args[0]),
    weight: Number(args[1])
  };
};

const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmi = weight / ((height / 100) ^ 2);
  let message = 'invalid arguments!';

  BMIcategories.forEach((c) => {
    if (c.lowerBound < bmi){
      message = c.name;
    }
  });

  return {
    height: height,
    weight: weight,
    bmi: message,
  };
};

const main = (args: Array<string>): BmiResult | BmiError => {
  try {
    const { height, weight } = parseArgs(args);
    return calculateBmi( height, weight);
  } catch (e) {
    const errorMessage: BmiError = { error: `calculation unsuccessful` };
    return errorMessage; 
  }
};

export { main as bmiCalculator};
