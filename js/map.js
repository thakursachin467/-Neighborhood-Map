
var loc=[
       { title:'Piccadily Square Mall',
        location:[30.7235273,76.7652874],
        bio: 'Piccadily Square Mall, Sub. Center, Sector 34A, Sub. City Center, Sector 34A, Sector 34, Chandigarh, 160022',
         show:true,
         selected:false
     },
         {
            title:'Elante Mall',
            location:[30.7058034,76.7987666],
            bio: ' Elante Mall SCO 178A, Industrial Area Phase 1, MW Area, Industrial Area Phase I, Chandigarh, 160002' ,
            show:true,
            selected:false
         },
         {
            title:'Rock Garden',
            location:[30.7524165,76.8050706],
            bio:'Rock Garden The Rock Garden of Chandigarh is a sculpture garden in Chandigarh, India, also known as Nek Chand Rock Garden after its founder Nek Chand, a government official who started the garden secretly in his spare time in 1957.',
            show:true,
            selected:false
         },
         {
            title:'Student Centre (Stu C)',
            location:[30.7623095,76.7671159],
            bio: 'Student Centre (Stu C) Panjab University, Sector 14, Chandigarh, 160014 puchd.ac.in',
            show:true,
            selected:false
         },
         {
            title:'Sukhna Lake',
            location:[30.7420933,76.8127027],
            bio: 'Sukhna Lake Sukhna Lake in Chandigarh, India, is a reservoir at the foothills of the Himalayas. This 3 km² rainfed lake was created in 1958 by damming the Sukhna Choe, a seasonal stream coming down from the Shivalik Hills',
            show:true,
            selected:false
         }

];
var map;
var infoWindow;
function myMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 30.7333, lng: 76.7794},
          zoom: 12,
          mapTypeId: 'roadmap'
        });
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.Autocomplete(input); 
searchBox.bindTo('bounds', map);
 document.getElementById('use-strict-bounds')
            .addEventListener('click', function() {
              searchBox.setOptions({strictBounds: this.checked});
            }); 

            ko.applyBindings(new mapModel);
}




var mapModel= function(){
    var self=this;
     var bounds = new google.maps.LatLngBounds();
     self.locations=[];
     var selected=false;
     for(var i=0;i<loc.length;i++) {
               var marker = new google.maps.Marker ({
                 position : {lat: loc[i].location[0], lng: loc[i].location[1]},
                 map : map,
                title: loc[i].title,
                animation: google.maps.Animation.DROP,
                show: ko.observable(loc[i].show),
                selected: ko.observable(loc[i].selected),
                description:loc[i].bio
     });
         self.locations.push(marker);
            marker.addListener('click', function() {
            console.log(this.title);
            contentString='<div>' + '<h3>' + this.title + '</h3>' +'<p>'+this.description+'</p>'+ '</div>'
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(map, this);
            
        });
                   
     }


      


     
}














