$(document).ready(function() {
    // Getting references to the name input and other poll information
  
    var nameInput = $("#poll-name-input");
    var descriptionInput = $("#poll-description-input");
    // var passwordInput = $("#signuppassword-input");
    // var loginEmail= $("#email-input");
    // var loginPassword = $("#password-input");
  
    $(document).on("submit", ".submitPoll", function(event){
  
  // ------------------------------------------>>>
  
    // A function to handle what happens when the form is submitted to create a new poll
    // function handleUserFormSubmit(event) {
      event.preventDefault();
  
      // console.log($("#admin-checkbox").is(':checked'));
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim()) {
        return;
      }
  
      var pollData = {
        name: nameInput.val().trim(),
        description: descriptionInput.val().trim(),
        // password: passwordInput.val().trim(),
        // admin: adminStatus
      }

      // Calling the upsertPoll function and passing in the value of the name input
      upsertPoll(pollData);
      console.log(pollData);

      var optionData = {
        name: optionNameInput.val().trim(),
        vote: 0,
        Pollid: pollId
      }
    });
  
    // A function for creating a poll.
    function upsertPoll(userData) {
      $.post("/api/polls", userData)
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
    function upsertOption(optionData) {
      $.post("/api/options", )
        .then(function(response){
          console.log(response);
        });
    }
  
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