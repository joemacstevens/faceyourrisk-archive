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

//Preload Images
window.onload = function () {
  setTimeout(function () {
    // preload image
    new Image().src = "./images/0.0_home_global/Pencil_Orange.gif";
    new Image().src = "./images/1.0_education/background_furniture/background_furniture.png";
    new Image().src = "./images/1.0_education/background_outside/Outside_Background.png";
    new Image().src = "./images/treatment_background.png";
    new Image().src = "./images/1.0_education/big_bloodstream/bloodstream_background.png";
    new Image().src = "./images/1.0_education/big_bloodstream/bloodstream_vessel.png";
    new Image().src = "./images/1.0_education/big_bloodstream/bloodstream_cells.png";
    new Image().src = "./images/1.0_education/girl_bodies/resized/girl_clothing.png";
    new Image().src = "./images/1.0_education/girl_bodies/resized/girl_clothing_skin.png";
    new Image().src = "./images/1.0_education/girl_bodies/gif/girl_histamine.gif";
    new Image().src = "./images/2.0_treatment/background-right.png";
    new Image().src = "./images/2.0_treatment/background-left.png";
    new Image().src = "./images/1.0_education/additional_materials/target_larger.gif";
    new Image().src = "./images/2.0_treatment/background-left.png";
    new Image().src = "./images/2.0_treatment/background-right.png";
    new Image().src = "./images/3.0_risk_assessment/04_age/TrackerText0_mobile.png";
    new Image().src = "./images/3.0_risk_assessment/04_age/TrackerText1_mobile.png";
    new Image().src = "./images/3.0_risk_assessment/04_age/TrackerText2_mobile.png";
    new Image().src = "./images/3.0_risk_assessment/04_age/TrackerText3_mobile.png";

    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-9.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-10.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-11.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-12.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-13.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-14.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-15.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-16.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-17.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-18.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-19.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-20.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-21.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-22.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-23.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-24.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-25.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-26.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-27.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-28.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-29.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-30.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-31.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-32.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-33.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-34.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-35.png";
    new Image().src = "./images/1.0_education/microscope_views/histamine-frames/histamine-36.png";

  }, 1000);
};

//Check size of window this will be used to set duration
var duration = 768;
window.screenSize = {
  large: false,
  small: false
}

var lastTime = 0;
var forward = true;

if (window.matchMedia("(max-width: 767px)").matches) {
  duration = 480;
  duration = duration;
  screenSize.small = true;
} else {
  duration = duration * 3;//4;
  screenSize.large = true;
}



