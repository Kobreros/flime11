var screenSize = $(window).width();

//#region [Smooth Scroll Anchor]

$("a[href^=\\#]:not([href$=\\#])").click(function () {
  event.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});
//#endregion

//#region [Hero]

// Параллакс
$(".section.is--hero").mousemove(function (event) {
  var xPos = event.clientX / $(".section.is--hero").width() - 0.5,
    yPos = event.clientY / $(".section.is--hero").height() - 0.5;

  gsap.to(".hero-image.is--1", 4, {
    x: xPos * 250,
    y: yPos * 150,
    ease: Power1.easeOut
  });
  gsap.to(".hero-image.is--2", 4, {
    x: xPos * 150,
    y: yPos * -270,
    ease: Power1.easeOut
  });
});
// END Параллакс

var heroScreenAnimation = gsap
  .timeline({
    paused: true,
    yoyo: true,
    repeat: -1
  })
  .fromTo(
    ".hero-bg__screen-cloud-img",
    4,
    { y: "-5%" },
    { y: "5%", ease: Power1.easeInOut },
    "all"
  )
  .fromTo(
    ".hero-bg__screen-char.is--1",
    4,
    { y: "5%" },
    { y: "-5%", ease: Power1.easeInOut },
    "all"
  )
  .fromTo(
    ".hero-bg__screen-char.is--2",
    4,
    { y: "2%" },
    { y: "-2%", ease: Power1.easeInOut },
    "all"
  );

$(".hero__headline-link").on("mouseenter", function () {
  heroScreenAnimation.play();
  gsap.fromTo(".hero-bg", { autoAlpha: 0 }, { autoAlpha: 1 });
  gsap.to(".hero-image", { autoAlpha: 0 });
  if ($(this).hasClass("is--1")) {
    gsap.set(".hero-bg__screen.is--1", { autoAlpha: 1 });
    gsap.set(".hero-bg__screen.is--2", { autoAlpha: 0 });
    $(
      ".hero__bottom-logo-wrap, .hero__bottom-logo-wrap > *, .hero__headline.is--we-are, .nav__buttons-wrap > .button"
    ).toggleClass("is--active");
  } else if ($(this).hasClass("is--2")) {
    gsap.set(".hero-bg__screen.is--1", { autoAlpha: 0 });
    gsap.set(".hero-bg__screen.is--2", { autoAlpha: 1 });
    $(
      ".hero__bottom-logo-wrap, .hero__bottom-logo-wrap > *, .hero__headline.is--we-are, .nav__buttons-wrap > .button"
    ).toggleClass("is--active");
  }
});

$(".hero__headline-link").on("mouseleave", function () {
  heroScreenAnimation.pause();
  gsap.to(".hero-bg", { autoAlpha: 0 });
  gsap.to(".hero-image", { autoAlpha: 1 });
  $(
    ".hero__bottom-logo-wrap, .hero__bottom-logo-wrap > *, .hero__headline.is--we-are, .nav__buttons-wrap > .button"
  ).removeClass("is--active");
});

$(document).on("scroll", function () {
  heroScreenAnimation.pause();
  gsap.to(".hero-bg", { autoAlpha: 0 });
  gsap.to(".hero-image", { autoAlpha: 1 });
  $(
    ".hero__bottom-logo-wrap, .hero__bottom-logo-wrap > *, .hero__headline.is--we-are, .nav__buttons-wrap > .button"
  ).removeClass("is--active");
});
//#endregion

//#region [Our games]

//#region [Change games view ]
var currentGameView = 0;

$(".our-games__view-button").click(function () {
  $(".our-games__view-button").removeClass("is--active");
  $(this).addClass("is--active");
  if ($(this).hasClass("is--grid")) {
    currentGameView = 1;

    $(".our-games__slider-controls").css("visibility", "hidden");
    $(".our-games__games-wrapper.is--grid").css("display", "flex");
    $(".our-games__games-wrapper.is--slider").css("display", "none");
  } else if ($(this).hasClass("is--slider")) {
    currentGameView = 0;

    $(".our-games__slider-controls").css("visibility", "");
    $(".our-games__games-wrapper.is--grid").css("display", "none");
    $(".our-games__games-wrapper.is--slider").css("display", "flex");
  }
});

