$(document).ready(function () {

  // Poll Button
  $("#option3").on("click", function () {
    event.preventDefault();
    $("#content-div").empty();
    // show "Create New" button
    $("#poll-toolbar").removeClass("hidden");
    // hide member toolbar
    $("#member-toolbar").addClass("hidden");
    hideMemberForm();
    $.get("/api/poll").then(function (response) {
      console.log(response);
      var pollToAdd = [];
      if (response.length <= 1) {
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        // card-header
        newPostCardHeading.addClass("card-body");
        var newPostTitle = $("<h3>");
        newPostTitle.text("Currently No Polls Available");
        // append card-header 
        newPostCardHeading.append(newPostTitle);
        newPostCard.append(newPostCardHeading);
        $("#content-div").append(newPostCard);
      } else {

        for (let i = 0; i < response.length - 1; i++) {
          var htmlPoll = $("<div>");
          //htmlPoll.addClass("example");
          // Adding a data-attribute
          //htmlPoll.attr("data-name", response[i].id);
          // Providing the initial button text
          htmlPoll.text(response[i].name);
          pollToAdd.push(createNewRow(response[i]));
        }
      }
      $("#content-div").append(pollToAdd);
    });

  });

  // on click "Create New", show form
  $("#poll-form-btn").on("click", function () {
    if ($("#poll-form").hasClass("hidden")) {
      $("#poll-form").removeClass("hidden");
    } else {
      $("#poll-form").addClass("hidden");
    }
  });

  // on click "Create New", show form
  $("#member-form-btn").on("click", function () {
    if ($("#member-form").hasClass("hidden")) {
      $("#member-form").removeClass("hidden");
    } else {
      $("#member-form").addClass("hidden");
    }
  });

  function createNewRow(poll) {
    var formattedDate = new Date(poll.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    // card-header
    newPostCardHeading.addClass("card-header");
    // delete button
    var deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn.addClass("delete btn btn-danger ml-1");
    deleteBtn.attr("data-value", poll.id);
    // edit button
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-success");
    editBtn.attr("data-value", poll.id);
    // header-button container
    var headerBtn = $("<div>");
    headerBtn.addClass("float-right")
    headerBtn.append(editBtn, deleteBtn);
    var newPostTitle = $("<h3>");
    var newPostDate = $("<small>");
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");

    var newPostOption = $("<p>");
    newPostTitle.text(poll.name + " ");
    newPostBody.text(poll.description);
    newPostDate.text(formattedDate);
    for (let i = 0; i <= 3; i++) {
      var optionBtn = $("<button>");
      optionBtn.text(poll.Options[i].name);
      optionBtn.addClass("option1 btn btn-light btn-lg btn-block");
      optionBtn.attr("data-value", poll.Options[i].id);
      newPostOption.append(optionBtn);

    }
    newPostBody.append(newPostOption);
    newPostTitle.append(newPostDate);
    // append card-header buttons
    newPostCardHeading.append(headerBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", poll);
    // adds styles margin to card
    newPostCard.addClass("mb-3")
    return newPostCard;
  }

  // Vote Results results button ============================================================
  $("#option1").on("click", function () {
    event.preventDefault();
    $("#content-div").empty();
    // Hides Form Creation
    hidePollForm();
    hideMemberForm();
    $("#poll-toolbar").addClass("hidden");
    $("#member-toolbar").addClass("hidden");
    $.get("/api/votes").then(function (results) {
      console.log(results);
      var maxResponse = results.length;
      //var pollResults = [];
      if (results.length <= 1) {
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        // card-header
        newPostCardHeading.addClass("card-body");
        var newPostTitle = $("<h3>");
        newPostTitle.text("Currently No Polls Available");
        // append card-header 
        newPostCardHeading.append(newPostTitle);
        newPostCard.append(newPostCardHeading);
        newPostCard.addClass("mt-3")

        $("#content-div").append(newPostCard);
      } else {
        //This is good at least
        for (var i = 0; i < results.length; i = i + 4) {
          var newPostCard = $("<div>");
          newPostCard.addClass("card");
          newPostCard.addClass("iteration")
          var newPostCardHeading = $("<h3>");
          // card-header
          newPostCardHeading.addClass("card-header");
          newPostCard.addClass("mb-3")
          // var newPostTitle = $("<h3>");
          newPostCardHeading.text(results[i].PollName);
          newPostCard.append(newPostCardHeading);
          var ul = $("<div class = 'row'>");
          ul.addClass("card-body");
          // ul.addClass("span4");
          for (var j = i; j <= i + 3; j++) {
            var li = $(`<button class ='col-md-8'>${results[j].OptionName}</button><button class ='col-md-4' ><strong>Vote: ${results[j].Count}</strong></button><br />`);
            ul.append(li)
          }
          newPostCard.append(ul);
          newPostCard.addClass("mt-3")

          $("#content-div").append(newPostCard);
        }  // For Loop End
      }  // else loop end
    });
  });//Vote Results Function End


  // members button =============================================================================
  $("#option2").on("click", function (event) {
    event.preventDefault();
    $("#content-div").empty();
    // Hides Poll Form Creation
    hidePollForm();
    hideMemberForm();
    // show "Create New" button
    $("#member-toolbar").removeClass("hidden");

    $.get("/api/user").then(function (response) {
      // console.log(response);
      var userToAdd = [];
      //window.location.href = "/employee";
      for (let i = 0; i < response.length; i++) {
        var htmlPoll = $("<div>");
        htmlPoll.addClass("example");
        // Adding a data-attribute
        //htmlPoll.attr("data-name", response[i].id);
        // Providing the initial button text
        htmlPoll.text(response[i].name);

        userToAdd.push(createNewRowMember(response[i]));
      }
      $("#content-div").append(userToAdd);
    });
  });

  function createNewRowMember(user) {
    var formattedDate = new Date(user.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    // card-header
    newPostCardHeading.addClass("card-header");
    var newPostTitle = $("<h3>");
    var newPostDate = $("<p>");
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    var newPostOption = $("<p>");
    newPostTitle.text(user.name);
    newPostBody.text("Email: " + user.email);
    newPostDate.text("Join Date: " + formattedDate);
    newPostBody.append(newPostOption);
    newPostBody.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    // newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", user);
    // adds styles margin to card
    newPostCard.addClass("mb-3")
    return newPostCard;
  }

  // requests button =============================================================================
  $("#option5").on("click", function (event) {
    event.preventDefault();
    $("#content-div").empty();
    // Hides Poll Form Creation
    hidePollForm();
    hideMemberForm();
    $.get("/api/request").then(function (response) {
      console.log(response);
      var pollToAdd = [];
      if (response.length === 0) {
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        // card-header
        newPostCardHeading.addClass("card-body");
        var newPostTitle = $("<h3>");
        newPostTitle.text("There are currently no pending requests.");
        // append card-header 
        newPostCardHeading.append(newPostTitle);
        newPostCard.append(newPostCardHeading);
        newPostCard.addClass("mt-3")
        $("#content-div").append(newPostCard);
      }
      //window.location.href = "/employee";
      for (let i = 0; i < response.length; i++) {
        var htmlPoll = $("<div>");
        htmlPoll.addClass("example");
        htmlPoll.text(response[i].name);
        pollToAdd.push(createNewRequest(response[i]));
      }
      $("#content-div").append(pollToAdd);
    })
  });  //option 5 end 

  function createNewRequest(poll) {
    var formattedDate = new Date(poll.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    // card-header
    newPostCardHeading.addClass("card-header");
    // delete button
    var deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn.addClass("deleteRequest float-right btn btn-danger");
    deleteBtn.attr("data-value", poll.id);
    // header-button container
    var headerBtn = $("<div>");
    headerBtn.addClass("float-right")
    headerBtn.append(deleteBtn);
    var newPostTitle = $("<h4>");
    var newPostDate = $("<small>");
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(poll.name + " ");
    newPostBody.text(poll.description);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    // append card-header buttons
    newPostCardHeading.append(headerBtn);
    newPostCardHeading.append(newPostTitle);
    // newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", poll);
    // adds styles margin to card
    newPostCard.addClass("mt-3")
    return newPostCard;
  }

  //Delete Requests Function Handling 
  $(document).on("click", "button.deleteRequest", handleRequestDelete);
  function handleRequestDelete() {
    var requestDelete = $(this).data('value');
    console.log("delete " + requestDelete);
    deleteRequest(requestDelete);
  }
  function deleteRequest(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/request/" + id
    })
      .then(function (response) {
        console.log(response);
        $("#content-div").empty();
        $.get("/api/request").then(function (response) {
          console.log(response);
          var pollToAdd = [];
          if (response.length === 0) {
            alert("Currently, Dont have any Poll");
          }
          //window.location.href = "/employee";
          for (let i = 0; i < response.length; i++) {
            var htmlPoll = $("<div>");
            htmlPoll.addClass("example");
            htmlPoll.text(response[i].name);
            pollToAdd.push(createNewRequest(response[i]));
          }
          $("#content-div").append(pollToAdd);
        })
      });
  }

  //Delete Poll Function Handling 
  $(document).on("click", "button.delete", handlePollDelete);
  function hidePollForm() {
    if (!$("#poll-toolbar").hasClass("hidden")) {
      $("#poll-toolbar").addClass("hidden");

      if (!$("#poll-form").hasClass("hidden")) {
        $("#poll-form").addClass("hidden");
      };
    };
  };

  function hideMemberForm() {
    if (!$("#member-toolbar").hasClass("hidden")) {
      $("#member-toolbar").addClass("hidden");

      if (!$("#member-form").hasClass("hidden")) {
        $("#member-form").addClass("hidden");
      };
    };
  };

  function handlePollDelete() {
    var currentPoll = $(this).data('value');
    deletePoll(currentPoll);
  }
  function deletePoll(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/poll/" + id
    })
      .then(function (response) {
        $("#content-div").empty();
        $.get("/api/poll").then(function (response) {
          console.log(response);
          var pollToAdd = [];
          //window.location.href = "/employee";
          for (let i = 0; i < response.length; i++) {
            var editPoll = $("<div>");
            editPoll.addClass("example");
            // Adding a data-attribute
            //htmlPoll.attr("data-name", response[i].id);
            // Providing the initial button text
            editPoll.text(response[i].name);
            pollToAdd.push(createNewRow(response[i]));
          }
          $("#content-div").append(pollToAdd);
        });
      });
  }

  //Edit POll Request Handling 
  $(document).on("click", "button.edit", handlePollEdit);
  function handlePollEdit() {
    var editPollId = $(this).data('value');
    editPoll(editPollId);
  }

  function editPoll(id) {
    $.ajax({
      method: "POST",
      url: "/api/edit/" + id
    })
      .then(function (response) {
        var pollToEdit = []
        $("#content-div").empty();
        //window.location.href= "/admin"
        //window.location.href = "/home"
        var htmlPoll = $("<div>");
        htmlPoll.attr(contenteditable = "true");
        htmlPoll.text(response.name);
        pollToEdit.push(editNewRow(response));
        $("#content-div").append(pollToEdit);
      });
  }
});

