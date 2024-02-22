(function ($) {
  "use strict";
  // Superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend('<button type="button" id="mobile-nav-toggle"><i class="ion-md-menu"></i></button>');
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav").find(".menu-has-children").prepend('<i class="ion-md-arrow-dropdown"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("ion-md-arrow-dropup ion-md-arrow-dropdown");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("ion-md-close ion-md-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("ion-md-close ion-md-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Header scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".header").addClass("header-scrolled");
    } else {
      $(".header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $(".header").addClass("header-scrolled");
  }

  // Carousel
  var carousel = $(".carousel");
  var carouselIndicators = $(".carousel-indicators");
  carousel
    .find(".carousel-inner")
    .children(".carousel-item")
    .each(function (index) {
      index === 0
        ? carouselIndicators.append("<li data-target='#carousel' data-slide-to='" + index + "' class='active'></li>")
        : carouselIndicators.append("<li data-target='#carousel' data-slide-to='" + index + "'></li>");

      $(this).css("background-image", "url('" + $(this).children(".carousel-background").children("img").attr("src") + "')");
      $(this).children(".carousel-background").remove();
    });

  $(".carousel").swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == "left") $(this).carousel("next");
      if (direction == "right") $(this).carousel("prev");
    },
    allowPageScroll: "vertical",
  });

  // Skills section
  $(".skills").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("filter-active");
    $(this).addClass("filter-active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Clients carousel
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 } },
  });

  // Testimonials carousel
// vars
'use strict'
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
}

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });
})(jQuery);

