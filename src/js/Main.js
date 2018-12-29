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
      showArtist(response, endPoint);
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
  if (artistList.length >= 1) {
    id = parseInt(artistList[artistList.length - 1]._id) + 1;
  } else {
    id = 0;
  }
  if (name && birthPlace && dob) {
    //store the artist in the local list
    var artist = {
      _id: id,
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
function showArtist(artistListRes, endPoint) {
  if (artistListRes) {
    if(endPoint==="/uploadArtists"|| endPoint ==="/deleteArtist"){
      artistList = artistListRes;
      console.log(artistList)
      var html =
      "<table id='artistTable'><tr><th>ID</th><th>Name</th><th>Place of Birth</th><th>Date of Birth</th><th>Favorite</th></tr>";

      artistList.forEach(function(artist) {
        html += putIntoRow(artist);
      });
      html += "</table>";
      $("#artList").empty().append(html);
    } 
    else if(endPoint ==="/addArtist"){
      console.log(artistListRes);
      var newArtist = artistListRes.pop();
      console.log(newArtist)
      artistList.push(newArtist);
      console.log(artistList)
      html = putIntoRow(newArtist);
      console.log(html)
      $("#artistTable tr:last").after(html);
      
    } else if(endPoint === "/getArtist" ){
      var foundArtist = artistListRes;
      var html =
      "<table id='artistTable'><tr><th>ID</th><th>Name</th><th>Place of Birth</th><th>Date of Birth</th><th>Favorite</th></tr>";
      html += putIntoRow(foundArtist);
      html += "</table>";
      $("#artList").empty().append(html);
    }
    
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
  var id = document.getElementById("deleteInput").value;
  console.log("Artist with id should be removed: " +  id);
  //send this is to the server and fetch the new list
  $.ajax({
    url: "http://localhost:3000/artists/delete/"+id ,
    type: 'DELETE',
    headers: {"Id": id},
    success: function(){
      $("#"+ id).remove();
    },
  });
  }
function findById(){
  var id = document.getElementById("myInput").value
  if(id){
    id =  "/" + id;
    fetchAPI("/getArtist", id);
  }
 
}
function reset(){
  $("#myInput").innerHTML().empty();
  fetchAPI("/uploadArtists")
}
function putIntoRow(artist){
  var html = "";
  if(artist){
    html +=
          "<tr id=" + artist._id + "><td>" +
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
  }
  return html;

}
function fetchAPI(endPoint, urlTxt){
  if(urlTxt){
    var url ="http://localhost:3000/artists" + endPoint + urlTxt
  } else {
    var url ="http://localhost:3000/artists"
  }

  fetch(url).then(response => {
    if(response){
      return response.json();
    }else {
      throw new TypeError("Oops, we haven't got JSON!");
    }
  }).then(response => {
    showArtist(response, endPoint)
  })
}
$(document).ready(function() {
  console.log("Get existing artists from db");
  fetchAPI("/uploadArtists");
});