//#endregion

//#region [Our games Slider]
var ourGamesSlider;

if (screenSize > 769) {
  ourGamesSlider = new Swiper(".swiper.is--our-games", {
    slidesPerView: 1,
    speed: 400,
    grabCursor: true,
    // loop: true,
    observer: true,
    navigation: {
      nextEl: ".slider-button.is--next.is--our-games",
      prevEl: ".slider-button.is--prev.is--our-games",
      disabledClass: "disable-slider-button"
    },
    pagination: {
      el: ".slider-fractions-numbers",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return current > 9
          ? current + `<span class="section-number"> /${total}</span>`
          : "0" + current + `<span class="section-number"> /${total}</span>`;
      }
      // formatFractionCurrent: function(num) {
      //     return (num > 9) ? num : '0' + num;
      // }
    }
  });
}

if (screenSize < 769) {
  ourGamesSlider = new Swiper(".swiper.is--our-games", {
    slidesPerView: 1,
    speed: 400,
    // grabCursor: true,
    // loop: true,
    spaceBetween: 32,
    observer: true,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination.is--our-games",
      type: "bullets",
      dynamicBullets: true
    }
  });
}

$(".our-games__tag").on("click", function () {
  if (currentGameView == 0) {
    console.log("currentGameView :>> ", currentGameView);
    var filter = $(this).text();
    console.log("filter :>> ", filter);
    if ($(this).hasClass("is--active")) {
      console.log("11 :>> ", 11);
      $(".our-games__tag").removeClass("is--active");
      $(".swiper-slide.is--our-games").css("display", "");
      ourGamesSlider.updateSize();
      ourGamesSlider.update();
      ourGamesSlider.updateSlides();
      ourGamesSlider.updateProgress();
      ourGamesSlider.pagination.update();
      ourGamesSlider.pagination.render();
      ourGamesSlider.updateSlidesClasses();
      ourGamesSlider.slideTo(0);
      return;
    }
    $(".our-games__tag").removeClass("is--active");
    $(this).addClass("is--active");

    $(".swiper-slide.is--our-games").css("display", "none");
    $(".swiper-slide.is--our-games").each(function () {
      var gameTag = $(this).find(".our-games__game-slide-tag").text();
      if (gameTag.includes(filter)) {
        $(this).css("display", "");
      }
    });

    ourGamesSlider.updateSize();
    ourGamesSlider.update();
    ourGamesSlider.updateSlides();
    ourGamesSlider.updateProgress();
    ourGamesSlider.pagination.update();
    ourGamesSlider.pagination.render();
    ourGamesSlider.updateSlidesClasses();
    ourGamesSlider.slideTo(0);
    return;
  } else if (currentGameView == 1) {
    console.log("currentGameView :>> ", currentGameView);
    console.log("22 :>> ", 22);
    if ($(this).hasClass("is--active")) {
      console.log("11 :>> ", 11);
      $(".our-games__tag").removeClass("is--active");
      $(".our-games__grid-item").css("display", "");
      return;
    }
    var filter = $(this).text();
    console.log("filter :>> ", filter);
    $(".our-games__tag").removeClass("is--active");
    $(this).addClass("is--active");

    $(".our-games__grid-item").css("display", "none");
    $(".our-games__grid-item").each(function () {
      var gameTag = $(this).find(".our-games__game-icon-tag").text();
      if (gameTag.includes(filter)) {
        $(this).css("display", "");
      }
    });
  }
});
//#endregion

//#region [Our games Grid]

$(".our-games__grid-icon").each(function (index) {
  $(this).attr("data-tooltip-content", `#grid_tooltip${index + 1}`);
});
$(".our-games__game-icon-tooltip").each(function (index) {
  $(this).attr("id", `grid_tooltip${index + 1}`);
});

if (screenSize > 769) {
  $(".our-games__grid-icon").tooltipster({
    // trigger: 'click',
    interactive: true,
    theme: "tooltipster-shadow"
  });
}

if (screenSize < 769) {
  $(".our-games__grid-icon").tooltipster({
    trigger: "click",
    interactive: true,
    theme: "tooltipster-shadow"
  });
}
//#endregion Our games Grid

