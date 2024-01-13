/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/bmi.js":
/*!****************************!*\
  !*** ./src/scripts/bmi.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateBmi: () => (/* binding */ calculateBmi)
/* harmony export */ });
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

/***/ }),

/***/ "./src/scripts/form.js":
/*!*****************************!*\
  !*** ./src/scripts/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _height__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./height */ "./src/scripts/height.js");
/* harmony import */ var _weight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weight */ "./src/scripts/weight.js");
/* harmony import */ var _bmi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bmi */ "./src/scripts/bmi.js");
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
    height = (0,_height__WEBPACK_IMPORTED_MODULE_0__.convertHeight)(input_cm.value, "cm");
    input_ft.value = height.ft;
    input_in.value = height.inches;
    updateBMI();
  });
  input_ft.addEventListener("keyup", () => {
    height = (0,_height__WEBPACK_IMPORTED_MODULE_0__.convertHeight)(input_ft.value, "ft");
    input_cm.value = height.cm;
    input_in.value = height.inches;
    updateBMI();
  });
  input_in.addEventListener("keyup", () => {
    height = (0,_height__WEBPACK_IMPORTED_MODULE_0__.convertHeight)(input_in.value, "in");
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
    weight = (0,_weight__WEBPACK_IMPORTED_MODULE_1__.convertWeight)(input_kg.value, "kg");
    input_st.value = weight.st;
    input_lbs.value = weight.lbs;
    updateBMI();
  });
  input_st.addEventListener("keyup", () => {
    weight = (0,_weight__WEBPACK_IMPORTED_MODULE_1__.convertWeight)(input_st.value, "st");
    input_kg.value = weight.kg;
    input_lbs.value = weight.lbs;
    updateBMI();
  });
  input_lbs.addEventListener("keyup", () => {
    weight = (0,_weight__WEBPACK_IMPORTED_MODULE_1__.convertWeight)(input_lbs.value, "lbs");
    input_kg.value = weight.kg;
    input_lbs.value = weight.lbs;
    updateBMI();
  });
}

// Update the BMI result
function updateBMI() {
  const result = (0,_bmi__WEBPACK_IMPORTED_MODULE_2__.calculateBmi)(height.cm, weight.kg);
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
      const minWeightImperial = (0,_weight__WEBPACK_IMPORTED_MODULE_1__.convertWeight)(weightRange.min, "kg");
      const maxWeightImperial = (0,_weight__WEBPACK_IMPORTED_MODULE_1__.convertWeight)(weightRange.max, "kg");
      bmiWeightRange.textContent = `${minWeightImperial.st}st ${minWeightImperial.lbs}lbs - ${maxWeightImperial.st}st ${maxWeightImperial.lbs}lbs`;
    }
  } else {
    // update result visibility
    welcomeMsg.classList.remove('hidden');
    resultBmi.classList.add('hidden');
  }
}

/***/ }),

/***/ "./src/scripts/height.js":
/*!*******************************!*\
  !*** ./src/scripts/height.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertHeight: () => (/* binding */ convertHeight)
/* harmony export */ });
/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate */ "./src/scripts/validate.js");
'use-strict';


function convertHeight(value, unit) {
  value = (0,_validate__WEBPACK_IMPORTED_MODULE_0__.validateNumber)(value);
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

/***/ }),

/***/ "./src/scripts/images.js":
/*!*******************************!*\
  !*** ./src/scripts/images.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_images_image_man_eating_webp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/images/image-man-eating.webp */ "./src/assets/images/image-man-eating.webp");
/* harmony import */ var _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/images/logo.svg */ "./src/assets/images/logo.svg");
/* harmony import */ var _assets_images_icon_age_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/images/icon-age.svg */ "./src/assets/images/icon-age.svg");
/* harmony import */ var _assets_images_icon_eating_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/images/icon-eating.svg */ "./src/assets/images/icon-eating.svg");
/* harmony import */ var _assets_images_icon_exercise_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/images/icon-exercise.svg */ "./src/assets/images/icon-exercise.svg");
/* harmony import */ var _assets_images_icon_gender_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/images/icon-gender.svg */ "./src/assets/images/icon-gender.svg");
/* harmony import */ var _assets_images_icon_muscle_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/images/icon-muscle.svg */ "./src/assets/images/icon-muscle.svg");
/* harmony import */ var _assets_images_icon_pregnancy_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/images/icon-pregnancy.svg */ "./src/assets/images/icon-pregnancy.svg");
/* harmony import */ var _assets_images_icon_race_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/images/icon-race.svg */ "./src/assets/images/icon-race.svg");
/* harmony import */ var _assets_images_icon_sleep_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/images/icon-sleep.svg */ "./src/assets/images/icon-sleep.svg");
/* harmony import */ var _assets_images_pattern_curved_line_left_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/images/pattern-curved-line-left.svg */ "./src/assets/images/pattern-curved-line-left.svg");
/* harmony import */ var _assets_images_pattern_curved_line_right_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../assets/images/pattern-curved-line-right.svg */ "./src/assets/images/pattern-curved-line-right.svg");
'use-strict';














// logo
document.getElementById('logo').src = _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_1__;

// meaning section
document.getElementById('img-man-eating').src = _assets_images_image_man_eating_webp__WEBPACK_IMPORTED_MODULE_0__;
document.getElementById('icon-eating').src = _assets_images_icon_eating_svg__WEBPACK_IMPORTED_MODULE_3__;
document.getElementById('icon-exercise').src = _assets_images_icon_exercise_svg__WEBPACK_IMPORTED_MODULE_4__;
document.getElementById('icon-sleep').src = _assets_images_icon_sleep_svg__WEBPACK_IMPORTED_MODULE_9__;

