/*contains code for starting the UI of the application, and other miscellaneous things.*/

"use strict";
// Strict mode - throws errors for more 'secure' JS
// So we don't have to keep re-finding things on page, find DOM elements once (using jQuery):

const $body = $("body");
// Add in User's stories, their favourited stories and all stories
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favouritedStories = $("#favourite-stories");
const $usersOwnStories = $("#my-stories");
const $storiesContainer = $("#stories-container")
const $storiesLists = $(".stories-list");
// Add in submit form for submitted stories
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $submitForm = $("#submit-form");
// Add in new nav link for submitting a story
const $navSubmitStory = $("#nav-submit-story");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
// Add in new User Profile
const $userProfile = $("#user-profile"); 

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $storiesLists,
    $submitForm,
    $userProfile,
    $loginForm,
    $signupForm,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */
// Function marked by 'async', followed by 'await' so that AJAX request/data retrieval is completed first.
async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
