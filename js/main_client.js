function displayTable() {
  //   var tableContent = document.getElementById("table-content");
  $("#table-content tbody").remove();
  for (var i = 0; i < list.length; i++) {
    $("#table-content").append(
      createRow(
        i + 1,
        list[i].name,
        list[i].birthPlace,
        list[i].birthDate,
        list[i].checkBox
      )
    );
  }
}

function createRow(id, name, place, date, checkBox) {
  var myCheck = checkBox ? true : false;
  console.log(myCheck);
  if (myCheck) {
    // because there are no values for the "checked" attribute to set it to false
    return `<tr><td> ${id} </td><td> ${name}</td><td> ${place} </td><td> ${date} </td><td><input type="checkbox" checked </td></tr>`;
  } else
    return `<tr><td> ${id} </td><td> ${name}</td><td> ${place} </td><td> ${date} </td><td><input type="checkbox"</td></tr>`;
}

function searchName() {
  var filter = document.getElementById("searchString").value.toUpperCase();
  console.log(filter);
  var tr = document.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
