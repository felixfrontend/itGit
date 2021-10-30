/*
 * Evento -  Event html  Template
 * Build Date: jan 2018
 * Author: colorlib
 * Copyright (C) 2018 colorlib
 */
/* ------------------------------------- */
/*  TABLE OF CONTENTS
 /* ------------------------------------- */
/*   PRE LOADING                          */
/*   WOW                                 */
/*   sliders                      */
/*    MAPS                               */
/*   COUNTER JS              */

/* ==============================================
/*  PRE LOADING
  =============================================== */
"use strict";
window.addEventListener("DOMContentLoaded", () => {
  $(window).load(function () {
    $(".loader").delay(500).fadeOut("slow");
  });

  $(document).ready(function () {
    "use strict";
    /* ==============================================
        /*   wow
        =============================================== */
    var wow = new WOW({
      animateClass: "animated",
      offset: 10,
      mobile: true,
    });
    wow.init();
    /* ==============================================
            STICKY HEADER
            =============================================== */

    $(window).on("scroll", function () {
      if ($(window).scrollTop() < 100) {
        $(".header").removeClass("sticky_header");
      } else {
        $(".header").addClass("sticky_header");
      }
    });
    /* --------------------------------------------------------
            COUNTER JS
            ----------------------------------------------------------- */

    $(".counter").counterUp({
      delay: 5,
      time: 3000,
    });

    /* ==============================================
            SLIDER
            =============================================== */
    $(".cover_slider").owlCarousel({
      loop: true,
      autoplay: true,
      smartSpeed: 1000,
      autoplayHoverPause: false,
      dots: true,
      nav: false,
      items: 1,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      dotsContainer: ".cover_dots",
    });

    $(".brand_carousel").owlCarousel({
      loop: true,
      autoplay: true,
      smartSpeed: 450,
      autoplayHoverPause: false,
      dots: false,
      nav: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },

        800: {
          items: 3,
        },
        1600: {
          items: 4,
        },
      },
      items: 5,
    });
    /* ------------------------------------- */
    /* Animated progress bars
     /* ------------------------------------- */

    var waypoints = $(".progress_container").waypoint(
      function () {
        $(".progress .progress-bar").progressbar({
          transition_delay: 1000,
        });
      },
      {
        offset: "50%",
      }
    );

    /* --------------------------------------------------------
    MAPS
    ----------------------------------------------------------- */
    var map = $("#map");
    if (map.length > 0) {
      google.maps.event.addDomListener(window, "load", init);
      var lattuide = map.attr("data-lat");
      var longtuided = map.attr("data-lon");
    }
    function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 16,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(lattuide, longtuided), // New York

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }],
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }],
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      };

      // Get the HTML DOM element that will contain your map
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById("map");

      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);

      // Let's also add a marker while we're at it
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lattuide, longtuided),
        map: map,
        title: "evento!",
      });
    }
  });
  //Tabs

  const deadline = "2021-11-10";
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0 ${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".countdown", deadline);

  // modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.toggle("show");
      document.body.style.overflow = "hidden";
    });
  });



  function closeModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  const review = document.querySelector(".review"),
        reviewClose = document.querySelector("[review-close]");

        const showReview = () => {
          review.style.display = "block";
          document.body.style.overflow = "hidden";
          const reviewTitle = document.querySelector('.review-title').innerHTML = "Спасибо за вопрос!"
        };
        
        reviewClose.addEventListener('click', () => {
          review.style.display = "none"
          document.body.style.overflow = ''
        })
 
        review.addEventListener('click', (e) => {
          if(e.target === review) {
            review.style.display = "none"
            document.body.style.overflow = ''
          }
        })


  const menuBtn = document.querySelector(".menu-btn"),
    navMenu = document.querySelector(".nav"),
    navItem = document.querySelectorAll(".nav-item");

  const openMenu = () => {
    menuBtn.classList.add("open");
    navMenu.style.left = "0";
    document.body.style.overflow = "hidden";
    menuOpen = true;
  };

  const closeMenu = () => {
    menuBtn.classList.remove("open");
    navMenu.style.left = "-100%";
    document.body.style.overflow = "";
    menuOpen = false;
  };

  navItem.forEach((item) => item.addEventListener("click", closeMenu));
  navMenu.addEventListener("click", closeMenu);

  let menuOpen = false;
  menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Запрос на сервер

  const sendData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      body: data,
    });
    if (!res.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${res.status}`);
    }
    return await res.json();
  };

  const form = document.querySelector("#form");
  const formModal = document.querySelector("#form-modal");

  const sendFormModal = () => {
    const data = {
      typeForm: "Заявка",
    };

    formModal.addEventListener("submit", (e) => {
      e.preventDefault();
      const formModalData = new FormData(formModal);
      formModalData.set("order", JSON.stringify(data));
      sendData("http://192.168.10.247:8000/api/v1/course/signup", formModalData)
        .then(() => {
          formModal.reset();
          closeModal();
          showReview();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  sendFormModal();

  const sendFormData = () => {
    const data = {
      typeForm: "Вопрос",
    };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formData.set("order", JSON.stringify(data));
      sendData("http://192.168.10.247:8000/api/v1/course/questions", formData)
        .then(() => {
          form.reset();
          showReview();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  sendFormData();

  // success form

  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });

  //   const timer = () => {
  //     setTimeout(() => {
  //        modal.classList.toggle('show')
  //        document.body.style.overflow = 'hidden'
  //      },10000)

  //   }

  // timer()
});

