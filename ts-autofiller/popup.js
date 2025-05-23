async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function runAutoFill() {
    const tab = await getCurrentTab()

    // inject globals
    await chrome.scripting.executeScript({
        target: {tabId: tab.id, allFrames: true},
        func: (args) => {
            window.globalArgs = args;
        },
        args: [{ 
            projectPrefix: document.getElementById("projectPrefix").value,
            task: document.getElementById("task").value,
            timeType: document.getElementById("timeType").value,
            hours: document.getElementById("hours").value,
            notes: document.getElementById("notes").value,
            overtimeType: document.getElementById("overtimeType").value,
            compensationType: document.getElementById("compensationType").value,
            administrativeTime: document.getElementById("administrativeTime").value,
        }]
    })

    chrome.scripting.executeScript({
        target: {tabId: tab.id, allFrames: true},
        files: ['timesheets.js']
    })
}

window.onload = function() {
    document.getElementById("fill-button").addEventListener("click", runAutoFill);
    document.getElementById("fill-button").addEventListener("click", (event) => {
        chrome.storage.sync.set({
            projectPrefix: projectPrefix.value,
            task: task.value,
            timeType: timeType.value,
            hours: hours.value,
            notes: notes.value,
            overtimeType: overtimeType.value,
            compensationType: compensationType.value,
            administrativeTime: administrativeTime.value
        })
    });

    chrome.storage.sync.get('projectPrefix', function(data) {
        if (typeof data.projectPrefix === 'undefined') {
            projectPrefix.value = "Google"
        } else {
            projectPrefix.value = data.projectPrefix
        }
    })
    chrome.storage.sync.get('task', function(data) {
        if (typeof data.task === 'undefined') {
            task.value = "Billable"
        } else {
            task.value = data.task
        }
    })
    chrome.storage.sync.get('timeType', function(data) {
        if (typeof data.timeType === 'undefined') {
            timeType.value = "Offshore"
        } else {
            timeType.value = data.timeType
        }
    })
    chrome.storage.sync.get('hours', function(data) {
        if (typeof data.hours === 'undefined') {
            hours.value = 8
        } else {
            hours.value = data.hours
        }
    })
    chrome.storage.sync.get('notes', function(data) {
        if (typeof data.notes === 'undefined') {
            notes.value = ""
        } else {
            notes.value = data.notes
        }
    })
    chrome.storage.sync.get('overtimeType', function(data) {
        if (typeof data.overtimeType === 'undefined') {
            overtimeType.value = "None"
        } else {
            overtimeType.value = data.overtimeType
        }
    })
    chrome.storage.sync.get('compensationType', function(data) {
        if (typeof data.compensationType === 'undefined') {
            compensationType.value = "None"
        } else {
            compensationType.value = data.compensationType
        }
    })
    chrome.storage.sync.get('administrativeTime', function(data) {
        if (typeof data.administrativeTime === 'undefined') {
            administrativeTime.value = "None"
        } else {
            administrativeTime.value = data.administrativeTime
        }
    })
    
    projectPrefix.addEventListener("change", (event) => {
        chrome.storage.sync.set({ projectPrefix: projectPrefix.value })
    })
    task.addEventListener("change", (event) => {
        chrome.storage.sync.set({ task: task.value })
    })
    timeType.addEventListener("change", (event) => {
        chrome.storage.sync.set({ timeType: timeType.value })
    })
    hours.addEventListener("change", (event) => {
        chrome.storage.sync.set({ hours: hours.value })
    })
    notes.addEventListener("change", (event) => {
        chrome.storage.sync.set({ notes: notes.value })
    })
    overtimeType.addEventListener("change", (event) => {
        chrome.storage.sync.set({ overtimeType: overtimeType.value })
    })
    compensationType.addEventListener("change", (event) => {
        chrome.storage.sync.set({ compensationType: compensationType.value })
    })
    administrativeTime.addEventListener("change", (event) => {
        chrome.storage.sync.set({ administrativeTime: administrativeTime.value })
    })
}
