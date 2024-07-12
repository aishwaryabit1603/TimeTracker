document.getElementById("setAlarmBtn").addEventListener("click", () => {
    const alarmTime = parseFloat(document.getElementById("alarmTime").value);
    if (!isNaN(alarmTime) && alarmTime > 0) {
        chrome.runtime.sendMessage({ time: alarmTime }, function (response) {
            if (chrome.runtime.lastError) {
                alert("Error setting alarm: " + chrome.runtime.lastError.message);
            } else {
                alert("Alarm set for " + alarmTime + " minutes.");
                // Disable the button after setting the alarm
                document.getElementById("setAlarmBtn").disabled = true;
            }
        });
    } else {
        alert("Please enter a valid number of minutes.");
    }
});
