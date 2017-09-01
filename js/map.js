
var loc=[
       { title:'Piccadily Square Mall',
        location:[30.7235273,76.7652874],
        description: ['<div class="info_content">' +
        '<h3>Piccadily Square Mall</h3>' +
        '<p>Sub. Center, Sector 34A, Sub. City Center, Sector 34A, Sector 34, Chandigarh, 160022</p>' +        '</div>']
         },
         {
            title:'Elante Mall',
            location:[30.7058034,76.7987666],
            description: ['<div class="info_content">' +
        '<h3>Elante Mall</h3>' +
        '<p>SCO 178A, Industrial Area Phase 1, MW Area, Industrial Area Phase I, Chandigarh, 160002</p>' +
        '</div>']
         },
         {
            title:'Rock Garden',
            location:[30.7524165,76.8050706],
            description:['<div class="info_content">' +
        '<h3>Rock Garden</h3>' +
        '<p>The Rock Garden of Chandigarh is a sculpture garden in Chandigarh, India, also known as Nek Chand Rock Garden after its founder Nek Chand, a government official who started the garden secretly in his spare time in 1957.</p>' +
        '</div>']
         },
         {
            title:'Student Centre (Stu C)',
            location:[30.7623095,76.7671159],
            description: ['<div class="info_content">' +
        '<h3>Student Centre (Stu C)</h3>' +
        '<p>Panjab University, Sector 14, Chandigarh, 160014 puchd.ac.in</p>' +
        '</div>']
         },
         {
            title:'Sukhna Lake',
            location:[30.7420933,76.8127027],
            description:
         ['<div class="info_content">' +
        '<h3>Sukhna Lake</h3>' +
        '<p>Sukhna Lake in Chandigarh, India, is a reservoir at the foothills of the Himalayas. This 3 km² rainfed lake was created in 1958 by damming the Sukhna Choe, a seasonal stream coming down from the Shivalik Hills.</p>' +
        '</div>']
         }

];

function myMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
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

    var infoWindow = new google.maps.InfoWindow();
    var marker, i;
    
     for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
 	
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
      
         google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));


    }
}