let notificationShown = false;

// Listener for alarms
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("Alarm triggered:", alarm.name);

    // Show notification only once
    if (!notificationShown) {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon128.png",
            title: "Break Time is Over",
            message: "Let's Work !! Break Time is Over",
            silent: false
        }, (notificationId) => {
            if (chrome.runtime.lastError) {
                console.error("Notification error:", chrome.runtime.lastError.message);
            } else {
                console.log("Notification created:", notificationId);
                notificationShown = true; // Mark notification as shown
            }
        });
    }
});

// Listener for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.time) {
        createAlarm(request.time);
        sendResponse({ success: true });
    } else {
        sendResponse({ success: false });
    }
    return true; // Indicates that the response is asynchronous
});

function createAlarm(timeInMinutes) {
    chrome.alarms.create("workAlarm", {
        delayInMinutes: timeInMinutes,
        periodInMinutes: timeInMinutes // Set to the same value for periodic alarm
    });
    console.log("Alarm created for", timeInMinutes, "minutes");
}
