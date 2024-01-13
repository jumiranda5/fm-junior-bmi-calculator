'use-strict';

// If the input value is not a number, return empty string
export function validateNumber(value) {
    value = value.trim();
    const regex = /^\d+\.?\d*$/u;
    if (regex.test(value)) return parseFloat(value);
    else return "";
}