const fetchDataFromServer1 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data from server 1");
        }, 2000);
    });
};

const fetchDataFromServer2 = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Error from server 2");
        }, 1000);
    });
};

const fetchDataFromServer3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data from server 3");
        }, 3000);
    });
};

console.log("Fetching data from servers...");

Promise.race([
    fetchDataFromServer1(),
    fetchDataFromServer2(),
    fetchDataFromServer3()
])
.then((result) => {
    console.log("Case 1: First server response");
    console.log(result);
})
.catch((error) => {
    console.error("Case 1: Error occurred");
    console.error(error);
});


Promise.allSettled([
    fetchDataFromServer1(),
    fetchDataFromServer2(),
    fetchDataFromServer3()
])
.then((results) => {
    console.log("Case 2: All server results");

    results.forEach((result, index) => {
        console.log(`Server ${index + 1}:`, result);
    });
});
