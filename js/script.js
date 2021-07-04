
const value_days = document.getElementById('days').getElementsByClassName('value');
const value_hours = document.getElementById('hours').getElementsByClassName('value');
const value_minutes = document.getElementById('minutes').getElementsByClassName('value');
const value_seconds = document.getElementById('seconds').getElementsByClassName('value');

const flip_seconds = document.getElementById('seconds').getElementsByClassName('countdown_up')[1];
const new_flip_seconds = document.getElementById('seconds').getElementsByClassName('countdown_down')[0];

const flip_minutes = document.getElementById('minutes').getElementsByClassName('countdown_up')[1];
const new_flip_minutes = document.getElementById('minutes').getElementsByClassName('countdown_down')[0];

const flip_hours = document.getElementById('hours').getElementsByClassName('countdown_up')[1];
const new_flip_hours = document.getElementById('hours').getElementsByClassName('countdown_down')[0];

const flip_days = document.getElementById('days').getElementsByClassName('countdown_up')[1];
const new_flip_days = document.getElementById('days').getElementsByClassName('countdown_down')[0];

let days = 8,
    hours = 0,
    minutes = 1,
    seconds = 5;

for(let i=0; i< value_seconds.length; i++){
    value_days[i].textContent = displayTime(days);
    value_hours[i].textContent = displayTime(hours);
    value_minutes[i].textContent = displayTime(minutes);
    value_seconds[i].textContent = displayTime(seconds);
}

let first = setInterval(function() {
    setAnimation();
    clearInterval(first);
    setInterval(function() {
        setAnimation();
    }, 1000);
}, 970);

setInterval(function(){seconds = setTimer(seconds, value_seconds, flip_seconds, new_flip_seconds)}, 1000);

function setAnimation() {
    flip_seconds.classList.add('flip'); 
    new_flip_seconds.classList.add('newFlip');

    if(seconds == 0) {
        flip_minutes.classList.add('flip'); 
        new_flip_minutes.classList.add('newFlip');
    }

    if(seconds == 0 && minutes == 0) {
        flip_hours.classList.add('flip'); 
        new_flip_hours.classList.add('newFlip');
    }

    if(seconds == 0 && minutes == 0 && hours == 0) {
        flip_days.classList.add('flip'); 
        new_flip_days.classList.add('newFlip');
    }
}

function setTimer(value, elem, flip, newFlip) {

    value--;
    if(value < 0){
        if(elem == value_seconds) {
            value = 59;
            minutes = setTimer(minutes, value_minutes, flip_minutes, new_flip_minutes);
        } else if(elem == value_minutes) {
            value = 59;
            hours = setTimer(hours, value_hours, flip_hours, new_flip_hours);
        } else if(elem == value_hours) {
            value = 23;
            days = setTimer(days, value_days, flip_days, new_flip_days);
        }
    }
    
    for(let i=0; i < 2; i++){
        elem[i].textContent = displayTime(value);
    };

    flip.onanimationend = function() {
        for(let i=2; i < 4; i++){
            elem[i].textContent = displayTime(value);
        };

        flip.classList.remove('flip');
        newFlip.classList.remove('newFlip');
    }
    
    return value;
}

function displayTime(value) {
    if(value.toString().length == 1) {
        return '0'+value;
    }
    return value;
}
