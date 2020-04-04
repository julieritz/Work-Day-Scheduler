$(document).ready(function () {
    // set day of week and date
    var currentDayValue = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(currentDayValue);
    loadScheduleData(currentDayValue);
    addListeners();
    // console.log(addListeners)

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
        } else {
            scheduleData = JSON.parse(scheduleData)
        }
        return scheduleData;
    }

    function generateBlankData() {
        return [
            { event: "", hour: 8 },
            { event: "", hour: 9 },
            { event: "", hour: 10 },
            { event: "", hour: 11 },
            { event: "", hour: 12 },
            { event: "", hour: 13 },
            { event: "", hour: 14 },
            { event: "", hour: 15 },
            { event: "", hour: 16 },
            { event: "", hour: 17 },
        ]
    }

    function updateBlocks(scheduleData) {
        // console.log(scheduleData)
        //get array of timeblocks from DOM
        var timeBlocks = $(".calendar-row")
        var currentHour = moment().hour()
        // console.log(timeBlocks, currentHour)
        //get the current hour
        timeBlocks.each(function (index, timeBlock) {
            timeBlock = $(timeBlock)
            // console.log(timeBlock, currentHour)
            var currentBlockData = scheduleData[index]
            // console.log(currentBlockData)
            //add css classes
            if (currentBlockData.hour < currentHour) {
                timeBlock.find("textarea").addClass("past").attr("disabled");
            } else if (currentBlockData.hour === currentHour) {
                timeBlock.find("textarea").addClass("present");
            } else {
                timeBlock.find("textarea").addClass("future");
            }
            timeBlock.find("textarea").val(currentBlockData.event)
        })

    }

    function saveScheduleData(currentDayValue, scheduleData) {
        var scheduleDataString = JSON.stringify(scheduleData)
        localStorage.setItem(currentDayValue, scheduleDataString)
    }

    function addListeners() {
        var buttons = $(".save")
        buttons.each(function (index, element) {
            $(element).on("click", function (event) {
                var $target = $(event.target)
                if ($target.is("i")) {
                    $target = $target.parent()
                }
                var selectedIndex = $target.data("index")
                var timeblocks = $(".calendar-row")
                var selectedTimeBlock = $(timeblocks[index])
                var eventText = selectedTimeBlock.find("textarea").val()
                var scheduleData = getScheduleData();
                scheduleData[selectedIndex].event = eventText
                saveScheduleData(currentDayValue, scheduleData);
            })
        })
    }

});