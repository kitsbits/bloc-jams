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

var currentlyPlayingSong = null;

var createSongRow = function(songNumber, songName, songLength) {
  var template =
     '<tr>'
    + '  <td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="col-md-9">' + songName + '</td>'
    + '  <td class="col-md-2">' + songLength + '</td>'
    + '</tr>'
    ;

  var $row = $(template);

// Change from a song number to play button when the song IS NOT playing AND we hover over the row
  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-number');
    var songNumber = songNumberCell.data('song-number');
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
    }
  };

// Change from a play button to song number when the song IS NOT playing AND we hover off the row
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-number');
    var songNumber = songNumberCell.data('song-number');
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    }
  };

// Toggle the play, pause, and song number based on which play/pause button we clicked on.
  var clickHandler = function(event) {
    var songNumber = $(this).data('song-number');

    if (currentlyPlayingSong !== null) {
      // Revert to song number for currently playing song bc user started playing new song.
      currentlyPlayingCell = $('.song-number[data-song-number="' + currentlyPlayingSong +'"]');
      currentlyPlayingCell.html(currentlyPlayingSong);
    }

    if (currentlyPlayingSong !== songNumber) {
      // Switch from Play -> Pause to indicate new song is playing
      $(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
      currentlyPlayingSong = songNumber;
    }

    else if (currentlyPlayingSong === songNumber) {
      // Switch from pause to play for current song to indicate pausing
      $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
      currentlyPlayingSong = null;
    }

  };

  $row.find('.song-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
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

var updateSeekPercentage = function($seekBar, event) {
  var barWidth = $seekBar.width();
  var offsetX = event.pageX - $seekBar.offset().left;

  var offsetXPercent = (offsetX / barWidth) * 100;
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);

  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
  $seekBars = $('.player-bar .seek-bar');
  $seekBars.click(function(event) {
    updateSeekPercentage($(this), event);
  });

  $seekBars.find('.thumb').mousedown(function(event) {
    var $seekBar = $(this).parent();

    $seekBar.addClass('no-animate');
    
    $(document).bind('mousemove.thumb', function(event) {
      updateSeekPercentage($seekBar, event);
     });

    //cleanup
    $(document).bind('mouseup.thumb', function(){
      $seekBar.removeClass('no-animate');
      
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });

  });
};




// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-Album view pages.
//  - Use a regex to validate that the url has "/album" in its path.
if (document.URL.match(/\/album.html/)) {
  // wait until HTML has loaded
  $(document).ready(function() {
    changeAlbumview(albumPicasso);
    setupSeekBars();
  });
};