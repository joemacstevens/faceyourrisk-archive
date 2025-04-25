var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

// Debug.
var __isDebug = false;
var __console = function (a, b, c) {
    if (__isDebug)
        console.log(a, b, c);
};

// Global property.
var __angularTools = null;

// Angular application.
var app = angular.module("DaApp", []);

app.controller("MyRiskController", ["$scope", "Tools", "HttpService", function ($scope, Tools, HttpService) {
    //google tag manager tracking stuff
    var $wheelClickListener = $("#ra-wheel-click-listener");
    var lastWheelOptionCLass = "";

    // Properties.
    $scope.myRisk = {
        options: [],
        email: "",
        isSubscribed: false
    };

    $scope.lastHover = "";

    // Init.
    $scope.init = function () {
        // Init global properties.
        __angularTools = Tools;

        // List of options to be initialize. 
        var initOptions = [
          { group: "user", options: "me|myLovedOne" },
          { group: "allergens", options: "peanuts|treeNuts|wheat|fish|shellfish|other|soy|dairy|eggs|insects" },
          { group: "symptoms", options: "itchyMouth|dizziness|nausea|diarrhea|itchySkin|hives|shortnessOfBreath|stuffyNose|tightThroat" },
          { group: "conditions", options: "asthma|eczema|allergicRhinitis|other|none" },
          { group: "age", options: "12andUnder|13to19|20to64|65andOver" },
          { group: "plans", options: "carryingEpinephrine|seekingEmergency|knowingSymptoms|avoidingAllergens|none" },
          { group: "resultDeliveryMethod", options: 'email|download' }
        ];

        // Init options.
        angular.forEach(initOptions, function (value, key) {
            var group = value.group;
            var options = value.options.split("|");

            angular.forEach(options, function (value, key) {
                $scope.myRisk.options.push({
                    group: group,
                    option: value,
                    isSelected: false,
                    isHover: false
                });
            });
        });

        // Init options default values.
        $scope.toggle("user", "me");
        $scope.toggle("allergens", "peanuts");
        $scope.toggle("age", "13to19");

        // Onload event.
        window.addEventListener("load", function () {
            // Resize listener <div> to match wheel dimensions.
            var wheelObj = $("#ra-wheel-image");
            $wheelClickListener.height(wheelObj.height()).width(wheelObj.width());

            // Make age slider draggable.
            $(".slider-bar .slider-indicator").draggable({
                axis: "x",
                containment: "parent",
                drag: function () {
                    $scope.updateSliderSelector($(".slider-bar .slider-indicator"), $(".age-selctor-container .swap"));
                },
                stop: function () {
                    $scope.snapSlider($(".age-selctor-container .swap.selected").eq(0));
                }
            });

            // Add listener for carousel change.
            $(document).on("slid.bs.carousel", "#myrisk", function (data) {
                var $myRisk = $('#myrisk')
                        , $arrows = $(this).find(".myrisk-carousel-control")
                        , $activeSlide = $(this).find('.scene.active')
                        , dataCurrent = $(this).find('.scene').index($activeSlide);

                $("#myrisk .tracker").attr("data-current", dataCurrent);
                $arrows.attr("data-current", dataCurrent);

                // Update nav on results page.
                if (dataCurrent === 5 || dataCurrent === 6) { // on results or thank-you
                    $('#mainNav-container').addClass('on-risk-results');

                    if (dataCurrent === 5) {
                        var $header = $('#myrisk .scene6 header');
                        window.scrollMagicController.scrollTo($header.offset().top - $header.height());
                    }
                } else {
                    $('#mainNav-container').removeClass('on-risk-results');
                }

                // Find last selection in allergens results list.
                if (dataCurrent === 5) {
                    $(".result.allergies dl dd").removeClass("last").not(".ng-hide").last().addClass("last");
                }

                // keep user scrolled into #myrisk when paging (omit results page 5)
                if (dataCurrent !== 5) {
                    window.scrollMagicController.scrollTo(
                            (function () {
                                var myRiskTop = $myRisk.offset().top
                                        , myRiskHeight = $myRisk.height()
                                        , viewportHeight = $(window).innerHeight()
                                ;
                                return myRiskTop + myRiskHeight - viewportHeight;
                            })()
                            );
                }

                // Refresh Angular model.
                $scope.$apply();
            });
        }, false);
    };

    // Public methods
    $scope.allergenCarouselToggle = function (option) {
        switch (option) {
            // Map front-end to angular.
            case "peanut":
                option = "peanuts";
                break;
            case "bee":
                option = "insects";
                break;
            case "tree_nut":
                option = "treeNuts";
                break;
            default: // all other options have the same name: dairy|eggs|fish|shellfish|soy|wheat
                break;
        }

        $scope.resetGroup("allergens");
        $scope.toggle("allergens", option);
        $scope.$apply();
    };

    $scope.toggle = function (group, option) {
        var optionObject = $scope.getOption(group, option);

        if (group.toLowerCase() == "user" || group.toLowerCase() == "age") {
            // Business rules: 
            //   - Reset single selection groups when another option is selected.
            //   - It won't toggle if option is already selected.
            if (!optionObject.isSelected) {
                $scope.resetGroup(group);
                optionObject.isSelected = true;
            }
        }
        else if (group.toLowerCase() == "conditions" || group.toLowerCase() == "plans") {
            // Business rules: 
            //   - Unselect all selected options when 'none' is selected.
            //   - Unselect 'none' when another option is selected.
            if (!optionObject.isSelected) {
                if (option.toLowerCase() == "none")
                    $scope.resetGroup(group);
                else
                    $scope.getOption(group, "none").isSelected = false;
            }

            optionObject.isSelected = !optionObject.isSelected;
        }
        else {
            // Default rule.
            optionObject.isSelected = !optionObject.isSelected;
        }
    };

    $scope.wheelClick = function (event) {
        var optionClicked = $scope.getWheelOption(event);

        if (optionClicked != "") {
            $scope.lastHover = optionClicked;

            $scope.toggle("allergens", optionClicked);
            $scope.resetHover();
        }
    };

    $scope.wheelMouseMove = function (event) {
        if (!isMobile.iOS()) { // ignore on iOS; breaks selection

            var optionMovedOn = $scope.getWheelOption(event);

            if ($wheelClickListener.hasClass("GTMID_" + optionMovedOn)) {

            } else {
                $wheelClickListener.removeClass(lastWheelOptionCLass);
                $wheelClickListener.addClass("GTMID_" + optionMovedOn);
                lastWheelOptionCLass = "GTMID_" + optionMovedOn;
            }

            $(".ra-wheel").css("cursor", (optionMovedOn != "") ? "pointer" : "default");

            if (optionMovedOn != $scope.lastHover) {
                $scope.lastHover = "";

                if (optionMovedOn != "")
                    $scope.hover("allergens", optionMovedOn);
                else
                    $scope.resetHover();
            }
            else {
                $scope.resetHover();
            }
        }
    };

    $scope.isOptionSelected = function (group, option) {
        var optionObject = $scope.getOption(group, option);
        return (optionObject != null) ? optionObject.isSelected || optionObject.isHover : null;
    };

    $scope.isNext = function () {
        var step = parseInt($('#myrisk-next').attr("data-current")) + 1;
        return $scope.isStepAvailable(step + 1);
    };

    $scope.isStepAvailable = function (step) {
        if (!$scope.hasSelection("user"))
            return false;
        else if (!$scope.hasSelection("allergens"))
            return false;
        else if (step == 2)
            return true;
        else if (!$scope.hasSelection("symptoms"))
            return false;
        else if (step == 3)
            return true;
        else if (!$scope.hasSelection("conditions"))
            return false;
        else if (step == 4)
            return true;
        else if (!$scope.hasSelection("age"))
            return false;
        else if (step == 5)
            return true;
        else if (!$scope.hasSelection("plans"))
            return false;
        else if (step == 6)
            return true;
        else
            return Tools.validateEmail($scope.myRisk.email);
    };

    $scope.submitDownload = function () {
        // Validate.
        if (!$scope.validateMyRisk("download")) {
            __console("FAILED VALIDATION"); // TODO: Remove line. Debug only.
            return false;
        }

        // Submit.
        __console("Submit-Download: ", $scope.getModel()); // TODO: Remove line. Debug only.

        Tools.jsonPost("/MyRisk/Download/", $scope.getModel(), "_blank");

        // Show thank you.
        $scope.showThankYouRA("download");
    };

    $scope.submitEmail = function () {
        // Validate.
        $("[name='myrisk-results-email']").validate().element("#results-email");

        if (!$scope.validateMyRisk("email")) {
            __console("FAILED VALIDATION"); // TODO: Remove line. Debug only.
            return false;
        }

        // Submit.
        __console("Submit-Email: ", $scope.getModel()); // TODO: Remove line. Debug only.

        HttpService.post("/MyRisk/Email", { model: $scope.getModel() }).then(function (data) {
            dataLayer.push({'event': 'emailResults'});    // fire the emailResults event for GTM tagging
            __console("Response: ", data); // TODO: Remove line. Debug only.

            if (data.success) {
                $scope.showThankYouRA("email");
            }
            else {
                __console("EMAIL ERROR"); // TODO: Display error page. Debug only.
                $scope.showThankYouRA("email"); // TODO: Remove line. Debug only.
            }
        });
    };

    $scope.getGroupSelectionCount = function (group) {
        var selectionCount = 0;

        angular.forEach($scope.myRisk.options, function (value, key) {
            if (value.group.toLowerCase() == group.toLowerCase() && value.isSelected)
                selectionCount++;
        });

        return selectionCount;
    };

    // Private methods.
    $scope.getModel = function () {
        var model = angular.copy($scope.myRisk);

        for (var index = 0, len = model.options.length; index < len; ++index)
            delete model.options[index].isHover;

        return model;
    };

    $scope.showThankYouRA = function (resultDeliveryMethod) {
        $scope.resetGroup('resultDeliveryMethod');
        $scope.toggle('resultDeliveryMethod', resultDeliveryMethod);
        $("#myrisk").carousel("next");
        $scope.myRisk.email = ""; // Clear email address.
    }

    $scope.resetDomGroup = function ($element, selectClass) {
        $element.parent().children().each(function (index) {
            var group = $(this).attr("x-group");
            var option = $(this).attr("x-option");

            if (typeof group === "undefined" || typeof option === "undefined" || group === null || option === null) {
                // Ignore elements without custom parameters
                return;
            }
            else {
                if ($scope.isOptionSelected($(this).attr("x-group"), $(this).attr("x-option")))
                    $(this).addClass(selectClass);
                else
                    $(this).removeClass(selectClass);
            }
        });
    };

    $scope.updateSliderSelector = function ($sliderEl, $sliderChoices) {
        var numChoices = $sliderChoices.length
                , trackWidth = $sliderEl.parent().width()
                , sliderPos = $sliderEl.offset().left - $sliderEl.parent().offset().left + ($sliderEl.width() / 2)
                , sliderRatio = sliderPos / trackWidth
                , selectedIndex = Math.floor(sliderRatio * numChoices)
        ;

        $sliderEl.attr('data-value', selectedIndex);
        $sliderChoices.removeClass('selected hover');
        $sliderChoices.eq(selectedIndex).addClass('selected');

        //update angular model
        $scope.apply(selectedIndex);
    };

    $scope.snapSlider = function ($selectedEl) {
        var $indicator = $selectedEl.closest('.age-selctor-container').find('.slider-indicator')
                , numChoices = $selectedEl.siblings('.swap').length + 1
                , index = $selectedEl.parent().find('.swap').index($selectedEl)
                , trackWidth = $indicator.closest('.slider-track').width()
        ;

        // calculate tracker position
        var trackerPos = trackWidth * (index / numChoices);

        // assign data to tracker for styling
        $indicator.attr('data-value', index);

        TweenLite.to($indicator, .25, { left: trackerPos, ease: Back.easeOut.config(1) });

        //update angular model
        $scope.apply(index);
    };

    $scope.animateDart = function ($element) {
        var score = $element.parent().find(".opt.selected").not("[x-option='none']").length;
        var $dart = $("#dartboard .dart");
        var $dartShadow = $("#dartboard .dart-shadow");

        $dart.add($dartShadow).attr("data-score", score);

        // animate!
        var tl = new TimelineMax({ paused: false })
                , dt = 0.35
        ;
        tl
                //              .add('start',0)
                //              // initialize
                //              .set($dart, {rotation: 20, x: 900, y: -400, immediateRender: false})
                //              .set($dartShadow, {rotation: -20, x: 900, y:400, immediateRender: false})
                //              // x-component
                //              .to([$dart, $dartShadow], dt, {x: 0, ease: Power0.easeNone},'start')
                //              // y-component, rotation
                //              .to([$dart,$dartShadow], dt, {rotation: 0, y: 0, ease: Power2.easeIn},'start')

                .fromTo($dart, .5, { rotation: 45, x: 900, y: 0 }, {
                    ease: Power0.easeNone,
                    bezier: [
                      { rotation: 45, x: 900, y: -400 },
                      { rotation: 22.5, x: 450, y: -300 },
                      { rotation: 0, x: 0, y: 0 }
                    ]
                }, 'init')
                .fromTo($dartShadow, .5, { rotation: 45, x: 900, y: 400 }, {
                    ease: Power0.easeNone,
                    bezier: [
                      { rotation: -45, x: 900, y: 400 },
                      { rotation: -22.5, x: 450, y: 300 },
                      { rotation: 0, x: 0, y: 0 }
                    ]
                }, 'init')
        ;
    };

    $scope.apply = function (index) {
        $scope.toggle("age", ["12andUnder", "13to19", "20to64", "65andOver"][index]);
    };

    $scope.getWheelOption = function (event) {
        var element = event.currentTarget || event.srcElement;

        var wheelRadius = element.clientWidth / 2;
        var deltaX = wheelRadius - event.offsetX;
        var deltaY = wheelRadius - event.offsetY;

        var outerRadius = wheelRadius * 0.9361702;
        var innerRadius = wheelRadius * 0.4103343;
        var clickRadius = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

        if (clickRadius > innerRadius && clickRadius < outerRadius) {
            var clickAngle = Math.atan2(deltaY, deltaX) * (180.0 / Math.PI);
            var allergenId = (clickAngle > 0) ? Math.floor(clickAngle / 36.0) : 9 - Math.floor(-clickAngle / 36.0);

            return ["insects", "peanuts", "treeNuts", "fish", "shellfish", "wheat", "eggs", "other", "soy", "dairy"][allergenId];
        }
        else {
            return "";
        }
    };

    $scope.hover = function (group, option) {
        var optionObject = $scope.getOption(group, option);

        if (!optionObject.isHover) {
            $scope.resetHover();
            optionObject.isHover = true;
        }
    };

    $scope.getOption = function (group, option) {
        for (var index = 0, len = $scope.myRisk.options.length; index < len; ++index)
            if ($scope.myRisk.options[index].group.toLowerCase() == group.toLowerCase() && $scope.myRisk.options[index].option.toLowerCase() == option.toLowerCase())
                return $scope.myRisk.options[index];

        return null;
    };

    $scope.hasSelection = function (group) {
        for (var index = 0, len = $scope.myRisk.options.length; index < len; ++index)
            if ($scope.myRisk.options[index].group.toLowerCase() == group.toLowerCase() && $scope.myRisk.options[index].isSelected)
                return true;

        return false;
    };

    $scope.resetGroup = function (group) {
        angular.forEach($scope.myRisk.options, function (value, key) {
            if (value.group.toLowerCase() == group.toLowerCase() && value.isSelected)
                value.isSelected = false;
        });
    };

    $scope.resetHover = function () {
        angular.forEach($scope.myRisk.options, function (value, key) {
            if (value.isHover)
                value.isHover = false;
        });
    };

    $scope.validateMyRisk = function (downloadMethod) {
        if (downloadMethod == "download")
            return $scope.isStepAvailable(6);
        else if (downloadMethod == "email")
            return $scope.isStepAvailable(7);
        else
            return false;
    };

    // Init.
    $scope.init();
}]);

