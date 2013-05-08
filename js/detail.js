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
        summary: '爱早餐的人生赢家<br>你的眼睛好像电影配乐<br>不踩脚踏车就没办法唱歌<br>嘿 你笑起来好像蜻蜓',
        music: [],
        video: '',
        links: []
    },
    qzh: {
        name: "启真湖没名团",
        img: 12,
        music: ["为了那一天", "爱人别为我轻轻地哭泣", "给远方的你", "我只是害怕青春的逝去"],
        summary: '如果生命重获信仰<br>是否变了样<br>尽情奔放挥霍闯荡<br>死在沙滩上<br>和浪花一样<br><br>去追逐希望<br>悼青春哀伤<br>放生命去闯',
        video: '',
        links: [
          {
              name: "豆瓣小站",
              link: "http://site.douban.com/qizhenlake/"
          }
        ]
    },
    sodda: {
        name: "台湾校园音乐",
        summary: '',
        img: 2,
        music: [],
        video: '',
        links: []
    },
    smi: {
        name: "李嘉宁",
        summary: '没有人念想<br>不再有不安的心脏<br>没有人念想<br>空空的心脏<br><br>日子快到头了<br>他们都不见了<br>每个人去自己的未来<br>',
        img: 5,
        music: ["般若", "沉没", "愁云", "光", "杭州", "每个人去自己的未来"],
        video: 'http://tide.myqsc.com/static/media/video/20130501.mp4',
        //        video: 'http://localhost/tide2.mp4',
        links: [
          {
              name: "豆瓣",
              link: "http://www.douban.com/people/SmileyLee/"
          },
          {
              name: "豆瓣小站",
              link: "http://site.douban.com/smi/"
          },
          {
              name: "LOFTER",
              link: "http://smi-design.lofter.com/"
          }
        ]
    },
    wx: {
        name: "项庆琰, 王枢沛",
        img: 2,
        summary: '王枢沛<br><br>人生何处不相逢<br>却难忘 烟火下唱过的骊歌<br><br>项庆琰<br><br>过往是流淌着没有声音的河水<br>总是倒映原宥和自省<br>我在它疲惫的岸边徘徊了许久<br>想着 笑着 哭着 无法入睡<br>',
        video: '',
        music: ["项庆琰-秦皇岛","王枢沛-街边", "王枢沛-烟火", "王枢沛-追寻"],
        links: [
          {
              name: "王枢沛's 5sing空间",
              link: "http://www.5sing.com/17339323"
          },
          {
              name: "王枢沛's 微博",
              link: "@王枢沛"
          },
          {
              name: "项庆琰's 微博",
              link: "@氢弹啊"
         }
        ]
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
        'height': 670/16*9,
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

$(document).ready(function() {
    setTimeout(function() {
        $("#jp").jPlayer("setMedia", {
            mp3: getMusic()
        }).jPlayer("play");
    }, 100);
});