//#endregion Our games

//#region [Why Section]
if (screenSize > 769) {
  $(".why__char-wrap").each(function (i, e) {
    var currentArrowColor;
    var myChar = e.childNodes[0];
    $(this).tooltipster({
      functionInit: function (instance, helper) {
        currentArrowColor = window.getComputedStyle(myChar).backgroundColor;
        // console.log('currentArrowColor :>> ', currentArrowColor);
        var content = $(helper.origin)
          .find(".why__tooltip-text, .why__tooltip-arrow")
          .detach();
        instance.content(content);
      },
      arrow: false,
      // arrowColor: `${currentArrowColor}`,
      side: "top",
      animation: "fade",
      delay: 0,
      viewportAware: false
    });
  });

  $(".why__char-wrap").each(function (i, e) {
    $(this).hover(
      function () {
        let whyRandom = Math.round(Math.random() * 6);
        while (whyRandom == i) {
          whyRandom = Math.round(Math.random() * 6);
        }
        $(`.why__philosophy-point.is--${i + 1}`).toggleClass("is--active");
        if (i + 1 >= 4 || i + 1 >= 5) {
          return;
        }
        if (whyRandom > 0 && whyRandom <= 6 && whyRandom + 1 !== i + 1) {
          $(`.why__philosophy-point.is--${whyRandom + 1}`).toggleClass(
            "is--active"
          );
        } else if (whyRandom > 0 && whyRandom <= 6 && whyRandom + 1 !== i + 1) {
          $(`.why__philosophy-point.is--${whyRandom + 1}`).toggleClass(
            "is--active"
          );
        }
        console.log("i :>> ", i);
      },
      function () {
        $(`.why__philosophy-point`).removeClass("is--active");
      }
    );
  });
}

if (screenSize < 769) {
  whySlider = new Swiper(".swiper.is--why", {
    slidesPerView: "auto",
    speed: 400,
    observer: true,
    pagination: {
      el: ".swiper-pagination.is--why",
      type: "bullets"
    },
    on: {
      slideChange: function () {
        $(`.why__philosophy-point`).removeClass("is--active");
        $(".why__char-img").removeClass("is--active");

        $(".why__tooltip-content").hide();
        const index_currentSlide = whySlider.realIndex;
        const currentSlide = whySlider.slides[index_currentSlide];
        $(currentSlide).find(".why__tooltip-content")[0].style.display =
          "block";
        $(currentSlide).find(".why__char-img").first().addClass("is--active");

        //Текст в блоке
        let whyRandom = Math.round(Math.random() * 6);
        while (whyRandom == index_currentSlide) {
          whyRandom = Math.round(Math.random() * 6);
        }

        $(`.why__philosophy-point.is--${index_currentSlide + 1}`).toggleClass(
          "is--active"
        );
        if (index_currentSlide + 1 >= 4 || index_currentSlide + 1 >= 5) {
          return;
        }
        if (
          whyRandom > 0 &&
          whyRandom <= 6 &&
          whyRandom + 1 !== index_currentSlide + 1
        ) {
          $(`.why__philosophy-point.is--${whyRandom + 1}`).toggleClass(
            "is--active"
          );
        } else if (
          whyRandom > 0 &&
          whyRandom <= 6 &&
          whyRandom + 1 !== index_currentSlide + 1
        ) {
          $(`.why__philosophy-point.is--${whyRandom + 1}`).toggleClass(
            "is--active"
          );
        }
      },
      init: function () {
        $(".why__char-img").first().addClass("is--active");
        $(".why__tooltip-content").first().css("display", "block");
      }
    }
  });
}

//Клик для перехода в форму

$('[href|="#form_focus"]').click(function () {
  setTimeout(() => {
    $("#name").focus();
  }, 100);
});

//#endregion

//#region [Mission]

if (screenSize > 769) {
  $(".mission__card").hover(
    function () {
      $(this).toggleClass("is--active");
    },
    function () {
      $(".mission__card").removeClass("is--active");
    }
  );
}

