# DownloadPics

Download multiple pictures at once from searching Baidu images.

这个小服务可以简单获取百度图片指定关键字相关的前n张图片，下载的图片单独保存在各自文件夹中，每次下载不覆盖之前的下载结果。

项目地址：[https://github.com/HannaLiu/DownloadPics](https://github.com/HannaLiu/DownloadPics)

使用方法：

# 1. 获取项目

根据个人习惯git clone or download该项目

# 2.安装依赖

`npm install`

# 3.启动服务

双击文件start DownloadPics.bat，看到控制台显示server running on localhost:9000，即为运行成功([.bat文件已编辑好运行语句](https://www.f2td.com/2018/07/03/using-the-bat-file-to-automatically-run-the-program/))。

# 4.开始下载

打开浏览器，在地址栏输入：`http://localhost:9000/search?key=搜索关键字&num=10`，注意此处key为**必填项**，需赋值为你要搜索的图片关键字，num为想要下载的数量，可不填写，默认为30条。

# 5.检查下载结果

运行成功会返回`{"code": 200,"message": "获取成功!"}`，并在项目根目录的images文件夹下创建以输入的关键字为名字的文件夹，里面存放着刚刚下载的图片。
