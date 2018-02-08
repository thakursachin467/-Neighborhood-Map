//data added manually 
var loc = [{
        title: 'uncle jacks',
        location: [30.7409173384, 76.7971969396],
        bio: 'Address: No.10, Booths, B, 35 Market Rd, Market 35 D, Sector 35D, Sector 8, Chandigarh, 160022',
        res_id: "57823cf6498e4ac40e94e786",
        loc_type: "food",
        show:true
    },
    {
        title: 'Super Donuts',
        location: [30.71081056728752, 76.72193884849548],
        bio: 'Address:SCO 130, Phase 3B2',
        res_id: "56092f77498e5344ab6f0d9b",
        loc_type: "food",
         show:true
    },
    {
        title: 'TGI Fridays',
        location: [30.7248164681, 76.8060579523],
        bio: 'Address: Sector, Madhya Marg, 9D, Sector 26 East, Chandigarh, 160021',
        res_id: "584c2ba16ad73d05c6750a2d",
        loc_type: "food",
         show:true
    },
    {
        title: 'Hops n Grains',
        location: [30.6978586000, 76.8492580000],
        bio: 'Address: SCO 358,, Sector - 9, Panchkula, Haryana 134109',
        res_id: "4d1f20ec2eb1f04ded06e6c1",
        loc_type: "food",
         show:true
    },
    {
        title: 'Elante Mall',
        location: [30.705733608371094, 76.80093012478473],
        bio: 'Industrial Area Chandigarh',
        res_id: "5114cd90e4b06bb0ed15a97f",
        loc_type: "shopping",
         show:true
    },
    {
        title: 'Barbeque Nation',
        location: [30.7255055848, 76.8051684648],
        bio: 'Address:SCO 39, Madhya Marg, Sector 26, Chandigarh',
        res_id: "4bbf61eef353d13a29837e10",
        loc_type: "food",
         show:true
    },
    {
        title: 'DLF City Centre',
        location: [30.728678782293738, 76.84499561838203],
        bio: 'IT Park Chandigarh',
        res_id: "4b40c527f964a520eaba25e3",
        loc_type: "shopping",
         show:true
    },
    {
        title: 'Westside',
        location: [30.712763519968437, 76.8101270006755],
        bio: 'IIndustrial & Business Park Industrial Area Phase',
        res_id: "4d0c94e4f393224b9b2717ee",
        loc_type: "shopping",
         show:true
    },
    {
        title: 'City Emporium',
        location: [30.70961016937183, 76.80099964363203],
        bio: ' 177-G, Purv Marg, Industrial Area Phase 2, Industrial Area Phase II, Chandigarh, 160002',
        res_id: "50d43c3ce4b0621a680d3bf6",
        loc_type: "shopping",
         show:true
    }

];
var map;

function myMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.7333,
            lng: 76.7794
        },
        zoom: 12,
        mapTypeId: 'roadmap'
    });
    ko.applyBindings(new mapModel());

}
var mapModel = function() {
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 200
    });
    var self = this;
    var bounds = new google.maps.LatLngBounds();
    self.locations = [];
    self.Input = ko.observable('');
    self.errComment = ko.observable();
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
            id: loc[i].res_id,
            type: loc[i].loc_type

        });
        self.locations.push(marker);
        self.locations[self.locations.length - 1];
    }
    //use to add the animation to bounce  the marker being clicked
    //refered link https://stackoverflow.com/questions/40739353/google-maps-animate-particular-marker-on-click
    function startAnimation(marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

        setTimeout(function() {
            marker.setAnimation(null);
        }, 2000);
    }


    //function to call foursquare api
    self.apicall = function(marker) {
        $.ajax({
            datatype: "JSON",
            url: "https://api.foursquare.com/v2/venues/" + marker.id + "?oauth_token=N2N4Y4QP2CO4JJVJO0AALN5TJISJWPUCOOFPFAOQFBW2LB5T&v=20180127",
            success: function(result) {
                var mydata = result.response.venue;
                console.log(mydata.stats.checkinsCount);
                if (mydata.hasOwnProperty('likes')) {
                    marker.data = mydata.likes.count;
                    marker.checkinsCount = mydata.stats.checkinsCount;
                }
            },
            error: function(error) {
                self.errComment("cannot load because " + 'error;');
            }

        });
    };


    //function to show only shopping places
    self.myFunction=function() {
        infowindow.close();
        for (var i = 0; i < self.locations.length; i++) {
            if (loc[i].loc_type == "food") {
                self.locations[i].setMap(null);
                self.locations[i].show(false);
            } else {
                self.locations[i].setMap(map);
                self.locations[i].show(true);

            }
        }
    }
    //function to show only food items
    self.myFunction1=function() {
        infowindow.close();
        for (var i = 0; i < self.locations.length; i++) {
            if (loc[i].loc_type == "shopping") {
                self.locations[i].setMap(null);
                self.locations[i].show(false);


            } else {
                self.locations[i].setMap(map);
                self.locations[i].show(true);

            }
        }
    }

    //function to show all markers
    self.myFunction2=function() {
        infowindow.close();
        for (var i = 0; i < self.locations.length; i++) {
            self.locations[i].setMap(map);
             self.locations[i].show(true);


        }
    }



    //function to search through the data and show the marker related to the keywords
    self.Filter = function() {
        infowindow.close();
        var search = self.Input().toLowerCase();
        for (var i = 0; i < self.locations.length; i++) {
            if (self.locations[i].title.toLowerCase().indexOf(search) >= 0) {
               self.locations[i].show(true);
               self.locations[i].setVisible(true);
                 console.log(self.locations[i].title);


            } else {
                self.locations[i].show(false);
                self.locations[i].setVisible(false);
                

            }

        }

    };

    self.clickevent = function(marker) {
        self.apicall(marker);
        marker.addListener('click', function() {
            self.adddatatomarker(marker);

        });

    };
    //loop to alter through the click events to add info to the marker
    for (var j = 0; j < self.locations.length; j++) {

        self.clickevent(self.locations[j]);

    }

    //here the contents will be added to the marker which is collected from foursqare and stored data
    self.adddatatomarker = function(marker) {
        startAnimation(marker);

        if (marker.data == " " || marker.data == 'undefined') {
            infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + marker.description + '</p>' + '<p>' + "NO LIKES " + '</p>' + '<p>' + 'checkins:' + marker.checkinsCount + '</p>' + '</div>');

        } else {
            infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + marker.description + '</p>' + '<p>' + marker.data + " LIKES" + '</p>' + '<p>' + 'checkins:' + marker.checkinsCount + '</p>' + '</div>');

        }
        infowindow.open(map, marker);

    };  


};