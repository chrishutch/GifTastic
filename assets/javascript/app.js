$(document).ready(function() {
	var universe = ["Earth", "Sun", "Pluto", "Comet"];

     function renderButtons() {

        // Deleting the universe buttons prior to adding new universe buttons
        $("#buttons-view").empty();

        // Looping through the array of universe
        for (var i = 0; i < universe.length; i++) {

          // Then dynamicaly generating buttons for each universe in the array.
          var a = $("<button>");
          // Adding a class
          a.addClass("universe");
          // Adding a data-attribute with a value of the universe at index i
          a.attr("data-name", universe[i]);
          a.addClass('btn btn-dark');
          // Providing the button's text with a value of the universe at index i
          a.text(universe[i]);
          // Adds the button to the HTML
          $("#buttons-view").append(a);
        }
      }
	renderButtons();

      // This function handles events where one button is clicked
      $("#find-space").on("click", function(event) {
        event.preventDefault();

        // This line will grab the text from the input box
        var space = $("#space-input").val().trim();

        // The spaceItem from the textbox is then added to our array
        universe.push(space);

        // Add new button to array
        renderButtons();
      });

      // Event listener for all button elements
    $("#buttons-view").on("click", "button", function() {
    	event.preventDefault();

      //Empties the images before displaying new GIFs
    	$("#images").empty();

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

              // Gives the image tag an src attribute of a proprty pulled off the
              // Still Image
              universeImage.attr("src", results[i].images.fixed_height_still.url);
              // Animated Image
              universeImage.attr('animated', results[i].images.fixed_height.url);

              // Appending the paragraph and universeImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(universeImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#images").prepend(gifDiv);
            }
          };
      });
  });  
    //Click on GIFs to change from still to animated
      $("#images").on("click", "img", function() {
        var m = $(this).attr('src');
        $(this).attr('src', $(this).attr('animated'));
        $(this).attr('animated', m);

      });  
});