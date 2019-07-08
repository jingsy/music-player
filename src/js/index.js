
var root = window.player;
// var nowIndex = 0;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;
var playlist = root.playList;

console.log(root);
function getData(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            dataList = data;
            len = data.length;
            control = new root.controlIndex(len);
            console.log(data);
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            playlist.renderList(data);
            // console.log(playlist);
            bindEvent();
        },
        error:function(){
            console.log('error');
        }
    })
}
 
function bindEvent(){
    $('.prev').on('click',function(){
       var i =control.prev();
        audio.getAudio(dataList[i].audio)
        root.render(dataList[i]);
        if(audio.status=='play'){
            audio.play();
            rotate(0);
        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ(0deg)',
            'transition':'none',
        })
    });
    $('.next').on('click',function(){
        var i= control.next();
        audio.getAudio(dataList[i].audio)
        root.render(dataList[i]);
        if(audio.status=='play'){
            audio.play();
            rotate(0);
        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ(0deg)',
            'transition':'none',
        })
    });

    $('.play').on('click',function(){
        // console.log(new audio(dataList[nowIndex].audio)
        if(audio.status=='pause'){
            audio.play();
            $(this).addClass('playing');
            var deg = $('.img-box').attr('data-deg');
            console.log(deg);
            rotate(deg);
        }else{
            audio.pause();
            $(this).removeClass('playing')
            clearInterval(timer);
        }
    });
    
    //点击list菜单
    $('.list').on('click',function(){
        playlist.show();
    })
    $('.play-list .close-btn').on('click',function(){
        playlist.hide();
    })
    $('.list-wrapper li').on('click',function(e){
        var index = $(this).index();
        console.log(index);
        playlist.playSong(index);
        listPlay(index);
    })
}
function listPlay(index){
    audio.getAudio(dataList[index].audio)
        root.render(dataList[index]);
        if(audio.status=='play'){
            audio.play();
            rotate(0);
        }
}
function rotate(deg){
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function(){
        deg+=2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform':'rotateZ('+deg+'deg)',
            'transition':'all 1s easy-out',
        })
    },200);
}

getData('../mock/data.json');

//信息加图片渲染到页面上
//点击按钮音频
//   播放 / 暂停 / 切歌/
//进度条 运动 与 拖拽
//图片旋转
//列表切歌