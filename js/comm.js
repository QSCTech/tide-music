$('#next').click(function() {
    $("#jp").jPlayer("setMedia", {
        mp3: "http://localhost/tide/music/piano.mp3"
    }).jPlayer("play");
});