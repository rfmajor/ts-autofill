function evaluateExternalArgs() {
    if (typeof globalArgs !== 'undefined') {
        return globalArgs
    }
    return {
        projectPrefix: "",
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
    const taskRegexp = new RegExp(`^\\d:\\s${globalArgs.task}\\s\\[.*$`)
    const timeTypeRegexp = new RegExp(`^${globalArgs.timeType}$`)

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
    // ':' means blank
    if (selects[0].value === ':') {
        // option 0 is always ':', 1 is the first project
        selects[0].value = selects[0].querySelectorAll("option")[1].value
        selects[0].dispatchEvent(new Event('change', { bubbles: true }));
    }

    for (let option of selects[1].querySelectorAll("option")) {
        if (taskRegexp.test(option.innerText)) {
            selects[1].value = option.value
            selects[1].dispatchEvent(new Event('change', { bubbles: true }));
            break
        } 
    }

    for (let option of selects[2].querySelectorAll("option")) {
        if (timeTypeRegexp.test(option.innerText)) {
            selects[2].value = option.value
            selects[2].dispatchEvent(new Event('change', { bubbles: true }));
            break
        }
    }

    let hours = Array.from(emptyRow.querySelectorAll(".timesheetHours input")).slice(0, 5)
    for (let input of hours) {
        input.value = globalArgs.hours
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    let noteAdd = Array.from(emptyRow.querySelectorAll(".noteAddSmall")).slice(0, 5)
    for (let noteAddButton of noteAdd) {
        noteAddButton.click()
        let dialogSelect = Array.from(document.querySelectorAll(".dialogBlock select"))

        let notes = document.querySelector(".dialogControls textarea")
        notes.value = globalArgs.notes
        notes.dispatchEvent(new Event('change', { bubbles: true }));

        let overtimeType = dialogSelect[0]
        for (let option of overtimeType.querySelectorAll("option")) {
            if (globalArgs.overtimeType === "None") {
                overtimeType.value = "__BLANK"
                overtimeType.dispatchEvent(new Event('change', { bubbles: true }));
                break
            }
            if (option.innerText == globalArgs.overtimeType) {
                overtimeType.value = option.value
                overtimeType.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }

        let compensationType = dialogSelect[1]
        for (let option of compensationType.querySelectorAll("option")) {
            if (globalArgs.compensationType === "None") {
                compensationType.value = "__BLANK"
                compensationType.dispatchEvent(new Event('change', { bubbles: true }));
                break
            }
            if (option.innerText == globalArgs.compensationType) {
                compensationType.value = option.value
                compensationType.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }

        let administrativeTime = dialogSelect[2]
        for (let option of administrativeTime.querySelectorAll("option")) {
            if (globalArgs.administrativeTime === "None") {
                administrativeTime.value = "__BLANK"
                administrativeTime.dispatchEvent(new Event('change', { bubbles: true }));
                break
            }
            if (option.innerText == globalArgs.administrativeTime) {
                administrativeTime.value = option.value
                administrativeTime.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }

        document.querySelector(".dialogOkButton").click()
    }
})();
