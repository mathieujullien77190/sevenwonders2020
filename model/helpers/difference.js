export const difference = (a, b) => {
    let cloneA = [...a]
    let cloneB = [...b]

    a.forEach((element, index) => {
        if (cloneB.includes(element)) {
            cloneA.splice(cloneA.indexOf(element), 1)
            cloneB.splice(cloneB.indexOf(element), 1)
        }
    })

    return cloneA
}