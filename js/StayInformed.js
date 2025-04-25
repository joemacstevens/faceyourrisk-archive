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

(function ($) {

    // Validation custom methods.
    $.validator.addMethod("notEqual", function (value, element, param) {
        return (value != param);
    }, "");

    $.validator.addMethod("over13", function (value, element, param) {
        return (__angularTools.calculateAge(value) >= 13);
    }, "");

    $.validator.addMethod("validDate", function (value, element, param) {
        return __angularTools.validateDate(value);
    }, "");

    $.validator.addMethod("emailFormat", function (value, element, param) {
        return __angularTools.validateEmail(value);
    });

    $.validator.addMethod("requiredField", function (value, element, param) {
        return __angularTools.validateRequired(value);
    });

    $.validator.addMethod("validName", function (value, element, param) {
        return __angularTools.validateName(value);
    });

    // SignUp form validation setup.
    var $signupForm = $("form#signupform");

    $signupForm.validate({
        ignore: [],
        onchange: true,
        rules: {
            fName: {
                requiredField: true,
                validName: true
            },
            lName: {
                requiredField: true,
                validName: true
            },
            birthDate: {
                requiredField: true,
                validDate: true,
                over13: true
            },
            email: {
                requiredField: true,
                emailFormat: true,
                email: false // stop jquery from validating field
            },
            "signup-user": {
                requiredField: true,
                notEqual: "-1"
            }
        },
        messages: {
            fName: {
                requiredField: "This is a required field",
                validName: "Please enter a valid name"
            },
            lName: {
                requiredField: "This is a required field",
                validName: "Please enter a valid name"
            },
            birthDate: {
                requiredField: "This is a required field",
                validDate: "Enter a valid birth date (mm/dd/yyyy)",
                over13: "Sorry, but you must be at least 13 years old to sign up"
            },
            email: {
                requiredField: "This is a required field",
                emailFormat: "Enter a valid email (email@email.com)"
            },
            "signup-user": {
                requiredField: "This is a required field",
                notEqual: "This is a required field"
            }
        },
        errorPlacement: function (error, $el) {
            if ($el.attr("name") === "signup-user") {
                error.insertAfter($el.closest(".selectric-wrapper"));
            } else {
                error.insertAfter($el);
            }
        }
    });

    // Clear labels on focus. 
    //$signupForm.on("focus click", "input, .selectric", function () {
    //    $(this).siblings("label.error").hide();
    //});
    
    $('.signup-submit').on('click touchstart', function(e) {
      angular.element('#signup_modal').scope().submit();
    });

    // Auto-type the slashes.
    $("input[name=birthDate]").on("keyup", function (e) {
        var backspaceKey = 8
            , deleteKey = 46
            , datePattern = /^[0-9]{2}$/
            , monthPattern = /^[0-9]{1,2}\/[0-9]{2}$/
            , input = $(this).val();

        if (e.which !== backspaceKey
                && e.which !== deleteKey
                && (input.match(datePattern) !== null
                || input.match(monthPattern) !== null)) {
            $(this).val(input + "/");
        }
    });

    // Enable Selectric on mobile devices.
    $("#signup-user").selectric({
        disableOnMobile: false
    });

    // Validate the hidden <select>
    $("select[name=signup-user]").on("change", function () {
        $(this).valid();
    });

})(jQuery);

}
/*
     FILE ARCHIVED ON 17:34:51 Feb 23, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:28:43 Apr 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.265
  exclusion.robots: 0.019
  exclusion.robots.policy: 0.008
  esindex: 0.01
  cdx.remote: 16.307
  LoadShardBlock: 102.636 (3)
  PetaboxLoader3.datanode: 117.049 (5)
  load_resource: 436.434 (2)
  PetaboxLoader3.resolve: 156.075 (2)
*/