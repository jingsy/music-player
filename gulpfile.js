var gulp = require('gulp');

//压缩html
//gulp插件
var htmlClean = require('gulp-htmlclean');

//压缩图片
var imageMin = require('gulp-imagemin');

//压缩js插件
var uglify = require('gulp-uglify');

//转化less成css插件
var less = require('gulp-less');

//压缩css
var cleanCss = require('gulp-clean-css');

//自动给css3属性添加前缀 
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

//开启服务器
var connect = require('gulp-connect');

var folder ={
    src: 'src/', 
    dist:'dist/',
}

//判断当前环境变量
var devMod = process.env.NODE_ENV == 'development';
console.log(devMod); 
//设置环境变量
// export NODE_ENV=development

gulp.task('html',function(){
    var page = gulp.src(folder.src+'html/*')
        .pipe(connect.reload());

        //如果不是开发模式，则进行html压缩
        if(!devMod){
            page.pipe(htmlClean())
        }    
        //放到dist下的html文件夹下 没有就新建一个
        page.pipe(gulp.dest(folder.dist + 'html/'))
})
gulp.task('css',function(){
    var page = gulp.src(folder.src+'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
        //如果不是开发模式，则进行css压缩
        if(!devMod){
            page.pipe(cleanCss())
        }
        //放到dist下的html文件夹下 没有就新建一个
        page.pipe(gulp.dest(folder.dist + 'css/'))
})
gulp.task('js',function(){
    var page = gulp.src(folder.src+'js/*')
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(uglify())
        }
        //放到dist下的html文件夹下 没有就新建一个
        page.pipe(gulp.dest(folder.dist + 'js/'))
})
gulp.task('image',function(){
    gulp.src(folder.src+'image/*')
        //压缩图片
        .pipe(imageMin())
        //放到dist下的html文件夹下 没有就新建一个
        .pipe(gulp.dest(folder.dist + 'image/'))
})

//建立一个任务 开启服务器
gulp.task('server',function(){
    connect.server({
        port:'8888',
        liverload:true,
    })
})

//监听文件变化
//建立一个watch任务 这个任务监听foldersrc里的html,css,js下的所有文件
//然后刷新html,css,js
gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css'])
    gulp.watch(folder.src + 'js/*', ['js'])

})

//任务队列
gulp.task('default',['html','css','js','image','server','watch']);
// gulp.src()
//gulp.dest()
//gulp.task()
//gulp.watch()