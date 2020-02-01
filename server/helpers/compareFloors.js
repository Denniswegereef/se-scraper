module.exports = compareFloors = (oldObj, newObj) => {
    if (!newObj.available.length) return false;
    if (compareArray(oldObj.available, newObj.available)) return false;

    return true
}

function compareArray(arr1, arr2) {
    return arr1.sort().toString() === arr2.sort().toString()
}