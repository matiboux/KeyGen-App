// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var isFirstActivation = true;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.voiceCommand) {
            // TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
            // this is a good place to decide whether to populate an input field or choose a different initial view.
        }
        else if (args.detail.kind === activation.ActivationKind.launch) {
            // A Launch activation happens when the user launches your app via the tile
            // or invokes a toast notification by clicking or tapping on the body.
            if (args.detail.arguments) {
                // TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
                // to take the user in response to them invoking a toast notification.
            }
            else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
                // TODO: This application had been suspended and was then terminated to reclaim memory.
                // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
                // Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
            }
        }

        if (!args.detail.prelaunchActivated) {
            // TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
            // In that case it would be suspended shortly thereafter.
            // Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
            // should be done here (to avoid doing them in the prelaunch case).
            // Alternatively, this work can be done in a resume or visibilitychanged handler.
        }

        if (isFirstActivation) {
            // TODO: The app was activated and had not been running. Do general startup initialization here.
            document.addEventListener("visibilitychange", onVisibilityChanged);
            args.setPromise(WinJS.UI.processAll());
        }

        isFirstActivation = false;
    };

    function onVisibilityChanged(args) {
        if (!document.hidden) {
            // TODO: The app just became visible. This may be a good time to refresh the view.

            // var count = 0;
            $('.keygen form').submit(function (e) {
                e.preventDefault();
                var KeygenFormData = $('.keygen form').serializeArray().reduce(function (obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});

		        KeygenLib.setParameters(KeygenFormData);
                var keygen = KeygenLib.generateKeygen();
                
                if (KeygenLib.errorInfo.code == '00') {
                    $('#bye').removeClass().addClass('content-box-header header-primary');
                    $('#bye p').html('Your Keygen: <span>' + keygen + '</span>');
                    $('#bye .copykeygen').animate({ right: '-28px' });
                }
                else {
                    $('#bye').removeClass().addClass('content-box-header header-danger');
                    $('#bye p').html('An error occured (#' + KeygenLib.errorInfo.code + '): <span>' + KeygenLib.errorInfo.message + '</span>');
                    $('#bye .copykeygen').animate({ right: '-99px' });
                }
            });
            
            $('.keygen form :reset').click(function () {
                $('#bye').removeClass().addClass('content-box-header');
                $('#bye p').html('Use the form below to generate your own Keygen');
                $('#bye .copykeygen').animate({ right: '-99px' });
            });
            
            $('#bye .copykeygen').click(function(e) {
                e.preventDefault();
	
                if($('#_hiddenTextToCopy_').length <= 0) {
                    $('body').append(
                        $('<textarea>').attr({
                            id: '_hiddenTextToCopy_'
                        }).css({
                            position: 'absolute',
                            top: '0',
                            left: '-9999px'
                        })
                    );
                }
                var currentFocus = document.activeElement;
                $('#_hiddenTextToCopy_').empty().append($(this).parent().find('p span').text()).focus();
                $('#_hiddenTextToCopy_')[0].setSelectionRange(0, $('#_hiddenTextToCopy_').val().length);
                
                var succeed;
                try {
                    succeed = true;
                    document.execCommand('copy');
                }
                catch (exception) {
                    succeed = false;
                }
                $(currentFocus).focus();
	
                if (succeed) {
                    $(this).animate({ right: 0 }, function () { $(this).animate({ right: '-28px' }); });
                }
	
                return false;
            });
        }
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
        // You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
        // If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
    };

    app.start();

})();
