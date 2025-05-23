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
            administrativeTime: document.getElementById("administrativeTime").value,
        }]
    })

    chrome.scripting.executeScript({
        target: {tabId: tab.id, allFrames: true},
        files: ['timesheets.js']
    })
}

document.getElementById("fill-button").addEventListener("click", runAutoFill);
