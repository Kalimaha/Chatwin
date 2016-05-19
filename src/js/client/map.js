/*global Template, Router, Meteor, Session */
(function () {

    Template.map_page.events({
        'click #back_button': function () {
            Router.go('events');
        }
    });

    Template.map_page.rendered = function () {
        var map,
            tot_lat = 0,
            tot_lon = 0,
            i,
            group,
            marker,
            markers = [];
        for (i = 0; i < this.data.event.activities.length; i += 1) {
            tot_lat += this.data.event.activities[i].place.lat;
            tot_lon += this.data.event.activities[i].place.lon;
        }
        lat = tot_lat / this.data.event.activities.length;
        lon = tot_lon / this.data.event.activities.length;
        map = L.map(this.data.event_id + '_map').setView([lat, lon], 12),
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                maxZoom: 18,
                id: 'kalimaha.p2pi707h',
                accessToken: 'pk.eyJ1Ijoia2FsaW1haGEiLCJhIjoiY2lmOXg0YXphMDA0NnRubHl5Nm9kajR6NiJ9.MOOriusg8DIuW4tFSmBQCA'
        }).addTo(map);
        L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images';
        for (i = 0; i < this.data.event.activities.length; i += 1) {
            marker = L.marker([this.data.event.activities[i].place.lat, this.data.event.activities[i].place.lon]).addTo(map).bindPopup(this.data.event.activities[i].place.name);
            markers.push(marker);
        }
        group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds());
    };

}());
