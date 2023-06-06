var audioButton = document.getElementById('audioButton');
var audioPlayer = document.getElementById('audioPlayer');

audioButton.addEventListener('click', function() {
    audioPlayer.play();
});

function updateDaysGone()
{
    var startingDate = new Date("2023-04-01T08:00:00Z");
    var currentDate = new Date();
    startingDate.setUTCHours(0, 0, 0, 0);
    currentDate.setUTCHours(0, 0, 0, 0);
    
    var timeDiff = Math.abs(currentDate.getTime() - startingDate.getTime());
    var daysGone = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    var daysGoneSpan = document.getElementById("counter");
    daysGoneSpan.textContent += "Days Gone: " +daysGone;
}

document.addEventListener('DOMContentLoaded', function()
{
    updateDaysGone();
    setInterval(() => updateDaysGone(), 24 * 60 * 60 * 1000);
});
