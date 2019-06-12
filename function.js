// array to hold search terms -- my topic is cities
gifArray = ["new york", "london", "hong kong", "tokyo", "istanbul", "barcelona", "rome", "nairobi"];

// function to create a button for each element of our array
function renderButtons() {

    // clear current list of buttons every time we call this function to avoid repeat buttons  
    $("#buttons-div").empty();

    for (let i = 0; i < gifArray.length; i++) {

        // dynamically create a new button for each element in the array
        var butt = $("<button>");
        // add class for the buttons so we can reference them later for our 'generateGif' functions later
        butt.addClass("city");
        // add a data attr for the button
        butt.attr("data-name", gifArray[i]);
        // give button text of user inout
        butt.text(gifArray[i]);
        // append new button to buttons-div
        $("#buttons-div").append(butt);
    }
}

//event listener for add-tag button
// takes user input and pushes it to the array, calling the renderButtons function again to create the new buttons
$("#add-tag").on("click", function (event) {
    event.preventDefault();

    var newGIF = $("#gif-input").val().trim();
    console.log(newGIF);

    gifArray.push(newGIF);

    renderButtons();
})

// function to generate gifs with AJAX - to be called when any button with a city class is clicked
function generateGifs() {

    // clear div holding gifs so they don't stack on top of each other
    // removing this will save eeach gif on the screen
    $("#gif-box").empty();

    //grab the city name from the button to add to querylink
    var city = $(this).attr("data-name");

    // our query URL with the city's tag added into the search parameter and a limit of 10 gi
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        city + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {
            // storing results of AJAX call into a variable for convenience
            var results = response.data;

            //for loop to dynamically create a div with an img tag for each gif in our respones
            for (let i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                // grabbing the 'rating' attribute for each gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);

                // getting a url for a fixed height version of each gif in an img tag
                var gif = $("<img>");
                gif.attr("src", results[i].images.fixed_height.url);

                // add the gif's 
                gifDiv.append(gif);
                gifDiv.append(gifRating);

                $("#gif-box").prepend(gifDiv);
            }
        })

}


// call renderButtons when page loads to load buttons for original array
renderButtons();

// need to refer to document's .city classes as "$(.city).on(click..." will only work for static buttons (default ones)
$(document).on("click", ".city", generateGifs);