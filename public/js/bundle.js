/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./src/scripts/carousels.js":
/*!**********************************!*\
  !*** ./src/scripts/carousels.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _emblaCarousel = _interopRequireDefault(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'embla-carousel'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var _emblaCarouselAutoScroll = _interopRequireDefault(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'embla-carousel-auto-scroll'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var _emblaCarouselFade = _interopRequireDefault(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'embla-carousel-fade'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
// Global variables for Embla carousels
const carousels = {
  inspirations: null,
  topicsDefault: null,
  topicsReversed: null,
  tickets: null,
  location: null
};

// Navigation cleanup functions storage
const cleanupFunctions = new Map();

// Utility: Destroy carousel and cleanup
const destroyCarousel = name => {
  const cleanup = cleanupFunctions.get(name);
  if (cleanup) {
    cleanup();
    cleanupFunctions.delete(name);
  }
  if (carousels[name]) {
    carousels[name].destroy();
    carousels[name] = null;
  }
};

// Utility: Setup navigation buttons
const setupNavigation = (container, carousel, isLooping = false) => {
  const prevButton = container.querySelector(".embla__button_prev");
  const nextButton = container.querySelector(".embla__button_next");
  if (!prevButton || !nextButton) return null;
  const prevHandler = () => carousel?.scrollPrev();
  const nextHandler = () => carousel?.scrollNext();
  const updateStates = () => {
    prevButton.disabled = isLooping ? false : !carousel?.canScrollPrev();
    nextButton.disabled = isLooping ? false : !carousel?.canScrollNext();
  };
  prevButton.addEventListener("click", prevHandler);
  nextButton.addEventListener("click", nextHandler);
  carousel.on("select", updateStates);
  carousel.on("init", updateStates);
  return () => {
    prevButton.removeEventListener("click", prevHandler);
    nextButton.removeEventListener("click", nextHandler);
  };
};

// Initialize Embla Carousel for Inspirations section
function initEmblaInspirations() {
  destroyCarousel("inspirations");
  if (window.innerWidth > 992) return;
  const container = document.querySelector(".embla_inspirations");
  if (!container) return;
  const options = {
    loop: false,
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": {
        slidesToScroll: 2
      }
    }
  };
  carousels.inspirations = (0, _emblaCarousel.default)(container, options);
}

// Initialize Embla Carousel for Topics section with AutoScroll plugin
function initEmblaTopics() {
  ["topicsDefault", "topicsReversed"].forEach(destroyCarousel);
  if (window.innerWidth < 768) return;
  const baseOptions = {
    loop: true,
    dragFree: false
  };
  const autoScrollConfig = {
    startDelay: 0,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: false
  };

  // Default topics carousel (left-to-right)
  const defaultContainer = document.querySelector(".embla_topics_default");
  if (defaultContainer) {
    carousels.topicsDefault = (0, _emblaCarousel.default)(defaultContainer, baseOptions, [(0, _emblaCarouselAutoScroll.default)({
      ...autoScrollConfig,
      speed: 1
    })]);
  }

  // Reversed topics carousel (right-to-left)
  const reversedContainer = document.querySelector(".embla_topics_reversed");
  if (reversedContainer) {
    carousels.topicsReversed = (0, _emblaCarousel.default)(reversedContainer, baseOptions, [(0, _emblaCarouselAutoScroll.default)({
      ...autoScrollConfig,
      speed: -1
    })]);
  }
}

// Initialize Embla Carousel for Tickets section
function initEmblaTickets() {
  destroyCarousel("tickets");
  if (window.innerWidth < 576 || window.innerWidth > 991) return;
  const container = document.querySelector(".embla_tickets");
  if (!container) return;
  const options = {
    loop: false,
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 701px)": {
        slidesToScroll: 2
      }
    }
  };
  carousels.tickets = (0, _emblaCarousel.default)(container, options);
}

// Initialize Embla Carousel for Location section with fade effect
function initEmblaLocation() {
  destroyCarousel("location");
  const container = document.querySelector(".embla_location");
  if (!container) return;
  const options = {
    loop: true,
    containScroll: "trimSnaps",
    speed: 10
  };
  carousels.location = (0, _emblaCarousel.default)(container, options, [(0, _emblaCarouselFade.default)()]);
  const cleanup = setupNavigation(container, carousels.location, true);
  if (cleanup) cleanupFunctions.set("location", cleanup);
}

// Initialize all carousels
const initAllCarousels = () => {
  initEmblaInspirations();
  initEmblaTopics();
  initEmblaTickets();
  initEmblaLocation();
};

// Initialize
initAllCarousels();

// Debounced resize handler
let resizeTimer;
const handleResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initAllCarousels, 250);
};
window.addEventListener("resize", handleResize);

/***/ }),

/***/ "./src/scripts/nav.js":
/*!****************************!*\
  !*** ./src/scripts/nav.js ***!
  \****************************/
/***/ (() => {

"use strict";


// Initialize navigation
function initNavigation() {
  const header = document.querySelector(".header");
  if (!header) return;
  const burger = header.querySelector(".header__burger");
  function closeMenu() {
    document.body.classList.remove("is-nav-opened");
    burger.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    document.body.classList.add("is-nav-opened");
    burger.setAttribute("aria-expanded", "true");
  }
  burger.addEventListener("click", function () {
    const isExpanded = burger.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking on link
  const navLinks = document.querySelectorAll(".header__nav-link, .header__nav-btn");
  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && document.body.classList.contains("is-nav-opened")) {
      closeMenu();
    }
  });
}
initNavigation();

/***/ }),

/***/ "./src/scripts/sticky-header.js":
/*!**************************************!*\
  !*** ./src/scripts/sticky-header.js ***!
  \**************************************/
/***/ (() => {

"use strict";


// Initialize sticky header
function initStickyHeader() {
  const header = document.querySelector(".header");
  if (!header) return;
  let isSticky = false;
  const toggleStickyHeader = () => {
    const shouldBeSticky = window.scrollY > 0;
    if (shouldBeSticky !== isSticky) {
      isSticky = shouldBeSticky;
      header.classList.toggle("is-sticky", shouldBeSticky);
    }
  };
  window.addEventListener("scroll", () => {
    requestAnimationFrame(toggleStickyHeader);
  }, {
    passive: true
  });
  toggleStickyHeader();
}
initStickyHeader();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/


function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Initialize all modules after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./nav.js */ "./src/scripts/nav.js")));
  Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./sticky-header.js */ "./src/scripts/sticky-header.js")));
  Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./carousels.js */ "./src/scripts/carousels.js")));
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map