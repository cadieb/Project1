// ARRAY FOR RANDOMIZED THEMES
var themes = ["80s", "70s", "Star Wars", "Greek", "Sports", "Western", "Princess", "Beach", "Luau", "Ninja", "Pirate", "Movie", "Carnival", "Tie Dye", "Patriotic", "Cactus", "Tiny Hat", "Vampire", "Mustache", "Disney", "Harry Potter", "Mardi Gras", "Ugly Sweater", "Spooky"];
var userInput;

// HIDE #results-screen ON LOAD
$('#category-btns').hide();
$('#results-screen').hide();
$('#recipes-results').hide();
$('#costumes-results').hide();
$('#music-results').hide();
$('#games-results').hide();

// ON CLICK FUNCTION FOR SEARCH BUTTON
$("#search-button").on("click", function(event){
  event.preventDefault();
  userInput = $("#search-input").val().trim();
  if ($("#search-input").val().length != 0){
    console.log(userInput);
    $("#search-input").val("");
    getAPIresults.supplies();
    getAPIresults.recipes();
    getAPIresults.music();
    getAPIresults.costumes();
    getAPIresults.games();
    $('#results-screen').show();
    $('#category-btns').show();
  }
});

// RANDOMIZE BUTTON
$("#randomize").on("click", function(event){
  event.preventDefault();
  userInput = themes[Math.floor(Math.random()*themes.length)];
  console.log(userInput);
  getAPIresults.supplies();
  getAPIresults.recipes();
  getAPIresults.music();
  getAPIresults.costumes();
  getAPIresults.games();
  $('#results-screen').show();
  $('#category-btns').show();

});


var getAPIresults = {
  supplies: function(){
    $("#supplies-results").html('');
    var q = userInput + " supplies";
    var divName = '#supplies-results';
    $.ajax({
        type: "GET",
        url: 'http://open.api.ebay.com/shopping?callname=FindItemsAdvanced',
        dataType: "jsonp",
        jsonp: "callbackname",
        crossDomain: true,
        data: {
            'appid': 'TiffanyJ-UCFBootC-PRD-e8df3d054-a7512aa1',
            'version': '771',
            'siteid': '0',
            'requestencoding': 'JSON',
            'responseencoding': 'JSON',
            'QueryKeywords': q,
            'MaxEntries': '10',
            'PriceMin' : { 'Value' : '250.0', 'CurrencyID' : 'USD'},
            'PriceMax' : { 'Value' : '300.0', 'CurrencyID' : 'USD'},
            'callback' : true
        },
        success: function(object) {
          console.log(object);
          displaySuppliesResults(object, divName);
        },
        error: function(object,x,errorThrown) {
        $("#ajaxLoad").html('');
            alert("call failure");
            $("#eBayXMLResponse").val(JSON.stringify(errorThrown,null,4));

        }
    });

  },
  recipes: function(){
    $("#recipes-results").html('');
    var queryURL = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + userInput + "+recipes" + "&mkt=en-us";
    var divName = "#recipes-results";
    $.ajax({
      url: queryURL,
      beforeSend: function(xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "416d8f635b1c4ecaaab8233c448a732b"); //replace value with your own key
      },
      type: "GET",
      // Request body
      //data: "{body}",
    })
      .done(function(response) {
        console.log(response);
        displayImageResults(response, divName);
      });
  },
  music: function(){
    $("#music-results").html('');
    var queryURL = "https://api.cognitive.microsoft.com/bing/v5.0/videos/search?q=" + userInput + "+music" + "&mkt=en-us";
    var divName = "#music-results";
    $.ajax({
      url: queryURL,
      beforeSend: function(xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "416d8f635b1c4ecaaab8233c448a732b"); //replace value with your own key
      },
      type: "GET",
      // Request body
      //data: "{body}",
    })
    .done(function(response) {
      console.log(response);
      displayVideoResults(response, divName);
    });
  },
  costumes: function(){
    $("#costumes-results").html('');
    var queryURL = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + userInput + "+costumes" + "&mkt=en-us";
    var divName = "#costumes-results";
    $.ajax({
      url: queryURL,
      beforeSend: function(xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "416d8f635b1c4ecaaab8233c448a732b"); //replace value with your own key
      },
      type: "GET",
      // Request body
      //data: "{body}",
    })
    .done(function(response) {
      console.log(response);
      displayImageResults(response, divName);
    });
  },
  games: function(){
    $("#games-results").html('');
    var queryURL = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + userInput + "+party+games" + "&mkt=en-us";
    var divName = "#games-results";
    $.ajax({
      url: queryURL,
      beforeSend: function(xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "416d8f635b1c4ecaaab8233c448a732b"); //replace value with your own key
      },
      type: "GET",
      // Request body
      //data: "{body}",
    })
    .done(function(response) {
      console.log(response);
      displayImageResults(response, divName);
    });
  },

};

