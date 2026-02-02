function fetchDataWithCallback(callback) {
    setTimeout(() => {
        const data = "Fetched Data";
        callback(data);
    }, 2000);       
}

fetchDataWithCallback((data) => {
    console.log(data);      
}); 


function fetchDataWithPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id :1, name: "Chaisit",email: "chaisit@example.com"};
            const success = true; // เปลี่ยนเป็น false เพื่อทดสอบการจับข้อผิดพลาด
            if (success) {
                resolve(data);
            }else { 
                reject("Error fetching data");
            }
        }, 2000);    
    });
}
fetchDataWithPromise()
    .then((data) => {
        console.log("Fulfilled:", data);      
    })
    .catch((error) => {
        console.error("Rejected:", error);
    });