// limitations section
document.getElementById('icon-age').src = _assets_images_icon_age_svg__WEBPACK_IMPORTED_MODULE_2__;
document.getElementById('icon-gender').src = _assets_images_icon_gender_svg__WEBPACK_IMPORTED_MODULE_5__;
document.getElementById('icon-muscle').src = _assets_images_icon_muscle_svg__WEBPACK_IMPORTED_MODULE_6__;
document.getElementById('icon-pregnancy').src = _assets_images_icon_pregnancy_svg__WEBPACK_IMPORTED_MODULE_7__;
document.getElementById('icon-race').src = _assets_images_icon_race_svg__WEBPACK_IMPORTED_MODULE_8__;

// patterns
document.getElementById('curve-left').src = _assets_images_pattern_curved_line_left_svg__WEBPACK_IMPORTED_MODULE_10__;
document.getElementById('curve-right').src = _assets_images_pattern_curved_line_right_svg__WEBPACK_IMPORTED_MODULE_11__;

/***/ }),

/***/ "./src/scripts/validate.js":
/*!*********************************!*\
  !*** ./src/scripts/validate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateNumber: () => (/* binding */ validateNumber)
/* harmony export */ });
'use-strict';

// If the input value is not a number, return empty string
function validateNumber(value) {
  value = value.trim();
  const regex = /^\d+\.?\d*$/u;
  if (regex.test(value)) return parseFloat(value);else return "";
}

/***/ }),

/***/ "./src/scripts/weight.js":
/*!*******************************!*\
  !*** ./src/scripts/weight.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertWeight: () => (/* binding */ convertWeight)
/* harmony export */ });
/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate */ "./src/scripts/validate.js");
'use-strict';


function convertWeight(value, unit) {
  value = (0,_validate__WEBPACK_IMPORTED_MODULE_0__.validateNumber)(value);
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

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/Inter-VariableFont_slnt,wght.ttf */ "./src/assets/fonts/Inter-VariableFont_slnt,wght.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: "Inter";
  font-display: swap;
  font-weight: 100 900;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("truetype");
}
body {
  font-size: 1rem;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: #5E6E85;
}

.hidden {
  display: none;
}

.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  top: auto;
  overflow: hidden;
}

.heading-xl,
.heading-l,
.heading-m,
.heading-s {
  font-weight: 600;
  line-height: 1.1;
  color: #253347;
}

.heading-xl {
  font-size: 3rem;
}

.heading-l {
  font-size: 2rem;
}

.heading-m {
  font-size: 1.5rem;
}

.heading-s {
  font-size: 1.25rem;
}

.body-sm {
  font-size: 0.875rem;
}

