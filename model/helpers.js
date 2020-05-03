export const shuffle = (array) => {
    let workingArray = [...array]
    workingArray.sort(() => Math.random() - 0.5);
    return workingArray
}

export const initArray = (nbValues, value) => {
    return [...Array(nbValues).keys()].map(i => value)
}