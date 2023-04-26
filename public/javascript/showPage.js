mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [72.821014404, 19.044458389],
  zoom: 12,
  projection: "globe",
});
map.on("style.load", () => {
  map.setFog({});
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat([72.821014404, 19.044458389])
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>Art Mart</h3> <p>Art Mart, Bandstand Promenade, Mount Mary, Bandra West, Mumbai,
          Maharashtra 400050</p>`
    )
  )
  .addTo(map);