("use strict");
const DOM = {
  timeline: "timeline",
  timelineStepper: "timeline__stepper",
  timelineStep: "timeline__step",
  timelineStepTitle: "timeline__step-title",
  timelineStepActive: "is-active",
  timelineStepActiveMarker: "timeline__step-active-marker",
  timelineSlidesContainer: "timeline__slides",
  timelineSlide: "timeline__slide",
  timelineSlideActive: "is-active",
};
const STEP_ACTIVE_MARKEP_CUSTOM_PROPS = {
  width: "--slide-width",
  posX: "--slide-pos-x",
  posY: "--slide-pos-y",
};
const SLIDES_CONTAINER_CUSTOM_PROPS = {
  height: "--slides-container-height",
};
const timeline = document.querySelector(`.${DOM.timeline}`);
const timelineStepper = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineStepper}`);
const timelineStepTitle = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineStepTitle}`);
const timelineSlidesContainer =
  timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineSlidesContainer}`);
const timelineSlides = timeline && Array.from(timeline.querySelectorAll(`.${DOM.timelineSlide}`));
window.addEventListener("load", () => {
  createStepActiveMarker();
  activateCurrentSlide();
});
window.addEventListener("resize", () => {
  recalcStepActiveMarkerProps();
});
timeline === null || timeline === void 0
  ? void 0
  : timeline.addEventListener("click", (event) => {
      const { target } = event;
      if (!target || !(target instanceof Element) || !target.closest(`.${DOM.timelineStep}`)) {
        return;
      }
      const currentStep = target.closest(`.${DOM.timelineStep}`);
      if (!currentStep) {
        return;
      }
      deactivateSteps();
      activateCurrentStep(currentStep);
      recalcStepActiveMarkerProps();
      deactivateSlides();
      activateCurrentSlide();
    });
function deactivateSteps() {
  const steps = document.querySelectorAll(`.${DOM.timelineStep}`);
  steps === null || steps === void 0 ? void 0 : steps.forEach((elem) => elem.classList.remove(`${DOM.timelineStepActive}`));
}
function activateCurrentStep(currentStep) {
  currentStep === null || currentStep === void 0 ? void 0 : currentStep.classList.add(`${DOM.timelineStepActive}`);
}
function deactivateSlides() {
  timelineSlides === null || timelineSlides === void 0
    ? void 0
    : timelineSlides.forEach((elem) => elem.classList.remove(`${DOM.timelineSlideActive}`));
}
function activateCurrentSlide() {
  const currentSlide = getCurrentSlide();
  if (!currentSlide) {
    return;
  }
  const currentSlideHeight = getCurrentSlideHeight(currentSlide);
  setSlideContainerHeight(currentSlideHeight);
  currentSlide.classList.add(`${DOM.timelineSlideActive}`);
}
function createStepActiveMarker() {
  const stepActiveMarker = document.createElement("div");
  stepActiveMarker.classList.add(`${DOM.timelineStepActiveMarker}`);
  timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.appendChild(stepActiveMarker);
  const positionProps = getStepActiveMarkerProps();
  if (!positionProps) {
    return;
  }
  setStepActiveMarkerProps(Object.assign({ stepActiveMarker }, positionProps));
}
function recalcStepActiveMarkerProps() {
  const stepActiveMarker =
    timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineStepActiveMarker}`);
  const stepActiveMarkerProps = getStepActiveMarkerProps();
  if (!stepActiveMarkerProps) {
    return;
  }
  setStepActiveMarkerProps(Object.assign({ stepActiveMarker }, stepActiveMarkerProps));
}
function setStepActiveMarkerProps({ stepActiveMarker, posX, posY, width }) {
  stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.width}`, `${width}px`);
  stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posX}`, `${posX}px`);
  if (typeof posY === "number") {
    stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posY}`, `${posY}px`);
  }
}
function getStepActiveMarkerProps() {
  const { currentStep } = getCurrentStep();
  if (!currentStep) {
    return null;
  }
  const width = getElementWidth(currentStep);
  const posX = getStepActiveMarkerPosX(currentStep);
  const posY = getStepActiveMarkerPosY();
  if (typeof posX !== "number" || typeof posY !== "number") {
    return null;
  }
  return { posX, posY, width };
}
function getCurrentStep() {
  const timelineSteps = Array.from(document.querySelectorAll(`.${DOM.timelineStep}`));
  const currentStep = timelineSteps.find((element) => element.classList.contains(`${DOM.timelineStepActive}`));
  const currentStepIndex =
    currentStep && timelineSteps.findIndex((element) => element.classList.contains(`${DOM.timelineStepActive}`));
  return { currentStep, currentStepIndex };
}
function getCurrentSlide() {
  const { currentStepIndex } = getCurrentStep();
  if (typeof currentStepIndex !== "number" || !timelineSlides) {
    return null;
  }
  return timelineSlides[currentStepIndex];
}
function setSlideContainerHeight(height) {
  timelineSlidesContainer === null || timelineSlidesContainer === void 0
    ? void 0
    : timelineSlidesContainer.style.setProperty(`${SLIDES_CONTAINER_CUSTOM_PROPS.height}`, `${height}px`);
}
function getCurrentSlideHeight(currentSlide) {
  return currentSlide.clientHeight;
}
function getStepActiveMarkerPosY() {
  const timelineTitlePosY =
    timelineStepTitle === null || timelineStepTitle === void 0 ? void 0 : timelineStepTitle.getBoundingClientRect().top;
  const timelineStepperPosY =
    timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.getBoundingClientRect().top;
  if (!timelineTitlePosY || !timelineStepperPosY) {
    return null;
  }
  return timelineTitlePosY - timelineStepperPosY;
}
function getStepActiveMarkerPosX(currentStep) {
  const timelineStepperPosX =
    timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.getBoundingClientRect().left;
  const currentStepPosX = currentStep.getBoundingClientRect().left;
  if (!timelineStepperPosX) {
    return null;
  }
  return currentStepPosX - timelineStepperPosX;
}
function getElementWidth(elem) {
  return elem.clientWidth;
}

// js for toggle read more button
document.addEventListener("DOMContentLoaded", function () {
  function toggleContent(button, content, lessButton) {
    if (content.style.display === "none" || content.style.display === "") {
      content.style.display = "inline-block";
      button.style.display = "none";
      lessButton.style.display = "inline";
      button.innerText = "Read Less";
    } else {
      content.style.display = "none";
      button.style.display = "inline-block";
      lessButton.style.display = "none";
      button.innerText = "Read More"; // Change the button text back to "Read More"
    }
  }

  function initializeReadMoreLess(moreButtonId, lessButtonId, contentId) {
    const moreButton = document.getElementById(moreButtonId);
    const lessButton = document.getElementById(lessButtonId);
    const content = document.getElementById(contentId);

    moreButton.addEventListener("click", function (event) {
      event.preventDefault();
      toggleContent(moreButton, content, lessButton);
    });

    lessButton.addEventListener("click", function (event) {
      event.preventDefault();
      toggleContent(lessButton, content, moreButton);
    });
  }

  // Initialize Read More/Read Less functionality for each section
  initializeReadMoreLess("more1", "less1", "content1");
  initializeReadMoreLess("more2", "less2", "content2");
  initializeReadMoreLess("more3", "less3", "content3");
  initializeReadMoreLess("more4", "less4", "content4");
});


// Example JavaScript code (purely illustrative, not based on provided code)
document.querySelector('.search-btn').addEventListener('click', function() {
  // Toggle a class or modify styles dynamically
  this.style.color = '#e84118';
});


$(function() {
	// Vars
	var pointsA = [],
		pointsB = [],
		$canvas = null,
		canvas = null,
		context = null,
		vars = null,
		points = 8,
		viscosity = 20,
		mouseDist = 70,
		damping = 0.05,
		showIndicators = false;
		mouseX = 0,
		mouseY = 0,
		relMouseX = 0,
		relMouseY = 0,
		mouseLastX = 0,
		mouseLastY = 0,
		mouseDirectionX = 0,
		mouseDirectionY = 0,
		mouseSpeedX = 0,
		mouseSpeedY = 0;

	/**
	 * Get mouse direction
	 */
	function mouseDirection(e) {
		if (mouseX < e.pageX)
			mouseDirectionX = 1;
		else if (mouseX > e.pageX)
			mouseDirectionX = -1;
		else
			mouseDirectionX = 0;

		if (mouseY < e.pageY)
			mouseDirectionY = 1;
		else if (mouseY > e.pageY)
			mouseDirectionY = -1;
		else
			mouseDirectionY = 0;

		mouseX = e.pageX;
		mouseY = e.pageY;

		relMouseX = (mouseX - $canvas.offset().left);
		relMouseY = (mouseY - $canvas.offset().top);
	}
	$(document).on('mousemove', mouseDirection);

	/**
	 * Get mouse speed
	 */
	function mouseSpeed() {
		mouseSpeedX = mouseX - mouseLastX;
		mouseSpeedY = mouseY - mouseLastY;

		mouseLastX = mouseX;
		mouseLastY = mouseY;

		setTimeout(mouseSpeed, 50);
	}
	mouseSpeed();

	/**
	 * Init button
	 */
	function initButton() {
		// Get button
		var button = $('.btn-liquid');
		var buttonWidth = button.width();
		var buttonHeight = button.height();

		// Create canvas
		$canvas = $('<canvas></canvas>');
		button.append($canvas);

		canvas = $canvas.get(0);
		canvas.width = buttonWidth+100;
		canvas.height = buttonHeight+100;
		context = canvas.getContext('2d');

		// Add points

		var x = buttonHeight/2;
		for(var j = 1; j < points; j++) {
			addPoints((x+((buttonWidth-buttonHeight)/points)*j), 0);
		}
		addPoints(buttonWidth-buttonHeight/5, 0);
		addPoints(buttonWidth+buttonHeight/10, buttonHeight/2);
		addPoints(buttonWidth-buttonHeight/5, buttonHeight);
		for(var j = points-1; j > 0; j--) {
			addPoints((x+((buttonWidth-buttonHeight)/points)*j), buttonHeight);
		}
		addPoints(buttonHeight/5, buttonHeight);

		addPoints(-buttonHeight/10, buttonHeight/2);
		addPoints(buttonHeight/5, 0);
		// addPoints(x, 0);
		// addPoints(0, buttonHeight/2);

		// addPoints(0, buttonHeight/2);
		// addPoints(buttonHeight/4, 0);

		// Start render
		renderCanvas();
	}

	/**
	 * Add points
	 */
	function addPoints(x, y) {
		pointsA.push(new Point(x, y, 1));
		pointsB.push(new Point(x, y, 2));
	}

	/**
	 * Point
	 */
	function Point(x, y, level) {
	  this.x = this.ix = 50+x;
	  this.y = this.iy = 50+y;
	  this.vx = 0;
	  this.vy = 0;
	  this.cx1 = 0;
	  this.cy1 = 0;
	  this.cx2 = 0;
	  this.cy2 = 0;
	  this.level = level;
	}

	Point.prototype.move = function() {
		this.vx += (this.ix - this.x) / (viscosity*this.level);
		this.vy += (this.iy - this.y) / (viscosity*this.level);

		var dx = this.ix - relMouseX,
			dy = this.iy - relMouseY;
		var relDist = (1-Math.sqrt((dx * dx) + (dy * dy))/mouseDist);

		// Move x
		if ((mouseDirectionX > 0 && relMouseX > this.x) || (mouseDirectionX < 0 && relMouseX < this.x)) {
			if (relDist > 0 && relDist < 1) {
				this.vx = (mouseSpeedX / 4) * relDist;
			}
		}
		this.vx *= (1 - damping);
		this.x += this.vx;

		// Move y
		if ((mouseDirectionY > 0 && relMouseY > this.y) || (mouseDirectionY < 0 && relMouseY < this.y)) {
			if (relDist > 0 && relDist < 1) {
				this.vy = (mouseSpeedY / 4) * relDist;
			}
		}
		this.vy *= (1 - damping);
		this.y += this.vy;
	};


	/**
	 * Render canvas
	 */
	function renderCanvas() {
		// rAF
		rafID = requestAnimationFrame(renderCanvas);

		// Clear scene
		context.clearRect(0, 0, $canvas.width(), $canvas.height());
		context.fillStyle = 'transparent';
		context.fillRect(0, 0, $canvas.width(), $canvas.height());

		// Move points
		for (var i = 0; i <= pointsA.length - 1; i++) {
			pointsA[i].move();
			pointsB[i].move();
		}

		// Draw shapes
		var groups = [pointsA, pointsB]

		for (var j = 0; j <= 1; j++) {
			var points = groups[j];

			if (j == 0) {
				// Background style
				context.fillStyle = '#1CE2D8';
			} else {
				// Foreground style
				context.fillStyle = gradient;
			}

			context.beginPath();
			context.moveTo(points[0].x, points[0].y);

			for (var i = 0; i < points.length; i++) {
				var p = points[i];
				var nextP = points[i + 1];
				var val = 30*0.552284749831;

				if (nextP != undefined) {
					// if (nextP.ix > p.ix && nextP.iy < p.iy) {
					// 	p.cx1 = p.x;
					// 	p.cy1 = p.y-val;
					// 	p.cx2 = nextP.x-val;
					// 	p.cy2 = nextP.y;
					// } else if (nextP.ix > p.ix && nextP.iy > p.iy) {
					// 	p.cx1 = p.x+val;
					// 	p.cy1 = p.y;
					// 	p.cx2 = nextP.x;
					// 	p.cy2 = nextP.y-val;
					// }  else if (nextP.ix < p.ix && nextP.iy > p.iy) {
					// 	p.cx1 = p.x;
					// 	p.cy1 = p.y+val;
					// 	p.cx2 = nextP.x+val;
					// 	p.cy2 = nextP.y;
					// } else if (nextP.ix < p.ix && nextP.iy < p.iy) {
					// 	p.cx1 = p.x-val;
					// 	p.cy1 = p.y;
					// 	p.cx2 = nextP.x;
					// 	p.cy2 = nextP.y+val;
					// } else {

						p.cx1 = (p.x+nextP.x)/2;
						p.cy1 = (p.y+nextP.y)/2;
						p.cx2 = (p.x+nextP.x)/2;
						p.cy2 = (p.y+nextP.y)/2;

						context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
					// 	continue;
					// }

					// context.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, nextP.x, nextP.y);
				} else {
nextP = points[0];
						p.cx1 = (p.x+nextP.x)/2;
						p.cy1 = (p.y+nextP.y)/2;

						context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
				}
			}

			// context.closePath();
			context.fill();
		}

		if (showIndicators) {
			// Draw points
			context.fillStyle = '#000';
			context.beginPath();
			for (var i = 0; i < pointsA.length; i++) {
				var p = pointsA[i];

				context.rect(p.x - 1, p.y - 1, 2, 2);
			}
			context.fill();

			// Draw controls
			context.fillStyle = '#f00';
			context.beginPath();
			for (var i = 0; i < pointsA.length; i++) {
				var p = pointsA[i];

				context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);
				context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);
			}
			context.fill();
		}
	}

	// Init
	initButton();
});





// homepage banner js