app.controller("SignUpController", ["$scope", "Tools", "HttpService", function ($scope, Tools, HttpService) {
    // Properties.
    $scope.signUpForm = {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        informationFor: "-1"
    };

    $scope.isSubmitted = false;

    // Public methods.
    $scope.submit = function (e) {
        // Stop multiple submit.
        if ($scope.isSubmitted) {
            __console("FORM ALREADY SUBMITTED"); // TODO: Remove line. Debug only.
            return false;
        }

        // Validate.
        if (!$scope.validateForm()) {
            __console("FAILED VALIDATION"); // TODO: Remove line. Debug only.
            return false;
        }

        // Submit.
        $scope.isSubmitted = true; // Promise.

        __console("Submit: ", $scope.signUpForm); // TODO: Remove line. Debug only.

        HttpService.post("/Home/SignUp", { model: $scope.signUpForm }).then(function (data) {
            dataLayer.push({'event': 'crmReg'});    // fire the crmReg event for GTM tagging

            __console("Response: ", data); // TODO: Remove line. Debug only.

            if (data.success) {
                $scope.showThankYou();
            }
            else {
                $scope.isSubmitted = false; // Revoke promise.

                __console("SIGNUP ERROR"); // TODO: Display error page or remove line. Debug only.
                //$scope.showThankYou(); // TODO: Remove line. Debug only.
            }
        });
    };

    $scope.showThankYou = function () {
        var tl = new TimelineLite()
                , $modal = $('#signup_modal')
                , $dialog = $modal.find('.modal-dialog')
                , $signup = $modal.find('#signup')
                , $signupThanks = $modal.find('.thank-you')
                , dt = .5
        ;
        tl
                .to($signup, dt, { autoAlpha: 0 }, 'sync')
                .to($dialog, dt, {scrollTo: {y:0}}, 'sync' )
                .to($signupThanks, dt, { autoAlpha: 1 }, 'sync')
                .call(function () {
                    $modal.modal('hide');
                }, null, null, '+=6')
        ;
        $(document).on('hide.bs.modal', $modal, function () {
            tl.kill();
        });
    };

    // Private methods
    $scope.validateForm = function () {
        if (!Tools.validateEmail($scope.signUpForm.email))
            return false;
        else if (Tools.calculateAge($scope.signUpForm.birthDate) < 13)
            return false;
        else if (!Tools.validateRequired($scope.signUpForm.firstName))
            return false;
        else if (!Tools.validateRequired($scope.signUpForm.lastName))
            return false;
        if (typeof $scope.signUpForm.informationFor == "undefined")
            return false;
        else if ($scope.signUpForm.informationFor != "me" && $scope.signUpForm.informationFor != "myLovedOne")
            return false;
        else
            return true;
    };
}]);

