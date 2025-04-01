let timer = 45;
let player = Math.floor(Math.random() * 11) + 1;
let userMove = false;
let over = null;
let shouldMove = true;

const timerText = document.querySelector(".timer");
const redLight = document.querySelector(".red");
const message = document.querySelector(".message");
const greenLight = document.querySelector(".green");
const user = document.querySelector(".user");

// Play again
document.querySelector(".btn").addEventListener("click", () => {
    location.reload();
});

// Timer
setInterval(() => {
    if (timer > 0) {
        timer--;
    } else {
        return;
    }
    timerText.innerText = timer;
}, 1000);

setTimeout(() => {
    over = 0;
}, 45000)

// User Movement
let userPos = 0;

document.addEventListener("keypress", (e) => {
    if (shouldMove) {
        if (e.key.toLowerCase() == "w" && userPos >= -520) {
            userPos -= 1;
            user.style.transform = `translateY(${userPos}px)`;
            userMove = true;
        } else if (e.key.toLowerCase() == "s" && userPos <= 0) {
            userPos += 1;
            user.style.transform = `translateY(${userPos}px)`;
            userMove = true;
        }
    }

    // You Won
    if (userPos <= -500) {
        message.innerText = "You Won!";
        message.style.color = "green";
        document.querySelector(".message-div").style.display = "flex";

        document.addEventListener("keypress", () => {
            shouldMove = false;
        })
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() == "w" || e.key.toLowerCase() == "s") {
        userMove = false;
    }
})

// Light Selector
let randomTime = Math.floor(Math.random() * 5000) + 1000;
let currLight = "Green Light";
greenLight.style.backgroundColor = "green";
greenLight.style.boxShadow = "5px 5px 10px green, -5px -5px 10px green, 5px -5px 10px green, -5px 5px 10px green";

const lightSelect = () => {
    if (currLight == "Red Light") {
        currLight = "Green Light";
        redLight.style.backgroundColor = "black";
        greenLight.style.backgroundColor = "green";

        redLight.style.boxShadow = "none";
        greenLight.style.boxShadow = "5px 5px 10px green, -5px -5px 10px green, 5px -5px 10px green, -5px 5px 10px green";
    } else {
        currLight = "Red Light";
        greenLight.style.backgroundColor = "black";
        redLight.style.backgroundColor = "red";

        greenLight.style.boxShadow = "none";
        redLight.style.boxShadow = "5px 5px 10px red, -5px -5px 10px red, 5px -5px 10px red, -5px 5px 10px red";
    }

    // You Lose
    if ((currLight == "Red Light" && userMove == true) || over == 0) {
        shouldMove = false;
        message.innerText = "You Lose!";
        document.querySelector(".message-div").style.display = "flex";
    }

    document.addEventListener("keypress", (e) => {
        if ((e.key.toLowerCase() == "w" || e.key.toLowerCase() == "s") && currLight == "Red Light") {
            shouldMove = false;
            message.innerText = "You Lose!";
            document.querySelector(".message-div").style.display = "flex";
        }
    })
}

setInterval(lightSelect, randomTime);