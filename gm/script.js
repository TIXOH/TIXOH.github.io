var coordinatsInput = document.querySelector('.coordinats-block__input');
var btn = document.querySelector('.coordinats-block__btn').addEventListener('click', codeAddress);
var geocoder;
var latlng;
var map;
var addresesList = [];
var list = document.querySelector('.controls-block__list');

function initMap() {
    var minsk = {lat: 53.54, lng: 27.34};
    map = new google.maps.Map(
        document.querySelector('#map'), {
            zoom: 8,
            center: minsk
        });
    geocoder = new google.maps.Geocoder();
    map.addListener('dblclick', e => setCoords(e.latLng));
}

function codeAddress() {
    geocoder.geocode({
        'location': latlng
    }, (results, status) => {
        addNewMarker(results);
        let result = results[0].formatted_address;
        addAdressInList(result);
        showAddresesList();
    });
}

function setCoords(latlen) {
    latlng = latlen;
    coordinatsInput.value = latlen;
}

function addNewMarker(results) {
    var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
    });
}

function addAdressInList(result) {
    addresesList.push(result);
}

function showAddresesList() {
    clearAddresesList();
    for (let address of addresesList) {
        var p = document.createElement('p');
        p.innerHTML = address;
        list.appendChild(p);
    }
}

function clearAddresesList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}