(function ($) {
    //trying to fix the ie jittering when scrolling
 let current_allergen = $("body").data("allergen");

//Nav

  $("#mainNav").on("show.bs.collapse", function () {
    $("#mainNav-container").addClass("open")
  });
  $("#mainNav").on("hidden.bs.collapse", function () {
    $("#mainNav-container").removeClass("open")
  });
  $('#mainNav a').on('click', function () {
    $('#mainNav').collapse('hide');
  });

//Allergen Carosel 
  $("#allergy-carousel").on("slid.bs.carousel", function (e) {
   let active = $(e.relatedTarget).find("img"),
            active_allergen = active.data("allergen")
    current_allergen = active_allergen
    $("body").attr("data-allergen", current_allergen)
    $("body").addClass("slide-scrolling")

   let scope = angular.element("#myrisk").scope();
    scope.allergenCarouselToggle(current_allergen);
  })
          .on("slide.bs.carousel", function (e) {
            $("body").addClass("slide-scrolling")
          });
//Emergency Carousel Controls
  $("#allergy-carousel .left").on("click", function () {
    $('#allergy-carousel').carousel('prev')
  });

  $("#allergy-carousel .right").on("click", function () {
    $('#allergy-carousel').carousel('next')
  });

//Master Scene Containers
 let $education = $("#education"),
          $treatment = $("#treatment")
  education = "body"

 let windowHeight = $(window).height();
  //$education.height = windowHeight;
  //$treatment.height = windowHeight;


//Set height of scenes


//Remove loading class from body 
  $("body").removeClass("loading")
//disclaimers
 let illustration_disclaimer = $("#scene1-disclaimer");
 let symptoms_disclaimer = $("#scene10-disclaimer,#mobile-scene-10-disclaimer");

//Education Elements
 let allergen = $("#drop-allergen-home");
 let allergen_home = $("#drop-allergen-home");
 let carousel_allergen = $("#allergy-carousel .active")
 let falling_allergens = $(".falling-allergens")
 let falling_allergen = $(".falling-allergens .allergen")
 let allergenCarousel = $("#allergy-carousel")
 let ladyWithClothes = $(".lady")
 let hero = $("#hero")

//Education Scene1
 let scene1copy = $education.find("#scene1-copy")
 let scene2copy = $education.find("#scene2_copy")
 let scene3copy = $education.find("#scene3_copy")
 let scene4copy = $education.find("#scene4-copy")
 let scene4header = $education.find("#scene4-header")
 let scene5copy = $education.find(".scene5 .copy")
 let scene6header = $education.find("#cardiovascular-symptoms-header")
 let scene6copy1 = $education.find("#cardiovascular-symptoms-copy-1")
 let scene6copy2 = $education.find("#cardiovascular-symptoms-copy-2")
 let scene7copy = $education.find(".scene7 .copy")
 let scene8copy = $education.find(".scene8 .copy")
 let scene9copy = $education.find(".scene9 .copy")
 let scene10copy = $education.find(".scene10 .copy")
 let scene11copy = $education.find(".scene11 .copy")


//lady and her parts
 let girl_clothing = $("#girl_clothing")
 let girl_clothing_sick = $("#girl_clothing_sick")
 let girl_skin = $("#girl_skin")
 let girl_skin_background = $("#girl_skin_background")
 let girl_histamine = $("#girl_histamine")
 let girl_histamine_loop = $("#girl_histamine_loop")
 let girl_digestive = $("#girl_digestive")

//Scene2
 let livingroombg = $(".furniture");
 let livingroomfloor = $(".bottom-bar");
 let targets = $(".targets");

//Scene3
 let histamine_scope = $(".microscope-histamine")
 let histamine = $(".histamines")

//Scene4 
 let rash = $(".rash");
 let red_face = $(".red-face");
 let circle_graph = $(".circle_graph");

//Scene5
 let digestive_symptoms = $(".digestive-symptoms");
 let stomach = $(".digestive-system");

//Scene6
 let cardio = $("#girl_cardio")
          , cardio_loop = $("#girl_cardio_loop")
          , bloodstream = $(".bloodstream.animated")
          , bloodstream_arrows = $(".arrows")
          , bloodstream_label = $('#bloodstream-label')
          ;


//Scene7
 let big_heart = $(".heart");

//Scene8
 let lungs = $("#girl_respiratory")
 let scene8header = $(".scene8 .header-copy-container .copy");
 let respiratory_scope_left_caption = $(".respiratory-microscope-left-caption .copy");
 let respiratory_scope_right_caption = $(".respiratory-microscope-right-caption .copy");
 let respiratory_scope_left = $(".respiratory-microscope-left");
 let respiratory_scope_right = $(".respiratory-microscope-right");

//Scene9
 let lady_with_clothes_and_symptoms = $(".lady-with-clothes-and-and-symptoms");

//Scene 10
 let symptom_icons = $(".symptom-icon")

//Start Treatment Section 
//Scene12
 let treatment_background_left = $(".treatment-background-left");
 let treatment_background_right = $(".treatment-background-right");
 let red_background_left = $(".red-background");
 let red_background_right = $(".red-white-background");

 let treatment_intro = $(".scene12 h2")

//Scene13
 let figures = $(".scene13 .images-with-caption");
 let scene13copy = $education.find(".scene13 .copy");

//Scene14 
 let scene14copy = $(".scene14 header .copy");
 let scene14clock = $(".scene14 .clock-container");
 let clockleftcopy = $(".scene14 .clock-copy .clock-left-copy")
 let clockrightcopy = $(".scene14 .clock-copy .clock-right-copy")

//Scene15
 let scene15copy = $(".scene15 .copy-container .copy")

//Scene16
 let countdowncopy = $("#countdown-copy")
 let countdownclock = $("#countdown-clock")

//Scene17
 let $whatsMyRisk = $('#whats-my-risk');

//Scene18
 let $carouselTracker = $('#myrisk .tracker')
          , $pagers = $('#myrisk .myrisk-carousel-control')
          , $sc17sec1Hdr = $('#myrisk .scene1 header')
          , $allergenWheel = $('#myrisk .scene1 #risk-allergen-wheel')
          ;

 let ctrl = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    },
    addIndicators: false
  });

  window.scrollMagicController = ctrl;

//Slice allergen into groups
 let falling_allergen1 = falling_allergen.slice(0, 6)
 let falling_allergen2 = falling_allergen.slice(6, 11)
 let falling_allergen3 = falling_allergen.slice(11, 17)

 let allergen_fall_speed = function () {

    if (screenSize.small) {
      speed = window.innerHeight;
    } else {
      speed = 1024;
    }

    return speed;
  };

 let carouselAllergen = new TimelineMax();
  carouselAllergen
          .to("body", 1, {className: "+=scrolling"})
          .set(allergen, {autoAlpha: 0}, .5)
          .from(scene1copy, 3, {y: -235}, "0")
          .to([hero, ".scroll-button-container"], .25, {autoAlpha: 0}, "0")
          .from(scene1copy, 1, {autoAlpha: 0}, "1")
          .to(ladyWithClothes, 1, {className: "+=half-raised"}, "0")
          .from(illustration_disclaimer, 1, {autoAlpha: 0}, "0")

 let dropAllergen = new TimelineMax();
  dropAllergen
          .to(allergen, 6, {y: 900})
          .from(falling_allergen1, 3, {y: '-' + allergen_fall_speed()}, "0")
          .from(falling_allergen2, 3, {y: '-' + allergen_fall_speed()}, "0.5")
          .from(falling_allergen3, 3, {y: '-' + allergen_fall_speed()}, "1")
          .to([falling_allergen1,falling_allergen2,falling_allergen3], 1, {autoAlpha: 1})

