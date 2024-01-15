/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/assets/images/image-man-eating.webp
const image_man_eating_namespaceObject = __webpack_require__.p + "images/image-man-eating-f947771f9cc834204bbf.webp";
;// CONCATENATED MODULE: ./src/assets/images/logo.svg
const logo_namespaceObject = __webpack_require__.p + "images/logo-dfb4f1973aa3d381f6e0.svg";
;// CONCATENATED MODULE: ./src/assets/images/icon-age.svg
const icon_age_namespaceObject = __webpack_require__.p + "images/icon-age-c616f537e6afd4ee9568.svg";
;// CONCATENATED MODULE: ./src/assets/images/icon-eating.svg
const icon_eating_namespaceObject = __webpack_require__.p + "images/icon-eating-861b6958ba7128610e83.svg";
;// CONCATENATED MODULE: ./src/assets/images/icon-exercise.svg
const icon_exercise_namespaceObject = __webpack_require__.p + "images/icon-exercise-8f90be9ff690c6bf483c.svg";
;// CONCATENATED MODULE: ./src/assets/images/icon-gender.svg
const icon_gender_namespaceObject = __webpack_require__.p + "images/icon-gender-2eda6d92213b8841b857.svg";
;// CONCATENATED MODULE: ./src/assets/images/icon-muscle.svg
const icon_muscle_namespaceObject = __webpack_require__.p + "images/icon-muscle-bdedb9e60375115fb99a.svg";
;// CONCATENATED MODULE: ./src/assets/images/icon-pregnancy.svg
const icon_pregnancy_namespaceObject = __webpack_require__.p + "images/icon-pregnancy-e5614be8e3e12ec372a9.svg";
;// CONCATENATED MODULE: ./src/assets/images/icon-race.svg
const icon_race_namespaceObject = __webpack_require__.p + "images/icon-race-fe09ea42d8031f9a5c7a.svg";
;// CONCATENATED MODULE: ./src/assets/images/icon-sleep.svg
const icon_sleep_namespaceObject = __webpack_require__.p + "images/icon-sleep-e50dd5c8961837dad8f9.svg";
;// CONCATENATED MODULE: ./src/assets/images/pattern-curved-line-left.svg
const pattern_curved_line_left_namespaceObject = __webpack_require__.p + "images/pattern-curved-line-left-1f4c3e2a6919c7307436.svg";
;// CONCATENATED MODULE: ./src/assets/images/pattern-curved-line-right.svg
const pattern_curved_line_right_namespaceObject = __webpack_require__.p + "images/pattern-curved-line-right-cad9271ef608be6a6c20.svg";
;// CONCATENATED MODULE: ./src/scripts/images.js
'use-strict';














// logo
document.getElementById('logo').src = logo_namespaceObject;

// meaning section
document.getElementById('img-man-eating').src = image_man_eating_namespaceObject;
document.getElementById('icon-eating').src = icon_eating_namespaceObject;
document.getElementById('icon-exercise').src = icon_exercise_namespaceObject;
document.getElementById('icon-sleep').src = icon_sleep_namespaceObject;

// limitations section
document.getElementById('icon-age').src = icon_age_namespaceObject;
document.getElementById('icon-gender').src = icon_gender_namespaceObject;
document.getElementById('icon-muscle').src = icon_muscle_namespaceObject;
document.getElementById('icon-pregnancy').src = icon_pregnancy_namespaceObject;
document.getElementById('icon-race').src = icon_race_namespaceObject;

// patterns
document.getElementById('curve-left').src = pattern_curved_line_left_namespaceObject;
document.getElementById('curve-right').src = pattern_curved_line_right_namespaceObject;
;// CONCATENATED MODULE: ./src/scripts/validate.js
'use-strict';

// If the input value is not a number, return empty string
function validateNumber(value) {
  value = value.trim();
  const regex = /^\d+\.?\d*$/u;
  if (regex.test(value)) return parseFloat(value);else return "";
}
;// CONCATENATED MODULE: ./src/scripts/height.js
'use-strict';


function convertHeight(value, unit) {
  value = validateNumber(value);
  let cm = value;
  let ft = value;
  let inches = value;
  if (value === "") return {
    cm,
    ft,
    inches
  };
  if (unit === "cm") {
    ft = value * 0.032808;
    inches = value * 0.39370;
  } else if (unit === "ft") {
    cm = value / 0.032808;
    inches = value * 12;
  } else {
    cm = value / 0.39370;
    ft = value * 0.083333;
  }
  return {
    cm: cm.toFixed(2),
    ft: ft.toFixed(2),
    inches: inches.toFixed(2)
  };
}
;// CONCATENATED MODULE: ./src/scripts/weight.js
'use-strict';


function convertWeight(value, unit) {
  value = validateNumber(value);
  let kg = value;
  let st = value;
  let lbs = value;
  if (value === "") return {
    kg,
    st,
    lbs
  };
  if (unit === "kg") {
    lbs = value * 2.2046;
    st = value * 0.1574;
  } else if (unit === "st") {
    lbs = value * 14;
    kg = value / 0.15747;
  } else {
    kg = value / 2.2046;
    st = value * 0.071429;
  }
  return {
    kg: kg.toFixed(2),
    st: st.toFixed(2),
    lbs: lbs.toFixed(2)
  };
}
;// CONCATENATED MODULE: ./src/scripts/bmi.js
'use-strict';

function calculateBmi(height, weight) {
  // if height or weight is 0 or empty, return null
  if (height === 0 || height === "" || weight === 0 || weight === "") return null;

  // convert cm to m
  height = height / 100;

  // result 
  const bmi = (weight / (height * height)).toFixed(1);
  const weightStatus = () => {
    if (bmi < 18.5) return "Underweight";else if (18.5 < bmi && bmi < 25) return "Healthy Weight";else if (25 < bmi && bmi < 30) return "Overweight";else return "Obesity";
  };
  const weightRange = () => {
    const min = (18.5 * (height * height)).toFixed(1);
    const max = (24.9 * (height * height)).toFixed(1);
    return {
      min,
      max
    };
  };
  return {
    bmi,
    weightStatus,
    weightRange
  };
}
;// CONCATENATED MODULE: ./src/scripts/form.js
'use-strict';





// values
let height = {
  cm: 0,
  ft: 0,
  inches: 0
};
let weight = {
  kg: 0,
  st: 0,
  lbs: 0
};
let measurement = 'metric'; // metric is checked by default

// init inputs
initMeasurementRadioGroup();
initHeightInputs();
initWeightInputs();

// Init measurement radio group => toggle visibility
function initMeasurementRadioGroup() {
  const radioGroup = document.querySelectorAll('input[type="radio"][name="measurement"]');
  const metricInputs = document.querySelectorAll('div[data-type="metric"]');
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
      } else {
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
    } else {
      const minWeightImperial = convertWeight(weightRange.min, "kg");
      const maxWeightImperial = convertWeight(weightRange.max, "kg");
      bmiWeightRange.textContent = `${minWeightImperial.st}st ${minWeightImperial.lbs}lbs - ${maxWeightImperial.st}st ${maxWeightImperial.lbs}lbs`;
    }
  } else {
    // update result visibility
    welcomeMsg.classList.remove('hidden');
    resultBmi.classList.add('hidden');
  }
}
;// CONCATENATED MODULE: ./src/main.js
'use-strict';




/******/ })()
;
//# sourceMappingURL=index.bundle-d8a47f6d280026cd3cac.js.map