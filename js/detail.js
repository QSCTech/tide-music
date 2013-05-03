var data = {
    lianlian: {
	name: "连昱澎",
        img: 3,
	summary: '也许每个人都<br>会有另一个自己<br>另一个自己<br>有另一个不解的身世<br>也许有一天<br>就会遇见他',
        music: ["Play", "Siberia", "Wilderness II", "夜访组曲1-回温"],
	video: '',
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
    },
    lgz: {
        name: "卢广仲",
        img: 2,
        summary: '',
        music: [],
        video: '',
        links: []
    },
    qzh: {
        name: "启真湖没名团",
        img: 12,
        music: ["03压青草", "爱人别为我轻轻地哭泣", "给远方的你", "我只是害怕青春的逝去"],
        video: '',
        links: [

        ]
    },
    sodda: {
        name: "SODDA",
        summary: '',
        img: 2,
        music: [],
        video: '',
        links: []
    },
    smi: {
        name: "李嘉宁",
        summary: '',
        img: 5,
        music: ["般若", "沉没", "愁云", "光", "杭州", "每个人去自己的未来"],
        video: 'http://tide.myqsc.com/static/media/video/20130501.mp4',
        links: []
    }
};


var hash = window.location.hash.replace(/#/g, ''),
    item = data[hash],
    img = 'data/'+hash+'/img/ava.jpg',
    html = '';

if(!item.video) {
    $('#video').hide(0);
} else {
    jwplayer('mediaplayer').setup({
        'flashplayer': 'http://www.qsc.zju.edu.cn/apps/video/jwplayer/player.swf',
        'id': 'playerID',
        'width': 670,
        'height': 670/4*3,
        'file': item.video,
        'image': ''
    });
}

$.get('data/'+hash+'/summary', function(data) {
    data = data.replace(/Q：/g, '<strong>Q：');
    data = data.replace(/A：/g, '</strong><strong>A：</strong>');
    data += '<div id="more">Read More</div>';
    $('#interview .content').html(data);
});

$('body').on('click', '#more', function() {
    $.get('data/'+hash+'/doc', function(data) {
        data = data.replace(/Q：/g, '<strong>Q：');
        data = data.replace(/A：/g, '</strong><strong>A：</strong>');
        $('#interview .content').html(data);
    });
});

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

var imgs = item.img;
var html2;
for(i = 0, html = '', html2 = ''; i<imgs; i++) {
    //    html += '<img src="data/'+hash+'/img/'+i+'.jpg">';
    html2 += '<span>'+i+'</span>';
}
html = '<img src="data/'+hash+'/img/'+0+'.jpg">';
html += '<div class="img-pointer">'+html2+'</div>';
$('#photo .content').html(html);

$('#photo .img-pointer span').click(function() {
    var i = $(this).text();
    $('#photo .content img').animate({opacity: 0}, 200);
    var img = 'data/'+hash+'/img/'+i+'.jpg';
    $('#photo .content img').attr('src', img);
    $('#photo .content img').animate({opacity: 1}, 800);
});

// the music player

if(item.music.length == 0) {
    $('#player').hide();
}

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

var musics = [];
for(var i=0; i<item.music.length; i++) {
    var music = item.music[i];
    musics.push('data/'+hash+'/music/'+music+'.mp3');
}
if(typeof isIe != "undefined") {
    var urls = musics.join('|');
    var html = '<object type="application/x-shockwave-flash" data="flash/dewplayer-multi.swf" width="240" height="20" id="dewplayermulti" name="dewplayermulti"><param name="movie" value="flash/dewplayer-multi.swf" /><param name="flashvars" value="mp3='+urls+'" /></object>';
    $('#player').html(html);
    $('#player').css('background', 'transparent');
    setInterval(function() {
        $('#player').css({width: '270px', 'margin-left': '-20px'});
    }, 50);
} else {
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
        swfPath: "http://app.myqsc.com/Public/jPlayer",
        supplied: "mp3"
    });

    $('#next').click(function() {
        $("#jp").jPlayer("setMedia", {
            mp3: getMusic()
        }).jPlayer("play");
    });

    $('#play').click(function() {
        $(this).css({display: 'none'});
        $('#pause').css({display: 'inline-block'});
        $("#jp").jPlayer("play");
    });
    $('#pause').click(function() {
        $(this).css({display: 'none'});
        $('#play').css({display: 'inline-block'});
        $("#jp").jPlayer("pause");
    });
}