//Alergen and Target groups		
 let allergen1 = $(".falling-allergens .allergen1");
 let target1 = allergen1.find(".targets")
 let targetGroup1 = [allergen1, target1]

 let allergen2 = $(".falling-allergens .allergen2");
 let target2 = allergen2.find(".targets")
 let targetGroup2 = [allergen2, target2]

 let allergen3 = $(".falling-allergens .allergen3");
 let target3 = allergen3.find(".targets")
 let targetGroup3 = [allergen3, target3]

 let allergen4 = $(".falling-allergens .allergen4");
 let target4 = allergen4.find(".targets")
 let targetGroup4 = [allergen4, target4]

 let allergen5 = $(".falling-allergens .allergen5");
 let target5 = allergen5.find(".targets")
 let targetGroup5 = [allergen5, target5]

 let allergen6 = $(".falling-allergens .allergen6");
 let target6 = allergen6.find(".targets")
 let targetGroup6 = [allergen6, target6]

 let allergen7 = $(".falling-allergens .allergen7");
 let target7 = allergen7.find(".targets")
 let targetGroup7 = [allergen7, target7]

 let allergen8 = $(".falling-allergens .allergen8");
 let target8 = allergen8.find(".targets")
 let targetGroup8 = [allergen8, target8]

 let allergen9 = $(".falling-allergens .allergen9");
 let target9 = allergen9.find(".targets")
 let targetGroup9 = [allergen9, target9]

 let allergen10 = $(".falling-allergens .allergen10");
 let target10 = allergen10.find(".targets")
 let targetGroup10 = [allergen10, target10]

 let allergen11 = $(".falling-allergens .allergen11");
 let target11 = allergen11.find(".targets")
 let targetGroup11 = [allergen11, target11]

 let allergen12 = $(".falling-allergens .allergen12");
 let target12 = allergen12.find(".targets")
 let targetGroup12 = [allergen12, target12]

 let allergen13 = $(".falling-allergens .allergen13");
 let target13 = allergen13.find(".targets")
 let targetGroup13 = [allergen13, target13]

 let allergen14 = $(".falling-allergens .allergen14");
 let target14 = allergen14.find(".targets")
 let targetGroup14 = [allergen14, target14]

 let allergen15 = $(".falling-allergens .allergen15");
 let target15 = allergen15.find(".targets")
 let targetGroup15 = [allergen15, target15]

 let allergen16 = $(".falling-allergens .allergen16");
 let target16 = allergen16.find(".targets")
 let targetGroup16 = [allergen16, target16]

 let allergen17 = $(".falling-allergens .allergen17");
 let target17 = allergen17.find(".targets")
 let targetGroup17 = [allergen17, target17]

//All allergens
 let allergenPop = $(".falling-allergens .allergen")

  function addQueryString(imgContainer) {
   let imageSource = $(imgContainer).find("img"),
            imageSourceText = $(imageSource).attr("src"),
            query = "&" + Math.floor((Math.random() * 100) + 1);

   let updateSource = imageSourceText

    imageSource.attr("src", imageSourceText)
  }

  function addQueryStringMultiple(arrayOfImgContainers) {
    $(arrayOfImgContainers).each(function (index, value) {
      addQueryString(value)
    })
  }

  function addQueryToTargets(tween) {
   let img = $(tween.target).find(".targets")
    addQueryString(img)

  }

  function addQueryToSymptoms(tween) {
   let img = $(tween.target).find("img")
    addQueryStringNoContainer(img)
  }

  function removeTargets(tween) {
    $(tween.target).addClass("hide-allergen");
  }


  function checkDirection(timeline) {
   let newTime = timeline.time();
    if ((forward && newTime < lastTime) || (!forward && newTime > lastTime)) {
      forward = !forward;

      if (!forward) {
        return true
      } else {
        return false
      }
    }
    lastTime = newTime;
  }


