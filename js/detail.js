var data = {
    lianlian: {
	name: "连昱澎",
        img: 3,
	summary: '也许每个人都<br>会有另一个自己<br>另一个自己<br>有另一个不解的身世<br>也许有一天<br>就会遇见他',
        music: ["Play", "Siberia", "Wilderness II", "夜访组曲1-回温"],
	video: 'http://#',
	links: [
          {
              name: "豆瓣小站：Nói",
              link: "http://site.douban.com/telavivandnoi/"
          },
          {
              name: "豆瓣：Halcyon",
              link: "http://www.douban.com/people/4152962/"
          }
        ]
    }
};

var hash = window.location.hash.replace(/#/g, ''),
    item = data[hash],
    img = 'data/'+hash+'/img/ava.jpg',
    html = '';

$('#ava-img').html('<img src="'+img+'">');
$('#ava-name').html(item.name);
$('#summary').html(item.summary);

var links = item.links;
html = '';

for(var i = 0; i<links.length; i++) {
    html += '<li>';
    html += links[i].name;
    html += '<br>';
    html += '<a href="'+links[i].link+'">'+links[i].link+'</a>';
    html += '</li>';
}
$('#links ul').html(html);




// the music player

var musicCount = 0;
var getMusic = function() {
    if(musicCount >= item.music.length) {
        musicCount = 0;
    }
    var music = item.music[musicCount];
    $('#song').text(music);
    music = 'data/'+hash+'/music/'+music+'.mp3';
    musicCount++;
    return music;
};


$("#jp").jPlayer({
    ready: function() {
        $(this).jPlayer("setMedia", {
            mp3: getMusic()
        }).jPlayer("play");
    },
    ended: function() {
        $(this).jPlayer("setMedia", {
            mp3: getMusic()
        }).jPlayer("play");
    },
    supplied: "mp3"
});

$('#next').click(function() {
    $("#jp").jPlayer("setMedia", {
        mp3: getMusic()
    }).jPlayer("play");
});

$('#play').click(function() {
    $(this).fadeOut();
    $('#pause').fadeIn();
    $("#jp").jPlayer("play");
});
$('#pause').click(function() {
    $(this).fadeOut();
    $('#play').fadeIn();
    $("#jp").jPlayer("pause");
});
