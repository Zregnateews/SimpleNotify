/*Created by Manuel Nogueira on 31/01/2018
   DON'T JUDGE ME, probably times were different :D */

(function ($) {
    $.fn.notifications = function (options) {
        // default vars
        var defaults = {
            // strings
            dismissBtnCls: "dismissBtn"
            , animationType: "opacity" // "" (empty string - no animation), opacity, slideDown, shrink
            // bools
            , canBeSticky: true
            // ints
            , holdTime: 5 //Time the notification is showing (in seconds)
            // evts
            , onBeforeNotify: function () { return true; }
            , onAfterNotify: function () { return true; }
        };

        var el = this
            , isActive = false
            , obj_window = $(window)
            , notificationsHolder
            , notificationsHolderOffset = 0
            , msg = ""
            , cls = ""
            , options = $.extend(defaults, options)
            , holdTime = options.holdTime * 1000
            , timeout = null;

        if (this.length === 0 || $(el).data('notifications')) {
            return this;
        }

        // Private Functions
        var init = function () {
            $(el).addClass("notifications " + options.animationType).data('notifications', this).prepend("<div class='notificationsHolder'></div>");
            notificationsHolder = $(el).find(".notificationsHolder");
            
            if (options.canBeSticky) {
                notificationsHolderOffset = notificationsHolder.offset().top + 40;
                obj_window.scroll(function () {
                    if ($(document).height() - (notificationsHolder.offset().top + 40 + notificationsHolder.height()) >= $(window).height())
                        doSticky();
                });
            }
        }

        var doSticky = function(){
            if (notificationsHolder.find(".notification").length && obj_window.scrollTop() >= notificationsHolderOffset)
                notificationsHolder.addClass("stickyActive");
            else
                notificationsHolder.removeClass("stickyActive");
        }

        var notifying = function (vibeTime) {
            isActive = true;
            var notification = $("<div class='notification " + cls + "'><a href='javascript:void(0);' class='dismissBtn'><i class='fa fa-times'></i></a>" + msg + "</div>");

            notificationsHolder.append(notification);
            setTimeout(function (){notification.addClass("notifying");},100);

            notification.find("." + options.dismissBtnCls).click(function () {
                dismissNotification(notification);
            });

            doSticky();

            if (vibeTime)
                doVibrate(notification, vibeTime);

            if (holdTime == 0)
                return;
            
            setTimeout(function () {
                dismissNotification(notification);
            }, holdTime);
        }

        var doVibrate = function (notification, vibeTime) {
            vibeTime = vibeTime * 1000;

            $(el).addClass("vibrate");

            setInterval(function () {
                notification.addClass("vibrating");
                setTimeout(function () {
                    notification.removeClass("vibrating");
                },300);
            }, vibeTime);
        }

        var dismissNotification = function (notification) {
            $(notification).removeClass("notifying");

            setTimeout(function () {
                options.onAfterNotify(el, msg);
                notification.remove();
                doSticky();
            },500); //after animation (opacity)
        }

        // Public functions

        el.notify = function (message, elclass, vibrate) { // vibrate sets the vibrating interval for the notification (in seconds) - (if you don't pass anything no vibration will happen)
            msg = message;
            cls = elclass;

            options.onBeforeNotify(el, msg);
            notifying(vibrate);
        }

        init();
        return this;
    };
})(jQuery);
