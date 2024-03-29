/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function ($) {
  "use strict";

  /*---------------------------------------------------- */
  /* Preloader
	------------------------------------------------------ */
  $(window).load(function () {
    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {
      // will fade out the whole DIV that covers the website.
      $("#preloader").delay(300).fadeOut("slow");
    });
  });

  /*---------------------------------------------------- */
  /* FitText Settings
	------------------------------------------------------ */
  setTimeout(function () {
    $("#intro h1").fitText(1, { minFontSize: "42px", maxFontSize: "84px" });
  }, 100);

  /*---------------------------------------------------- */
  /* FitVids
	------------------------------------------------------ */
  $(".fluid-video-wrapper").fitVids();

  /*---------------------------------------------------- */
  /* Owl Carousel
	------------------------------------------------------ */
  $("#owl-slider").owlCarousel({
    navigation: false,
    pagination: true,
    itemsCustom: [
      [0, 1],
      [700, 2],
      [960, 3],
    ],
    navigationText: false,
  });

  /*----------------------------------------------------- */
  /* Alert Boxes
		------------------------------------------------------- */
  $(".alert-box").on("click", ".close", function () {
    $(this).parent().fadeOut(500);
  });

  /*---------------------------------------------------- */
  /*	Masonry
	------------------------------------------------------ */
  var containerProjects = $("#folio-wrapper");

  containerProjects.imagesLoaded(function () {
    containerProjects.masonry({
      itemSelector: ".folio-item",
      resize: true,
    });
  });

  /*----------------------------------------------------*/
  /*	Modal Popup
	------------------------------------------------------*/
  $(".item-wrap a").magnificPopup({
    type: "inline",
    fixedContentPos: false,
    removalDelay: 300,
    showCloseBtn: false,
    mainClass: "mfp-fade",
  });

  $(document).on("click", ".popup-modal-dismiss", function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  /*-----------------------------------------------------*/
  /* Navigation Menu
------------------------------------------------------ */
  var toggleButton = $(".menu-toggle"),
    nav = $(".main-navigation");

  // toggle button
  toggleButton.on("click", function (e) {
    e.preventDefault();
    toggleButton.toggleClass("is-clicked");
    nav.slideToggle();
  });

  // nav items
  nav.find("li a").on("click", function () {
    // update the toggle button
    toggleButton.toggleClass("is-clicked");
    // fadeout the navigation panel
    nav.fadeOut();
  });

  /*---------------------------------------------------- */
  /* Highlight the current section in the navigation bar
	------------------------------------------------------ */
  var sections = $("section"),
    navigation_links = $("#main-nav-wrap li a");

  sections.waypoint({
    handler: function (direction) {
      var active_section;

      active_section = $("section#" + this.element.id);

      if (direction === "up") active_section = active_section.prev();

      var active_link = $(
        '#main-nav-wrap a[href="#' + active_section.attr("id") + '"]'
      );

      navigation_links.parent().removeClass("current");
      active_link.parent().addClass("current");
    },

    offset: "25%",
  });

  /*---------------------------------------------------- */
  /* Smooth Scrolling
	------------------------------------------------------ */
  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });

  /*---------------------------------------------------- */
  /*  Placeholder Plugin Settings
	------------------------------------------------------ */
  $("input, textarea, select").placeholder();

  /*---------------------------------------------------- */
  /*	contact form
	------------------------------------------------------ */

  /* local validation */
  $("#contactForm").validate({
    /* submit via ajax */
    submitHandler: function (form) {
      var sLoader = $("#submit-loader");

      $.ajax({
        type: "POST",
        url: "https://dnmenviarcorreo.000webhostapp.com/app/sendEmail.php",
        data: $("#contactForm").serialize(),
        beforeSend: function () {
          sLoader.fadeIn();
        },
        success: function (msg) {
          // Message was sent
        if (JSON.parse(msg)) {
            sLoader.fadeOut();
            $("#message-warning").hide();
            $("#message-success").fadeIn();
            document.getElementById("contactForm").reset();
            setTimeout(() => {
              $("#message-success").fadeOut();
            }, 5000);
          }
          // There was an error
          else {
            sLoader.fadeOut();
            $("#message-warning").html(msg);
            $("#message-warning").fadeIn();
            setTimeout(() => {
              $("#message-warning").fadeOut();
            }, 5000);
          }
        },
        error: function (msg) {
          sLoader.fadeOut();
          if (msg["responseText"] == "OK") {
            sLoader.fadeOut();
            $("#message-warning").hide();
            $("#message-success").fadeIn();
            document.getElementById("contactForm").reset();
            setTimeout(() => {
              $("#message-success").fadeOut();
            }, 5000);
          }
          // There was an error
          else {
            sLoader.fadeOut();
            $("#message-warning").html(msg["responseText"]);
            $("#message-warning").fadeIn();
            setTimeout(() => {
              $("#message-warning").fadeOut();
            }, 5000);
          }
          console.log(msg["responseText"]);
        },
      });
    },
  });

  /*----------------------------------------------------- */
  /* Back to top
------------------------------------------------------- */
  var pxShow = 300; // height on which the button will show
  var fadeInTime = 400; // how slow/fast you want the button to show
  var fadeOutTime = 400; // how slow/fast you want the button to hide
  var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

  // Show or hide the sticky footer button
  jQuery(window).scroll(function () {
    if (!$("#header-search").hasClass("is-visible")) {
      if (jQuery(window).scrollTop() >= pxShow) {
        jQuery("#go-top").fadeIn(fadeInTime);
      } else {
        jQuery("#go-top").fadeOut(fadeOutTime);
      }
    }
  });

  $("#contratar-service1").click(function () {
    autocompletar("Desarrollo web");
  });

  $("#contratar-service2").click(function () {
    autocompletar("Aplicaciones web");
  });

  $("#contratar-service3").click(function () {
    autocompletar("Soluciones informáticas");
  });

  $("#contratar-service4").click(function () {
    autocompletar("Soporte técnico");
  });

  $("#contratar-service5").click(function () {
    autocompletar("Mantenimiento");
  });

  function autocompletar(campo) {
    $("#contactSubject").val("");
    $("#contactMessage").val("");
    $("#contactSubject").attr(
      "placeholder",
      `Asunto: ${campo}. (Presione 'Espacio' para autocompletar)`
    );
    $("#contactMessage").attr(
      "placeholder",
      `Mensaje: Hola, me gustaría contratar sus servicios de ${campo}. (Presione 'Espacio' para autocompletar)`
    );
    $("#contactName").focus();
    $("#contactSubject").one("keyup", function (event) {
      if (event.which == 32) {
        $("#contactSubject").val(campo);
      }
    });
    $("#contactMessage").one("keyup", function (event) {
      if (event.which == 32) {
        $("#contactMessage").val(
          `Hola, me gustaría contratar sus servicios de ${campo}.`
        );
      }
    });
  }


  async function change_languaje(lang) {
    const URL = "https://dnmjustme.github.io/DNMjustMe-site/lang/" + lang + ".json";

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(
          "Error al cargar el archivo JSON: " + response.statusText
        );
      }

      const data = await response.json();

      for (let clave in data) {
        $("#" + clave).fadeOut(200, function () {
          $("#" + clave).text(data[clave]).fadeIn(200);
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Obtén el valor de la variable en localStorage
  var lang = window.localStorage.getItem("lang");

  // Si la variable no existe, crea la variable en localStorage
  if (lang === null) {
    window.localStorage.setItem("lang", "es");
    var lang = window.localStorage.getItem("lang");

    $("#lang_checkbox").prop("checked", false);
  } else {
    if (lang == "es") {
      $("#lang_checkbox").prop("checked", false);
    } else {
      $("#lang_checkbox").prop("checked", true);
    }
  }

  $("#lang_checkbox").on("change", function () {
    var valorRadio = $("#lang_checkbox").prop("checked");
    if (valorRadio) {
      lang = "en";
    } else {
      lang = "es";
    }

    window.localStorage.setItem("lang", lang);
    var lang = window.localStorage.getItem("lang");
    $("input[name='lang-switch'][value='" + lang + "']").prop("checked", true);

    change_languaje(lang);
  });

  change_languaje(lang);
})(jQuery);
