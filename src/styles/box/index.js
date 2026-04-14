const generateBoxStyles = value => {
    if (!value) return null;

    const { top, right, bottom, left } = value;
    
    // If all are undefined or empty, return null
    if (top === undefined && right === undefined && bottom === undefined && left === undefined) {
        return null;
    }
    if (top === "" && right === "" && bottom === "" && left === "") {
        return null;
    }

    const t = top || '0';
    const r = right || '0';
    const b = bottom || '0';
    const l = left || '0';

    if (t === r && r === b && b === l) {
        return t;
    }
    return `${t} ${r} ${b} ${l}`;
};
export default generateBoxStyles;
