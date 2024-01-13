'use-strict';

import { validateNumber } from "./validate";

export function convertHeight(value, unit) {

    value = validateNumber(value);
    
    let cm = value;
    let ft = value;
    let inches = value;

    if (value === "") return {cm, ft, inches};

    if (unit === "cm") {
        ft = value * 0.032808;
        inches = value * 0.39370;
    }
    else if (unit === "ft") {
        cm = value / 0.032808;
        inches = value * 12;
    }
    else {
        cm = value / 0.39370;
        ft = value * 0.083333;
    }

    return {
        cm: cm.toFixed(2), 
        ft: ft.toFixed(2), 
        inches: inches.toFixed(2)
    };
}