//This scene will play indepenet of scrolling
 let fireWorks = new TimelineMax();
  fireWorks
          .staggerTo(allergenPop, 1, {className: "+=show-target", onStart: addQueryToTargets, onStartParams: ["{self}"], onComplete: removeTargets, onCompleteParams: ["{self}"]}, 0.3)


 let sceneOne = new TimelineMax();
  sceneOne
          .to($education, 1, {className: "+=scene2"})
          .from(scene2copy, 1, {autoAlpha: 0}, "+=0.1")


 let bringInFloor = new TimelineMax();
  bringInFloor
          .to(livingroomfloor, 3.5, {y: -82, autoAlpha: 1}, 2.5)
          .from(livingroombg, 6, {autoAlpha: 0, y: "100%"}, 2.5)
          .add("f1")
          .to(scene1copy, 1, {autoAlpha: 0}, 'f1')
          .to(illustration_disclaimer, 1, {autoAlpha: 0}, 'f1')
          .to(ladyWithClothes, 4, {className: "+=raised"}, "-=2")


  function addQueryStringNoContainer(img, delay) {
   let dly = delay || 0;
   let imageSource = $(img).attr("src"),
            query = "&" + Math.floor((Math.random() * 100) + 1);
   let updateSource = imageSource + query;

    TweenLite.delayedCall(dly, function () {
      img.attr("src", imageSource);
    });
  }

 let histaFrames = {var : 9};
 let classModGraph = ""
 let histamine_switch = $("#histamine-swtich")
 let start_hista_var = 9

  //Play microscope independently
 let histaMicro = TweenMax.to(histaFrames, 1, {var : 36,
    onUpdate: function () {
     let className = Math.ceil(histaFrames.var);
      classModGraph = "histamine-" + className;

      TweenMax.set(histamine_switch, {className: classModGraph});

    }});
  histaMicro.pause()

 let sceneTwo = new TimelineMax();
  sceneTwo
          .to($education, 1, {className: "+=scene3"})
          .to([scene1copy, illustration_disclaimer], 1, {autoAlpha: 0}, '0')
          .to(allergen, 1, {opacity: 0})
          .staggerTo(allergenPop, 1, {autoAlpha: 0}, 0.3)
          .to(scene2copy, 1, {autoAlpha: 0}, "-=1")
          .to(girl_clothing, 1, {autoAlpha: 0})
          .to(girl_histamine_loop, 1, {autoAlpha: 1, onStart: addQueryStringNoContainer, onStartParams: [girl_histamine_loop]}, "-=.5")
          .call(function () {
            histaMicro.restart();
            histaFrames.var = 9;
          })
          .from(histamine_scope, 1, {autoAlpha: 0, scale: .95})
          .from([scene3copy], 1, {autoAlpha: 0})
          .call(function () {
            histaMicro.play();
          })
          ;


 let chartFrames = {var : 1};
 let classMod = ""
 let chart = $("#graph-switch")

 let chartcopy = scene4copy.find("#chart-copy")
 let chartPlay = TweenMax.to(chartFrames, 1, {var : 13, startAt: {var : 1},
    onUpdate: function () {
     let className = Math.ceil(chartFrames.var);
      classMod = "graph-" + className;
      TweenMax.set(chart, {className: classMod})

    }})
  chartPlay.pause()

 let sceneThree = new TimelineMax();
  sceneThree

          .to(histamine_scope, 1, {autoAlpha: 0})
          .to(scene3copy, 1, {autoAlpha: 0})
          .set($education, {className: "+=scene4"})
          .from(scene4header, 1, {autoAlpha: 0})
          .from([circle_graph, chartcopy], 1, {autoAlpha: 0}, "-=.5")
          .call(function () {
            chartFrames.var = 1
            chartPlay.restart();

          }, null, null)
          .call(function () {
            chartPlay.play();
          }, null, null)
          .set(girl_histamine_loop, {autoAlpha: 0})
          .set(girl_skin, {autoAlpha: 1, onStart: addQueryStringNoContainer, onStartParams: [girl_skin]})
          .from(scene4copy.find("#rash-copy"), 1, {autoAlpha: 0})


 let sceneFour = new TimelineMax();
  sceneFour
          .set($education, {className: "+=scene5"})
  //the girl needs to be translucent on mobile decives for this scene
 let girlTransparency = 1;
  if (screenSize.small) {
    girlTransparency = .6;
  }
 let sceneFive = new TimelineMax();
  sceneFive
          .to([scene4copy, scene4header, circle_graph], 1, {autoAlpha: 0})
          .from(scene5copy, 1, {autoAlpha: 0}, ".5")
          .set(girl_skin, {autoAlpha: 0})
          .set(girl_digestive, {autoAlpha: girlTransparency, onComplete: addQueryStringNoContainer, onCompleteParams: [girl_digestive]})
          .staggerFrom(digestive_symptoms, 1, {scale: .9, autoAlpha: 0, onStart: addQueryToSymptoms, onStartParams: ["{self}"]}, 0.3)
          .set($education, {className: "+=scene6"})
