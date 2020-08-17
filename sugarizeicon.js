// Require
var	fs = require('fs');

// Get icon filename
var filename = null;
if (process.argv.length != 3) {
	console.log("Usage: sugarizericon <icon.svg>");
}
filename = process.argv[2];

// Generate colorized icon
if (filename) {
	// Load file
	fs.readFile(filename, 'utf-8', function(err, read) {
		if (err) throw err;

		// Remove ENTITY HEADER
		var buf = read.replace(/<!DOCTYPE[\s\S.]*\]>/g,"");

		// Replace &fill_color; and &stroke_color;
		buf = buf.replace(/&stroke_color;/g,"var(--stroke-color)");
		buf = buf.replace(/&fill_color;/g,"var(--fill-color)");

		// Add symbol and /symbol
		buf = buf.replace(/(<svg[^>]*>)/g,'$1<symbol id="icon">');
		buf = buf.replace(/(<\/svg>)/g,'</symbol><use xlink:href="#icon" href="#icon"/>$1');

		// Output content
		console.log(buf);
	});
}
