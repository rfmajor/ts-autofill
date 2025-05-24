## Description

SuiteProjects Pro Timesheets Autofill is a simple extension which lets you
autofill repetetive data into multiple fields of SuiteProjects Pro timesheets.
If you're lazy like me and don't want to click through multiple windows to
enter the same thing over and over, this extension is for you!

## Installation and usage

To install the extension, follow below steps:

1. Pull the code from this repository to your device.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable `Developer mode`.
4. Go to `My extensions` and click `Load unpacked`.
5. Select the `ts-autofiller` directory from your device.

To use the extension, login to [SuiteProjects Pro](https://auth.netsuitesuiteprojectspro.com),
navigate to the timesheet submit form and simply click on the extension icon.
You should see a popup like this:

Fill all the fields according to your needs. The `Project prefix` field is
case-sensitive. If it's empty, the first project from the `Customer : Project`
dropdown menu will be used. After clicking the `Autofill timesheets` button you
should see that a new filled row appeared on the page. You can click it
multiple times to insert additional rows if needed. 

### Reloading
In case you need to reload the extension, just go to `chrome://extensions/` ->
`My extensions` and click on this extension's reload icon.

## Demo
https://github.com/user-attachments/assets/bf96ab66-303f-4f22-8b4b-ee020d07b30c

That's it, I hope I made submitting timesheets a little bit more convenient for
you :)
