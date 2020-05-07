export const shuffle = (array) => {
    let workingArray = [...array]
    workingArray.sort(() => Math.random() - 0.5);
    return workingArray
}