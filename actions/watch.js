var watcher = require("chokidar"),
		api = require("../developer/api/api_index.js"),
		__root = api.core.getRoot,
		path = require("path"),
		fs = require("fs"),
		color = require("colors")

var load_settings = path.join(__root,"load.json")

module.exports = function(){
	console.log(color.magenta("Foxie is now keeping an eye on things."))
	watcher.watch(load_settings)
		.on('change',watch_load_json)
	watcher.watch(api.core.getPath("src"))
		.on('change',watch_files)
}

function watch_load_json(event, path){
	//new component
	fs.readFile(load_settings,"utf8",function(err,res){
		if(err) console.log(err)
		var changed_json = JSON.parse(res).component_list
		require("./build.js")(changed_json)
	})
}

function watch_files(path,evt){
	if(path.split(".").pop()=="styl") require('./locals.js')(function(){
		console.log(color.yellow("Compile changes >",path.split("/").pop()))
	})
}