@media (min-width: 75rem) {
  .heading-xl {
    font-size: 4rem;
  }
  .heading-l {
    font-size: 3rem;
  }
}`, "",{"version":3,"sources":["webpack://./src/styles/_variables.scss","webpack://./src/styles/index.scss","webpack://./src/styles/_base.scss","webpack://./src/styles/_typography.scss"],"names":[],"mappings":"AAAA;EACI,oBAAA;EACA,kBAAA;EACA,oBAAA;EACA,+DAAA;ACCJ;ACHA;EACI,eAAA;EACA,8BFKG;EEJH,gBAAA;EACA,gBAAA;EACA,cFOgB;ACFpB;;ACFA;EAAU,aAAA;ADMV;;ACJA;EACI,kBAAA;EACA,cAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,gBAAA;ADOJ;;AEvBA;;;;EAII,gBAAA;EACA,gBAAA;EACA,cHKW;ACqBf;;AEvBA;EACI,eAAA;AF0BJ;;AEvBA;EACI,eAAA;AF0BJ;;AEvBA;EACI,iBAAA;AF0BJ;;AEvBA;EACI,kBAAA;AF0BJ;;AEvBA;EACI,mBAAA;AF0BJ;;AEpBA;EACI;IACI,eAAA;EFuBN;EEpBE;IACI,eAAA;EFsBN;AACF","sourcesContent":["@font-face {\n    font-family: 'Inter';\n    font-display: swap;\n    font-weight: 100 900;\n    src: url(../assets/fonts/Inter-VariableFont_slnt\\,wght.ttf) \n         format('truetype');\n}\n\n// Fonts\n$font: Inter, sans-serif;\n\n// Colors\n$clr-blue: #345FF6;\n$clr-gunmetal: #253347;\n$clr-electric-blue: #5E6E85;\n$clr-borders: #D8E2E7;\n$clr-white: #FFFFFF;\n$clr-light-blue: rgba(52, 94, 246, 0.15);","@font-face {\n  font-family: \"Inter\";\n  font-display: swap;\n  font-weight: 100 900;\n  src: url(../assets/fonts/Inter-VariableFont_slnt\\,wght.ttf) format(\"truetype\");\n}\nbody {\n  font-size: 1rem;\n  font-family: Inter, sans-serif;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #5E6E85;\n}\n\n.hidden {\n  display: none;\n}\n\n.sr-only {\n  position: absolute;\n  left: -10000px;\n  width: 1px;\n  height: 1px;\n  top: auto;\n  overflow: hidden;\n}\n\n.heading-xl,\n.heading-l,\n.heading-m,\n.heading-s {\n  font-weight: 600;\n  line-height: 1.1;\n  color: #253347;\n}\n\n.heading-xl {\n  font-size: 3rem;\n}\n\n.heading-l {\n  font-size: 2rem;\n}\n\n.heading-m {\n  font-size: 1.5rem;\n}\n\n.heading-s {\n  font-size: 1.25rem;\n}\n\n.body-sm {\n  font-size: 0.875rem;\n}\n\n@media (min-width: 75rem) {\n  .heading-xl {\n    font-size: 4rem;\n  }\n  .heading-l {\n    font-size: 3rem;\n  }\n}","@use 'variables' as v;\n\nbody { \n    font-size: 1rem;\n    font-family: v.$font;\n    font-weight: 400;\n    line-height: 1.5;\n    color: v.$clr-electric-blue;\n}\n\n.hidden { display: none; }\n\n.sr-only {\n    position: absolute ;\n    left: -10000px;\n    width: 1px;\n    height: 1px;\n    top: auto;\n    overflow: hidden;\n}","@use 'variables' as v;\n\n.heading-xl,\n.heading-l,\n.heading-m,\n.heading-s {\n    font-weight: 600;\n    line-height: 1.1;\n    color: v.$clr-gunmetal;\n}\n\n.heading-xl {\n    font-size: 3rem;\n}\n\n.heading-l {\n    font-size: 2rem;\n}\n\n.heading-m {\n    font-size: 1.5rem;\n}\n\n.heading-s {\n    font-size: 1.25rem;\n}\n\n.body-sm {\n    font-size: .875rem;\n}\n\n\n// Desktop\n\n@media (min-width: 75rem) {\n    .heading-xl {\n        font-size: 4rem;\n    }\n    \n    .heading-l {\n        font-size: 3rem;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/Inter-VariableFont_slnt,wght.ttf":
/*!***********************************************************!*\
  !*** ./src/assets/fonts/Inter-VariableFont_slnt,wght.ttf ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fonts/Inter-VariableFont_slnt,wght-afdb8a07907da21452bf.ttf";

/***/ }),

/***/ "./src/assets/images/icon-age.svg":
/*!****************************************!*\
  !*** ./src/assets/images/icon-age.svg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/icon-age-c616f537e6afd4ee9568.svg";

/***/ }),

/***/ "./src/assets/images/icon-eating.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/icon-eating.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/icon-eating-861b6958ba7128610e83.svg";

/***/ }),

/***/ "./src/assets/images/icon-exercise.svg":
/*!*********************************************!*\
  !*** ./src/assets/images/icon-exercise.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/icon-exercise-8f90be9ff690c6bf483c.svg";

/***/ }),

/***/ "./src/assets/images/icon-gender.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/icon-gender.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/icon-gender-2eda6d92213b8841b857.svg";

/***/ }),

/***/ "./src/assets/images/icon-muscle.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/icon-muscle.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/icon-muscle-bdedb9e60375115fb99a.svg";

/***/ }),

/***/ "./src/assets/images/icon-pregnancy.svg":
/*!**********************************************!*\
  !*** ./src/assets/images/icon-pregnancy.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/icon-pregnancy-e5614be8e3e12ec372a9.svg";

/***/ }),

/***/ "./src/assets/images/icon-race.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/icon-race.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/icon-race-fe09ea42d8031f9a5c7a.svg";

/***/ }),

/***/ "./src/assets/images/icon-sleep.svg":
/*!******************************************!*\
  !*** ./src/assets/images/icon-sleep.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/icon-sleep-e50dd5c8961837dad8f9.svg";

/***/ }),

/***/ "./src/assets/images/image-man-eating.webp":
/*!*************************************************!*\
  !*** ./src/assets/images/image-man-eating.webp ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/image-man-eating-f812e53be74268ca2027.webp";

/***/ }),

/***/ "./src/assets/images/logo.svg":
/*!************************************!*\
  !*** ./src/assets/images/logo.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/logo-dfb4f1973aa3d381f6e0.svg";

/***/ }),

/***/ "./src/assets/images/pattern-curved-line-left.svg":
/*!********************************************************!*\
  !*** ./src/assets/images/pattern-curved-line-left.svg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/pattern-curved-line-left-1f4c3e2a6919c7307436.svg";

/***/ }),

/***/ "./src/assets/images/pattern-curved-line-right.svg":
/*!*********************************************************!*\
  !*** ./src/assets/images/pattern-curved-line-right.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/pattern-curved-line-right-cad9271ef608be6a6c20.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _scripts_images_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/images.js */ "./src/scripts/images.js");
/* harmony import */ var _scripts_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/form.js */ "./src/scripts/form.js");
'use-strict';




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bWkuanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9zcmMvc2NyaXB0cy9mb3JtLmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vc3JjL3NjcmlwdHMvaGVpZ2h0LmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vc3JjL3NjcmlwdHMvaW1hZ2VzLmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vc3JjL3NjcmlwdHMvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9zcmMvc2NyaXB0cy93ZWlnaHQuanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vc3JjL3N0eWxlcy9pbmRleC5zY3NzPzRjMzciLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYi1kZXYtZW52L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZS1zdHJpY3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQm1pKGhlaWdodCwgd2VpZ2h0KSB7XG5cbiAgICAvLyBpZiBoZWlnaHQgb3Igd2VpZ2h0IGlzIDAgb3IgZW1wdHksIHJldHVybiBudWxsXG4gICAgaWYgKGhlaWdodCA9PT0gMCB8fCBoZWlnaHQgPT09IFwiXCIgfHwgXG4gICAgICAgIHdlaWdodCA9PT0gMCB8fCB3ZWlnaHQgPT09IFwiXCIgKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIGNvbnZlcnQgY20gdG8gbVxuICAgIGhlaWdodCA9IGhlaWdodCAvIDEwMDtcblxuICAgIC8vIHJlc3VsdCBcbiAgICBjb25zdCBibWkgPSAod2VpZ2h0IC8gKGhlaWdodCAqIGhlaWdodCkpLnRvRml4ZWQoMSk7XG5cbiAgICBjb25zdCB3ZWlnaHRTdGF0dXMgPSAoKSA9PiB7XG4gICAgICAgIGlmIChibWkgPCAxOC41KSByZXR1cm4gXCJVbmRlcndlaWdodFwiO1xuICAgICAgICBlbHNlIGlmICgxOC41IDwgYm1pICYmIGJtaSA8IDI1KSByZXR1cm4gXCJIZWFsdGh5IFdlaWdodFwiO1xuICAgICAgICBlbHNlIGlmICgyNSA8IGJtaSAmJiBibWkgPCAzMCkgcmV0dXJuIFwiT3ZlcndlaWdodFwiO1xuICAgICAgICBlbHNlIHJldHVybiBcIk9iZXNpdHlcIjtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2VpZ2h0UmFuZ2UgPSAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbWluID0gKDE4LjUgKiAoaGVpZ2h0ICogaGVpZ2h0KSkudG9GaXhlZCgxKTtcbiAgICAgICAgY29uc3QgbWF4ID0gKDI0LjkgKiAoaGVpZ2h0ICogaGVpZ2h0KSkudG9GaXhlZCgxKTtcblxuICAgICAgICByZXR1cm4ge21pbiwgbWF4fTtcblxuICAgIH07XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGJtaSxcbiAgICAgICAgd2VpZ2h0U3RhdHVzLFxuICAgICAgICB3ZWlnaHRSYW5nZSxcbiAgICB9O1xuXG5cbn0iLCIndXNlLXN0cmljdCc7XG5cbmltcG9ydCB7IGNvbnZlcnRIZWlnaHQgfSBmcm9tIFwiLi9oZWlnaHRcIjtcbmltcG9ydCB7IGNvbnZlcnRXZWlnaHQgfSBmcm9tIFwiLi93ZWlnaHRcIjtcbmltcG9ydCB7IGNhbGN1bGF0ZUJtaSB9IGZyb20gXCIuL2JtaVwiO1xuXG4vLyB2YWx1ZXNcbmxldCBoZWlnaHQgPSB7Y206IDAsIGZ0OiAwLCBpbmNoZXM6IDB9O1xubGV0IHdlaWdodCA9IHtrZzogMCwgc3Q6IDAsIGxiczogMH07XG5sZXQgbWVhc3VyZW1lbnQgPSAnbWV0cmljJzsgLy8gbWV0cmljIGlzIGNoZWNrZWQgYnkgZGVmYXVsdFxuXG5cbi8vIGluaXQgaW5wdXRzXG5pbml0TWVhc3VyZW1lbnRSYWRpb0dyb3VwKCk7XG5pbml0SGVpZ2h0SW5wdXRzKCk7XG5pbml0V2VpZ2h0SW5wdXRzKCk7XG5cblxuLy8gSW5pdCBtZWFzdXJlbWVudCByYWRpbyBncm91cCA9PiB0b2dnbGUgdmlzaWJpbGl0eVxuZnVuY3Rpb24gaW5pdE1lYXN1cmVtZW50UmFkaW9Hcm91cCgpIHtcbiAgICBjb25zdCByYWRpb0dyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdW25hbWU9XCJtZWFzdXJlbWVudFwiXScpO1xuICAgIGNvbnN0IG1ldHJpY0lucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ZpZWxkc2V0W2RhdGEtdHlwZT1cIm1ldHJpY1wiXScpO1xuICAgIGNvbnN0IGltcGVyaWFsSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZmllbGRzZXRbZGF0YS10eXBlPVwiaW1wZXJpYWxcIl0nKTtcblxuICAgIC8vIGluaXRpYWwgdmlzaWJpbGl0aWVzIChtZXRyaWMgZGVmYXVsdClcbiAgICBtZXRyaWNJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XG4gICAgaW1wZXJpYWxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XG5cbiAgICByYWRpb0dyb3VwLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgbWVhc3VyZW1lbnQgdmFyXG4gICAgICAgICAgICBtZWFzdXJlbWVudCA9IHJhZGlvLnZhbHVlO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgaW5wdXRzIHZpc2liaWxpdGllc1xuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50ID09PSAnbWV0cmljJykge1xuICAgICAgICAgICAgICAgIG1ldHJpY0lucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpKTtcbiAgICAgICAgICAgICAgICBpbXBlcmlhbElucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1ldHJpY0lucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpKTtcbiAgICAgICAgICAgICAgICBpbXBlcmlhbElucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdXBkYXRlIGJtaSByZXN1bHRcbiAgICAgICAgICAgIHVwZGF0ZUJNSSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuXG4vLyB1cGRhdGUgYWxsIGhlaWdoIGlucHV0cyBvbiBrZXlzdHJva2VcbmZ1bmN0aW9uIGluaXRIZWlnaHRJbnB1dHMoKSB7XG4gICAgY29uc3QgaW5wdXRfY20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVpZ2h0LW1ldHJpYycpO1xuICAgIGNvbnN0IGlucHV0X2Z0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlaWdodC1pbXBlcmlhbC1mdCcpO1xuICAgIGNvbnN0IGlucHV0X2luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlaWdodC1pbXBlcmlhbC1pbicpO1xuXG4gICAgaW5wdXRfY20uYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgICAgaGVpZ2h0ID0gY29udmVydEhlaWdodChpbnB1dF9jbS52YWx1ZSwgXCJjbVwiKTtcbiAgICAgICAgaW5wdXRfZnQudmFsdWUgPSBoZWlnaHQuZnQ7XG4gICAgICAgIGlucHV0X2luLnZhbHVlID0gaGVpZ2h0LmluY2hlcztcbiAgICAgICAgdXBkYXRlQk1JKCk7XG4gICAgfSk7XG5cbiAgICBpbnB1dF9mdC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgICAgICBoZWlnaHQgPSBjb252ZXJ0SGVpZ2h0KGlucHV0X2Z0LnZhbHVlLCBcImZ0XCIpO1xuICAgICAgICBpbnB1dF9jbS52YWx1ZSA9IGhlaWdodC5jbTtcbiAgICAgICAgaW5wdXRfaW4udmFsdWUgPSBoZWlnaHQuaW5jaGVzO1xuICAgICAgICB1cGRhdGVCTUkoKTtcbiAgICB9KTtcblxuICAgIGlucHV0X2luLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XG4gICAgICAgIGhlaWdodCA9IGNvbnZlcnRIZWlnaHQoaW5wdXRfaW4udmFsdWUsIFwiaW5cIik7XG4gICAgICAgIGlucHV0X2Z0LnZhbHVlID0gaGVpZ2h0LmZ0O1xuICAgICAgICBpbnB1dF9jbS52YWx1ZSA9IGhlaWdodC5jbTtcbiAgICAgICAgdXBkYXRlQk1JKCk7XG4gICAgfSk7XG59XG5cblxuLy8gdXBkYXRlIGFsbCB3ZWlnaHQgaW5wdXRzIG9uIGtleXN0cm9rZVxuZnVuY3Rpb24gaW5pdFdlaWdodElucHV0cygpIHtcbiAgICBjb25zdCBpbnB1dF9rZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWlnaHQtbWV0cmljJyk7XG4gICAgY29uc3QgaW5wdXRfc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VpZ2h0LWltcGVyaWFsLXN0Jyk7XG4gICAgY29uc3QgaW5wdXRfbGJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlaWdodC1pbXBlcmlhbC1sYnMnKTtcblxuICAgIGlucHV0X2tnLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XG4gICAgICAgIHdlaWdodCA9IGNvbnZlcnRXZWlnaHQoaW5wdXRfa2cudmFsdWUsIFwia2dcIik7XG4gICAgICAgIGlucHV0X3N0LnZhbHVlID0gd2VpZ2h0LnN0O1xuICAgICAgICBpbnB1dF9sYnMudmFsdWUgPSB3ZWlnaHQubGJzOyBcbiAgICAgICAgdXBkYXRlQk1JKCk7XG4gICAgfSk7XG5cbiAgICBpbnB1dF9zdC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgICAgICB3ZWlnaHQgPSBjb252ZXJ0V2VpZ2h0KGlucHV0X3N0LnZhbHVlLCBcInN0XCIpO1xuICAgICAgICBpbnB1dF9rZy52YWx1ZSA9IHdlaWdodC5rZztcbiAgICAgICAgaW5wdXRfbGJzLnZhbHVlID0gd2VpZ2h0LmxicztcbiAgICAgICAgdXBkYXRlQk1JKCk7XG4gICAgfSk7XG5cbiAgICBpbnB1dF9sYnMuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgICAgd2VpZ2h0ID0gY29udmVydFdlaWdodChpbnB1dF9sYnMudmFsdWUsIFwibGJzXCIpO1xuICAgICAgICBpbnB1dF9rZy52YWx1ZSA9IHdlaWdodC5rZztcbiAgICAgICAgaW5wdXRfbGJzLnZhbHVlID0gd2VpZ2h0LmxicztcbiAgICAgICAgdXBkYXRlQk1JKCk7XG4gICAgfSk7XG59XG5cblxuLy8gVXBkYXRlIHRoZSBCTUkgcmVzdWx0XG5mdW5jdGlvbiB1cGRhdGVCTUkoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gY2FsY3VsYXRlQm1pKGhlaWdodC5jbSwgd2VpZ2h0LmtnKTtcblxuICAgIGNvbnN0IHdlbGNvbWVNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0LXdlbGNvbWUnKTtcbiAgICBjb25zdCByZXN1bHRCbWkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0LWJtaScpO1xuICAgIGNvbnN0IGJtaSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibWktc2NvcmUnKTtcbiAgICBjb25zdCBibWlTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm1pLXN0YXR1cycpO1xuICAgIGNvbnN0IGJtaVdlaWdodFJhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JtaS13ZWlnaHQtcmFuZ2UnKTtcblxuICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gcmVzdWx0LndlaWdodFN0YXR1cygpO1xuICAgICAgICBjb25zdCB3ZWlnaHRSYW5nZSA9IHJlc3VsdC53ZWlnaHRSYW5nZSgpO1xuICAgICAgICBcbiAgICAgICAgLy8gdXBkYXRlIHJlc3VsdCB2aXNpYmlsaXR5XG4gICAgICAgIHdlbGNvbWVNc2cuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIHJlc3VsdEJtaS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHVwZGF0ZSByZXN1bHQgY29udGVudFxuICAgICAgICBibWkudGV4dENvbnRlbnQgPSByZXN1bHQuYm1pO1xuICAgICAgICBibWlTdGF0dXMudGV4dENvbnRlbnQgPSBzdGF0dXM7XG4gICAgICAgIGlmIChtZWFzdXJlbWVudCA9PT0gXCJtZXRyaWNcIikge1xuICAgICAgICAgICAgYm1pV2VpZ2h0UmFuZ2UudGV4dENvbnRlbnQgPSBgJHt3ZWlnaHRSYW5nZS5taW59a2cgLSAke3dlaWdodFJhbmdlLm1heH1rZ2A7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtaW5XZWlnaHRJbXBlcmlhbCA9IGNvbnZlcnRXZWlnaHQod2VpZ2h0UmFuZ2UubWluLCBcImtnXCIpO1xuICAgICAgICAgICAgY29uc3QgbWF4V2VpZ2h0SW1wZXJpYWwgPSBjb252ZXJ0V2VpZ2h0KHdlaWdodFJhbmdlLm1heCwgXCJrZ1wiKTtcbiAgICAgICAgICAgIGJtaVdlaWdodFJhbmdlLnRleHRDb250ZW50ID0gYCR7bWluV2VpZ2h0SW1wZXJpYWwuc3R9c3QgJHttaW5XZWlnaHRJbXBlcmlhbC5sYnN9bGJzIC0gJHttYXhXZWlnaHRJbXBlcmlhbC5zdH1zdCAke21heFdlaWdodEltcGVyaWFsLmxic31sYnNgOyBcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gdXBkYXRlIHJlc3VsdCB2aXNpYmlsaXR5XG4gICAgICAgIHdlbGNvbWVNc2cuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIHJlc3VsdEJtaS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG59IiwiJ3VzZS1zdHJpY3QnO1xuXG5pbXBvcnQgeyB2YWxpZGF0ZU51bWJlciB9IGZyb20gXCIuL3ZhbGlkYXRlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0SGVpZ2h0KHZhbHVlLCB1bml0KSB7XG5cbiAgICB2YWx1ZSA9IHZhbGlkYXRlTnVtYmVyKHZhbHVlKTtcbiAgICBcbiAgICBsZXQgY20gPSB2YWx1ZTtcbiAgICBsZXQgZnQgPSB2YWx1ZTtcbiAgICBsZXQgaW5jaGVzID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgPT09IFwiXCIpIHJldHVybiB7Y20sIGZ0LCBpbmNoZXN9O1xuXG4gICAgaWYgKHVuaXQgPT09IFwiY21cIikge1xuICAgICAgICBmdCA9IHZhbHVlICogMC4wMzI4MDg7XG4gICAgICAgIGluY2hlcyA9IHZhbHVlICogMC4zOTM3MDtcbiAgICB9XG4gICAgZWxzZSBpZiAodW5pdCA9PT0gXCJmdFwiKSB7XG4gICAgICAgIGNtID0gdmFsdWUgLyAwLjAzMjgwODtcbiAgICAgICAgaW5jaGVzID0gdmFsdWUgKiAxMjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNtID0gdmFsdWUgLyAwLjM5MzcwO1xuICAgICAgICBmdCA9IHZhbHVlICogMC4wODMzMzM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY206IGNtLnRvRml4ZWQoMiksIFxuICAgICAgICBmdDogZnQudG9GaXhlZCgyKSwgXG4gICAgICAgIGluY2hlczogaW5jaGVzLnRvRml4ZWQoMilcbiAgICB9O1xufVxuIiwiJ3VzZS1zdHJpY3QnO1xuXG5pbXBvcnQgTWFuRWF0aW5nIGZyb20gJy4uL2Fzc2V0cy9pbWFnZXMvaW1hZ2UtbWFuLWVhdGluZy53ZWJwJztcbmltcG9ydCBMb2dvIGZyb20gJy4uL2Fzc2V0cy9pbWFnZXMvbG9nby5zdmcnO1xuaW1wb3J0IEljb25BZ2UgZnJvbSAnLi4vYXNzZXRzL2ltYWdlcy9pY29uLWFnZS5zdmcnO1xuaW1wb3J0IEljb25FYXRpbmcgZnJvbSAnLi4vYXNzZXRzL2ltYWdlcy9pY29uLWVhdGluZy5zdmcnO1xuaW1wb3J0IEljb25FeGVyY2lzZSBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL2ljb24tZXhlcmNpc2Uuc3ZnJztcbmltcG9ydCBJY29uR2VuZGVyIGZyb20gJy4uL2Fzc2V0cy9pbWFnZXMvaWNvbi1nZW5kZXIuc3ZnJztcbmltcG9ydCBJY29uTXVzY2xlIGZyb20gJy4uL2Fzc2V0cy9pbWFnZXMvaWNvbi1tdXNjbGUuc3ZnJztcbmltcG9ydCBJY29uUHJlZ25hbmN5IGZyb20gJy4uL2Fzc2V0cy9pbWFnZXMvaWNvbi1wcmVnbmFuY3kuc3ZnJztcbmltcG9ydCBJY29uUmFjZSBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL2ljb24tcmFjZS5zdmcnO1xuaW1wb3J0IEljb25TbGVlcCBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL2ljb24tc2xlZXAuc3ZnJztcbmltcG9ydCBQYXR0ZXJuQ3VydmVkTGVmdCBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL3BhdHRlcm4tY3VydmVkLWxpbmUtbGVmdC5zdmcnO1xuaW1wb3J0IFBhdHRlcm5DdXJ2ZWRSaWdodCBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL3BhdHRlcm4tY3VydmVkLWxpbmUtcmlnaHQuc3ZnJztcblxuLy8gbG9nb1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ28nKS5zcmMgPSBMb2dvO1xuXG4vLyBtZWFuaW5nIHNlY3Rpb25cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWctbWFuLWVhdGluZycpLnNyYyA9IE1hbkVhdGluZztcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLWVhdGluZycpLnNyYyA9IEljb25FYXRpbmc7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1leGVyY2lzZScpLnNyYyA9IEljb25FeGVyY2lzZTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLXNsZWVwJykuc3JjID0gSWNvblNsZWVwO1xuXG4vLyBsaW1pdGF0aW9ucyBzZWN0aW9uXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1hZ2UnKS5zcmMgPSBJY29uQWdlO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24tZ2VuZGVyJykuc3JjID0gSWNvbkdlbmRlcjtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLW11c2NsZScpLnNyYyA9IEljb25NdXNjbGU7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1wcmVnbmFuY3knKS5zcmMgPSBJY29uUHJlZ25hbmN5O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24tcmFjZScpLnNyYyA9IEljb25SYWNlO1xuXG4vLyBwYXR0ZXJuc1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnZlLWxlZnQnKS5zcmMgPSBQYXR0ZXJuQ3VydmVkTGVmdDtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJ2ZS1yaWdodCcpLnNyYyA9IFBhdHRlcm5DdXJ2ZWRSaWdodDsiLCIndXNlLXN0cmljdCc7XG5cbi8vIElmIHRoZSBpbnB1dCB2YWx1ZSBpcyBub3QgYSBudW1iZXIsIHJldHVybiBlbXB0eSBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU51bWJlcih2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IHJlZ2V4ID0gL15cXGQrXFwuP1xcZCokL3U7XG4gICAgaWYgKHJlZ2V4LnRlc3QodmFsdWUpKSByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgZWxzZSByZXR1cm4gXCJcIjtcbn0iLCIndXNlLXN0cmljdCc7XG5cbmltcG9ydCB7IHZhbGlkYXRlTnVtYmVyIH0gZnJvbSBcIi4vdmFsaWRhdGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRXZWlnaHQodmFsdWUsIHVuaXQpIHtcblxuICAgIHZhbHVlID0gdmFsaWRhdGVOdW1iZXIodmFsdWUpO1xuXG4gICAgbGV0IGtnID0gdmFsdWU7XG4gICAgbGV0IHN0ID0gdmFsdWU7XG4gICAgbGV0IGxicyA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlID09PSBcIlwiKSByZXR1cm4ge2tnLCBzdCwgbGJzfTtcblxuICAgIGlmICh1bml0ID09PSBcImtnXCIpIHtcbiAgICAgICAgbGJzID0gdmFsdWUgKiAyLjIwNDY7XG4gICAgICAgIHN0ID0gdmFsdWUgKiAwLjE1NzQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKHVuaXQgPT09IFwic3RcIikge1xuICAgICAgICBsYnMgPSB2YWx1ZSAqIDE0O1xuICAgICAgICBrZyA9IHZhbHVlIC8gMC4xNTc0NztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGtnID0gdmFsdWUgLyAyLjIwNDY7XG4gICAgICAgIHN0ID0gdmFsdWUgKiAwLjA3MTQyOTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBrZzoga2cudG9GaXhlZCgyKSwgXG4gICAgICAgIHN0OiBzdC50b0ZpeGVkKDIpLCBcbiAgICAgICAgbGJzOiBsYnMudG9GaXhlZCgyKVxuICAgIH07XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9JbnRlci1WYXJpYWJsZUZvbnRfc2xudCx3Z2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkludGVyXCI7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC13ZWlnaHQ6IDEwMCA5MDA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pIGZvcm1hdChcInRydWV0eXBlXCIpO1xufVxuYm9keSB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC1mYW1pbHk6IEludGVyLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBjb2xvcjogIzVFNkU4NTtcbn1cblxuLmhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5zci1vbmx5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAtMTAwMDBweDtcbiAgd2lkdGg6IDFweDtcbiAgaGVpZ2h0OiAxcHg7XG4gIHRvcDogYXV0bztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmhlYWRpbmcteGwsXG4uaGVhZGluZy1sLFxuLmhlYWRpbmctbSxcbi5oZWFkaW5nLXMge1xuICBmb250LXdlaWdodDogNjAwO1xuICBsaW5lLWhlaWdodDogMS4xO1xuICBjb2xvcjogIzI1MzM0Nztcbn1cblxuLmhlYWRpbmcteGwge1xuICBmb250LXNpemU6IDNyZW07XG59XG5cbi5oZWFkaW5nLWwge1xuICBmb250LXNpemU6IDJyZW07XG59XG5cbi5oZWFkaW5nLW0ge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuLmhlYWRpbmctcyB7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbn1cblxuLmJvZHktc20ge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNzVyZW0pIHtcbiAgLmhlYWRpbmcteGwge1xuICAgIGZvbnQtc2l6ZTogNHJlbTtcbiAgfVxuICAuaGVhZGluZy1sIHtcbiAgICBmb250LXNpemU6IDNyZW07XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX2Jhc2Uuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3N0eWxlcy9fdHlwb2dyYXBoeS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0ksb0JBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsK0RBQUE7QUNDSjtBQ0hBO0VBQ0ksZUFBQTtFQUNBLDhCRktHO0VFSkgsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNGT2dCO0FDRnBCOztBQ0ZBO0VBQVUsYUFBQTtBRE1WOztBQ0pBO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QURPSjs7QUV2QkE7Ozs7RUFJSSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0hLVztBQ3FCZjs7QUV2QkE7RUFDSSxlQUFBO0FGMEJKOztBRXZCQTtFQUNJLGVBQUE7QUYwQko7O0FFdkJBO0VBQ0ksaUJBQUE7QUYwQko7O0FFdkJBO0VBQ0ksa0JBQUE7QUYwQko7O0FFdkJBO0VBQ0ksbUJBQUE7QUYwQko7O0FFcEJBO0VBQ0k7SUFDSSxlQUFBO0VGdUJOO0VFcEJFO0lBQ0ksZUFBQTtFRnNCTjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogJ0ludGVyJztcXG4gICAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgICBmb250LXdlaWdodDogMTAwIDkwMDtcXG4gICAgc3JjOiB1cmwoLi4vYXNzZXRzL2ZvbnRzL0ludGVyLVZhcmlhYmxlRm9udF9zbG50XFxcXCx3Z2h0LnR0ZikgXFxuICAgICAgICAgZm9ybWF0KCd0cnVldHlwZScpO1xcbn1cXG5cXG4vLyBGb250c1xcbiRmb250OiBJbnRlciwgc2Fucy1zZXJpZjtcXG5cXG4vLyBDb2xvcnNcXG4kY2xyLWJsdWU6ICMzNDVGRjY7XFxuJGNsci1ndW5tZXRhbDogIzI1MzM0NztcXG4kY2xyLWVsZWN0cmljLWJsdWU6ICM1RTZFODU7XFxuJGNsci1ib3JkZXJzOiAjRDhFMkU3O1xcbiRjbHItd2hpdGU6ICNGRkZGRkY7XFxuJGNsci1saWdodC1ibHVlOiByZ2JhKDUyLCA5NCwgMjQ2LCAwLjE1KTtcIixcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJJbnRlclxcXCI7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMTAwIDkwMDtcXG4gIHNyYzogdXJsKC4uL2Fzc2V0cy9mb250cy9JbnRlci1WYXJpYWJsZUZvbnRfc2xudFxcXFwsd2dodC50dGYpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKTtcXG59XFxuYm9keSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBmb250LWZhbWlseTogSW50ZXIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIGNvbG9yOiAjNUU2RTg1O1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5zci1vbmx5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IC0xMDAwMHB4O1xcbiAgd2lkdGg6IDFweDtcXG4gIGhlaWdodDogMXB4O1xcbiAgdG9wOiBhdXRvO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmhlYWRpbmcteGwsXFxuLmhlYWRpbmctbCxcXG4uaGVhZGluZy1tLFxcbi5oZWFkaW5nLXMge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE7XFxuICBjb2xvcjogIzI1MzM0NztcXG59XFxuXFxuLmhlYWRpbmcteGwge1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbn1cXG5cXG4uaGVhZGluZy1sIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuLmhlYWRpbmctbSB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLmhlYWRpbmctcyB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxufVxcblxcbi5ib2R5LXNtIHtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA3NXJlbSkge1xcbiAgLmhlYWRpbmcteGwge1xcbiAgICBmb250LXNpemU6IDRyZW07XFxuICB9XFxuICAuaGVhZGluZy1sIHtcXG4gICAgZm9udC1zaXplOiAzcmVtO1xcbiAgfVxcbn1cIixcIkB1c2UgJ3ZhcmlhYmxlcycgYXMgdjtcXG5cXG5ib2R5IHsgXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgZm9udC1mYW1pbHk6IHYuJGZvbnQ7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAgIGNvbG9yOiB2LiRjbHItZWxlY3RyaWMtYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7IGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uc3Itb25seSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZSA7XFxuICAgIGxlZnQ6IC0xMDAwMHB4O1xcbiAgICB3aWR0aDogMXB4O1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgdG9wOiBhdXRvO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cIixcIkB1c2UgJ3ZhcmlhYmxlcycgYXMgdjtcXG5cXG4uaGVhZGluZy14bCxcXG4uaGVhZGluZy1sLFxcbi5oZWFkaW5nLW0sXFxuLmhlYWRpbmctcyB7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XFxuICAgIGNvbG9yOiB2LiRjbHItZ3VubWV0YWw7XFxufVxcblxcbi5oZWFkaW5nLXhsIHtcXG4gICAgZm9udC1zaXplOiAzcmVtO1xcbn1cXG5cXG4uaGVhZGluZy1sIHtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4uaGVhZGluZy1tIHtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi5oZWFkaW5nLXMge1xcbiAgICBmb250LXNpemU6IDEuMjVyZW07XFxufVxcblxcbi5ib2R5LXNtIHtcXG4gICAgZm9udC1zaXplOiAuODc1cmVtO1xcbn1cXG5cXG5cXG4vLyBEZXNrdG9wXFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDc1cmVtKSB7XFxuICAgIC5oZWFkaW5nLXhsIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgfVxcbiAgICBcXG4gICAgLmhlYWRpbmctbCB7XFxuICAgICAgICBmb250LXNpemU6IDNyZW07XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiJ3VzZS1zdHJpY3QnO1xuXG5pbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xuaW1wb3J0ICcuL3NjcmlwdHMvaW1hZ2VzLmpzJztcbmltcG9ydCAnLi9zY3JpcHRzL2Zvcm0uanMnOyJdLCJuYW1lcyI6WyJjYWxjdWxhdGVCbWkiLCJoZWlnaHQiLCJ3ZWlnaHQiLCJibWkiLCJ0b0ZpeGVkIiwid2VpZ2h0U3RhdHVzIiwid2VpZ2h0UmFuZ2UiLCJtaW4iLCJtYXgiLCJjb252ZXJ0SGVpZ2h0IiwiY29udmVydFdlaWdodCIsImNtIiwiZnQiLCJpbmNoZXMiLCJrZyIsInN0IiwibGJzIiwibWVhc3VyZW1lbnQiLCJpbml0TWVhc3VyZW1lbnRSYWRpb0dyb3VwIiwiaW5pdEhlaWdodElucHV0cyIsImluaXRXZWlnaHRJbnB1dHMiLCJyYWRpb0dyb3VwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWV0cmljSW5wdXRzIiwiaW1wZXJpYWxJbnB1dHMiLCJmb3JFYWNoIiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyYWRpbyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWx1ZSIsInVwZGF0ZUJNSSIsImlucHV0X2NtIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbnB1dF9mdCIsImlucHV0X2luIiwiaW5wdXRfa2ciLCJpbnB1dF9zdCIsImlucHV0X2xicyIsInJlc3VsdCIsIndlbGNvbWVNc2ciLCJxdWVyeVNlbGVjdG9yIiwicmVzdWx0Qm1pIiwiYm1pU3RhdHVzIiwiYm1pV2VpZ2h0UmFuZ2UiLCJzdGF0dXMiLCJ0ZXh0Q29udGVudCIsIm1pbldlaWdodEltcGVyaWFsIiwibWF4V2VpZ2h0SW1wZXJpYWwiLCJ2YWxpZGF0ZU51bWJlciIsInVuaXQiLCJNYW5FYXRpbmciLCJMb2dvIiwiSWNvbkFnZSIsIkljb25FYXRpbmciLCJJY29uRXhlcmNpc2UiLCJJY29uR2VuZGVyIiwiSWNvbk11c2NsZSIsIkljb25QcmVnbmFuY3kiLCJJY29uUmFjZSIsIkljb25TbGVlcCIsIlBhdHRlcm5DdXJ2ZWRMZWZ0IiwiUGF0dGVybkN1cnZlZFJpZ2h0Iiwic3JjIiwidHJpbSIsInJlZ2V4IiwidGVzdCIsInBhcnNlRmxvYXQiXSwic291cmNlUm9vdCI6IiJ9