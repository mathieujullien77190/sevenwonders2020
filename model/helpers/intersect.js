export const intersect = (a, b) => {
    return [...new Set(a)].filter(x => new Set(b).has(x));
}