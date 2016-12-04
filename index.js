var Request = require('request');

var SteamComment = function (options)
{
	this._jar = Request.jar();
	this.sessionid = options.sessionid;

	this._request = Request.defaults({ jar: this._jar });
	options.webCookie.forEach((function(name)
	{
		((function (cookie)
		{
			this._jar.setCookie(Request.cookie(cookie), 'https://steamcommunity.com');
		}).bind(this))(name);
	}).bind(this));
};
SteamComment.prototype = new events.EventEmitter;

SteamComment.prototype.comment = function (options,callback){

	var self = this;
	var options = {
		method:"POST",
        url: 'https://steamcommunity.com/comment/Profile/post/'+options.steamid+'/-1/',
        headers: {
        	"Accept": "*/*",
            'Origin': 'http://steamcommunity.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'http://steamcommunity.com/profiles/'+options.steamid+'/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru,en-US;q=0.8,en;q=0.6,en-AU;q=0.4'
        },
        form: {
            "sessionid": this.sessionid,
            "comment": options.comment,
            "count":  options.comment.length
        }
    };
		this._request(options, function(error, response, body){
			if (callback) {
			   	if (body.success == false) {
			   		callback(body.message,false);
			   		return
			   	} 
			   	var body = JSON.parse(body);
			   	if (body.success == true ) {
			   		callback(null,true);
			   	}
		   	}
		});

}
module.exports = SteamComment;
