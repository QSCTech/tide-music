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
    var width = $(window).width(),
        height = $(window).height(),
        scale = width / height,
        w = width /6,
        bgScale = 1600 / 832;

    if(scale < bgScale) {
        $('#bg').css({width: 'auto', height: height});
        var bgWidth = $('#bg').width();
        var leftOffset = (bgWidth - width) / 2 * -1;
        $('#bg').css({position: 'absolute', left: leftOffset});
    } else {
        $('#bg').css({width: width, height: 'auto', left: 0});
    }

    $('#avabar img').css({width: w});


    if(width < 1200) {
        $('#player').css({width: '60px', height: '18px', 'margin-left': '-40px'});
    } else {
        $('#player').css({width: '210px', height: '18px', 'margin-left': '-115px'});
    }

    setTimeout(function() {
        var bgHeight = $('#bg').height();
        var playerOffset = 375 / 832 * bgHeight;
        $('#player').css({top: playerOffset});
    }, 20);
}
updateWidth();
