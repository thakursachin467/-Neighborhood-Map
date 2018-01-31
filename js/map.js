var loc = [{
        title: 'uncle jacks',
        location: [30.7409173384, 76.7971969396],
        bio: 'Address: No.10, Booths, B, 35 Market Rd, Market 35 D, Sector 35D, Sector 8, Chandigarh, 160022',
        show: true,
        selected: false,
        res_id: "57823cf6498e4ac40e94e786"
    },
    {
        title: 'Super Donuts',
        location: [30.71081056728752, 76.72193884849548],
        bio: 'Address:SCO 130, Phase 3B2',
        show: true,
        selected: false,
        res_id: "56092f77498e5344ab6f0d9b"
    },
    {
        title: 'TGI Fridays',
        location: [30.7248164681, 76.8060579523],
        bio: 'Address: Sector, Madhya Marg, 9D, Sector 26 East, Chandigarh, 160021',
        show: true,
        selected: false,
        res_id: "584c2ba16ad73d05c6750a2d"
    },
    {
        title: 'Hops n Grains',
        location: [30.6978586000, 76.8492580000],
        bio: 'Address: SCO 358,, Sector - 9, Panchkula, Haryana 134109',
        show: true,
        selected: false,
        res_id: "4d1f20ec2eb1f04ded06e6c1"
    },
    {
        title: 'Barbeque Nation',
        location: [30.7255055848, 76.8051684648],
        bio: 'Address:SCO 39, Madhya Marg, Sector 26, Chandigarh',
        show: true,
        selected: false,
        res_id: "4bbf61eef353d13a29837e10"
    }

];
var map;
var infoWindow;

function myMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.7333,
            lng: 76.7794
        },
        zoom: 12,
        mapTypeId: 'roadmap'
    });
    var input = document.getElementById('pac-input');

    document.getElementById('use-strict-bounds')
        .addEventListener('click', function() {
            searchBox.setOptions({
                strictBounds: this.checked
            });
        });
    ko.applyBindings(new mapModel);
}




var mapModel = function() {

    var self = this;
    self.Input = ko.observable();
    var bounds = new google.maps.LatLngBounds();
    self.locations = [];
    var selected = false;

    for (var i = 0; i < loc.length; i++) {
        var marker = new google.maps.Marker({
            position: {
                lat: loc[i].location[0],
                lng: loc[i].location[1]
            },
            map: map,
            title: loc[i].title,
            animation: google.maps.Animation.DROP,
            show: ko.observable(loc[i].show),
            description: loc[i].bio,
            id: loc[i].res_id

        });


        self.locations.push(marker);
        self.locations[self.locations.length - 1]



    }

    self.apicall = function(marker) {
        $.ajax({
            datatype: "JSON",
            url: "https://api.foursquare.com/v2/venues/" + marker.id + "?oauth_token=N2N4Y4QP2CO4JJVJO0AALN5TJISJWPUCOOFPFAOQFBW2LB5T&v=20180127",
            success: function(result) {
                var mydata = result.response.venue;
                if (mydata.hasOwnProperty('likes')) {
                    marker.data = mydata.likes.count;




                }
            }




        });



    };

    for (var i = 0; i < self.locations.length; i++) {
        (function(marker) {
            self.apicall(marker);
            marker.addListener('click', function() {
                self.adddatatomarker(marker);

            });


        }(self.locations[i]));
    }



    self.adddatatomarker = function(marker) {
        var infowindow = new google.maps.InfoWindow({
            maxWidth: 200
        });
        if (marker.data == " " || marker.data == undefined) {
            infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + marker.description + '</p>' + '<p>' + "NO LIKES " + '</p>' + '</div>')

        } else {
            infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + marker.description + '</p>' + '<p>' + marker.data + " LIKES" + '</p>' + '</div>')

        }


        infowindow.open(map, marker);

    };




}