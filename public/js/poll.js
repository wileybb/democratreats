$(document).ready(function() {
  console.log("CHICKEN")


  // Getting references to the name input and other poll information
  var currentPollId = 0

  var nameInput = $("#poll-name-input");
  var descriptionInput = $("#poll-description-input");

  var options = [];
  // var passwordInput = $("#signuppassword-input");
  // var loginEmail= $("#email-input");
  // var loginPassword = $("#password-input");
  
  $(document).on("click", ".poll-submit", function(event){
  
  
  // A function to handle what happens when the form is submitted to create a new poll
  // function handleUserFormSubmit(event) {
    event.preventDefault();
    console.log("HERE");
  // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim()) {
      return;
    }
  
    var pollData = {
      name: nameInput.val().trim(),
      description: descriptionInput.val(),
  
    }

     upsertPoll(pollData);


      // Calling the upsertPoll and upserOption function and passing in the values from the inputs
  
    // upsertOption(options);
    console.log(pollData);



    });
  
  // A function for creating a POLL that also adds the options.
    function upsertPoll(userData) {
      $.post("/api/polls", userData)
        .then(function(response){
          console.log("Here, " + response.id + " this is the response your are looking for")
          currentPollId = response.id;
          console.log(currentPollId +" right here buddy");

          for(var i=0; i<options.length; i++){
            var optionData = {
              name: options[i],
              PollId: currentPollId
            }
            console.log(currentPollId+ " is the current poll id");
            upsertOption(optionData);
            console.log("the name of the option is "+options[i]);
          };

          // nameInput.val("");
          // emailInput.val(""),
          // passwordInput.val(""),
          // $(".inline-checkbox").prop('checked', false)
          // $("#email-input").val("");
          // $("#password-input").val("");
        });
    }
    // A function for creating OPTIONs
    function upsertOption(optionData1) {
      $.post("/api/options", optionData1)
        .then(function(response){
          console.log(response)
          // nameInput.val("");
          // emailInput.val(""),
          // passwordInput.val(""),
          // $(".inline-checkbox").prop('checked', false)
          // $("#email-input").val("");
          // $("#password-input").val("");
        });
    }
    // function upsertOption(optionData) {
    //   $.post("/api/options", )
    //     .then(function(response){
    //       console.log(response);
    //     });
    // }
  
//------ ADDING OPTIONS---------------------
    $(".submit-option").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var option = $("#option-input").val().trim();

      // Adding movie from the textbox to our array
      options.push(option);

      // Calling renderButtons which handles the processing of our movie array
      renderOptions();
    });


  function renderOptions() {
    $("#options-area").empty();

    for(var i=0; i<options.length; i++){
        console.log(options[i]);
      
        var a = $("<button>");
    
          // Adding a class
          a.addClass("btn option-button");
          // Adding a data-attribute with a value of the animal at index i
          a.attr("data-name", options[i]);
          // Providing the button's text with a value of the animal at index i
          a.text((i+1) + ". " + options[i]);
          // Adding the button to the HTML
          $("#options-area").append(a);
     
    };
};

    // function loginUser(userData) {
    //   $.post("/api/users", userData)
    //     .then(function(response){
    //       nameInput.val("");
    //       emailInput.val(""),
    //       passwordInput.val(""),
    //       adminStatus.$(".inline-checkbox").is(":unchecked")
    //       $("#email-input").val("");
    //       $("#password-input").val("");
    //     });
    // }
  
  // });
  // $(document).on("submit", ".login", function(event){
  //   event.preventDefault();
    
  //   if (!loginEmail.val().trim()) {
  //     return;
  //   }
  //   var loginEmail= $("#email-input");
  //   var loginPassword = $("#password-input");
  
  //   // var userData = {
  //   //   name: nameInput.val().trim(),
  //   //   email: emailInput.val().trim(),
  //   //   password: passwordInput.val().trim(),
  //   //   admin: adminStatus
  //   // }
  //   // // Calling the upsertUser function and passing in the value of the name input
  //   // upsertUser(userData);
  //   // console.log(userData);
  //   // loginUser(userData);
  // });
  
  });