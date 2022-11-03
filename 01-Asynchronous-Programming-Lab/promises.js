let guestCount = 99;

let engagement = new Promise(function (resolve, reject) {
    if (guestCount > 100) {
        reject('Wedding is too big');
    } else {
        resolve('Let\'s get marry');
    }
})

engagement
    .then(function (message) {
        console.log('promise fulfilled');
        console.log(message);
    })
    .catch(function (error) {
        console.log('promise rejected');
        console.log(error);
    })