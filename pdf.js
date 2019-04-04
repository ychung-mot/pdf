fs = require('fs')

module.exports = function (callback, templateName, viewData) {

	// https://www.npmjs.com/package/mustache
	var mustache = require ('mustache');
	// https://www.npmjs.com/package/html-pdf
	var pdf = require('html-pdf-chrome');

	// setup mustache template
	fs = require('fs');
	fs.readFile('Templates/'+templateName+'.mustache', 'utf8', function (err,template) {
		if (err)
		{
			callback (err, null);
		}
		else
		{
			// render
			var html = mustache.render( template, viewData )

			// PDF options
			var options = { printOptions: { landscape: true, marginTop: 0.2, marginBottom: 0.2, marginLeft: 0.2, marginRight: 0.2 } };

			console.log(options);

			pdf.create(html, options).then(function(pdf){
				callback(null, pdf.toStream());
			})
		}
	});
};