//CardioWall

 let cardioFrames = {var : 1};
 let cardioClassMod = ""
 let cardioDiv = $("#bloodstream-frames")

 let cardioPlay = TweenMax.to(cardioFrames, 3, {var : 72,
    onUpdate: function () {
     let className = Math.ceil(cardioFrames.var);
      cardioClassMod = "bloodstream-" + className;
      TweenMax.set(cardioDiv, {className: cardioClassMod})

    }})
  cardioPlay.pause()


 let sceneSix = new TimelineMax();
  sceneSix
          .to([scene5copy, digestive_symptoms], 1, {autoAlpha: 0}, 0.3)
          .set(girl_digestive, {autoAlpha: 0})
          .set(cardio, {autoAlpha: 1, onComplete: addQueryStringNoContainer, onCompleteParams: [cardio]})
          .from(scene6header, 1, {autoAlpha: 0})

          .from(bloodstream, 1, {xPercent: -165, autoAlpha: 1})
          .from('#bloodstream-label', 1, {autoAlpha: 0})
          .call(function () {
            cardioFrames.var = 1;
            cardioPlay.restart();
          }, null, null)
          .call(function () {
            cardioPlay.play();
          }, null, null)
          .from(bloodstream_arrows, 1, {autoAlpha: 0}, "-=1.5")
          .from(scene6copy1, 1, {autoAlpha: 0}, "-=1.5")



 let bigHeartBeatTl = new TimelineMax({paused: true, repeat: -1});
  bigHeartBeatTl
          .call(function () {
            addQueryString(big_heart);
          }, null, null, '+=2.7')
          ;

 let sceneSeven = new TimelineMax();
  sceneSeven
          //.to(bloodstream, 1, {autoAlpha: 0})
          .to(bloodstream, 1, {xPercent: -165}, 'f0')
          .to(['#arrows', '#bloodstream-label'], 1, {autoAlpha: 0}, 'f0')
          .set(cardio, {autoAlpha: 0})
          .set(cardio_loop, {autoAlpha: 1, onComplete: addQueryStringNoContainer, onCompleteParams: [cardio_loop]})
          .to(scene6copy1, 1, {autoAlpha: 0}, "0")
          .from(big_heart, 1, {autoAlpha: 0, x: "-100%", onComplete: addQueryString, onCompleteParams: [big_heart]})
          .from(scene6copy2, 1, {autoAlpha: 0})
          .set($education, {className: "+=scene7"})



 let swellingFrames = {var : 11};
 let classModSwell = ""
 let swelling_switch = $("#swelling-switch")
 let start_swelling = 11

 let tightFrames = {var : 12};
 let classModTight = ""
 let tight_switch = $("#tight-switch")
 let start_tight = 12

  //Play microscopes indepently
 let tightMicro = TweenMax.to(tightFrames, 1, {var : 36,
    onUpdate: function () {
     let className = Math.ceil(tightFrames.var);
      classModTight = "tight-" + className;

      TweenMax.set(tight_switch, {className: classModTight})


    }})
  tightMicro.pause()

 let swellMicro = TweenMax.to(swellingFrames, 1, {var : 31,
    onUpdate: function () {
     let className = Math.ceil(swellingFrames.var);
      classModSwell = "swelling-" + className;

      TweenMax.set(swelling_switch, {className: classModSwell})
      start_swelling = swellingFrames.var

    }})
  swellMicro.pause();

 let sceneEight = new TimelineMax();
  sceneEight
          .to(big_heart, 1, {autoAlpha: 0, x: "-100%"})
          .to([scene6header, scene6copy2], 1, {autoAlpha: 0})
          .set(cardio_loop, {autoAlpha: 0})
          .set(lungs, {autoAlpha: 1, onStart: addQueryStringNoContainer, onStartParams: [lungs]})
          .set($education, {className: "+=scene8"})
          .from(scene8header, 1, {autoAlpha: 0})
          //.from(respiratory_scope_left,1,{autoAlpha:0,onStart:addQueryString ,onStartParams:[respiratory_scope_left]},"0")
          .from(respiratory_scope_left_caption, 1, {autoAlpha: 0})
          .from(respiratory_scope_left, 1, {autoAlpha: 0, scale: 0.9})
          .call(function () {
            tightFrames.var = 12;
            tightMicro.restart();
          }, null, null)
          .call(function () {
            tightMicro.play();
          }, null, null)
          //.from(respiratory_scope_right,1,{autoAlpha: 0,onComplete:addQueryString ,onCompleteParams:[respiratory_scope_right]},"0")
          .from(respiratory_scope_right_caption, 1, {autoAlpha: 0})
          .from(respiratory_scope_right, 1, {autoAlpha: 0, scale: 0.9})
          .call(function () {
            swellingFrames.var = 11;
            swellMicro.restart();
          }, null, null)
          .call(function () {
            swellMicro.play();
          }, null, null)


 let sceneNine = new TimelineMax();
  sceneNine
          .to([scene8header, respiratory_scope_left_caption, respiratory_scope_right, respiratory_scope_left, respiratory_scope_right_caption], 1, {opacity: 0})
          .to(lungs, 1, {autoAlpha: 0})
          .to(girl_clothing_sick, 1, {autoAlpha: 1}, "-=.5")
          .set($education, {className: "+=scene9"})
          .from(scene9copy, 1, {autoAlpha: 0})


 let bringOutFloor = new TimelineMax();
  bringOutFloor
          .to(livingroomfloor, 3.5, {y: 83, autoAlpha: 0}, "0")
          .to(livingroombg, 6, {autoAlpha: 0, y: "100%"}, "0")
          .to(scene9copy, 1, {autoAlpha: 0}, "0")

 let sceneTen = new TimelineMax();
  sceneTen
          .set($education, {className: "+=scene10"}, 'f0')
          .to(ladyWithClothes, 1, {className: "+=last-raised"}, "0")
          .from([scene10copy, symptoms_disclaimer], 1, {autoAlpha: 0}, "0")
          .staggerFrom(symptom_icons, .5, {scale: 0}, 0.15, "0");

 let sceneTenIcons = new TimelineMax();
  sceneTenIcons
          .staggerFrom(symptom_icons, .5, {scale: 0}, 0.05);


 let sceneEleven = new TimelineMax();
  sceneEleven
          .to([scene10copy, symptoms_disclaimer], 1, {autoAlpha: 0})
          .staggerTo(symptom_icons, 1, {autoAlpha: 0}, 0.3)
          .to(ladyWithClothes, 1, {y: "+=230", autoAlpha: 0}, "-=1")
          //.to(symptoms_disclaimer, 1, {autoAlpha: 0})
          .to($education, 1, {className: "+=scene11"})
          .to(scene11copy, 1, {autoAlpha: 1})


 let sceneTwelve = new TimelineMax();
  sceneTwelve
          .to(treatment_background_left, 1, {className: "-=retracted", ease: Linear.easeNone}, ".5")
          .to(treatment_background_right, 1, {className: "-=retracted", ease: Linear.easeNone}, ".5")
          .to(scene11copy, 1, {autoAlpha: 0}, "-=1.5")
          .to(treatment_intro, 1, {autoAlpha: 1}, "-=1.5")
          .to($education, 1, {className: "+=scene12"})

