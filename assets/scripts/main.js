//Display current day in the header
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

let container = $(".container");

//Add all rows for scheduler to the container element
function addHours() {
    for (i = 0; i < 9; i++) {
        let nextRow = $("<div>");
        nextRow.attr("class", "row");
        container.append(nextRow);

        let nextHour = $("<div>");
        nextHour.attr("class", "hour");
        //Set text content for hour blocks using moment() for later conditionals
        nextHour.text(moment().hour(i + 9).format("hA"));

        // Set text for each textarea block from local storage if it's there, and leave it blank if not
        let nextText = $("<textarea>");
        nextText.attr("class", "time-block");
        nextText.text(localStorage.getItem(`textArea #${i+1}`) || "");

        let nextSave = $("<button>");
        nextSave.attr("class", "saveBtn");

        nextRow.append(nextHour);
        nextRow.append(nextText);
        nextRow.append(nextSave);

        let nextIconContainer = $("<i>");
        nextSave.append(nextIconContainer);
        let nextIcon = $("<img>");
        nextIcon.attr({
            src: "assets/images/save-icon.png",
            width: "15px",
            height: "15px",
            alt: "Floppy Disk icon"
        });
        nextIconContainer.append(nextIcon);
    }
}

// Check the current time and apply styling to textarea elements based on whether they are past, present, or future
function checkTime() {
    let rightNow = moment().hour();
    $("textarea").each(function(i) {
        let thisBlockHourValue = parseInt(moment().hour(i + 9).format("H"));
        if (thisBlockHourValue < rightNow) {
            $(this).addClass("past");
        } else if (thisBlockHourValue === rightNow) {
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    });
}

// Upon clicking save button, save text content of textarea element to local storage

addHours();
checkTime();

// Add event listener to each save button in order to set local storage
$(".saveBtn").each(function(i) {
    $(this).on("click", function() {
        let thisHourText = $(this).prev();
        localStorage.setItem(`textArea #${i+1}`, thisHourText.val());
    });
});


$("#testButton").on("click", function() {
    localStorage.clear();
})