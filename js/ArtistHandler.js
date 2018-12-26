var list = [];

$(document).ready(function() {
  $("#add").on("click", function() {
    if (filledForm()) {
      var obj = {};
      obj.name = document.getElementById("inputName").value;
      obj.birthPlace = $("#birthPlace").val();
      var date = document.getElementById("birthDate").value;
      obj.birthDate = date;
      obj.checkBox = $("#checkBox:checked").val();
      console.log(obj);

      list.push(obj);
      console.log("you clicked on Add button");
      displayTable();
    }
  });
});

function filledForm() {
  var name = $("#inputName").val();
  var birthPlace = $("#birthPlace").val();
  var birthDate = document.getElementById("birthDate").value;
  var checkBox = $("#checkBox:checked").val();
  if (!name && !birthPlace && !birthDate && !checkBox) {
    return false;
  }
  return true;
}
