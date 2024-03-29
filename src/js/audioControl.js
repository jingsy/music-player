(function($,root){
    //play pause getAudio
    function AudioManager(src){
        //创建一个音频对象
        this.audio = new Audio();
        this.src = src;
        //音频默认状态
        this.status ='pause';
    }

    AudioManager.prototype = {
        play:function(){
            this.audio.play();
            this.status ='play';
        },
        pause:function(){
            this.audio.pause();
            this.status ='pause';
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();
        },
    }
    root.audioManager =  new AudioManager();

})(window.Zepto,window.player||(window.player={}))