// array to hold search terms -- my topic is cities
gifArray = ["new york", "london", "hong kong", "tokyo", "istanbul", "barcelona", "rome", "nairobi"];

// function to create a button for each element of our array
function renderButtons() {

    // clear current list of buttons every time we call this function to avoid repeat buttons  
    $("#buttons-div").empty();

    for (let i = 0; i < gifArray.length; i++) {
        
        var butt = $("<button>");
        butt.addClass("city");
        butt.attr("data-name",gifArray[i]);
        butt.text(gifArray[i]);
        $("#buttons-div").append(butt);
    }
}

renderButtons();    