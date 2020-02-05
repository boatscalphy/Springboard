function countDown(num) {
    let timer = setInterval(() => {
        num = num - 1
        if (num > 0) {
            console.log(num);
        }
        else {
            console.log('DONE!!!')
            clearInterval(timer);
        }
    },1000)
}

function randomGame() {
    let counter = 0;
    let timer = setInterval(() => {
        let value = Math.random();
        if (value < 0.75) {
            counter++;
        }
        else {
            counter++;
            console.log(`${counter} intervals`)
            clearInterval(timer)
        }
    },1000)
}

