let days = document.querySelector("#day");
let hours = document.querySelector(".hour");
let mins = document.querySelector(".min");
let secs = document.querySelector(".sec");
let dates = document.querySelector(".date1");
let months = document.querySelector(".month");
let years = document.querySelector(".year");

time();
setInterval(time, 1000);

// code for time 
function time() {
    let times = new Date();
    let monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    days.innerHTML = dayNames[times.getDay()];
    hours.innerHTML = times.getHours() + " : ";
    mins.innerHTML = times.getMinutes() + " : ";
    secs.innerHTML = times.getSeconds();
    dates.innerHTML = times.getDate();
    months.innerHTML = monthNames[times.getMonth()] + ",";
    years.innerHTML = times.getFullYear();
}

// code for Togglebtn

function addicon() {
    let plusicon = document.querySelector(".display");
    plusicon.style.display = "block";
    document.querySelector("#icon").style.transform = "rotate(45deg)";
}

function removeaddicon() {
    let plusicon = document.querySelector(".display");
    plusicon.style.display = "none";
    document.querySelector("#icon").style.transform = "rotate(0deg)";
}

let btncheck = true;
document.querySelector("#icon").addEventListener("click", () => {
    if (btncheck) {
        addicon();
        btncheck = false;
    } else {
        removeaddicon();
        btncheck = true;
    }
});

function setAlarm() {
    let day = document.querySelector("#days").value;
    let hour = document.querySelector("#hour").value;
    let min = document.querySelector("#min").value;
    let sec = document.querySelector("#sec").value;
    let alarmId = new Date().getTime(); // Unique identifier for each alarm

    let newdiv = document.createElement("div");
    newdiv.className = "footerNEW";
    newdiv.setAttribute("data-id", alarmId); // Set the unique identifier

    newdiv.innerHTML = `<div class="userTIME">
          <div class="heading4">
            <h4 class="userD">${day}</h4>
            <h4 class="userH">${hour} </h4>
            <h4 class="userM">: ${min}</h4>
            <h4 class="userS">: ${sec}</h4>
          </div>
          <div class="del">
            <i class="material-symbols-outlined icons" id="del">delete</i>
            <i class="material-symbols-outlined icons" id="pau">pause</i>
            <i class="material-symbols-outlined icons" id="play">play_arrow</i>
          </div>
        </div>`;
    if (day == "" || hour == "" || min == "" || sec == "") {
        alert("Day, Hour, Minute, Second should be selected");
    } else {
        document.querySelector(".mainFOOTER").append(newdiv);
    }

    localStorage.setItem(`alarm-${alarmId}-day`, day);
    localStorage.setItem(`alarm-${alarmId}-hour`, hour);
    localStorage.setItem(`alarm-${alarmId}-min`, min);
    localStorage.setItem(`alarm-${alarmId}-sec`, sec);
}

// listener for check and restart icon
document.querySelector("#check").addEventListener("click", setAlarm);
document.querySelector("#restart").addEventListener("click", () => {
    document.querySelector("#days").selectedIndex = 0;
    document.querySelector("#hour").selectedIndex = 0;
    document.querySelector("#min").selectedIndex = 0;
    document.querySelector("#sec").selectedIndex = 0;
});

function playalarm() {
    // Get the user time
    const alarmIds = Object.keys(localStorage).filter(key => key.startsWith('alarm-') && key.endsWith('-day')).map(key => key.split('-')[1]);

    alarmIds.forEach(alarmId => {
        const userday = localStorage.getItem(`alarm-${alarmId}-day`);
        const userhour = localStorage.getItem(`alarm-${alarmId}-hour`);
        const usermin = localStorage.getItem(`alarm-${alarmId}-min`);
        const usersec = localStorage.getItem(`alarm-${alarmId}-sec`);

        // Get the current time
        let now = new Date();
        let dayNames = ["Sun,", "Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,"];
        let currentDay = dayNames[now.getDay()];
        let currentHour = now.getHours();
        let currentMin = now.getMinutes();
        let currentSec = now.getSeconds();

        if (currentDay == userday && currentHour == userhour && currentMin == usermin && currentSec == usersec) {
            document.querySelector(".aud").play();
        }
    });
}

setInterval(playalarm, 1000);

// Event delegation for pause, play, and delete buttons
document.querySelector(".mainFOOTER").addEventListener("click", (e) => {
    if (e.target.id === "pau") {
        document.querySelector(".aud").pause();
    } else if (e.target.id === "play") {
        document.querySelector(".aud").play();
    } else if (e.target.id === "del") {
        let audioElement = document.querySelector(".aud");
        audioElement.pause();
        audioElement.currentTime = 0;
        const alarmDiv = e.target.closest(".footerNEW");
        const alarmId = alarmDiv.getAttribute("data-id");
        alarmDiv.remove();
        localStorage.removeItem(`alarm-${alarmId}-day`);
        localStorage.removeItem(`alarm-${alarmId}-hour`);
        localStorage.removeItem(`alarm-${alarmId}-min`);
        localStorage.removeItem(`alarm-${alarmId}-sec`);
    }
});
