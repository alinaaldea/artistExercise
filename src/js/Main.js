
var artistList = [];
function ajaxCall(endPoint, data) {
  //ENDPOINT SPECIFIED TO WHICH FUNCTION IN BACKEND THIS AJAX CALL IS MEANT FOR, EX: FOR addArtist function end point is /addArtist
  fetch(endPoint, {
    method: "POST",
    path: "./app.js",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      mode: "cors"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    })
    .then(response => {
      //LOG THE RESPONSE AND SHOW THE LIST OF ARTIST SENT FROM BACKEND
      //CONCAT EXISTING LIST WITH NEW LIST & FILTER DUPLICATION
      if(endPoint === "/addArtist"){
        artistList = artistList.concat(response)
      } else {
         artistList = response
      }
      console.log(artistList);
      showArtist(artistList);
    });
}


function addArtist() {
  var name = $("#name")
    .val()
    .trim();
  var birthPlace = $("#birth_place")
    .val()
    .trim();
  var dob = $("#dob")
    .val()
    .trim();
  var favourite;
  if ($("#favourite").is(":checked")) {
    favourite = true;
  } else {
    favourite = false;
  }
  var id;
  //CHECK IF ANY ARTIST EXIST, AND SET ID TO THE HIGHEST EXISTING ID + 1
  if(artistList.length>1){
    id = parseInt(artistList[artistList.length-1]._id)+1;
    console.log(id)
  }else{
    id = 0;
    console.log(id)
  }
  if (name && birthPlace && dob) {
    //store the artist in the local list
    var artist = {
      _id:id,
      name: name,
      birthPlace: birthPlace,
      dob: dob,
      favourite: favourite
    };
    ajaxCall("/addArtist", artist);
    console.log("message sent to the server");
  }
}

//retrieve list of artists and show in table
function showArtist(artistListRes) {
  if (artistListRes) {
    var html =
      "<table id='artistTable'><tr><th>ID</th><th>Name</th><th>Place of Birth</th><th>Date of Birth</th><th>Favorite</th></tr>";

    artistListRes.forEach(function(artist) {
      html +=
        "<tr><td>" +
        artist._id +
        "</td><td>" +
        artist.name +
        "</td><td>" +
        artist.placeOfBirth +
        "</td><td>" +
        artist.dateOfBirth +
        "</td><td>" +
        artist.status +
        "</td></tr>";
    });
    html += "</table>";
    $("#artList").empty().append(html);
  }
}

function searchArtist() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("artistTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function deleteById() {
  var id = parseInt(document.getElementById("deleteInput").value, 10);
  //send this is to the server and fetch the new list
}


$(document).ready(function() {
  console.log("Get existing artists from db");
  ajaxCall("/uploadArtists");
});
