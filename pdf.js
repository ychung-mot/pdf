module.exports = function (callback, templateName, viewData, pdfOptions) {

	const DEFAULT_PDF_OPTIONS = {
		format: 'Letter',
		orientation: 'landscape',
		"border": {
			"top": "0.5in",
			"right": "0.3in",
			"bottom": "0.2in",
			"left": "0.3in"
		},
	};

	// https://www.npmjs.com/package/mustache
	var mustache = require ('mustache');
	// https://www.npmjs.com/package/html-pdf
	var pdf = require('html-pdf');

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
			var options = Object.assign({}, DEFAULT_PDF_OPTIONS, pdfOptions);

			// export as PDF
			pdf.create(html, options).toStream(function(err, stream){
				if (err)
				{
					callback (err, null);
				}
				else
				{
					callback (null, stream);
				}
			});
		}
	});
};