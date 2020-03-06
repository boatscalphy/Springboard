$(async function() {
  // cache some selectors we'll be using quite a bit
  const $allStoriesList = $("#all-articles-list");
  const $submitForm = $("#submit-form");
  const $filteredArticles = $("#filtered-articles");
  const $favoriteArticles = $('#favorited-articles');
  const $loginForm = $("#login-form");
  const $createAccountForm = $("#create-account-form");
  const $ownStories = $("#my-articles");
  const $navLogin = $("#nav-login");
  const $navLogOut = $("#nav-logout");
  const $navPost = $("#nav-post");
  const $navFavorites = $('#nav-favorites');
  const $navStories = $('#nav-my-stories');
  const $addArticleForm = $('#submit-form');
  const $editArticleForm = $('#edit-article-form');
  const $userNav = $('#user-nav');
  const $userLogout = $('#user-logout');
  const $article = $('article');

  // global storyList variable
  let storyList = null;
 
  // global currentUser variable
  let currentUser = null;

  await checkIfLoggedIn();

  /**
   * Event listener for logging in.
   *  If successfully we will setup the user instance
   */

  $loginForm.on("submit", async function(evt) {
    evt.preventDefault(); // no page-refresh on submit
    // grab the username and password
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    // call the login static method to build a user instance
    const userInstance = await User.login(username, password);
    if (userInstance instanceof Object) {
      // set the global user to the user instance
      currentUser = userInstance;
      syncCurrentUserToLocalStorage();
      loginAndSubmitForm();
      updateProfileInfo();
    }
    else {
      alert('Invalid username or password');
    }
  });

  /**
   * Event listener to add a new post if a user is logged in 
   */

  $navPost.on("click", function(evt) {
    evt.preventDefault();
    $addArticleForm.slideToggle();
  })

  /**
   * Event listener to submit a new post once logged in
   */

  $addArticleForm.on('submit', async function(evt) {
    const fields = {
      author: $('#author').val(),
      title: $('#title').val(),
      url: $('#url').val()
    }
    const newStory = await storyList.addStory(currentUser, fields);
    //  Add new story to list of stories
    storyList.stories.push(newStory);
    //  Add new story to all stories section of the DOM
    let storyHTML = generateStoryHTML(newStory);
    $allStoriesList.prepend(storyHTML);
    //  Add new story to user's list of stories
    currentUser.ownStories.push(newStory);
    //  Reset input fields
    $submitForm.trigger('reset');
  });

  /**
   * Event listener for signing up.
   * If successfully we will setup a new user instance
   */

  $createAccountForm.on("submit", async function(evt) {
    evt.preventDefault(); // no page refresh
    // grab the required fields
    let name = $("#create-account-name").val();
    let username = $("#create-account-username").val();
    let password = $("#create-account-password").val();
    // call the create method, which calls the API and then builds a new user instance
    const newUser = await User.create(username, password, name);

    if (newUser instanceof Object) {
      currentUser = newUser;
      syncCurrentUserToLocalStorage();
      loginAndSubmitForm();
      updateProfileInfo();
    }

    else {
      alert(newUser);
    }
  });

  /**
   * Log Out Functionality
   */

  $navLogOut.on("click", function() {
    // empty out local storage
    localStorage.clear();
    // refresh the page, clearing memory
    location.reload();
  });

  /**
   * Event Handler for Clicking Login
   */

  $navLogin.on("click", function() {
    // Show the Login and Create Account Forms
    $loginForm.slideToggle();
    $createAccountForm.slideToggle();
    $allStoriesList.toggle();
  });

  /**
   * Event handler for Navigation to Homepage
   */

  $("body").on("click", "#nav-all", async function() {
    hideElements();
    await generateStories();
    $allStoriesList.show();
  });

  /**
   * Event handler for navigation to favorites
   */

  $navFavorites.on('click', function() {
    hideElements();
    $allStoriesList.hide();
    $favoriteArticles.show();
  })

  /**
   * Event handler for navigation to user's stories
   */

  $navStories.on('click', async function() {
    hideElements(); 
    $allStoriesList.hide();
    $ownStories.show();
   })

  /**
    * Event handler for (un)favoriting articles
  */
  
  $article.on('click', async function(evt) {
    const evtClass = evt.target.classList
    const parent = evt.target.parentNode
    const storyId = parent.parentNode.dataset.storyId;

    if (([...evtClass].includes('fas') || [...evtClass].includes('far')) && [...evtClass].includes('fa-star')) {
      evtClass.toggle('fas');
      evtClass.toggle('far');
      if ([...parent.classList].includes('favorited')) {
        const newFavorites = await currentUser.favoriteStory(currentUser.loginToken, currentUser.username, storyId, 'delete')
        currentUser.favorites = newFavorites.user.favorites
        $(`li[data-story-id="${storyId}"]`).remove()
      }
      else {
        const newFavorites = await currentUser.favoriteStory(currentUser.loginToken, currentUser.username, storyId, 'post')
        console.log(newFavorites);
        currentUser.favorites = newFavorites.user.favorites
      }
      
      parent.classList.toggle('favorited');
    }

    generateFavoriteStory()
  })

  /**
   * On page load, checks local storage to see if the user is already logged in.
   * Renders page information accordingly.
   */

  async function checkIfLoggedIn() {
    // let's see if we're logged in
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // if there is a token in localStorage, call User.getLoggedInUser
    // to get an instance of User with the right details
    // this is designed to run once, on page load
    currentUser = await User.getLoggedInUser(token, username);
    await generateStories();

    if (currentUser) {
      showNavForLoggedInUser();
      updateProfileInfo();
      generateFavoriteStory()
    }
  }

  /**
   * A rendering function to run to reset the forms and hide the login info
   */

  function loginAndSubmitForm() {
    // hide the forms for logging in and signing up
    $loginForm.hide();
    $createAccountForm.hide();

    // reset those forms
    $loginForm.trigger("reset");
    $createAccountForm.trigger("reset");

    // show the stories
    $allStoriesList.show();

    // update the navigation bar
    showNavForLoggedInUser();
    generateStories();
    generateFavoriteStory()
  }

  /**
   * A rendering function to call the StoryList.getStories static method,
   *  which will generate a storyListInstance. Then render it.
   */

  async function generateStories() {
    // get an instance of StoryList
    const storyListInstance = await StoryList.getStories();
    // update our global variable
    storyList = storyListInstance;
    // empty out that part of the page
    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
      const result = generateStoryHTML(story);
      $allStoriesList.append(result);
    }
  }

  /**
   * A function to render HTML for an individual Story instance
   */

  function generateStoryHTML(story) {
    let hostName = getHostName(story.url);
    //  Check if user is logged in
    //  If user is logged in check add functionality for favoriting article
    if (currentUser) {
      const favoriteStories = currentUser.favorites.map(story => {return story.storyId})
      if (favoriteStories.includes(story.storyId)){
        const storyMarkup = $(`
        <li data-story-id="${story.storyId}">
          <a class="star favorited"><i class="fas fa-star"></i></a>
          <a class="article-link" href="${story.url}" target="a_blank">
            <strong>${story.title}</strong>
          </a>
          <small class="article-author">by ${story.author}</small>
          <small class="article-hostname ${hostName}">(${hostName})</small>
          <small class="article-username">posted by ${story.username}</small>
        </li>
      `);
        return storyMarkup
      }
      else {
        const storyMarkup = $(`
        <li data-story-id="${story.storyId}">
          <a class="star"><i class="far fa-star"></i></a>
          <a class="article-link" href="${story.url}" target="a_blank">
            <strong>${story.title}</strong>
          </a>
          <small class="article-author">by ${story.author}</small>
          <small class="article-hostname ${hostName}">(${hostName})</small>
          <small class="article-username">posted by ${story.username}</small>
        </li>
      `);
        return storyMarkup
      }
    }

    // render DOM without favorite button for users who aren't logged in.
    else {
      //  render story markup
      const storyMarkup = $(`
        <li data-story-id="${story.storyId}">
          <a class="article-link" href="${story.url}" target="a_blank">
            <strong>${story.title}</strong>
          </a>
          <small class="article-author">by ${story.author}</small>
          <small class="article-hostname ${hostName}">(${hostName})</small>
          <small class="article-username">posted by ${story.username}</small>
        </li>
      `);
      return storyMarkup;
    }

  }

  /* hide all elements in elementsArr */

  function hideElements() {
    const elementsArr = [
      $submitForm,
      $allStoriesList,
      $filteredArticles,
      $ownStories,
      $loginForm,
      $createAccountForm,
      $addArticleForm,
      $editArticleForm,
      $favoriteArticles,
    ];
    elementsArr.forEach($elem => $elem.hide());
  }

  function showNavForLoggedInUser() {
    $navLogin.hide();
    $navLogOut.show();
    $userNav.show();
    $userLogout.text(`(${currentUser.username}) logout`)
  }

  /* simple function to pull the hostname from a URL */

  function getHostName(url) {
    let hostName;
    if (url.indexOf("://") > -1) {
      hostName = url.split("/")[2];
    } else {
      hostName = url.split("/")[0];
    }
    if (hostName.slice(0, 4) === "www.") {
      hostName = hostName.slice(4);
    }
    return hostName;
  }

  /* sync current user information to localStorage */

  function syncCurrentUserToLocalStorage() {
    if (currentUser) {
      localStorage.setItem("token", currentUser.loginToken);
      localStorage.setItem("username", currentUser.username);
    }
  }

  function updateProfileInfo() {
    $("#profile-name").html(`Name: ${currentUser.name}`);
    $("#profile-username").html(`Username: ${currentUser.username}`)
    $("#profile-account-date").html(`Member Since: ${currentUser.createdAt}`)
  }

  //  Generate user's list of favorite stories
  function generateFavoriteStory() {

    if (currentUser && currentUser.favorites.length > 0) {
      //array of user's favorite stories
      $favoriteArticles.empty();
      if ($('#favorited-articles > li').length === 0) {
        $favoriteArticles.append($(`<p>No favorites added!</p>`));
      }
      const userFavorites = currentUser.favorites;
      for (story of userFavorites) {
        console.log(story);
        const result = generateStoryHTML(story)
        $favoriteArticles.append(result)
      }
    }
  }
  console.dir(currentUser);
});