//Clock Frame Counter
 let clockFrames = {var : 1};
 let clockFramesSecond = {var : 19};
 let clock = $(".scene14 .clock")
 let clock_switch = $("#clock-switch")

 let sceneThirteen = new TimelineMax();
  sceneThirteen
          .to(treatment_intro, 1, {autoAlpha: 0})
          .set($education, {className: "+=scene13"})
          .to(scene13copy, 1, {autoAlpha: 1}, "-=.5")
          .from(figures, 1, {autoAlpha: 0, onStart: addQueryStringMultiple, onStartParams: [figures]}, "-=.5")


 let sceneFourteen = new TimelineMax();
  sceneFourteen
          .to(scene13copy, 1, {autoAlpha: 0}, "0")
          .to(figures, 1, {autoAlpha: 0}, "0")
          .set($education, {className: "-=scene13"})
          .set($education, {className: "+=scene14"})
          .from(scene14copy, 1, {autoAlpha: 0})
          .from(scene14clock, 1, {autoAlpha: 0})
          .from(clockleftcopy, 1, {autoAlpha: 0})
          .to(clockFrames, 1, {var : 10,
            onUpdate: function () {
             let className = Math.ceil(clockFrames.var);
              classMod = "clock_" + className;
              TweenMax.set(clock_switch, {className: classMod})
            }})
          .to(clockFrames, 1, {var : 19,
            onUpdate: function () {
             let className = Math.ceil(clockFrames.var);
              classMod = "clock_" + className;
              TweenMax.set(clock_switch, {className: classMod})
            }})
          .to(clockleftcopy, 1, {className: "+=clock_copy_mobile_swap"})
          .from(clockrightcopy, 1, {autoAlpha: 0})
          .to(clockFrames, 1, {var : 37,
            onUpdate: function () {
             let className = Math.ceil(clockFrames.var);
              classMod = "clock_" + className;
              TweenMax.set(clock_switch, {className: classMod})
            }})


 let sceneFifteen = new TimelineMax();
  sceneFifteen
          .to([scene14copy, clockleftcopy, clockrightcopy], 1, {autoAlpha: 0})
          .to(scene14clock, 1, {autoAlpha: 0}, "0")
          .set($education, {className: "+=scene15"})
          .to(red_background_left, 1, {className: "-=retracted", ease: Linear.easeNone}, ".5")
          .to(red_background_right, 1, {className: "-=retracted", ease: Linear.easeNone}, ".5")
          .from(scene15copy, 1, {autoAlpha: 0});

 let sceneSixteen = new TimelineMax();
  sceneSixteen

          .to($education, 1, {className: "+=scene16"})
          .set(scene15copy, {autoAlpha: 0})
          .from(countdowncopy, 1, {autoAlpha: 0}, "1")
          .to(red_background_left, 1, {className: "+=half-retracted", ease: Linear.easeNone}, ".5")
          .to(red_background_right, 1, {className: "+=half-retracted", ease: Linear.easeNone}, ".5")

  //.from(countdownclock,1,{autoAlpha:0,onComplete:addQueryString ,onCompleteParams:[countdownclock]},".5")

 let sceneSeventeen = new TimelineMax();
  sceneSeventeen
          .to($whatsMyRisk, 1, {y: -($whatsMyRisk.height() + $whatsMyRisk.offset().top)}, 'f0')
          ;

 let sceneNineteen = new TimelineMax();
  //var allergenWheelYOffset = $allergenWheel.closest('article').height() * 3 / 5;
  sceneNineteen
          .to($sc17sec1Hdr, 1, {yPercent: -200}, 'f0')
          //.to($allergenWheel, 1, {y: -allergenWheelYOffset}, 'f0')
//          .fromTo($pagers, 1, {y: allergenWheelYOffset}, {y: 0}, 'f0')
          .from($allergenWheel, 1, {y: $('#myrisk .scene1 header').outerHeight()}, 'f0')
          //.fromTo($pagers, 1, {y: $allergenWheel.height()}, {y: 0}, 'f0')
          ;


 let DARKNAVSTART = 810;
 let LIGHTNAVSTART = 66998;
 let LESSTHAN1200OFFSET = 0;


  //the layout changes when the viewport is less than 1200px  
  if ($(window).width() < 1200 && screenSize.large) {
   let LESSTHAN1200OFFSET = 190;
  }

  //Navigation scenes
 let sceneOneNav = new ScrollMagic.Scene({
    triggerElement: 'body',
    duration: LIGHTNAVSTART - DARKNAVSTART + LESSTHAN1200OFFSET,
    offset: DARKNAVSTART
  })
          //.addIndicators({name: "sceneOneNav " + duration})
          .setClassToggle("#mainNav-container", "dark")
          .addTo(ctrl)

  /*
  let setSocialIconsPinScene = new ScrollMagic.Scene({
   triggerElement: 'body',
   duration: 0
   })
   .setPin('#social-icons')
   .addTo(ctrl);
   */

 let allergenScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration
  })
          .setTween(carouselAllergen)
          //.addIndicators({name: "allergenToMouth"})
          .addTo(ctrl)



 let carouselScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration
  })
          .setTween(dropAllergen)
          //.addIndicators({name: "dropAllergen"})
          .addTo(ctrl)


 let fireWorksScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration / 2,
    offset: duration
  })
          .setTween(fireWorks)
          //.addIndicators({name: "fireWorks"})
          .addTo(ctrl);
  
  window.getEducationOffset = function () {
      if (screenSize.large) {
          return duration-635;
      }
    return duration;
  };


 let bringInFloorScene = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration + (duration / 3)
  })
          .setTween(bringInFloor)
          //.addIndicators({name: "bringInFloor"})
          .addTo(ctrl);

 let sceneOneScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration
  })
          .setTween(sceneOne)
          //.addIndicators({name: "sceneOne"})
          .addTo(ctrl);

 let sceneTwoScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 2
  })
          .setTween(sceneTwo)
          //.addIndicators({name: "sceneTwo"})
          .addTo(ctrl)


 let sceneThreeScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 3 + (duration / 2)
  })
          .setTween(sceneThree)
          //.addIndicators({name: "sceneThree"})
          .addTo(ctrl)

 let sceneFourScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration / 2,
    offset: duration * 4 + (duration / 2)
  })
          .setTween(sceneFour)
  //.addIndicators({name: "sceneFour"})
