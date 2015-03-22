// Example Album
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
     { name: 'Blue', length: '4:26' },
     { name: 'Green', length: '3:14' },
     { name: 'Red', length: '5:01' },
     { name: 'Pink', length: '3:21'},
     { name: 'Magenta', length: '2:15'}
   ]
};
 
// Another Example Album
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
     { name: 'Hello, Operator?', length: '1:01' },
     { name: 'Ring, ring, ring', length: '5:01' },
     { name: 'Fits in your pocket', length: '3:21'},
     { name: 'Can you hear me now?', length: '3:14' },
     { name: 'Wrong phone number', length: '2:15'}
   ]
};

//Yet another example album
var albumNoDice = {
  name: 'Luck Be a Lady',
  artist: 'The Gamblers',
  label: 'Snake Eyes',
  year: '1937',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
    { name: 'Bettin\' on a Winner', length: '2:37' },
    { name: 'Call me Crazy', length: '2:43' },
    { name: 'Bygones', length: '3:26' },
    { name: 'Gone Broke Polka', length: '2:17'},
    { name: 'All Aces', length: '3:06' }
  ]
}

var createSongRow = function(songNumber, songName, songLength) {
  var template =
     '<tr>'
   + '  <td class="col-md-1">' + songNumber + '</td>'
   + '  <td class="col-md-9">' + songName + '</td>'
   + '  <td class="col-md-2">' + songLength + '</td>'
   + '</tr>'
   ;

  return $(template);
};

var changeAlbumview = function(album) {
  //Update album title
  var $albumTitle = $('.album-title');
  $albumTitle.text(album.name);

  //Update album artist
  var $albumArtist = $('.album-artist');
  $albumArtist.text(album.artist);

  //Update the meta info
  var $albumMeta = $('.album-meta-info');
  $albumMeta.text(album.year + " on " + album.label);

  //Update album image
  var $albumImage = $('.album-image img');
  $albumImage.attr('src', album.albumArtUrl);

  //Update song list
  var $songList = $('.album-song-listing');
  $songList.empty();
  var songs = album.songs;
  for (var i = 0; i < songs.length; i++) {
    var songData = songs[i];
    var $newRow = createSongRow(i + 1, songData.name, songData.length);
    $songList.append($newRow);
  }
};


// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-Album view pages.
//  - Use a regex to validate that the url has "/album" in its path.
if (document.URL.match(/\/album.html/)) {
  // wait until HTML has loaded
  $(document).ready(function() {
    changeAlbumview(albumPicasso);

    //$('.album-title').click(function() {
      //console.log('triggered');
    //});
  });
};