var express = require('express'),
    app     = express(),
    pdf     = require('./pdf');

Object.assign=require('object-assign')

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(express.json());

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.post('/api/PDF/GetPDF', function (req, res) {
  var data = req.body;
  var options = {
    "format": "letter",
    "orientation": "landscape"
  };

  pdf(function(err, stream){
    var filename = 'Permit-' + data.permitNumber + '.pdf';
    filename = encodeURIComponent(filename);
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    stream.pipe(res);
  },
  "schoolbus_permit", data, options);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;