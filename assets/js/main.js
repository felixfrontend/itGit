"use strict";
window.addEventListener("DOMContentLoaded", () => {
  $(window).load(function () {
    $(".loader").delay(500).fadeOut("slow");
  });

  $(document).ready(function () {
    "use strict";

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
      autoplay: false,
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
          items: 1,
        },
        1600: {
          items: 1,
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
      var mapOptions = {
        zoom: 16,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        center: new google.maps.LatLng(lattuide, longtuided), // New York

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

  //Deadline

  const fetchDeadline = () => {
    const timer = document.querySelector(".countdown"),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");
    fetch("http://192.168.10.247:8000/api/v1/course/main/event")
      .then((res) => res.json())
      .then((data) => {
        deadlineCourse(data.text);
        setInterval(updateDeadline, 1000);
        updateDeadline();
        function updateDeadline() {
          const t = Date.parse(data.date) - Date.parse(new Date()),
            daysData = Math.floor(t / (1000 * 60 * 60 * 24)),
            hoursData = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutesData = Math.floor((t / 1000 / 60) % 60),
            secondsData = Math.floor((t / 1000) % 60);
          days.innerHTML = daysData;
          hours.innerHTML = hoursData;
          minutes.innerHTML = minutesData;
          seconds.innerHTML = secondsData;
          if (t <= 0) {
            clearInterval(timeInterval);
          }
        }
      });
  };

  function deadlineCourse(text) {
    const deadlineText = document.querySelector("#deadlineText");
    deadlineText.innerHTML = text;
  }

  function courseText(text) {
    const deadlineText = document.querySelector("#deadlineText");
    deadlineText.innerHTML = text;
  }

  deadlineCourse();
  fetchDeadline();

  // modal

  const modalTrigger = document.querySelectorAll("#data-modal"),
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
    const reviewTitle = (document.querySelector(".review-title").innerHTML =
      "Спасибо за вопрос!");
  };

  reviewClose.addEventListener("click", () => {
    review.style.display = "none";
    document.body.style.overflow = "";
  });

  review.addEventListener("click", (e) => {
    if (e.target === review) {
      review.style.display = "none";
      document.body.style.overflow = "";
    }
  });

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

  // table fetchsa
  const courseBody = document.querySelector("#courseBody");

  function tableFetch() {
    fetch("http://192.168.10.247:8000/api/v1/course/courses-lists")
      .then((res) => {
        if (!res.ok) {
          throw Error("ERROR");
        }
        return res.json();
      })
      .then((data) => {
        const courseData = data
          .map((item) => {
            let courseImg 
            if(item.course_image === 'javascript')
            courseImg ='./assets/img/cleander/js1.png' 
            else if(item.course_image === 'python')
            courseImg ="./assets/img/cleander/python.png"
            else if(item.course_image === 'c#')
            courseImg = "./assets/img/cleander/csharp.png" 
            else
            courseImg=null

            let startCourseData =  item.start_date
            let startCourseDate= startCourseData.replace('09:00:00', '')
            return `
           <tr>
          <td>
            <div class="courses__item">
              <div class="courses__img" >
                <img src=${courseImg} />
              </div>
            </div>
          </td>
          <td class="event_date">
            ${startCourseDate}
            <span></span>
          </td>
          <td>
            <div class="event_place">
              <h5 id='course-item'>${item.name}</h5>
              <h5>${item.grafik_course}</h5>
            </div>
          </td>
          <td>
            <button class="btn btn-primary btn-rounded" data-modal>Записаться</button>
          </td>
        </tr>
          `;
          })
          .join("");
        courseBody.insertAdjacentHTML("afterbegin", courseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  tableFetch();

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
});
