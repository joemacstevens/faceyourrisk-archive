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

  $.fn.extend({
    addQueryString: function () {
      var $target = $(this).is('img') ? $(this) : $(this).find('img');

      $target.each(function (i, el) {
        var targetSrc = $(el).attr("src")
                , query = "&q=" + Math.floor((Math.random() * 100) + 1);

        $(el).attr("src", targetSrc + query);
      });
    }
  });

  window.isMobile = {
    Windows: function () {
      return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function () {
      return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function () {
      return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function () {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
  }
  ;

})(jQuery);

}
/*
     FILE ARCHIVED ON 02:44:15 Feb 21, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:28:40 Apr 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.454
  exclusion.robots: 0.021
  exclusion.robots.policy: 0.012
  esindex: 0.01
  cdx.remote: 5.555
  LoadShardBlock: 917.346 (3)
  PetaboxLoader3.datanode: 359.555 (7)
  PetaboxLoader3.resolve: 844.159 (3)
  load_resource: 377.377 (2)
*/