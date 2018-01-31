# SimpleNotify
Simple plugin to make easy notifications.

## To initialize a notification use:

var notifications = $("element").notifications({
    holdTime:[time in seconds]
    , animationType: [animation as string]
    , canBeSticky: [boolean]
    , onBeforeNotify: [callback function before notifying]
    , onAfterNotify: [callback function after notifying] 
});

**Usage Example:**
var notifications = $("body").notifications({holdTime:5, animationType:"opacity"});


Init parameters: Call it on the element where the notifications will be lodged, if no other element, use “body”.

* **holdTime**: [time in seconds] - default: 5
* **animationType**: [animation as string] (Current options are: “” - no animation, “opacity”, “slideDown”, “shrink”) - default: “opacity”
* **canBeSticky**: [boolean] (Whether the alert will have the “stick on top” functionality - default: true
* **onBeforeNotify**: [function] (callback function before notifying) - default: function () { return true; }
* **onAfterNotify**: [function] (callback function after notifying (when dismissing notification)) - default: function () { return true; }


## Public Methods:

### notify: 

Parameters:
* message: **[string]** (The message you want to pass. Can have html)
* elclass: **[string]** (The class that defines the color of the alert, current options are: “success” green, “info” blue, “warning”    yellow, “danger” red)) - default: “success”
* vibrate: **[int]** (Sets the vibrating interval for the notification) - default null 
Usage: notifications.notify(message[string], elclass[string], vibrate[int]);

**Usage Example:**
notifications.notify("This is a Danger notification. Also this one is vibrating for more impact! :D", "danger", 1);
