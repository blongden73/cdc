console.log('Welcome to Docs');

var isPlayground = document.querySelector('.layout--playground');

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

function star(){
  var starIcon = document.querySelector('.star-icon');
  if(localStorage.getItem('star')) {
    starIcon.classList.add('clicked');
  }
  starIcon.addEventListener('click', function(){
    this.classList.add('clicked');
    localStorage.setItem('star', true);
  })
}

function copyClipBoard(){
  var copyClipboard = document.querySelectorAll('.js-copy-clipboard');
  var copyClipboardCode = document.querySelectorAll('.js-copy-code-clipboard');
  var codeWrapper = document.querySelectorAll('.code__block-wrapper');
  var toast = document.querySelector('.toast');

  if(copyClipboard){
    copyClipboard.forEach((item, i) => {
      item.addEventListener('click', function(){
          var sectionLink = this.dataset.uri;
          var pageurl = window.location.origin;
          var copyLink = pageurl + sectionLink;
          navigator.clipboard.writeText(copyLink);
          toast.innerText = "Link copied to pasteboard";
          toast.classList.add('copied');
          setTimeout(function(){
            toast.classList.remove('copied');
          }, 2000)
      })
    });
  }if(copyClipboardCode){
    codeWrapper.forEach((item, i) => {
      item.addEventListener('click', function(){
          var codeToCopy = this.dataset.clipboard;
          console.log(codeToCopy);
          navigator.clipboard.writeText(codeToCopy);
          toast.innerText = "Code copied to pasteboard";
          toast.classList.add('copied');
          setTimeout(function(){
            toast.classList.remove('copied');
          }, 2000)
      })
    });
  }
}

function inviewIcons() {
  var guideIcons = document.querySelectorAll('.js-guide-icons');
  var guideIconsCheck = document.querySelector('.js-guide-icons');
  if(guideIconsCheck){
    document.addEventListener('scroll', function(){
      guideIcons.forEach((item, i) => {
        if(elementInViewport(item)){
          item.classList.add('inview');
        }else {
          item.classList.remove('inview');
        }
      });
    });
  }
}

function menuPosition(){
  var menu = document.querySelector('.section__menu')
  var menuTracker = document.querySelector('.section__menu-anchor')
  if(menuTracker) {
    document.addEventListener('scroll', function(){
      var position = menuTracker.getBoundingClientRect();
      if(position.top <= 72 ) {
        menu.classList.add('position-fixed');
      }else {
        menu.classList.remove('position-fixed');
      }
    });
  }
}

function menuHover(){
  var menuItem = document.querySelector('.submenu--item');
  var subMenu = document.querySelector('.header__nav-sub');
  if(menuItem){
    menuItem.addEventListener('mouseenter', function(){
      this.classList.add('hovered');
      subMenu.classList.add('hovered');
    });
    menuItem.addEventListener('mouseleave', function(){
      setTimeout(function(){
        menuItem.classList.remove('hovered');
        subMenu.classList.remove('hovered');
      }, 1500)
    });
  }
}

function mobileNav(){
  var veggieBurger = document.querySelector('.veggie--burger');
  var mobileNav = document.querySelector('.mobile--nav');
  if(veggieBurger) {
    veggieBurger.addEventListener('click', function(){
      this.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
  }
}

function onwardJourneyTracking(){
  var onwards = document.querySelector('.onward__journeys-wrapper');
  var sectionMenu = document.querySelector('.section__menu');
  if(onwards) {
    document.addEventListener('scroll', function(){
      if(elementInViewport(onwards)) {
        sectionMenu.classList.add('hide');
      }else {
        sectionMenu.classList.remove('hide');
      }
    });
  }
}

function guideSectionsHighlighter(){
  var sectionTitle = document.querySelectorAll('.guides__title-wrapper');
  var guidesCheck = document.querySelector('.guides__title-wrapper');
  var sectionListItem = document.querySelectorAll('.section-menu');
  if(guidesCheck) {
    document.addEventListener('scroll', function(){
      sectionTitle.forEach((title, i) => {
        if(elementInViewport(title)) {
          var sectionID = title.dataset.sectionId;
          if(!title.classList.contains('inview')) {
            title.classList.add('inview');
            var sectionSelector = document.querySelector('.section-menu.'+sectionID);
            sectionListItem.forEach((item, i) => {
              item.classList.remove('inview');
            });
            sectionSelector.classList.add('inview');
          }
        } else {
          title.classList.remove('inview');
        }
      });

    })
  }
}

function tooltipPosition() {
  var tooltips = document.querySelectorAll('.tooltip-hover');
  var tooltipsAfter = document.querySelectorAll('.tooltip-hover');
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  tooltipsAfter.forEach((item, i) => {
    var afterWidth = parseInt(window.getComputedStyle(item, '::after').width);
    var rightOffset = item.getBoundingClientRect().left;
    var tooltipContent = item.dataset.tooltip;
    var rightOffestActual = rightOffset+afterWidth;
    if(rightOffestActual >= windowWidth) {
      item.classList.add('offscreen-right');
    }
  });
}

function playgroundNav() {
  var playgroundNav = document.querySelector('.playground-overflow');
  var playgroundFlyout = document.querySelector('.playground-flyout');
  playgroundNav.addEventListener('click', function(){
    this.classList.toggle('clicked');
    playgroundFlyout.classList.toggle('clicked');
  });
}

async function initCord() {
  const getTokenEndpoint = 'https://api.cord.com/playground-token';
  const tokenLocalStorageKey = '__cord_session_token__';
  const orgIDLocalStorageKey = '__cord_org_id__';

  let orgID = undefined;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('room');
    if (!room) {
      // User landed in a URL without a room, this will create a new
      // session. We clear old session just in case.
      localStorage.removeItem(tokenLocalStorageKey);
      localStorage.removeItem(orgIDLocalStorageKey);
    } else {
      const userVisitingNewRoom = room !== localStorage.getItem(orgIDLocalStorageKey);
      if (userVisitingNewRoom) {
        // The user was logged in another room. Clear that session.
        localStorage.removeItem(tokenLocalStorageKey);
        orgID = room;
      }
    }
  } catch {
    // Don't want to expose these errors in the client.
  }

  const sessionToken = localStorage.getItem(tokenLocalStorageKey);
  if (sessionToken) {
    window.CordSDK.init({
      session_token: sessionToken,
      enable_tasks: false,
    });
  } else {
    try {
      const { session_token, org_id } = await (
        await fetch(getTokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            org_id: orgID
          }),
        })
      ).json();

      if (session_token && org_id) {
        localStorage.setItem(tokenLocalStorageKey, session_token);
        localStorage.setItem(orgIDLocalStorageKey, org_id);
        
        const newURL = new URL(window.location);
        newURL.searchParams.set('room', org_id);
        window.location.replace(newURL);
      }
    } catch {
     // Don't want to expose these errors in the client.
  }
  }
}


async function init() {
  copyClipBoard();
  inviewIcons();
  menuPosition();
  menuHover();
  mobileNav();
  onwardJourneyTracking();
  hljs.highlightAll();
  guideSectionsHighlighter();
  tooltipPosition();

  if (isPlayground) {
    await initCord();
    star();
    playgroundNav();
  }
};

init();