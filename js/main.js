$("#jp").jPlayer({
    ready: function() { // The $.jPlayer.event.ready event
        $(this).jPlayer("setMedia", { // Set the media
            mp3: "http://localhost/tide/music/piano.mp3"
        }).jPlayer("play"); // Attempt to auto play the media
    },
    ended: function() { // The $.jPlayer.event.ended event
        $(this).jPlayer("play"); // Repeat the media
    },
    supplied: "mp3"
});

$("#play").click(function() {
    $("#jp").jPlayer("play");
});
$("#pause").click(function() {
    $("#jp").jPlayer("pause");
});

$("#avabar").hover(
  function() {
      $(this).find('img').each(function() {
          var opacity = $(this).css('opacity');
          if(opacity == 0) {
              $(this).animate({opacity: 1});
          }
      });
  },
  function() {
      $(this).find('img').each(function() {
          $(this).animate({opacity: 0});
      });
  }
);


if (window.addEventListener){
    window.addEventListener('resize', function() { updateWidth(); });
} else if (window.attachEvent){
    // for ie
    window.attachEvent('resize', function() { updateWidth(); });
}

function updateWidth() {
    var width = $(window).width();
    width /= 6;
    $('#avabar img').css({width: width});
}
updateWidth();
