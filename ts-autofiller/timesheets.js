function evaluateExternalArgs() {
    if (typeof globalArgs !== 'undefined') {
        return globalArgs
    }
    return {
        projectPrefix: "Google",
        task: "Billable",
        timeType: "Offshore",
        hours: 8,
        notes: "",
        overtimeType: "None",
        compensationType: "None",
        administrativeTime: "None",
    }
}

(async () => {
    const globalArgs = evaluateExternalArgs()
    console.log(globalArgs)

    let emptyRow = document.querySelector(".gridDataEmptyRow")
    let selects = emptyRow.querySelectorAll(".select-oa")

    // 0 - project
    // 1 - task
    // 2 - time type
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

    let hours = Array.from(emptyRow.querySelectorAll(".timesheetHours input")).slice(0, 5)
    for (let input of hours) {
        input.value = globalArgs.hours
    }

    let noteAdd = Array.from(emptyRow.querySelectorAll(".noteAddSmall")).slice(0, 5)
    for (let noteAddButton of noteAdd) {
        noteAddButton.click()
        let dialogSelect = Array.from(document.querySelectorAll(".dialogBlock select"))

        let notes = document.querySelector(".dialogControls textarea")
        notes.value = globalArgs.notes

        let overtimeType = dialogSelect[0]
        for (let option of overtimeType.querySelectorAll("option")) {
            if (globalArgs.overtimeType === "None") {
                overtimeType.value = "__BLANK"
                break
            }
            if (option.innerText == globalArgs.overtimeType) {
                overtimeType.value = option.value
            }
        }

        let compensationType = dialogSelect[1]
        for (let option of compensationType.querySelectorAll("option")) {
            if (globalArgs.compensationType === "None") {
                compensationType.value = "__BLANK"
                break
            }
            if (option.innerText == globalArgs.compensationType) {
                compensationType.value = option.value
            }
        }

        let administrativeTime = dialogSelect[2]
        for (let option of administrativeTime.querySelectorAll("option")) {
            if (globalArgs.administrativeTime === "None") {
                administrativeTime.value = "__BLANK"
                break
            }
            if (option.innerText == globalArgs.administrativeTime) {
                administrativeTime.value = option.value
            }
        }

        document.querySelector(".dialogOkButton").click()
    }
})();
