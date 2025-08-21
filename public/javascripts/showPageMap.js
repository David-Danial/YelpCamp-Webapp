const element = document.getElementById('campground-data');
const coords = element.dataset.coords.split(',').map(Number);
const title = element.dataset.title;
const place = element.dataset.location;

maptilersdk.config.apiKey = maptilerApiKey;
const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREET,
    center: coords,
    zoom: 10
});

new maptilersdk.Marker()
    .setLngLat(coords)
    .setPopup(new maptilersdk.Popup({ offset: 25 }).setHTML(`<h3>${title}</h3><p>${place}</p>`))
    .addTo(map);