function editNewRow(poll) {
  var newPostEdit = $("<div>");
  newPostEdit.addClass("card");
  var newPostEditHeading = $("<div>");
  newPostEditHeading.addClass("card-header");
  newPostEditHeading.attr('contentEditable', 'true');
  var editPostBtn = $("<button>");
  editPostBtn.text("EDIT");
  editPostBtn.addClass("editpoll btn btn-info");
  editPostBtn.attr("data-value", poll.id);
  var editPostTitle = $("<h3 id='title'>");
  var newPostEditBody = $("<div>");
  newPostEditBody.addClass("card-body cardEdit");
  var newPostEditBody = $("<p id='story'>");
  newPostEditBody.attr('contentEditable', 'true');
  editPostBtn.attr('contentEditable', 'false');
  editPostTitle.text(poll.name + " ");
  newPostEditBody.text(poll.description);
  newPostEditBody.append(editPostBtn);
  newPostEditHeading.append(editPostTitle);
  // newPostCardHeading.append(newPostAuthor);
  newPostEditBody.append(newPostEditBody);
  newPostEdit.append(newPostEditHeading);
  newPostEdit.append(newPostEditBody);
  newPostEdit.data("post", poll);
  return newPostEdit;
}

$(document).on("click", "button.editpoll", function (event) {
  event.preventDefault();
  var editPollId = $(this).data('value');
  var title = $('#title').text();
  var story = $('#story').text();
  var updateData = {
    id: editPollId,
    name: title,
    description: story
  }
  updatePoll(updateData)
  //console.log(""+ editPollId + title + story);
});


function updatePoll(updatedPollData) {
  $.ajax({
    method: "PUT",
    url: "/api/update",
    data: updatedPollData
  })
    .then(function () {
      //console.log(response);
      window.location.href = "/home";
    });
}

