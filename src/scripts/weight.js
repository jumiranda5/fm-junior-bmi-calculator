'use-strict';

import { validateNumber } from "./validate";

export function convertWeight(value, unit) {

    value = validateNumber(value);

    let kg = value;
    let st = value;
    let lbs = value;

    if (value === "") return {kg, st, lbs};

    if (unit === "kg") {
        lbs = value * 2.2046;
        st = value * 0.1574;
    }
    else if (unit === "st") {
        lbs = value * 14;
        kg = value / 0.15747;
    }
    else {
        kg = value / 2.2046;
        st = value * 0.071429;
    }

    return {
        kg: kg.toFixed(2), 
        st: st.toFixed(2), 
        lbs: lbs.toFixed(2)
    };
}