app.service("HttpService", function ($http, $q) {
    return {
        post: function (url, parameters) {
            var deferred = $q.defer();

            $http.post(url, parameters).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                //deferred.reject("HTTP_ERROR");
                deferred.resolve({ success: false, status: "ERROR", message: "Error in HttpService" });
            });

            return deferred.promise;
        }
    };
});

app.directive("hoverClass", function () {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, element, attrs) {
            element.bind("mouseenter", function () {
                element.addClass(attrs.hoverClass);
            });
            element.bind("mouseleave", function () {
                element.removeClass(attrs.hoverClass);

                if (attrs.group.toLowerCase() == "symptoms")
                    element.removeClass('deselected');
            });
        }
    };
});

app.directive("raSelect", function () {
    return {
        restrict: "A",
        scope: true,
        link: function (scope, element, attrs) {
            element.bind("click", function () {
                scope.toggle(attrs.group, attrs.option);
                scope.resetDomGroup(element, attrs.raSelect);
                scope.$apply();

                if (typeof attrs.hoverDeselect !== "undefined") {
                    if (!scope.isOptionSelected(attrs.group, attrs.option))
                        element.addClass(attrs.hoverDeselect);
                    else
                        element.removeClass(attrs.hoverDeselect);
                }

                if (attrs.group.toLowerCase() == "age") {
                    scope.snapSlider(element);
                }
                else if (attrs.group.toLowerCase() == "plans") {
                    scope.animateDart(element);
                }
            });
        }
    }
});

