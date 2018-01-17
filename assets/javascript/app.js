$(document).ready(function() {
	var universe = ["Earth", "The Sun", "Pluto", "Comet"];

     function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < universe.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("universe");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", universe[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(universe[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      }
	renderButtons();
      // This function handles events where one button is clicked
      $("#find-space").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var space = $("#space-input").val().trim();
        // The space from the textbox is then added to our array
        universe.push(space);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Event listener for all button elements
    $("button").on("click", function() {
    	$("#images").empty();
    	console.log("clicked");
      // In this case, the "this" keyword refers to the button that was clicked
      var spaceItem = $(this).attr("data-name");

      // Constructing a URL to search Giphy for the name of the spaceItem who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        spaceItem + "&api_key=I32uOeRAqgxPQtXyiKnpvRdaPmaPuaD7&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var universeImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              universeImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and universeImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(universeImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#images").prepend(gifDiv);
            }
          };
      });
  });    
});