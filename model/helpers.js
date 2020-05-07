export const initArray = (nbValues, value) => {
    return [...Array(nbValues).keys()].map(i => value)
}