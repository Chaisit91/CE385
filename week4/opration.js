function opration (type, a, b) {
    if (type === 'add') {
        return a + b;
    }   else if (type === 'subtract') {             
        return a - b;
    } else if (type === 'multiply') {
        return a * b;
    } else if (type === 'divide') {
        return a / b;
    }       
}

module.exports = opration;