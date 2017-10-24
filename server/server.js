var http = require('http');
var fs = require('fs');

var express = require('express');
var app = express();

app.use(express.static('nodejs'))

const PORT = 8080; 

// app.listen(PORT, function () {
//     	console.log('Example app listening on port 3000!')
// })

fs.readFile('../expedia.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);


});

