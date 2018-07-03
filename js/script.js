'use strict';

// HTML TEMPLATE
(function () {
    var carouselGallery = document.getElementById('carouselSlide').innerHTML;
    
    Mustache.parse(carouselGallery);
    
    var listGallery = '';
    
    for (var i = 0; i < dataSlides.length; i++) {
        listGallery += Mustache.render(carouselGallery, dataSlides[i]);
    } 
    lolek.insertAdjacentHTML('beforeend', listGallery);
})();

// CAROUSEL
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
    // options
    cellAlign: 'left',
    wrapAround: true,
    contain: true,
    pageDots: false,
    hash: true
});

// BUTTON
var button = document.querySelector('.button');
    button.addEventListener( 'click', function( event ) {
        flkty.selectCell( 0 );
    });

// PROGRESS BAR
var progressBar = document.querySelector('.progress-bar');

flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
});

// MAP
var info = document.getElementById('info');

window.initMap = function() {
	
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
		center: dataSlides[0].coords
    });

	for (let i=0; i < dataSlides.length; i++ ){
		var marker = new google.maps.Marker({
			position: dataSlides[i].coords,
			map: map
		})
    	marker.addListener('click', function(){
			flkty.selectCell(i);
        })
	}
    flkty.on( 'change', function( index ) {
        map.panTo(dataSlides[index].coords); 
        map.setZoom(11);
    });
}