app.factory("Tools", function () {
    var factory = {};

    factory.validateEmail = function (email) {
        if (typeof email == "undefined" || email == null)
            return false;

        var emailRegex = /^[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z_+])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/;

        return emailRegex.test(email.trim());
    };

    factory.validateRequired = function (value) {
        if (typeof value == "undefined" || value == null)
            return false;
        else
            return (value.trim().length > 0);
    };

    factory.validateName = function (value) {
        if (typeof value == "undefined" || value == null)
            return false;

        var findNumberRegex = /\d+/;

        return !findNumberRegex.test(value.trim());
    };

    factory.validateDate = function (date) {
        if (typeof date == "undefined" || date == null)
            return false;

        var dateFormatRegex = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var matchArray = date.match(dateFormatRegex);

        if (matchArray == null || (matchArray[2] != matchArray[4]))
            return false;

        var month = matchArray[1];
        var day = matchArray[3];
        var year = matchArray[5];

        if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > new Date().getFullYear())
            return false;

        if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30)
            return false;

        if (month == 2) {
            var isLeapYear = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));

            if (day > 29 || (day == 29 && !isLeapYear))
                return false;
        }

        return true;  // date is valid
    };

    factory.calculateAge = function (birthDate) {
        if (!factory.validateDate(birthDate))
            return 0;

        var dateFormatRegex = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var matchArray = birthDate.match(dateFormatRegex);

        var birthMonth = matchArray[1];
        var birthDay = matchArray[3];
        var birthYear = matchArray[5];

        var today = new Date();

        var todayYear = today.getFullYear();
        var todayMonth = today.getMonth() + 1; // zero-based numbering function
        var todayDay = today.getDate();

        var age = todayYear - birthYear;

        return ((todayMonth > birthMonth) || (todayMonth == birthMonth && todayDay >= birthDay)) ? age : --age;
    };

    factory.jsonPost = function (action, data, target) {
        $("<form>", {
            "action": action,
            "enctype": "application/json",
            "method": "POST",
            "target": target
        }).append($("<input>", {
            "name": "model",
            "value": JSON.stringify(data),
            "type": "hidden"
        })).appendTo(document.body).submit().remove();
    };

    return factory;
});



}
/*
     FILE ARCHIVED ON 06:40:08 Feb 21, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:28:42 Apr 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.718
  exclusion.robots: 0.024
  exclusion.robots.policy: 0.009
  esindex: 0.013
  cdx.remote: 17.727
  LoadShardBlock: 98.666 (3)
  PetaboxLoader3.datanode: 121.322 (5)
  load_resource: 243.896 (2)
  PetaboxLoader3.resolve: 153.122 (2)
*/