var map = L.map("map", {
  center: [48.01561770396694, 37.79100364189952],
  zoom: 12,
  minZoom: 10,
  maxZoom: 18,
  zoomControl: false,
});
L.control
  .zoom({
    position: "bottomright",
  })
  .addTo(map);

// Add the OpenStreetMap tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// Fetch the JSON data and add markers to the map. Change URL in production.
fetch("http://localhost:3000/events")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // create an object to store all the layer groups
    const layers = {
      Barriers: L.layerGroup(),
      Houses: L.layerGroup(),
      Warnings: L.layerGroup(),
      Hospitals: L.layerGroup(),
    };

    // loop through the JSON data and create a marker for each location
    data.forEach((event) => {
      // create a marker with a custom icon based on the event's type
      const icon = L.icon({
        iconUrl: `icons/${event.type}.png`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      // create a popup with the name and location information
      const popupContent = `
      <b>${event.name}</b><br>
      ${event.location}
    `;

      // create a marker with the icon and popup
      const marker = L.marker([event.latitude, event.longitude], {
        icon,
      }).bindPopup(popupContent, { offset: [0, -20] });

      // add the marker to the corresponding category group
      if (event.type === 1) {
        layers["Barriers"].addLayer(marker);
      } else if (event.type === 2) {
        layers["Houses"].addLayer(marker);
      } else if (event.type === 3) {
        layers["Warnings"].addLayer(marker);
      } else if (event.type === 4) {
        layers["Hospitals"].addLayer(marker);
      }
    });

    // add the layer groups to the map as overlays
    for (const [name, layer] of Object.entries(layers)) {
      layer.addTo(map);
    }

    // add the layers control to the map
    L.control.layers(null, layers).addTo(map);
  })
  .catch((error) => console.error(error));
