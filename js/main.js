(function ($) {
    "use strict";
    // Superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 400
    });

    

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="ion-md-menu"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="ion-md-arrow-dropdown"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("ion-md-arrow-dropup ion-md-arrow-dropdown");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('ion-md-close ion-md-menu');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('ion-md-close ion-md-menu');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Header scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('header-scrolled');
        } else {
            $('.header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('.header').addClass('header-scrolled');
    }


    // Carousel
    var carousel = $(".carousel");
    var carouselIndicators = $(".carousel-indicators");
    carousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
        (index === 0) ?
                carouselIndicators.append("<li data-target='#carousel' data-slide-to='" + index + "' class='active'></li>") :
                carouselIndicators.append("<li data-target='#carousel' data-slide-to='" + index + "'></li>");

        $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') + "')");
        $(this).children('.carousel-background').remove();
    });

    $(".carousel").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left')
                $(this).carousel('next');
            if (direction == 'right')
                $(this).carousel('prev');
        },
        allowPageScroll: "vertical"
    });

    // Skills section
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    // Clients carousel
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {0: {items: 2}, 768: {items: 4}, 900: {items: 6}
        }
    });

    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);

"use strict";
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
const timelineSlidesContainer = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineSlidesContainer}`);
const timelineSlides = timeline && Array.from(timeline.querySelectorAll(`.${DOM.timelineSlide}`));
window.addEventListener("load", () => {
    createStepActiveMarker();
    activateCurrentSlide();
});
window.addEventListener("resize", () => {
    recalcStepActiveMarkerProps();
});
timeline === null || timeline === void 0 ? void 0 : timeline.addEventListener("click", (event) => {
    const { target } = event;
    if (!target ||
        !(target instanceof Element) ||
        !target.closest(`.${DOM.timelineStep}`)) {
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
    timelineSlides === null || timelineSlides === void 0 ? void 0 : timelineSlides.forEach((elem) => elem.classList.remove(`${DOM.timelineSlideActive}`));
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
    const stepActiveMarker = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineStepActiveMarker}`);
    const stepActiveMarkerProps = getStepActiveMarkerProps();
    if (!stepActiveMarkerProps) {
        return;
    }
    setStepActiveMarkerProps(Object.assign({ stepActiveMarker }, stepActiveMarkerProps));
}
function setStepActiveMarkerProps({ stepActiveMarker, posX, posY, width, }) {
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
    const currentStepIndex = currentStep &&
        timelineSteps.findIndex((element) => element.classList.contains(`${DOM.timelineStepActive}`));
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
    timelineSlidesContainer === null || timelineSlidesContainer === void 0 ? void 0 : timelineSlidesContainer.style.setProperty(`${SLIDES_CONTAINER_CUSTOM_PROPS.height}`, `${height}px`);
}
function getCurrentSlideHeight(currentSlide) {
    return currentSlide.clientHeight;
}
function getStepActiveMarkerPosY() {
    const timelineTitlePosY = timelineStepTitle === null || timelineStepTitle === void 0 ? void 0 : timelineStepTitle.getBoundingClientRect().top;
    const timelineStepperPosY = timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.getBoundingClientRect().top;
    if (!timelineTitlePosY || !timelineStepperPosY) {
        return null;
    }
    return timelineTitlePosY - timelineStepperPosY;
}
function getStepActiveMarkerPosX(currentStep) {
    const timelineStepperPosX = timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.getBoundingClientRect().left;
    const currentStepPosX = currentStep.getBoundingClientRect().left;
    if (!timelineStepperPosX) {
        return null;
    }
    return currentStepPosX - timelineStepperPosX;
}
function getElementWidth(elem) {
    return elem.clientWidth;
}