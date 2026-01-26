let sumEven = 0;
let productOdd = 1;
for (let i = 1; i <= 50; i++) {
    if (i % 2 === 0) {
        sumEven += i;
    }
    if ( i <= 9 && i % 2 !== 0) {
        productOdd *= i;
    }
}
console.log("ผลรวมของเลขคู่ 2-50: " + sumEven);
console.log("ผลคูณของเลขคี่ 1-10: " + productOdd);