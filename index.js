var request = require('request');
var fs = require('fs');
var path = require('path');
var express = require('express');
var server = express();

//设置默认参数
var key = '',   //输入的关键字
	keyword = encodeURIComponent(key),  //关键字转码
	num = 30,    //下载的数量
	pn = 30,		//每次下载的数量
	n = 0;			//下载计数

server.use('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
})

server.use('/search', function(req, res) {
	var data = req.query;
	key = data.key
	keyword = encodeURIComponent(key);
	num = +data.num > 0 ? +data.num : 30;
	n = 0;
	startRequest();
	res.send({
		code: 200,
		message: '获取成功!'
	}).end();
})

server.listen(9000, function() {
	console.log("server running on localhost:9000")
})

//向百度图片发起请求
function startRequest() {
	var url = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=' + keyword + '&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=' + keyword + '&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=' + pn + '&rn=30';
	var obj = {
		url: url,
		method: 'get'
	};
	request(obj, function(err, res, body) {
		var body = JSON.parse(body);
		console.log(body.data);
		saveImage(body.data);
		if (pn < 30 * Math.ceil(num / 30)) {
			pn += 30;
			startRequest();
		}
		console.log('总共' + num + '条');
	});
}

//循环创建目录 
function mkdirSync(dir) {
	var parts = dir.split(path.sep);
	for (var i = 1; i <= parts.length; i++) {
		dir = path.join.apply(null, parts.slice(0, i));
		fs.existsSync(dir) || fs.mkdirSync(dir);
	}
	return dir;
}

//保存图片
function saveImage(data) {
	var	dir = path.join(__dirname+'/images', key),
		dir = mkdirSync(dir);
	for (var i = 0; i < data.length - 1; i++) {
		var reg = /[\u4e00-\u9fa5\w]+/g;
		var a = data[i].fromPageTitleEnc.match(reg);
		var str = a.join('');
		var img_title = str + '-' + data[i].di + '.' + data[i].type;
		var img_src = data[i].middleURL;
		n++;
		if (n > num) {
			return false;
		} else {
			request(img_src).pipe(fs.createWriteStream(dir + "/" + img_title));
		}
	};
};