// function to display the video results in a card layout with the divName parameter specified in the specific category function
function displayVideoResults(response, divName){
  for (var i = 0; i < response.value.length; i++) {
    $(divName).append("<div class='column medium-4'>" + "<div class='card'>" + "<a href='" + response.value[i].contentUrl + "' target='_blank'>" + "<div style=\"background: url(\'" + response.value[i].thumbnailUrl + "\') center center no-repeat; background-size:cover;\" class='thumbnail-video'>" + "</div>" + "</a>" + "<a class='card-link-text' href='" + response.value[i].contentUrl + "' target='_blank'>" + response.value[i].name + "</a>" + "<div class='favorite'></div>" + "</div>" + "</div>");
  }
};

// function to display the image results in a card layout
function displayImageResults(response, divName){
  for (var i = 0; i < response.value.length; i++) {
    $(divName).append("<div class='image-result-container'>" + "<div class='card'>" + "<a href='" + response.value[i].contentUrl + "' target='_blank'>" + "<div style=\"background: url(\'" + response.value[i].thumbnailUrl + "\') center center no-repeat; background-size:cover;\" class='thumbnail-image'>" + "</div>" + "</a>" + "<a class='card-link-text' href='" + response.value[i].contentUrl + "' target='_blank'>" + response.value[i].name + "</a>" + "<div class='favorite'></div>" + "</div>" + "</div>");
  }
};

// function to display the supplies results in a card layout
function displaySuppliesResults(object, divName){
  for (var i = 0; i < object.SearchResult[0].ItemArray.Item.length; i++) {
      $(divName).append("<div class='image-result-container'>" + "<div class='card'>" + "<a href='" + object.SearchResult[0].ItemArray.Item[i].ViewItemURLForNaturalSearch + "' target='_blank'>" + "<div style=\"background: url(\'" + object.SearchResult[0].ItemArray.Item[i].GalleryURL + "\') center center no-repeat; background-size:cover;\" class='thumbnail-image'>" + "</div>" + "</a>" + "<a class='card-link-text' href='" + object.SearchResult[0].ItemArray.Item[i].ViewItemURLForNaturalSearch + "' target='_blank'>" + object.SearchResult[0].ItemArray.Item[i].Title + "</a>" + "<div class='favorite'></div>" + "</div>" + "</div>");
  }
};

$("#supplies-button").on("click", function(event){
  $('#supplies-results').show();
  $('#recipes-results').hide();
  $('#costumes-results').hide();
  $('#music-results').hide();
  $('#games-results').hide();
});
$("#recipes-button").on("click", function(event){
  $('#supplies-results').hide();
  $('#recipes-results').show();
  $('#costumes-results').hide();
  $('#music-results').hide();
  $('#games-results').hide();
});
$("#costumes-button").on("click", function(event){
  $('#supplies-results').hide();
  $('#recipes-results').hide();
  $('#costumes-results').show();
  $('#music-results').hide();
  $('#games-results').hide();
});
$("#music-button").on("click", function(event){
  $('#supplies-results').hide();
  $('#recipes-results').hide();
  $('#costumes-results').hide();
  $('#music-results').show();
  $('#games-results').hide();
});
$("#games-button").on("click", function(event){
  $('#supplies-results').hide();
  $('#recipes-results').hide();
  $('#costumes-results').hide();
  $('#music-results').hide();
  $('#games-results').show();
});
