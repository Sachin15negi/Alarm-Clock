const display = document.getElementById('clock');
const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')

const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

// Function to update time 
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText=`${hour}:${minutes}:${seconds}`;
    
// check if the alarmList includes the current time , "now"
// if yes, ringing() is called
    if(alarmList.includes(now) ){
        ringing(now);
    } 
}
 // Function to correct the format of time
    function formatTime(time) {
        if (time < 10 && time.length != 2) {
            return '0' + time;
        }
        return time;
    }

    // Event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e => {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    let new_h = formatTime(addAlarm.hour.value);
    if (new_h === '0') {
        new_h = '00'
    }
    let new_m = formatTime(addAlarm.min.value);
    if (new_m === '0') {
        new_m = '00'
    }
    let new_s = formatTime(addAlarm.sec.value);
    if (new_s === '0') {
        new_s = '00'
    }

    const newAlarm = `${new_h}:${new_m}:${new_s}`

    // Function to add newAlarm to alarmList
    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm)) {
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})

// Function to stores all the alarms  
const alarmList = [];


    //Function to set alarm
    function setAlarm() {
        alert("Alarm set");
    }

    // Function to play alarm audio at correct time
    function ringing(now) {
        audio.play();
        alert(`Hey! it is ${now}`)
    }


// Adds newAlarm to the unordered list as a new list item on webpage
function showNewAlarm(newAlarm) {
    const html = `
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


// Function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        // alert('Alarm cleared');
    }
}



// Removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e => {
    console.log("removing element")
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
})


// Removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);

    console.log("newList", newList);
    console.log("alarmList", alarmList);
}

// calls updateTime() every second
setInterval(updateTime, 1000);