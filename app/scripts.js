$(document).ready(() => {
  var map, heatmap, coordinates;

  setTimeout((function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 40.42425, lng: -111.8878},
      mapTypeId: 'satellite'
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: coordinates,
      map: map
    })

  }), 500)

  let paramId;
  let getPoints = (id) => {
    (id === undefined) ? id = 4 : id = id;
    switch (id) {
      case '4':
        document.getElementById('dataType').innerHTML = 'Coins'
        break;
      case '5':
        document.getElementById('dataType').innerHTML = 'Keys'
        break;
      case '637':
        document.getElementById('dataType').innerHTML = 'Cinemark Prizes'
        break;
    }
    jQuery.ajax(`https://staging.seek.fit/api/challenge/?loot_type=${id}`).done((response) => {
      coordinates = response.features[0].geometry.coordinates.map((cord, ind) => {
        return {location: (new google.maps.LatLng(cord[1], cord[0])), weight: 1000}
      });

    })
  }
  getPoints($('#rewardsSelect').val());
  $(`#rewardsForm`).submit(() => {

    getPoints($('#rewardsSelect').val())
    heatmap.setMap(null);
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: coordinates,
      map: map
    })
    return false;
  })
})