// Параллакс
$(".section.is--mission").mousemove(function (event) {
  var xPos = event.clientX / $(".section.is--mission").width() - 0.5,
    yPos = event.clientY / $(".section.is--mission").height() - 0.5;

  gsap.to(".mission__plane-img", 4, {
    x: xPos * 250,
    y: yPos * 150,
    ease: Power1.easeOut
  });
  gsap.to(".mission__cone-img", 4, {
    x: xPos * 150,
    y: yPos * -270,
    ease: Power1.easeOut
  });
});
// END Параллакс

if (screenSize < 769) {
  missionSlider = new Swiper(".swiper.is--mission", {
    slidesPerView: "auto",
    speed: 400,
    observer: true,
    pagination: {
      el: ".swiper-pagination.is--mission",
      type: "bullets"
    },
    on: {
      slideChange: function () {
        $(".mission__card").removeClass("is--active");
        const index_currentSlide = missionSlider.realIndex;
        const currentSlide = missionSlider.slides[index_currentSlide];
        $(currentSlide).find(".mission__card").first().addClass("is--active");
      },
      init: function () {
        $(".mission__card").first().addClass("is--active");
      }
    }
  });
}

//#endregion

//#region [Invite]

//Form hover
$(".invite__form-input").focus(function () {
  $(".invite__form-wrap").css("background-color", "#5368E7");
  $(".invite__form-input").css("background-color", "#FFFFFF");
  $(".upload-button").css("background-color", "rgba(255, 255, 255, 0.02)");
  $(".button.is--primary.is--from").css("background-color", "#000000");
  $(".invite__form-input-label, .invite__form-input").css("color", "#17111F");
  $(".upload-icon").css("color", "#FFFFFF");
  gsap.to(".form__active-image", { duration: 0.3, autoAlpha: 1 });
});
$(".invite__form-input").focusout(function () {
  $(".invite__form-wrap").css("background-color", "");
  $(".invite__form-input").css("background-color", "");
  $(".upload-button").css("background-color", "");
  $(".button.is--primary.is--from").css("background-color", "");
  $(".invite__form-input-label, .invite__form-input").css("color", "");
  $(".upload-icon").css("color", "");
  gsap.to(".form__active-image", { duration: 0.3, autoAlpha: 0 });
});

//#region [Form]

//Validate form
var form = $("#email-form");

var formName = $("#name");
var formEmail = $("#email");

$("input").on("click focus", function (event) {
  $(".form-alert").hide();
});

form.submit(function (e) {
  if ((formName.val().length == 0) & (formEmail.val().length == 0)) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $(".form-alert").css("display", "block");
    return;
  }
  if (
    (/.{2,}/.test(formName.val()) == false && formName.val().length > 0) ||
    formName.val().length == 0
  ) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $("#alert_name").css("display", "block");
  }
  if (
    (/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
      formEmail.val()
    ) == false &&
      formEmail.val().length > 0) ||
    formEmail.val().length == 0
  ) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $("#alert_email").css("display", "block");
  }
});
//Validate form

//#endregion

//#endregion

//#region [Round Games Number]

var roundGames = (function () {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === "undefined" || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split("e");
    value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
  }

  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
      return decimalAdjust("floor", value, exp);
    };
  }
})();

// Floor
//   Math.floor10(55.59, -1);   // 55.5

//#endregion

//#region [Change games number in page]

var totalGameNumber = $(".swiper-wrapper.is--our-games > *").length;
totalGameNumber = Math.floor10(totalGameNumber, -1);

$(".hero__bottom-stat-number.is--games, .our-games__section-title-number").text(
  totalGameNumber + "+"
);

//#endregion

//#region [Mobile menu]

// Menu
var menuOpen = false;
$(
  ".nav__menu-button-wrap, .nav__link.is--menu, .button.is--primary.is--menu"
).click(function () {
  if (menuOpen == false) {
    $("body").css("overflow", "hidden");
    gsap.to(".menu", { duration: 0.4, autoAlpha: 1 });
    menuOpen = true;
    $(".nav__menu-button-click").first().click();
  } else {
    $("body").css("overflow", "");
    gsap.to(".menu", { duration: 0.4, autoAlpha: 0 });
    menuOpen = false;
    $(".nav__menu-button-click").first().click();
  }
});
// END Menu

//#endregion
