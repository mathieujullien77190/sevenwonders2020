export const arrayMax = (arr) => {
    return arr.reduce((p, v) => {
        return (p > v ? p : v)
    });
}