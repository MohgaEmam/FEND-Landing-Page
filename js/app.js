/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('main section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// get offset of element from window
const offset = (element) => {
  return Math.floor(element.getBoundingClientRect().top);
};

// remove class from elements
const notActive = (element) => {
  element.classList.remove('active');
};

// add class to element if condition is met
const isActive = (condition, element) => {
  if (condition) {
    element.classList.add('active');
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const menuBuild = () => {
  // Define variables
  const navigation = document.getElementById('navbar__list');
  let navigationUl = '';
  
  // Loop through sections
  sections.forEach(section => {
    // Define variables
    const listElement = section.dataset.nav;
    const linkRef = section.id;

    // Do stuff
    navigationUl += `<li><a class="menu__link" href="#${linkRef}">${listElement}</a></li>`;
  });
  // appends li elements to navigation
  navigation.innerHTML = navigationUl;
};


// Add class 'active' to section when near top of viewport
const sectionActive = () => {
  sections.forEach( section => {
    // Define variables
    const elementOffset = offset(section);
    // condition as function for clarity
    const inViewport = () => elementOffset < 150 && elementOffset >= -150;
    // could also test if element offset is within a percentage to the top of page. 
    
    // Do stuff
    // remove other active classes, then add active class to element
    notActive(section);
    isActive( inViewport(), section );
  });
};


// Scroll to anchor ID using scrollTO event
const scrollToAnchor = (event, link) => {
  // Stop default jump to anchor
  event.preventDefault();
  
  // Define variables
  const targetId = link.getAttribute('href');
  const targetAnchor = document.querySelector(targetId);
  // const anchorTop = offset(targetAnchor);
  
  // Do stuff
  // window.scrollBy({ top: anchorTop, behavior: 'smooth' }); ** another valid option
  targetAnchor.scrollIntoView({
    behavior: 'smooth'
  });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu *Uses default load event
menuBuild(); 

// Scroll to section on link click
// set up event listener for single clicked item
const scrollId = () => {
  const links = document.querySelectorAll('.navbar__menu a');
  links.forEach(link => {
    link.addEventListener('click', () => { 
      scrollToAnchor( event, link);
    });
  });
};
scrollId();

// Listen cor scrolling and set sections as active
window.addEventListener( 'scroll', sectionActive );

