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
    console.log(bmi);
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.hidden {
  display: none;
}`, "",{"version":3,"sources":["webpack://./src/styles/_base.scss","webpack://./src/styles/index.scss"],"names":[],"mappings":"AAAA;EAAU,aAAA;ACEV","sourcesContent":[".hidden { display: none; }",".hidden {\n  display: none;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOzs7Ozs7Ozs7Ozs7OztBQ0FBLFlBQVk7O0FBRWlCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL3NyYy9zY3JpcHRzL2JtaS5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL3NyYy9zY3JpcHRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9zcmMvc2NyaXB0cy9oZWlnaHQuanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9zcmMvc2NyaXB0cy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9zcmMvc2NyaXB0cy92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL3NyYy9zY3JpcHRzL3dlaWdodC5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz80YzM3Iiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYi1kZXYtZW52Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYi1kZXYtZW52L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2ViLWRldi1lbnYvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYi1kZXYtZW52L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYi1kZXYtZW52L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWItZGV2LWVudi8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Utc3RyaWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUJtaShoZWlnaHQsIHdlaWdodCkge1xuXG4gICAgLy8gaWYgaGVpZ2h0IG9yIHdlaWdodCBpcyAwIG9yIGVtcHR5LCByZXR1cm4gbnVsbFxuICAgIGlmIChoZWlnaHQgPT09IDAgfHwgaGVpZ2h0ID09PSBcIlwiIHx8IFxuICAgICAgICB3ZWlnaHQgPT09IDAgfHwgd2VpZ2h0ID09PSBcIlwiICkgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBjb252ZXJ0IGNtIHRvIG1cbiAgICBoZWlnaHQgPSBoZWlnaHQgLyAxMDA7XG5cbiAgICAvLyByZXN1bHQgXG4gICAgY29uc3QgYm1pID0gKHdlaWdodCAvIChoZWlnaHQgKiBoZWlnaHQpKS50b0ZpeGVkKDEpO1xuXG4gICAgY29uc3Qgd2VpZ2h0U3RhdHVzID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhibWkpO1xuICAgICAgICBpZiAoYm1pIDwgMTguNSkgcmV0dXJuIFwiVW5kZXJ3ZWlnaHRcIjtcbiAgICAgICAgZWxzZSBpZiAoMTguNSA8IGJtaSAmJiBibWkgPCAyNSkgcmV0dXJuIFwiSGVhbHRoeSBXZWlnaHRcIjtcbiAgICAgICAgZWxzZSBpZiAoMjUgPCBibWkgJiYgYm1pIDwgMzApIHJldHVybiBcIk92ZXJ3ZWlnaHRcIjtcbiAgICAgICAgZWxzZSByZXR1cm4gXCJPYmVzaXR5XCI7XG4gICAgfTtcblxuICAgIGNvbnN0IHdlaWdodFJhbmdlID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1pbiA9ICgxOC41ICogKGhlaWdodCAqIGhlaWdodCkpLnRvRml4ZWQoMSk7XG4gICAgICAgIGNvbnN0IG1heCA9ICgyNC45ICogKGhlaWdodCAqIGhlaWdodCkpLnRvRml4ZWQoMSk7XG5cbiAgICAgICAgcmV0dXJuIHttaW4sIG1heH07XG5cbiAgICB9O1xuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBibWksXG4gICAgICAgIHdlaWdodFN0YXR1cyxcbiAgICAgICAgd2VpZ2h0UmFuZ2UsXG4gICAgfTtcblxuXG59IiwiJ3VzZS1zdHJpY3QnO1xuXG5pbXBvcnQgeyBjb252ZXJ0SGVpZ2h0IH0gZnJvbSBcIi4vaGVpZ2h0XCI7XG5pbXBvcnQgeyBjb252ZXJ0V2VpZ2h0IH0gZnJvbSBcIi4vd2VpZ2h0XCI7XG5pbXBvcnQgeyBjYWxjdWxhdGVCbWkgfSBmcm9tIFwiLi9ibWlcIjtcblxuLy8gdmFsdWVzXG5sZXQgaGVpZ2h0ID0ge2NtOiAwLCBmdDogMCwgaW5jaGVzOiAwfTtcbmxldCB3ZWlnaHQgPSB7a2c6IDAsIHN0OiAwLCBsYnM6IDB9O1xubGV0IG1lYXN1cmVtZW50ID0gJ21ldHJpYyc7IC8vIG1ldHJpYyBpcyBjaGVja2VkIGJ5IGRlZmF1bHRcblxuXG4vLyBpbml0IGlucHV0c1xuaW5pdE1lYXN1cmVtZW50UmFkaW9Hcm91cCgpO1xuaW5pdEhlaWdodElucHV0cygpO1xuaW5pdFdlaWdodElucHV0cygpO1xuXG5cbi8vIEluaXQgbWVhc3VyZW1lbnQgcmFkaW8gZ3JvdXAgPT4gdG9nZ2xlIHZpc2liaWxpdHlcbmZ1bmN0aW9uIGluaXRNZWFzdXJlbWVudFJhZGlvR3JvdXAoKSB7XG4gICAgY29uc3QgcmFkaW9Hcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXVtuYW1lPVwibWVhc3VyZW1lbnRcIl0nKTtcbiAgICBjb25zdCBtZXRyaWNJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmaWVsZHNldFtkYXRhLXR5cGU9XCJtZXRyaWNcIl0nKTtcbiAgICBjb25zdCBpbXBlcmlhbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ZpZWxkc2V0W2RhdGEtdHlwZT1cImltcGVyaWFsXCJdJyk7XG5cbiAgICAvLyBpbml0aWFsIHZpc2liaWxpdGllcyAobWV0cmljIGRlZmF1bHQpXG4gICAgbWV0cmljSW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykpO1xuICAgIGltcGVyaWFsSW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJykpO1xuXG4gICAgcmFkaW9Hcm91cC5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gdXBkYXRlIG1lYXN1cmVtZW50IHZhclxuICAgICAgICAgICAgbWVhc3VyZW1lbnQgPSByYWRpby52YWx1ZTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGlucHV0cyB2aXNpYmlsaXRpZXNcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudCA9PT0gJ21ldHJpYycpIHtcbiAgICAgICAgICAgICAgICBtZXRyaWNJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XG4gICAgICAgICAgICAgICAgaW1wZXJpYWxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXRyaWNJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XG4gICAgICAgICAgICAgICAgaW1wZXJpYWxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBibWkgcmVzdWx0XG4gICAgICAgICAgICB1cGRhdGVCTUkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cblxuLy8gdXBkYXRlIGFsbCBoZWlnaCBpbnB1dHMgb24ga2V5c3Ryb2tlXG5mdW5jdGlvbiBpbml0SGVpZ2h0SW5wdXRzKCkge1xuICAgIGNvbnN0IGlucHV0X2NtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlaWdodC1tZXRyaWMnKTtcbiAgICBjb25zdCBpbnB1dF9mdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWlnaHQtaW1wZXJpYWwtZnQnKTtcbiAgICBjb25zdCBpbnB1dF9pbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWlnaHQtaW1wZXJpYWwtaW4nKTtcblxuICAgIGlucHV0X2NtLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XG4gICAgICAgIGhlaWdodCA9IGNvbnZlcnRIZWlnaHQoaW5wdXRfY20udmFsdWUsIFwiY21cIik7XG4gICAgICAgIGlucHV0X2Z0LnZhbHVlID0gaGVpZ2h0LmZ0O1xuICAgICAgICBpbnB1dF9pbi52YWx1ZSA9IGhlaWdodC5pbmNoZXM7XG4gICAgICAgIHVwZGF0ZUJNSSgpO1xuICAgIH0pO1xuXG4gICAgaW5wdXRfZnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgICAgaGVpZ2h0ID0gY29udmVydEhlaWdodChpbnB1dF9mdC52YWx1ZSwgXCJmdFwiKTtcbiAgICAgICAgaW5wdXRfY20udmFsdWUgPSBoZWlnaHQuY207XG4gICAgICAgIGlucHV0X2luLnZhbHVlID0gaGVpZ2h0LmluY2hlcztcbiAgICAgICAgdXBkYXRlQk1JKCk7XG4gICAgfSk7XG5cbiAgICBpbnB1dF9pbi5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgICAgICBoZWlnaHQgPSBjb252ZXJ0SGVpZ2h0KGlucHV0X2luLnZhbHVlLCBcImluXCIpO1xuICAgICAgICBpbnB1dF9mdC52YWx1ZSA9IGhlaWdodC5mdDtcbiAgICAgICAgaW5wdXRfY20udmFsdWUgPSBoZWlnaHQuY207XG4gICAgICAgIHVwZGF0ZUJNSSgpO1xuICAgIH0pO1xufVxuXG5cbi8vIHVwZGF0ZSBhbGwgd2VpZ2h0IGlucHV0cyBvbiBrZXlzdHJva2VcbmZ1bmN0aW9uIGluaXRXZWlnaHRJbnB1dHMoKSB7XG4gICAgY29uc3QgaW5wdXRfa2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VpZ2h0LW1ldHJpYycpO1xuICAgIGNvbnN0IGlucHV0X3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlaWdodC1pbXBlcmlhbC1zdCcpO1xuICAgIGNvbnN0IGlucHV0X2xicyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWlnaHQtaW1wZXJpYWwtbGJzJyk7XG5cbiAgICBpbnB1dF9rZy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgICAgICB3ZWlnaHQgPSBjb252ZXJ0V2VpZ2h0KGlucHV0X2tnLnZhbHVlLCBcImtnXCIpO1xuICAgICAgICBpbnB1dF9zdC52YWx1ZSA9IHdlaWdodC5zdDtcbiAgICAgICAgaW5wdXRfbGJzLnZhbHVlID0gd2VpZ2h0LmxiczsgXG4gICAgICAgIHVwZGF0ZUJNSSgpO1xuICAgIH0pO1xuXG4gICAgaW5wdXRfc3QuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgICAgd2VpZ2h0ID0gY29udmVydFdlaWdodChpbnB1dF9zdC52YWx1ZSwgXCJzdFwiKTtcbiAgICAgICAgaW5wdXRfa2cudmFsdWUgPSB3ZWlnaHQua2c7XG4gICAgICAgIGlucHV0X2xicy52YWx1ZSA9IHdlaWdodC5sYnM7XG4gICAgICAgIHVwZGF0ZUJNSSgpO1xuICAgIH0pO1xuXG4gICAgaW5wdXRfbGJzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XG4gICAgICAgIHdlaWdodCA9IGNvbnZlcnRXZWlnaHQoaW5wdXRfbGJzLnZhbHVlLCBcImxic1wiKTtcbiAgICAgICAgaW5wdXRfa2cudmFsdWUgPSB3ZWlnaHQua2c7XG4gICAgICAgIGlucHV0X2xicy52YWx1ZSA9IHdlaWdodC5sYnM7XG4gICAgICAgIHVwZGF0ZUJNSSgpO1xuICAgIH0pO1xufVxuXG5cbi8vIFVwZGF0ZSB0aGUgQk1JIHJlc3VsdFxuZnVuY3Rpb24gdXBkYXRlQk1JKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGNhbGN1bGF0ZUJtaShoZWlnaHQuY20sIHdlaWdodC5rZyk7XG5cbiAgICBjb25zdCB3ZWxjb21lTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdC13ZWxjb21lJyk7XG4gICAgY29uc3QgcmVzdWx0Qm1pID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdC1ibWknKTtcbiAgICBjb25zdCBibWkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm1pLXNjb3JlJyk7XG4gICAgY29uc3QgYm1pU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JtaS1zdGF0dXMnKTtcbiAgICBjb25zdCBibWlXZWlnaHRSYW5nZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibWktd2VpZ2h0LXJhbmdlJyk7XG5cbiAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHJlc3VsdC53ZWlnaHRTdGF0dXMoKTtcbiAgICAgICAgY29uc3Qgd2VpZ2h0UmFuZ2UgPSByZXN1bHQud2VpZ2h0UmFuZ2UoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHVwZGF0ZSByZXN1bHQgdmlzaWJpbGl0eVxuICAgICAgICB3ZWxjb21lTXNnLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICByZXN1bHRCbWkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIFxuICAgICAgICAvLyB1cGRhdGUgcmVzdWx0IGNvbnRlbnRcbiAgICAgICAgYm1pLnRleHRDb250ZW50ID0gcmVzdWx0LmJtaTtcbiAgICAgICAgYm1pU3RhdHVzLnRleHRDb250ZW50ID0gc3RhdHVzO1xuICAgICAgICBpZiAobWVhc3VyZW1lbnQgPT09IFwibWV0cmljXCIpIHtcbiAgICAgICAgICAgIGJtaVdlaWdodFJhbmdlLnRleHRDb250ZW50ID0gYCR7d2VpZ2h0UmFuZ2UubWlufWtnIC0gJHt3ZWlnaHRSYW5nZS5tYXh9a2dgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbWluV2VpZ2h0SW1wZXJpYWwgPSBjb252ZXJ0V2VpZ2h0KHdlaWdodFJhbmdlLm1pbiwgXCJrZ1wiKTtcbiAgICAgICAgICAgIGNvbnN0IG1heFdlaWdodEltcGVyaWFsID0gY29udmVydFdlaWdodCh3ZWlnaHRSYW5nZS5tYXgsIFwia2dcIik7XG4gICAgICAgICAgICBibWlXZWlnaHRSYW5nZS50ZXh0Q29udGVudCA9IGAke21pbldlaWdodEltcGVyaWFsLnN0fXN0ICR7bWluV2VpZ2h0SW1wZXJpYWwubGJzfWxicyAtICR7bWF4V2VpZ2h0SW1wZXJpYWwuc3R9c3QgJHttYXhXZWlnaHRJbXBlcmlhbC5sYnN9bGJzYDsgXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHVwZGF0ZSByZXN1bHQgdmlzaWJpbGl0eVxuICAgICAgICB3ZWxjb21lTXNnLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICByZXN1bHRCbWkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxufSIsIid1c2Utc3RyaWN0JztcblxuaW1wb3J0IHsgdmFsaWRhdGVOdW1iZXIgfSBmcm9tIFwiLi92YWxpZGF0ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEhlaWdodCh2YWx1ZSwgdW5pdCkge1xuXG4gICAgdmFsdWUgPSB2YWxpZGF0ZU51bWJlcih2YWx1ZSk7XG4gICAgXG4gICAgbGV0IGNtID0gdmFsdWU7XG4gICAgbGV0IGZ0ID0gdmFsdWU7XG4gICAgbGV0IGluY2hlcyA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlID09PSBcIlwiKSByZXR1cm4ge2NtLCBmdCwgaW5jaGVzfTtcblxuICAgIGlmICh1bml0ID09PSBcImNtXCIpIHtcbiAgICAgICAgZnQgPSB2YWx1ZSAqIDAuMDMyODA4O1xuICAgICAgICBpbmNoZXMgPSB2YWx1ZSAqIDAuMzkzNzA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHVuaXQgPT09IFwiZnRcIikge1xuICAgICAgICBjbSA9IHZhbHVlIC8gMC4wMzI4MDg7XG4gICAgICAgIGluY2hlcyA9IHZhbHVlICogMTI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjbSA9IHZhbHVlIC8gMC4zOTM3MDtcbiAgICAgICAgZnQgPSB2YWx1ZSAqIDAuMDgzMzMzO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNtOiBjbS50b0ZpeGVkKDIpLCBcbiAgICAgICAgZnQ6IGZ0LnRvRml4ZWQoMiksIFxuICAgICAgICBpbmNoZXM6IGluY2hlcy50b0ZpeGVkKDIpXG4gICAgfTtcbn1cbiIsIid1c2Utc3RyaWN0JztcblxuaW1wb3J0IE1hbkVhdGluZyBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL2ltYWdlLW1hbi1lYXRpbmcud2VicCc7XG5pbXBvcnQgTG9nbyBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL2xvZ28uc3ZnJztcbmltcG9ydCBJY29uQWdlIGZyb20gJy4uL2Fzc2V0cy9pbWFnZXMvaWNvbi1hZ2Uuc3ZnJztcbmltcG9ydCBJY29uRWF0aW5nIGZyb20gJy4uL2Fzc2V0cy9pbWFnZXMvaWNvbi1lYXRpbmcuc3ZnJztcbmltcG9ydCBJY29uRXhlcmNpc2UgZnJvbSAnLi4vYXNzZXRzL2ltYWdlcy9pY29uLWV4ZXJjaXNlLnN2Zyc7XG5pbXBvcnQgSWNvbkdlbmRlciBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL2ljb24tZ2VuZGVyLnN2Zyc7XG5pbXBvcnQgSWNvbk11c2NsZSBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL2ljb24tbXVzY2xlLnN2Zyc7XG5pbXBvcnQgSWNvblByZWduYW5jeSBmcm9tICcuLi9hc3NldHMvaW1hZ2VzL2ljb24tcHJlZ25hbmN5LnN2Zyc7XG5pbXBvcnQgSWNvblJhY2UgZnJvbSAnLi4vYXNzZXRzL2ltYWdlcy9pY29uLXJhY2Uuc3ZnJztcbmltcG9ydCBJY29uU2xlZXAgZnJvbSAnLi4vYXNzZXRzL2ltYWdlcy9pY29uLXNsZWVwLnN2Zyc7XG5pbXBvcnQgUGF0dGVybkN1cnZlZExlZnQgZnJvbSAnLi4vYXNzZXRzL2ltYWdlcy9wYXR0ZXJuLWN1cnZlZC1saW5lLWxlZnQuc3ZnJztcbmltcG9ydCBQYXR0ZXJuQ3VydmVkUmlnaHQgZnJvbSAnLi4vYXNzZXRzL2ltYWdlcy9wYXR0ZXJuLWN1cnZlZC1saW5lLXJpZ2h0LnN2Zyc7XG5cbi8vIGxvZ29cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvJykuc3JjID0gTG9nbztcblxuLy8gbWVhbmluZyBzZWN0aW9uXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1nLW1hbi1lYXRpbmcnKS5zcmMgPSBNYW5FYXRpbmc7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1lYXRpbmcnKS5zcmMgPSBJY29uRWF0aW5nO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24tZXhlcmNpc2UnKS5zcmMgPSBJY29uRXhlcmNpc2U7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1zbGVlcCcpLnNyYyA9IEljb25TbGVlcDtcblxuLy8gbGltaXRhdGlvbnMgc2VjdGlvblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24tYWdlJykuc3JjID0gSWNvbkFnZTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLWdlbmRlcicpLnNyYyA9IEljb25HZW5kZXI7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1tdXNjbGUnKS5zcmMgPSBJY29uTXVzY2xlO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24tcHJlZ25hbmN5Jykuc3JjID0gSWNvblByZWduYW5jeTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLXJhY2UnKS5zcmMgPSBJY29uUmFjZTtcblxuLy8gcGF0dGVybnNcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJ2ZS1sZWZ0Jykuc3JjID0gUGF0dGVybkN1cnZlZExlZnQ7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VydmUtcmlnaHQnKS5zcmMgPSBQYXR0ZXJuQ3VydmVkUmlnaHQ7IiwiJ3VzZS1zdHJpY3QnO1xuXG4vLyBJZiB0aGUgaW5wdXQgdmFsdWUgaXMgbm90IGEgbnVtYmVyLCByZXR1cm4gZW1wdHkgc3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVOdW1iZXIodmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCByZWdleCA9IC9eXFxkK1xcLj9cXGQqJC91O1xuICAgIGlmIChyZWdleC50ZXN0KHZhbHVlKSkgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICAgIGVsc2UgcmV0dXJuIFwiXCI7XG59IiwiJ3VzZS1zdHJpY3QnO1xuXG5pbXBvcnQgeyB2YWxpZGF0ZU51bWJlciB9IGZyb20gXCIuL3ZhbGlkYXRlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0V2VpZ2h0KHZhbHVlLCB1bml0KSB7XG5cbiAgICB2YWx1ZSA9IHZhbGlkYXRlTnVtYmVyKHZhbHVlKTtcblxuICAgIGxldCBrZyA9IHZhbHVlO1xuICAgIGxldCBzdCA9IHZhbHVlO1xuICAgIGxldCBsYnMgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSA9PT0gXCJcIikgcmV0dXJuIHtrZywgc3QsIGxic307XG5cbiAgICBpZiAodW5pdCA9PT0gXCJrZ1wiKSB7XG4gICAgICAgIGxicyA9IHZhbHVlICogMi4yMDQ2O1xuICAgICAgICBzdCA9IHZhbHVlICogMC4xNTc0O1xuICAgIH1cbiAgICBlbHNlIGlmICh1bml0ID09PSBcInN0XCIpIHtcbiAgICAgICAgbGJzID0gdmFsdWUgKiAxNDtcbiAgICAgICAga2cgPSB2YWx1ZSAvIDAuMTU3NDc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBrZyA9IHZhbHVlIC8gMi4yMDQ2O1xuICAgICAgICBzdCA9IHZhbHVlICogMC4wNzE0Mjk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAga2c6IGtnLnRvRml4ZWQoMiksIFxuICAgICAgICBzdDogc3QudG9GaXhlZCgyKSwgXG4gICAgICAgIGxiczogbGJzLnRvRml4ZWQoMilcbiAgICB9O1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAuaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX2Jhc2Uuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQVUsYUFBQTtBQ0VWXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5oaWRkZW4geyBkaXNwbGF5OiBub25lOyB9XCIsXCIuaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIndXNlLXN0cmljdCc7XG5cbmltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XG5pbXBvcnQgJy4vc2NyaXB0cy9pbWFnZXMuanMnO1xuaW1wb3J0ICcuL3NjcmlwdHMvZm9ybS5qcyc7Il0sIm5hbWVzIjpbImNhbGN1bGF0ZUJtaSIsImhlaWdodCIsIndlaWdodCIsImJtaSIsInRvRml4ZWQiLCJ3ZWlnaHRTdGF0dXMiLCJjb25zb2xlIiwibG9nIiwid2VpZ2h0UmFuZ2UiLCJtaW4iLCJtYXgiLCJjb252ZXJ0SGVpZ2h0IiwiY29udmVydFdlaWdodCIsImNtIiwiZnQiLCJpbmNoZXMiLCJrZyIsInN0IiwibGJzIiwibWVhc3VyZW1lbnQiLCJpbml0TWVhc3VyZW1lbnRSYWRpb0dyb3VwIiwiaW5pdEhlaWdodElucHV0cyIsImluaXRXZWlnaHRJbnB1dHMiLCJyYWRpb0dyb3VwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWV0cmljSW5wdXRzIiwiaW1wZXJpYWxJbnB1dHMiLCJmb3JFYWNoIiwiaW5wdXQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyYWRpbyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWx1ZSIsInVwZGF0ZUJNSSIsImlucHV0X2NtIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbnB1dF9mdCIsImlucHV0X2luIiwiaW5wdXRfa2ciLCJpbnB1dF9zdCIsImlucHV0X2xicyIsInJlc3VsdCIsIndlbGNvbWVNc2ciLCJxdWVyeVNlbGVjdG9yIiwicmVzdWx0Qm1pIiwiYm1pU3RhdHVzIiwiYm1pV2VpZ2h0UmFuZ2UiLCJzdGF0dXMiLCJ0ZXh0Q29udGVudCIsIm1pbldlaWdodEltcGVyaWFsIiwibWF4V2VpZ2h0SW1wZXJpYWwiLCJ2YWxpZGF0ZU51bWJlciIsInVuaXQiLCJNYW5FYXRpbmciLCJMb2dvIiwiSWNvbkFnZSIsIkljb25FYXRpbmciLCJJY29uRXhlcmNpc2UiLCJJY29uR2VuZGVyIiwiSWNvbk11c2NsZSIsIkljb25QcmVnbmFuY3kiLCJJY29uUmFjZSIsIkljb25TbGVlcCIsIlBhdHRlcm5DdXJ2ZWRMZWZ0IiwiUGF0dGVybkN1cnZlZFJpZ2h0Iiwic3JjIiwidHJpbSIsInJlZ2V4IiwidGVzdCIsInBhcnNlRmxvYXQiXSwic291cmNlUm9vdCI6IiJ9