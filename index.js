var data=[
    {
        name:'鞠文娴',
        song:'病变',
        src:'http://dl.stream.qqmusic.qq.com/C400000TOO4v0AF3Bs.m4a?vkey=035BE854D87E67950C5C404EB216F405A62918A23FCAC8024779134E87EA46F307DB80D7BE430422052C34C40AD58710249EE062ED76E315&guid=4976040035&uin=402598683&fromtag=66',
        pic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000000zFECL2iqwch.jpg?max_age=2592000'
    }, {
        name:'胡66',
        song:'空空如也',
        src:'http://dl.stream.qqmusic.qq.com/C400000TOO4v0AF3Bs.m4a?vkey=E51E9EC77B62A41C2E28EDD288B71C1DA895A8BF77D6793DEF959CDA34DA2DCCA44CB398FDAA480591B3247217970385FD59EDCF3214F042&guid=4976040035&uin=402598683&fromtag=66',
        pic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000002TtvI007ZBG3.jpg?max_age=2592000'
    }, {
        name:'毛不易',
        song:'像我这样的人',
        src:'http://dl.stream.qqmusic.qq.com/C4000015sP7W3Vl8cN.m4a?vkey=470CFFF564F71655765B236EFFCB4F0F7AF2FDB040E66580001E8CD7AFED0DC22902887B52F446866A6B4BAAADCEC4B0F4DF09B75B79C155&guid=4976040035&uin=402598683&fromtag=66',
        pic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000004UVsoZ3ARwpl.jpg?max_age=2592000'
    }, {
        name:'张韶涵',
        song:'花房姑娘',
        src:'http://dl.stream.qqmusic.qq.com/C400002oCxWl17qgDg.m4a?vkey=1E146CEF63BE037B67FF6492D3D0A18183C486C443AE154367832B9C50EA5B3BA3AA51D4E768664D9A413B65C73A154FD7FBF8B9E7FCCEE7&guid=4976040035&uin=402598683&fromtag=66',
        pic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000002TCudF3sqMGh.jpg?max_age=2592000'
    }, {
        name:'周杰伦',
        song:'不爱我就拉到',
        src:'http://dl.stream.qqmusic.qq.com/C4000031TAKo0095np.m4a?vkey=6E5C370E402BDAE37469C06C14C7481B1B0A5069268D5B10E839109BF48AF07B98210CAF1D91F240B27D98828074A48E9D069A858002B704&guid=4976040035&uin=402598683&fromtag=66',
        pic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000001CnPE31iJ899.jpg?max_age=2592000'
    }, {
        name:'阿杜',
        song:'离别',
        src:'http://dl.stream.qqmusic.qq.com/C400001k1FBm2kG3pS.m4a?vkey=244A749662853794CA4FCB95ED739485E0780DD3893CD2D4D4FE884026E61E9430DBEFA1A8AE0D996DDD2A8DBD306DA41BB2967275ADA7D1&guid=4976040035&uin=402598683&fromtag=66',
        pic:'https://y.gtimg.cn/music/photo_new/T002R300x300M000001oZ9bj1wIkdu.jpg?max_age=2592000'
    }
];
var audio = document.querySelector('audio');
var $ul=$('.playlist ul ');

var str='';
$.each(data,function (i,e) {
    str+='<li>'+e.song+'---'+e.name+'</li>'
});
$ul.html(str);

var index =0;

function init() {
    $('.control img').attr('src',data[index].pic);
    $('.song-name').html(data[index].song+'---'+data[index].name);
    $('.bgimg').css({
        'background':'url("'+data[index].pic+'")no-repeat',
        'background-size':'600px 400px'
    });
    rotateEdg=0;
    $('li').eq(index).addClass('active').siblings().removeClass('active');
    audio.src = data[index].src;
}
         init();
var rotateEdg= 0;
var timer = null;
//播放暂停函数
function play() {
    if(audio.paused){
        audio.play();
        clearInterval(timer);
        timer = setInterval(function () {
            rotateEdg++;
            $('.control img').css('transform','rotate('+rotateEdg+'deg)');
        },40);
        $('.start').css('background-position-x','-30px')
    }else{
        clearInterval(timer);
        audio.pause();
        $('.start').css('background-position-x','0')
    }
}
//暂停  播放
$('.start').click(function () {
    play();
});

//上一曲
$('.prev').click(function () {
   index--;
   index=index < 0 ? data.length-1 : index;
   init();
   play();
});

//下一曲
$('.next-song').click(function () {
    index++;
    index=index > data.length-1 ? 0: index;
    init();
    play();
});

audio.addEventListener('canplay',function () {
   var totaiM = parseInt(audio.duration/60);
   var totalS = parseInt(audio.duration%60);
   $('.control-time span').eq(1).html(formatetime(totaiM)+':'+formatetime(totalS));

   audio.addEventListener('timeupdate',function () {
       var currentM = parseInt(audio.currentTime/60);
       var currentS = parseInt(audio.currentTime%60);
       $('.control-time span').eq(0).html(formatetime(currentM)+':'+formatetime(currentS));

       var position = (audio.currentTime/audio.duration)*($('.total-progress').width()-10);
       $('.current-progress').width(position);
       $('.circle-round').css('left',position);

       if(audio.ended){
           index++;
           index=index > data.length-1 ? 0: index;
           init();
           play();
       }
       
   });
    $('.total-progress').click(function (e) {
        audio.currentTime = (e.offsetX / $('.total-progress').width())*audio.duration;

    })
});

function formatetime(time) {
    return time < 10 ? '0'+time : time;
}
