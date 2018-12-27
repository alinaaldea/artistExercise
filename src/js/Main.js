var connection = new WebSocket("ws://127.0.0.1:3000");

connection.onopen = function() {
  // connection is opened and ready to use
  console.log("client connected");
};

connection.onerror = function(error) {
  // an error occurred when sending/receiving data
  console.log("Error: " + error);
};

connection.onmessage = function(message) {
  // try to decode json (I assume that each message
  // from server is json)
  try {
    var json = JSON.parse(message.data);
  } catch (e) {
    console.log("This doesn't look like a valid JSON: ", message.data);
    return;
  }
  // handle incoming message
};

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
  if (name && birthPlace && dob) {
    //send request to backend to save artist
    saveArtist(name, birthPlace, dob, favourite);
    showArtist();
  }
}
//retrieve list of artists and show in table
function showArtist() {
  if (artistList !== null) {
    var html =
      "<table id='artistTable'><tr><th>ID</th><th>Name</th><th>Place of Birth</th><th>Date of Birth</th><th>Favorite</th></tr>";
    var counter = 0;
    artistList.forEach(function(artist) {
      counter++;
      html +=
        "<tr><td>" +
        counter +
        "</td><td>" +
        artist.name +
        "</td><td>" +
        artist.birthPlace +
        "</td><td>" +
        artist.dob +
        "</td><td>" +
        artist.favourite +
        "</td></tr>";
    });
    html += "</table>";
    $("#artList")
      .empty()
      .append(html);
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
