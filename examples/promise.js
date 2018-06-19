var asyncAdd = (a, b) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            if (typeof(a) === 'number' && typeof(b) === 'number'){
                resolve(a+b);
            } else {
                reject({
                    excuse: 'I need two numbers, what is this shit?',
                })
            }
        }, 1500);
    });
};

var asyncFetchIntLessThan = (someInt) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var generated = Math.floor(Math.random() * 10);
            if (generated < someInt){
                resolve({
                    message: `Hey, heres that Int < ${someInt} that you wanted, it's ${generated} :D`,
                    integer: generated
                })
            } else if (generated >= someInt){
                reject({
                    excuse: `Hey, sorry - I know you wanted less than ${someInt} but I could only get a ${generated}`,
                })
            }
        }, 2500);
    });
}

console.log('I\'ma hopefully get a number less than 5, then add it to 12. This might take a few seconds...');
asyncFetchIntLessThan(5).then((successObject) => {
    //This function is ONLY run iff the promise is fulfilled, and ONLY once
    console.log('Success function activated, message and integer received: ', successObject.message);
    console.log('Now I can add this number to 12...');
    return asyncAdd(successObject.integer, 12);
}, (failObject) => {
    console.log('Fail function activated, excuse received: ', failObject.excuse);
    console.log('Guess Im not adding to 12 today...');
}).then((sum) => {
    console.log('It took a while, but I finally got a number less than 5 and then added it to 12');
    console.log(`The final sum is ${sum}`);
}, (failObject) => {
    console.log(failObject);
});

//With callbacks, we had to rely the values stored within the reult parameters passed to tell us
//if things went well. With promises, there are 2 distinct functions that can be run upon completion
//of the asynchronous action.

//asyncAdd(1, 2).then( () => {}, () => {} );