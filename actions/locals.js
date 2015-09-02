var stylus = require("stylus"),
		api = require("../developer/api/api_index.js"),
		path = require("path"),
		fs = require('fs')

module.exports = function(cb){


fs.readFile(path.join(api.core.getPath("foxie_style")), 'utf8',function(err,res){
	if(err) write_foxie_style()
	stylus(res).render(read_foxie_style)
})

function write_foxie_style(){
	require("./build/mkFile.js")(path.join(api.core.getPath("foxie_style")))
}

function read_foxie_style(err,css){
	if(err) console.log(err)
	write_css(css)
}

function write_css(css){
	fs.writeFile(path.join(api.core.getPath("dist"),"style","compressed","foxie_framework.min.css"),css,function(err){
		if(err) console.log(err)
	})
	if(cb) cb()
}

}
