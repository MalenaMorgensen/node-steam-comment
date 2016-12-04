node-steam-comment
======

Lets you post steam comments on profiles without any other dependencies

###basic functunality 
```js
var steamCommentPackage = require('steam-market');
steamComment = new steamCommentPackage({sessionid:sessionID,webCookie:cookies});
```

best way to implement this is by simply executing it after the "webSession" event from lets say "node-steam-user".

# Functions

### comment(options[, callback])
- `options` -a object with the following content
	- `steamid` - the steamid of the user you want to comment to.
	- `comment`- the comment
- `callback` - Optional. Called when we sale sale is commited and waiting for confirmation.
	- `error` - either null or a error message
	- `result` - false if unsuccessful, or true if successful

```js
		steamComment.comment({
			steamid: "76561198315809191", 
			contextid: "test"
		},function(err,res) {

		});
```
