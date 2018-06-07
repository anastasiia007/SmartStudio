$(document).ready(function() {
  // Slow scroll up
  $(".workout__btn-next, .footer-content__item-btn").click(function(e) {
    e.preventDefault();
    $("html,body").animate({ scrollTop: +185 }, 1500);
    return false;
  });
  //slick slider
  $("#workout__slider").slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    responsive: [
      {
        breakpoint: 400,
        settings: { dots: false }
      },
      {
        breakpoint: 800,
        settings: { dots: false }
      },
      {
        breakpoint: 890,
        settings: { dots: false }
      }
    ]
  });
});
//google map
initMap = () => {
  const SmartStudio = { lat: 55.647126, lng: 37.748334 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: SmartStudio,
    zoom: 15,
    zoomControl: true,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      mapTypeIds: ["satellite"]
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    rotateControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#e9e9e9"
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5"
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            lightness: 29
          },
          {
            weight: 0.2
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            lightness: 18
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5"
          },
          {
            lightness: 21
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#dedede"
          },
          {
            lightness: 21
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#ffffff"
          },
          {
            lightness: 16
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36
          },
          {
            color: "#333333"
          },
          {
            lightness: 40
          }
        ]
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#f2f2f2"
          },
          {
            lightness: 19
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#fefefe"
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#fefefe"
          },
          {
            lightness: 17
          },
          {
            weight: 1.2
          }
        ]
      }
    ]
  });

  const marker = new google.maps.Marker({
    position: SmartStudio,
    map: map,
    title: "Smart Studio",
    icon: "./img/pointer.png"
  });

  function addYourLocationButton(map) {
    var controlDiv = document.createElement("div");

    var firstChild = document.createElement("button");
    firstChild.style.backgroundColor = "#fff";
    firstChild.style.border = "none";
    firstChild.style.outline = "none";
    firstChild.style.width = "28px";
    firstChild.style.height = "28px";
    firstChild.style.borderRadius = "2px";
    firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
    firstChild.style.cursor = "pointer";
    firstChild.style.marginRight = "10px";
    firstChild.style.padding = "0";
    firstChild.title = "Your Location";
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement("div");
    secondChild.style.margin = "5px";
    secondChild.style.width = "18px";
    secondChild.style.height = "18px";
    secondChild.style.backgroundImage =
      "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)";
    secondChild.style.backgroundSize = "180px 18px";
    secondChild.style.backgroundPosition = "0 0";
    secondChild.style.backgroundRepeat = "no-repeat";
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, "center_changed", function() {
      secondChild.style["background-position"] = "0 0";
    });

    firstChild.addEventListener("click", function() {
      var imgX = "0",
        animationInterval = setInterval(function() {
          imgX = imgX === "-18" ? "0" : "-18";
          secondChild.style["background-position"] = imgX + "px 0";
        }, 500);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var latlng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          map.setCenter(latlng);
          clearInterval(animationInterval);
          secondChild.style["background-position"] = "-144px 0";
        });
      } else {
        clearInterval(animationInterval);
        secondChild.style["background-position"] = "0 0";
      }
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }
  addYourLocationButton(map);
};
