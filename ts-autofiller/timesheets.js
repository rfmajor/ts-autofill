// 0 - project
// 1 - task
// 2 - time type

function evaluateExternalArgs() {
    if (typeof globalArgs !== 'undefined') {
        return globalArgs
    }
    return {
        projectPrefix: "Google",
        task: "Billable",
        timeType: "Offshore",
        hours: 8,
        administrativeTime: 0,
    }
}

(async () => {
    const globalArgs = evaluateExternalArgs()
    console.log(globalArgs)

    let selects = document.querySelectorAll(".timesheet .draggableColumns .timesheetControl select")

    for (let option of selects[0].querySelectorAll("option")) {
        if (option.innerText.startsWith(globalArgs.projectPrefix)) {
            selects[0].value = option.value
            selects[0].dispatchEvent(new Event('change', { bubbles: true }));
            break
        } 
    }

    for (let option of selects[1].querySelectorAll("option")) {
        if (option.innerText.includes(globalArgs.task + " ")) {
            selects[1].value = option.value
            selects[1].dispatchEvent(new Event('change', { bubbles: true }));
            break
        } 
    }

    for (let option of selects[2].querySelectorAll("option")) {
        if (option.innerText === globalArgs.timeType) {
            selects[2].value = option.value
            selects[2].dispatchEvent(new Event('change', { bubbles: true }));
            break
        }
    }

    let hours = Array.from(document.querySelectorAll(".timesheetHours input")).slice(0, 5)
    for (let input of hours) {
        input.value = globalArgs.hours
    }

    let noteAdd = Array.from(document.querySelectorAll(".noteAddSmall")).slice(0, 5)
    for (let noteAddButton of noteAdd) {
        noteAddButton.click()
        let dialogSelect = Array.from(document.querySelectorAll(".dialogBlock select"))
        let administrativeTime = dialogSelect[dialogSelect.length - 1]
        for (let option of administrativeTime.querySelectorAll("option")) {
            if (option.innerText == globalArgs.administrativeTime) {
                administrativeTime.value = option.value
            }
        }
        document.querySelector(".dialogOkButton").click()
    }
})();
