'use strict';

const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const circle = document.querySelector('.circle_animation');
const btnRun = document.querySelector('.run');
const timer = document.querySelector('.timer');
const btnStop = document.querySelector('.stop');
const btnPause = document.querySelector('.pause');
const btnNext = document.querySelector('.next');

let timerID;
let timerOfCircle;
let i = 0;
let res = 0;
let getSeconds = 0;

function forTimerID() {
    timer.innerHTML = `${addZero(getTimeRemaining(deadline).hours)}:${addZero(getTimeRemaining(deadline).minutes)}:${ addZero(getTimeRemaining(deadline).seconds)}`;
    if (getTimeRemaining(deadline).total < 0) {
        isNull();
        audio();
    }
}

function forTimerOfCircle() {
    i = +i + res;
    circle.style.strokeDashoffset = `${i}px`;
    if (i > 565) {
        isNull();

    }
}
btnRun.addEventListener('click', () => {
    getSeconds = (((hours.value * 3600) + (minutes.value * 60) + (+seconds.value)) * 1000);
    deadline = new Date();
    res = 565 / getSeconds * 1000;
    timerID = setInterval(() => {
        forTimerID();
    }, 1000);
    timerOfCircle = setInterval(() => {
        forTimerOfCircle();
    }, 1000);
    btnRun.classList.add('hidden');
    btnPause.classList.add('active');
});
btnStop.addEventListener('click', () => {
    isNull();
});

btnPause.addEventListener('click', () => {
    clearInterval(timerID);
    clearInterval(timerOfCircle);
    timer.innerHTML = `${addZero(getTimeRemaining(deadline).hours)}:${addZero(getTimeRemaining(deadline).minutes)}:${ addZero(getTimeRemaining(deadline).seconds)}`;
    circle.style.strokeDashoffset = `${i}px`;
    btnNext.classList.add('active');
    btnPause.classList.remove('active');
    i = circle.style.strokeDashoffset.substr(0, circle.style.strokeDashoffset.length - 2);
});


btnNext.addEventListener('click', () => {
    deadline = new Date();
    let timerArr = timer.innerHTML.split(':');
    getSeconds = (((deleteZero(timerArr[0]) * 3600) + (deleteZero(timerArr[1]) * 60) + (+deleteZero(timerArr[2]))) * 1000);
    console.log(deleteZero(timerArr[0]))
    timerID = setInterval(() => {
        forTimerID();
    }, 1000);
    timerOfCircle = setInterval(() => {
        forTimerOfCircle();
    }, 1000);
    btnNext.classList.remove('active');
    btnPause.classList.add('active');

});

let deadline = new Date();

function getTimeRemaining(endtime) {
    const t = (Date.parse(endtime) + getSeconds) - Date.parse(new Date()),
        second = Math.floor((t / 1000) % 60),
        minute = Math.floor((t / 1000 / 60) % 60),
        hour = Math.floor((t / (1000 * 60 * 60) % 24));
    return {
        'total': t,
        'hours': hour,
        'minutes': minute,
        'seconds': second
    };
}

function addZero(n) {
    if (n < 10) {
        return `0${n}`;
    } else {
        return n;
    }
}

function deleteZero(num) {
    if (num[0] == 0) {
        return num.substr(1);
    } else {
        return num;
    }
}

function isNull() {
    timer.innerHTML = '00:00:00';
    circle.style.strokeDashoffset = `${0}px`;
    clearInterval(timerID);
    clearInterval(timerOfCircle);
    res = 0;
    i = 0;
    btnNext.classList.remove('active');
    btnPause.classList.remove('active');
    btnRun.classList.remove('hidden');
}

function audio() {
    let audio = new Audio();
    audio.src = "new_message_tone.mp3";
    audio.autoplay = true;
}