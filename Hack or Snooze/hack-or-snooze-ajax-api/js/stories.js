/*contains code for UI about listing stories.*/

"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story,showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <div>
        ${showDeleteBtn ? getDeleteBtnHTML() : ""}
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

// Story delete button - have left out styling for delete button
function getDeleteBtnHTML() {
  return `
      <span class="delete-button">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}
// Story favourite star button - have left out styling for star button
function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// Deleting a story
async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);
  await putUserStoriesOnPage();
}

$ownStories.on("click", ".delete-button", deleteStory);

// Submit new story form
async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  const title = $("#create-title").val();
  const url = $("#create-url").val();
  const author = $("#create-author").val();
  const username = currentUser.username
  const storyData = { title, url, author, username };

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");
}

$submitForm.on("submit", submitNewStory);

// User's own stories
function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $usersOwnStories.empty();

  if (currentUser.usersOwnStories.length === 0) {
    $usersOwnStories.append("<h5>No stories added yet.</h5>");
  } else {
    for (let story of currentUser.usersOwnStories) {
      let $story = generateStoryMarkup(story, true);
      $usersOwnStories.append($story);
    }
  }

  $usersOwnStories.show();
}

// Favourites list
function putFavouritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  $favouritedStories.empty();

  if (currentUser.favourites.length === 0) {
    $favouritedStories.append("<h5>No favorites added yet.</h5>");
  } else {
    // loop through users favorites
    for (let story of currentUser.favourites) {
      const $story = generateStoryMarkup(story);
      $favouritedStories.append($story);
    }
  }

  $favouritedStories.show();
}

// Favorite/un-favorite a story

async function toggleStoryFavourite(evt) {
  console.debug("toggleStoryFavourite");

  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  // Check if the item is already favourited
  if ($tgt.hasClass("fas")) {
    // If currently a favourite: remove from user's list and change star
    await currentUser.removeFavourite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    // If not currently a favourite: do the opposite
    await currentUser.addFavourite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
}

$storiesLists.on("click", ".star", toggleStoryFavourite);
