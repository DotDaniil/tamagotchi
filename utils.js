const generateRandomInteger = (max) => {
    return Math.floor(Math.random() * max) + 1;
}

module.exports = { generateRandomInteger };