//.addTo(ctrl)

 let sceneFiveScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 5 + (duration / 2)
  })
          .setTween(sceneFive)
          //.addIndicators({name: "sceneFive"})
          .addTo(ctrl)


 let sceneSixScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 7 + (duration / 2)
  })
          .setTween(sceneSix)
          //.addIndicators({name: "sceneSix"})
          .addTo(ctrl)

 let sceneSevenScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 9 + (duration / 2)
  })
          .setTween(sceneSeven)
          //.addIndicators({name: "sceneSeven"})
          .addTo(ctrl)

 let sceneEightScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 11 + (duration / 2)
  })
          .setTween(sceneEight)
          //.addIndicators({name: "sceneEight"})
          .addTo(ctrl)

 let sceneNineScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 13 + (duration / 2)
  })
          .setTween(sceneNine)
          //.addIndicators({name: "sceneNine"})
          .addTo(ctrl)

 let bringOutFloorScene = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 14 + (duration / 2)
  })
          .setTween(bringOutFloor)
          //.addIndicators({name: "bringOutFloor"})
          .addTo(ctrl)


 let sceneTenScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 15.5
  })
          .setTween(sceneTen)
          //.addIndicators({name: "sceneTen"})
          .addTo(ctrl)

 let sceneTenIconsScroll = new ScrollMagic.Scene({
    triggerElement: education,
    offset: duration * 15.5
  })
          .setTween(sceneTenIcons)
  //.addIndicators({name: "sceneTenIcons"})
  //.addTo(ctrl)

 let sceneElevenScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 17.5
  })
          .setTween(sceneEleven)
          //.addIndicators({name: "sceneEleven"})
          .addTo(ctrl);

 let sceneTwelveScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 19.5
  })
          .setTween(sceneTwelve)
          //.addIndicators({name: "sceneTwelve"})
          .addTo(ctrl);

 let sceneThirteenScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 20.5
  })
          .setTween(sceneThirteen)
          //.addIndicators({name: "sceneThirteen"})
          .addTo(ctrl);
  
  window.getTreatmentOffset = function() {
    return sceneThirteenScroll.scrollOffset();
  };

 let sceneFourteenScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 22 + (duration / 2)
  })
          .setTween(sceneFourteen)
          //.addIndicators({name: "sceneFourteen"})
          .addTo(ctrl)

 let sceneFifteenteenScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 23 + (duration / 2)
  })
          .setTween(sceneFifteen)
          //.addIndicators({name: "sceneFifteen"})
          .addTo(ctrl)

 let sceneSixteenScroll = new ScrollMagic.Scene({
    triggerElement: education,
    duration: duration,
    offset: duration * 25 + (duration / 2)
  })
          .setTween(sceneSixteen)
          //.addIndicators({name: "sceneSixteen"})
          .addTo(ctrl);

 let sceneSeventeenScroll = new ScrollMagic.Scene({
    triggerElement: '#myrisk',
    offset: -($whatsMyRisk.height() + $whatsMyRisk.offset().top),
    duration: $whatsMyRisk.height() + $whatsMyRisk.offset().top,
    triggerHook: 'onEnter'
  })
          .setTween(sceneSeventeen)
          //.addIndicators({name: "sceneSeventeen"})
          .addTo(ctrl);

 let sceneNineteenScroll = new ScrollMagic.Scene({
    triggerElement: '#myrisk',
    offset: 350,
    duration: $('#myrisk').height() - 350
  })
          .setTween(sceneNineteen)
          //.addIndicators({name: "sceneNineteen"})
          .addTo(ctrl)
          ;

 let setMyRiskPin = new ScrollMagic.Scene({
    triggerElement: '#myrisk',
    offset: 0,
    duration: $('#myrisk').height()
  })
          .setPin('#myrisk')
          //.addIndicators({name: "setMyRiskPin"})
          .addTo(ctrl);
  
  window.getMyRiskOffset = function() {
    return setMyRiskPin.scrollOffset();
  };

  $(window).on('orientationchange', function (e) {
    $('#myrisk').closest('.scrollmagic-pin-spacer').css({width: '100vw !important'});
    $(window).trigger('resize');
  });

 let setMyRiskPrevPin = new ScrollMagic.Scene({
    triggerElement: '#myrisk',
    offset: 0,
  })
          .setClassToggle('#myrisk-prev', 'fixed')
          //.addIndicators({name: "setMyRiskPrevPin"})
          .addTo(ctrl);

 let setMyRiskTrackerPin = new ScrollMagic.Scene({
    triggerElement: '#myrisk',
    offset: 0,
  })
          .setClassToggle('#myrisk .tracker', 'fixed-mobile')
          //.addIndicators({name: "setMyRiskTrackerPin"})
          .addTo(ctrl);

 let myriskNextAppear = new ScrollMagic.Scene({
    triggerElement: '#myrisk',
    offset: $('#myrisk').height() - 50
  })
          .setTween(TweenLite.from('#myrisk-next', 0, {autoAlpha: 0}))
          //.addIndicators({name: "myriskControlsAppear"})
          .addTo(ctrl);
  ;
 let myriskPrevAppear = new ScrollMagic.Scene({
    triggerElement: '#myrisk',
    offset: $('#myrisk').height() - 50
  })
          .setTween(TweenLite.fromTo('#myrisk-prev', 0, {autoAlpha: 0, immediateRender: true}, {autoAlpha: 1}))
          //.addIndicators({name: "myriskControlsAppear"})
          .addTo(ctrl);
  ;

