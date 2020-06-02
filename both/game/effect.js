export const isOwn = (effect) => {
    return effect.apply.includes('own')
}

export const isRight = (effect) => {
    return effect.apply.includes('right')
}

export const isLeft = (effect) => {
    return effect.apply.includes('left')
}

