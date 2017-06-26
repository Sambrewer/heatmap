$(document).ready(() => {
  var map, heatmap, coordinates;

  setTimeout((function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 40.42425, lng: -111.8878},
      mapTypeId: 'satellite'
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
      data:coordinates,
      map: map
    });
    return false;
  }), 300)

  let paramId;
  let getPoints = (id) => {
    console.log(id);
    jQuery.ajax(`https://staging.seek.fit/api/challenge/?loot_type=${id}`).done((response) => {
      coordinates = response.features[0].geometry.coordinates.map((cord, ind) => {
        return {location: (new google.maps.LatLng(cord[1], cord[0])), weight: 3}
      });
    })
  }
  getPoints($('#rewardsSelect').val());
  $(`#rewardsForm`).submit(() => {
    getPoints($('#rewardsSelect').val())
    initMap();
    return false;
  })
})
