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
  var $navLinks = $("#mainNav li a");
  var $navElemHome = $("#home-anchor");
  var $navElemEd = $("#education-anchor");
  var $navElemTreat = $("#treatment-anchor");
  var $navElemRisk = $("#risk-anchor");
  var $navElemInfo = $("#info-anchor");
  var ANCHOR_HOME = 0;
  var ANCHOR_ED = 0;
  var ANCHOR_TREAT = 0;
  var ANCHOR_RISK = 0;

  $(function () {
    // Wait until the load event fires before calculating the scroll offsets, scrolling to deep links, or activating the anchor scrolling. 
    // If you don't the positioning can be unpredictable.
    $(window).on('load', function() {
      refreshScrollOffsets();

      // check url for a deep link section hash and scroll to that position if one is there
      if (window.location.hash.length > 0) {
        scrollToSection(window.location.hash)
      }

      // Activate the scrolling for anchors. Normal anchors won't work because of the parallax
      var $anchorLinks = $("a[href^=#]");
      $anchorLinks.on("click", function (e) {
        var linkHash = $(this).attr("href");
     
        if (linkHash.length > 1) {  // ignore "#"
          e.preventDefault();
          console.log(linkHash);
          scrollToSection(linkHash);
        }
      });

      function scrollToSection(sectionHash) {
        var anchorPos = 0;
        //these conditional strings must match the href's of the nav links
        if (sectionHash === "#home") {
          anchorPos = ANCHOR_HOME;
        } else if (sectionHash === "#the-facts") {
          anchorPos = ANCHOR_ED;
        } else if (sectionHash === "#anaphylaxis-treatment") {
          anchorPos = ANCHOR_TREAT;
        } else if (sectionHash === "#whats-my-risk") {
          anchorPos = ANCHOR_RISK;
        }

        window.scrollMagicController.scrollTo(anchorPos);
        //If supported by the browser we can also update the URL
        if (window.history && window.history.pushState) {
          history.pushState("", document.title, sectionHash);
        }
      }

      $(window).on('resize orientationchange', refreshScrollOffsets);
    });

    function refreshScrollOffsets() {
      if (!!window.scrollMagicController) {
        ANCHOR_ED = window.getEducationOffset();
        ANCHOR_TREAT = window.getTreatmentOffset();
        ANCHOR_RISK = window.getMyRiskOffset() + 12;
      }
    }
  });

  $(window).scroll(function () {
    //Set focus to something other than the nav so the link doesnt stay grey when you scroll out of the current section   
    if ($.inArray(document.activeElement, $navLinks) >= 0) {
      document.activeElement.blur();
    }
    if ($(window).scrollTop() < ANCHOR_ED && !$navElemHome.hasClass("active")) {
      navigationState($navElemHome);
    } else if ($(window).scrollTop() >= ANCHOR_ED && $(window).scrollTop() < ANCHOR_TREAT && !$navElemEd.hasClass("active")) {
      navigationState($navElemEd);
    } else if ($(window).scrollTop() >= ANCHOR_TREAT && $(window).scrollTop() < ANCHOR_RISK && !$navElemTreat.hasClass("active")) {
      navigationState($navElemTreat);
    } else if ($(window).scrollTop() >= ANCHOR_RISK && !$navElemRisk.hasClass("active")) {
      navigationState($navElemRisk);
    }

  });

  function navigationState(activate) {
    $navElems = $('#mainNav .nav li');
    $navElems.each(function () {
      $(this).removeClass("active");
      if ($(this).attr("id") === activate.attr("id")) {
        $(this).addClass("active");
      }
    });
  }

  $("#info-anchor").on("touchend", function () {
    $('#signup_modal').modal('show');
    $('#mainNav').collapse('hide');
  })

  // signup form modal universal js
  window.showSignupModal = function () {
    $('#signup_modal').modal('show');
  };

  // leaving site modal
  $(document).on('click', 'a.leave-site[href]', function (e) {
    var $modal = $('#leaving-site-modal');
    if (!!$modal.length) {
      e.preventDefault();
      $modal.modal('show');
      $modal.find('a.leave-site-continue').attr('href', $(this).attr('href'));
    }
  });
  $(document).on('click', 'a.leave-site-continue', function () {
    $(this).closest('.modal').modal('hide');
  });

  $(function () {
    if (window.location.hash === '#stay-informed') {
      $('#signup_modal').modal('show');
    }
  });

  /**
   * Sharing links
   */

  $('a.facebook-share').on('click', function (e) {
    e.preventDefault();
    _openFacebookShare('https://web.archive.org/web/20190208203102/https://www.faceyourrisk.com');
  });

  $('a.twitter-share').on('click', function (e) {
    e.preventDefault();
    _openTwitterShare();
  });


  function _openShareWindow(href) {
    var w = 600, h = 457;
    var left = (window.screen.width / 2) - ((w / 2) + 10);
    var top = (window.screen.height / 2) - ((h / 2) + 50);
    window.open(encodeURI(href), 'sharer', 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
  }
//twitter
  function _openTwitterShare() {
    var twitter_text = "Some people with severe allergies don't realize their next reaction could be life threatening. Go to";
    var twitterLink = 'https://web.archive.org/web/20190208203102/https://twitter.com/share?text=' + twitter_text;
    _openShareWindow(twitterLink);
  }

  function _openFacebookShare(url) {
    var shareURL = "https://web.archive.org/web/20190208203102/https://www.facebook.com/sharer/sharer.php?u=" + url;
    _openShareWindow(shareURL);
  }
})(jQuery);


}
/*
     FILE ARCHIVED ON 20:31:02 Feb 08, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:28:45 Apr 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.596
  exclusion.robots: 0.021
  exclusion.robots.policy: 0.011
  esindex: 0.014
  cdx.remote: 29.213
  LoadShardBlock: 152.909 (3)
  PetaboxLoader3.datanode: 90.189 (5)
  PetaboxLoader3.resolve: 279.061 (4)
  load_resource: 272.991 (2)
*/