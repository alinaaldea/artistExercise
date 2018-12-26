var artistList = [];
function saveArtist(name, pob, dob, fav){
    var artist = {name:name, birthPlace: pob, dob:dob, favourite:fav}
    artistList.push(artist);
}