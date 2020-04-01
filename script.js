$(document).ready(function () {
    // set day of week and date
    var currentDayValue = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(currentDayValue);
    loadScheduleData(currentDayValue);
});

function loadScheduleData(currentDayValue) {
    //load data from local storage
    var scheduleData = getScheduleData(currentDayValue);
    updateBlocks(scheduleData);
}

function getScheduleData(currentDayValue) {
    var scheduleData = localStorage.getItem(currentDayValue)
    //check for validity
    if (!scheduleData) {
        scheduleData = generateBlankData();
        saveScheduleData(currentDayValue, scheduleData)
    }
    return scheduleData;
}

function generateBlankData() {
    return [
        {event: "", hour: 8},
        {event: "", hour: 9},
        {event: "", hour: 10},
        {event: "", hour: 11},
        {event: "", hour: 12},
        {event: "", hour: 13},
        {event: "", hour: 14},
        {event: "", hour: 15},
        {event: "", hour: 16},
        {event: "", hour: 17},
    ]
}

function updateBlocks(scheduleData) {
    //get array of timeblocks from DOM
    var timeBlocks = $(".calendar-row")
    var currentHour = moment().hour()
    console.log(timeBlocks, currentHour)
    //get the current hour
    timeBlocks.each(function (index, timeBlock) {
        timeBlock = $(timeBlock)
        console.log(timeBlock)
        var currentBlockData = scheduleData[index]
        console.log(currentBlockData)
        if (scheduleData[index].hour < currentHour) {
            timeBlock.find("textarea").addClass("past").attr("disabled");
        } else if (scheduleData[index].hour === currentHour) {
            timeBlock.find("textarea").addClass("present");
        } else {
            timeBlock.find("textarea").addClass("future");
        }
    })
    //iterate over array & append corresponding data from scheduleData

    //add css classes
}
function saveScheduleData(currentDayValue, scheduleData) {
    var scheduleDataString = JSON.stringify(scheduleData)
    localStorage.setItem(currentDayValue, scheduleDataString)
}

//need to get the local storage text, update it with event within that array, save schedule data again
//get array, find object that corresponds to it