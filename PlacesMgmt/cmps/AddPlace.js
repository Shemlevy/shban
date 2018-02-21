'use strict';
// import PlaceServices from '../services/PlaceService.js'

export default {
    template: `
    <section>
        <div v-if="sideBar"  v-on:blur="sideBar = !sideBar" class="side-bar">
            <h1>{{searchPosition}}</h1>
            <p>choose icon to describe the place</p>
            <div class="icon-places">
                <label v-for="(item,idx) in 4" :for="idx"> 
                    <input class="label-ico" type="checkBox" @click="pickedPlace" :id="idx">
                    <i :class="icons.img[idx]"  :title="icons.title[idx]" aria-hidden="true"></i>
                </label>
            </div>
            <input v-model="placeTitle" class="input-place" placeholder="Title For The Place"  type="text">
            <textarea v-model="placeInfo" class="input-place" placeholder="Describe this place" rows="5"  type="text"></textarea>
            <div class="picked-info">
                <i :class="pickedIco"  :title="pickedPlaceInfo" aria-hidden="true"></i>
                <p>{{pickedPlaceInfo}}</p>
            </div>
            <section class="save-btns">
                <label for="btn-save-input">
                    <i  class="material-icons add-photo">add_a_photo</i>
                </label>
                <input type="file" id="btn-save-input"></input>
                <button @click="savePlace" class="btn-save">Save Place</button>
            </section>  
        </div>
    </section>
    `,
    name: 'google-map',
    props: ['name'],
    data: function () {
        return {
            icons: {
                img: ['fa fa-cutlery ico-places', 'fa fa-briefcase ico-places', 'fa fa-map-marker ico-places', 'fa fa-heartbeat ico-places'],
                title: ['Great Place To Eat', 'Good Job', 'A Place To Remember', 'I Wanna FunFunFun']
            },
            mapName: this.name + "-map",
            markerCoordinates: [{
                latitude: -6.1607908,
                longitude: 39.1886614,
                placeName: this.searchPosition,
                icoUrl: 'PlacesMgmt/ico/fun.png',
                catagory: this.pickedPlaceInfo,
                title: `Zanzibar`,
                info: `Need to go`,
                img: this.img,
            }, {
                latitude: 21.521757,
                longitude: -77.781167,
                placeName: this.searchPosition,
                icoUrl: 'PlacesMgmt/ico/work.png',
                catagory: this.pickedPlaceInfo,
                title: `Cuba`,
                info: 'Look for a job there',
                img: this.img,
            }, {
                latitude: 36.1662204,
                longitude: -95.99042689999999,
                placeName: this.searchPosition,
                icoUrl: 'PlacesMgmt/ico/place.png',
                catagory: this.pickedPlaceInfo,
                title: 'Philipense',
                info: 'After Zanzibar',
                img: this.img,
            }, {
                latitude: 32.0555229,
                longitude: 34.76106,
                placeName: this.searchPosition,
                icoUrl: 'PlacesMgmt/ico/food.png',
                catagory: this.pickedPlaceInfo,
                title: 'Tel-Aviv',
                info: 'Good place to eat',
                img: this.img,
            },
            ],

            map: null,
            bounds: null,
            markers: [],
            searchBox: null,
            searchLocation: {
                latitude: 51.501527,
                longitude: -0.1921837
            },
            sideBar: false,
            searchPosition: null,
            pickedPlaceInfo: null,
            pickedIco: null,
            placeTitle: null,
            placeInfo: null,




        }
    },
    methods: {
        getGeoByAddress(e) {
            e.preventDefault();
            console.log('e', e);
            this.searchPosition = e.target.value
            var get = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.searchPosition}&key=AIzaSyBMPwmpKGkNozJfQ2zrVZdvlvJDv7QsZrM`)
                .then(res => {
                    var lat = res.data.results[0].geometry.location.lat;
                    var lng = res.data.results[0].geometry.location.lng;
                    this.searchLocation.latitude = lat
                    this.searchLocation.longitude = lng

                    this.map.setZoom(17)
                    this.map.panTo(new google.maps.LatLng(lat, lng));
                    this.showAddress(lat, lng)
                    const position = new google.maps.LatLng(lat, lng);
                    var markerIcon = {
                        url: 'https://raw.githubusercontent.com/google/material-design-icons/master/maps/drawable-xxxhdpi/ic_place_black_48dp.png',
                        scaledSize: new google.maps.Size(50, 50),
                        origin: new google.maps.Point(0, 0), // used if icon is a part of sprite, indicates image position in sprite
                        anchor: new google.maps.Point(20, 40) // lets offset the marker image
                    };
                    const marker = new google.maps.Marker({
                        icon: markerIcon,
                        animation: google.maps.Animation.DROP,
                        position,
                        draggable: true,
                        map: this.map
                    });
                    marker.addListener('click', function (e) {
                        this.sideBar = !this.sideBar
                    });

                });

        },
        showAddress(lat, lng) {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBMPwmpKGkNozJfQ2zrVZdvlvJDv7QsZrM`)
                .then(res => {
                    this.searchPosition = res.data.results[0].formatted_address;
                })
        },
        pickedPlace(picked) {
            this.pickedPlaceInfo = this.icons.title[picked.target.id]
            this.pickedIco = this.icons.img[picked.target.id]
            var x = document.getElementsByClassName('label-ico');
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i] != picked.target) x[i].checked = false;
            }
        },
        savePlace() {
            let newPlace = {
                placeName: this.searchPosition,
                ico: this.pickedIco,
                catagory: this.pickedPlaceInfo,
                title: this.placeTitle,
                info: this.placeInfo,
                img: this.img,
                latitude: this.searchLocation.latitude,
                longitude: this.searchLocation.longitude

            }
        }
    },
    computed: {

    },
    mounted: function () {
        var self = this
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)
        const mapCentre = this.searchLocation
        const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
        }
        this.map = new google.maps.Map(element, options);
        var input = document.getElementById('pac-input');
        this.searchBox = new google.maps.places.SearchBox(input);
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

        this.markerCoordinates.forEach((coord) => {
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            var markerIcon = {

                url: coord.icoUrl,
                scaledSize: new google.maps.Size(30, 30),
            };
            const marker = new google.maps.Marker({
                icon: markerIcon,
                animation: google.maps.Animation.DROP,
                position,
                map: this.map

            });
            marker.addListener('click', function (e) {
                this.map.panTo(new google.maps.LatLng(coord.latitude,coord.longitude));
                this.map.setZoom(17)
                self.sideBar = !self.sideBar
                console.log(this)
            });

            this.markers.push(marker)
            this.map.fitBounds(this.bounds.extend(position))
        });
    }
}