// let setMyRiskButtonsPin = new ScrollMagic.Scene({
//    triggerElement: '#myrisk',
//    offset: $('#myrisk').height() - 350
//  })
//          .setPin('#myrisk-prev')
//          //.addIndicators({name: "setMyRiskPin"})
//          .addTo(ctrl);

 let setNavClassMyRisk = new ScrollMagic.Scene({
    triggerElement: '#myrisk',
    offset: 0
  })
          .setClassToggle("#mainNav-container", "on-my-risk")
          //.addIndicators({name: "sceneNineteen"})
          .addTo(ctrl)
          ;

 let pinEducation = new ScrollMagic.Scene({
    triggerElement: "#education",
    duration: duration * 26})
          .setPin("#education")
          //.setClassToggle("#mainNav-container", "dark")
          .addTo(ctrl);


  // default tween for copy
  function copyTween($copy) {
   let tween = new TimelineLite();
    tween
            .from($copy, .5, {autoAlpha: 0, yPercent: -50})
            ;
    return tween;
  }

// Change behavior of controller
// to animate scroll instead of jump
  ctrl.scrollTo(function (target) {
    TweenMax.to(window, 0.1, {
      scrollTo: {
        y: target, // scroll position of the target along y axis
        autoKill: true // allows user to kill scroll action smoothly
      },
      ease: Cubic.easeInOut
    });
  });

  // whats my risk ! animation
 let exclamationTimeline = new TimelineMax({repeat: -1, paused: false});
  exclamationTimeline
          .add('refresh', '0+=15')
          .call(function () {
            $('#whats-my-risk .exclamation').addQueryString();
          }, null, null, 'refresh+=.001')
          ;
  // whats my risk hover effects
  $(document).on('mouseover', '#whats-my-risk', function () {
    exclamationTimeline.seek('refresh');
  }
  );
  // stay informed pencil animation
 let pencilTimeline = new TimelineMax({repeat: -1, paused: false});
  pencilTimeline
          .add('refresh', '0+=25')
          .call(function () {
            $('#info-anchor .icon img').addQueryString();
          }, null, null, 'refresh+=.001')
          ;
  // whats my risk hover effects
  $(document).on('mouseover', '#info-anchor', function () {
    $(this).find('.hover-icon').addQueryString();
    pencilTimeline.seek(0);
  }
  );
  $('input').focusin(function (e) {
    inputHasFocus = true;
    //console.log("input focus");
  });
  $('input').focusout(function () {
      inputHasFocus = false;
      handleOrientationChange(mql_orientation);
    //console.log("No focus");
  });
  $('.close').click(function () {
    handleOrientationChange(mql_orientation);
  });

  $('.modal .close[data-dismiss=modal]').on('touchstart', function () {
    $(this).closest('.modal').modal('close');
  });

  $('#results-email').on('focus focusin', function () {
    if (isMobile.iOS()) {
      $(window).scrollTop(
              setMyRiskPin.scrollOffset()
              + setMyRiskPin.duration()
              + $('#myrisk .scene-results header').height()
              + $('#mainNav-container').height()
              );
    }
  });
  $(window).on('touchstart', function (e) {
    if ($('#results-email').is(':focus')) {
      e.preventDefault();
    }
  });


})(jQuery);

// fix for the page refreshing issues
$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});

//popup modal for mobile landscape mode
var mql_orientation = window.matchMedia("(orientation: landscape)");
var mql_width = window.matchMedia("(max-width : 736px)");
var inputHasFocus = false;

mql_orientation.addListener(handleOrientationChange);
handleOrientationChange(mql_orientation);

function handleOrientationChange(mql_orientation) {
  if (mql_orientation.matches && mql_width.matches) {
    /* The viewport is currently in landscape orientation */


    if (inputHasFocus) {
      //most likely the keyboard is up lets not show the popup

    } else {

      $('#mobileBestViewed').modal('show');
    }
  } else {
    /* The viewport is currently in portrait orientation */
    $('#mobileBestViewed').modal('hide');
  }
}


}
/*
     FILE ARCHIVED ON 20:30:58 Feb 08, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:28:44 Apr 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.511
  exclusion.robots: 0.022
  exclusion.robots.policy: 0.01
  esindex: 0.01
  cdx.remote: 8.838
  LoadShardBlock: 179.811 (3)
  PetaboxLoader3.datanode: 231.867 (5)
  load_resource: 240.374 (2)
  PetaboxLoader3.resolve: 175.564 (2)
*/