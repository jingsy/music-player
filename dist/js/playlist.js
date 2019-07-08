(function($,root){
    var control;
    var body=$(document.body);
    var playList = $("<div class = 'play-list'>"+
    "<div class='play-header'>播放列表</div>" + 
    "<ul class = 'list-wrapper'></ul>" +
    "<div class='close-btn'>关闭</div>"+
"</div>")

    function renderList(songList){
        var str ='';
        for(var i = 0;i < songList.length;i++){
            str += "<li><h3 >"+songList[i].song+"-<span>"+songList[i].singer+"</span></h3></li>"
        }
        playList.find('ul').html(str);
        body.append(playList);
    }
    function show(controlmanager){
        playList.addClass("show");
    }
    function hide(controlmanager){
        playList.removeClass("show")
    }
    function playSong(index){
        playList.find(".sign").removeClass("sign");
        playList.find("ul li").eq(index).addClass("sign");
    }
    root.playList = {
        renderList : renderList,
        show : show,
        hide : hide,
        playSong:playSong,
    }
})(window.Zepto,window.player || (window.player = {}))