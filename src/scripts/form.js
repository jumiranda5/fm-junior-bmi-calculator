'use-strict';

// values
let height = {cm: 0, ft: 0, inches: 0};
let weight = {kg: 0, st: 0, lbs: 0};
let measurement = 'metric'; // metric is checked by default


// init inputs
initMeasurementRadioGroup();


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
            // updateBMI(); TODO
        });
    });
}