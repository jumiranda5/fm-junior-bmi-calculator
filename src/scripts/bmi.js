'use-strict';

export function calculateBmi(height, weight) {

    // if height or weight is 0 or empty, return null
    if (height === 0 || height === "" || 
        weight === 0 || weight === "" ) return null;

    // convert cm to m
    height = height / 100;

    // result 
    const bmi = (weight / (height * height)).toFixed(1);

    const weightStatus = () => {
        if (bmi < 18.5) return "Underweight";
        else if (18.5 < bmi && bmi < 25) return "Healthy Weight";
        else if (25 < bmi && bmi < 30) return "Overweight";
        else return "Obesity";
    };

    const weightRange = () => {

        const min = (18.5 * (height * height)).toFixed(1);
        const max = (24.9 * (height * height)).toFixed(1);

        return {min, max};

    };


    return {
        bmi,
        weightStatus,
        weightRange,
    };


}