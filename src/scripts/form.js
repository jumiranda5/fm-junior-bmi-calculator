'use-strict';

import { convertHeight } from "./height";
import { convertWeight } from "./weight";
import { calculateBmi } from "./bmi";

// values
let height = {cm: 0, ft: 0, inches: 0};
let weight = {kg: 0, st: 0, lbs: 0};
let measurement = 'metric'; // metric is checked by default


// init inputs
initMeasurementRadioGroup();
initHeightInputs();
initWeightInputs();


// Init measurement radio group => toggle visibility
function initMeasurementRadioGroup() {
    const radioGroup = document.querySelectorAll('input[type="radio"][name="measurement"]');
    const metricInputs = document.querySelectorAll('fieldset[data-type="metric"]');
    const imperialInputs = document.querySelectorAll('fieldset[data-type="imperial"]');

    // initial visibilities (metric default)
    metricInputs.forEach(input => input.classList.remove('hidden'));
    imperialInputs.forEach(input => input.classList.add('hidden'));

    radioGroup.forEach(radio => {
        radio.addEventListener('change', () => {
            // update measurement var
            measurement = radio.value;

            // update inputs visibilities
            if (measurement === 'metric') {
                metricInputs.forEach(input => input.classList.remove('hidden'));
                imperialInputs.forEach(input => input.classList.add('hidden'));
            }
            else {
                metricInputs.forEach(input => input.classList.add('hidden'));
                imperialInputs.forEach(input => input.classList.remove('hidden'));
            }

            // update bmi result
            updateBMI();
        });
    });
}


// update all heigh inputs on keystroke
function initHeightInputs() {
    const input_cm = document.getElementById('height-metric');
    const input_ft = document.getElementById('height-imperial-ft');
    const input_in = document.getElementById('height-imperial-in');

    input_cm.addEventListener("keyup", () => {
        height = convertHeight(input_cm.value, "cm");
        input_ft.value = height.ft;
        input_in.value = height.inches;
        updateBMI();
    });

    input_ft.addEventListener("keyup", () => {
        height = convertHeight(input_ft.value, "ft");
        input_cm.value = height.cm;
        input_in.value = height.inches;
        updateBMI();
    });

    input_in.addEventListener("keyup", () => {
        height = convertHeight(input_in.value, "in");
        input_ft.value = height.ft;
        input_cm.value = height.cm;
        updateBMI();
    });
}


// update all weight inputs on keystroke
function initWeightInputs() {
    const input_kg = document.getElementById('weight-metric');
    const input_st = document.getElementById('weight-imperial-st');
    const input_lbs = document.getElementById('weight-imperial-lbs');

    input_kg.addEventListener("keyup", () => {
        weight = convertWeight(input_kg.value, "kg");
        input_st.value = weight.st;
        input_lbs.value = weight.lbs; 
        updateBMI();
    });

    input_st.addEventListener("keyup", () => {
        weight = convertWeight(input_st.value, "st");
        input_kg.value = weight.kg;
        input_lbs.value = weight.lbs;
        updateBMI();
    });

    input_lbs.addEventListener("keyup", () => {
        weight = convertWeight(input_lbs.value, "lbs");
        input_kg.value = weight.kg;
        input_lbs.value = weight.lbs;
        updateBMI();
    });
}


// Update the BMI result
function updateBMI() {
    const result = calculateBmi(height.cm, weight.kg);

    const welcomeMsg = document.querySelector('.result-welcome');
    const resultBmi = document.querySelector('.result-bmi');
    const bmi = document.getElementById('bmi-score');
    const bmiStatus = document.getElementById('bmi-status');
    const bmiWeightRange = document.getElementById('bmi-weight-range');

    if (result !== null) {
        const status = result.weightStatus();
        const weightRange = result.weightRange();
        
        // update result visibility
        welcomeMsg.classList.add('hidden');
        resultBmi.classList.remove('hidden');
        
        // update result content
        bmi.textContent = result.bmi;
        bmiStatus.textContent = status;
        if (measurement === "metric") {
            bmiWeightRange.textContent = `${weightRange.min}kg - ${weightRange.max}kg`;
        }
        else {
            const minWeightImperial = convertWeight(weightRange.min, "kg");
            const maxWeightImperial = convertWeight(weightRange.max, "kg");
            bmiWeightRange.textContent = `${minWeightImperial.st}st ${minWeightImperial.lbs}lbs - ${maxWeightImperial.st}st ${maxWeightImperial.lbs}lbs`; 
        }
    }
    else {
        // update result visibility
        welcomeMsg.classList.remove('hidden');
        resultBmi.classList.add('hidden');
    }
}