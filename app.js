var express = require('express');
var path = require('path');
var http = require("http");
var upload = require('express-fileupload');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(upload());
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('home');
});
    
app.post('/', function(req, res) {
    if(req.files) {
        var file = req.files.filename;
        var filename = file.name;
        
        file.mv("./uploads/"+filename, function(err) {
            if(err) {
                res.send("error occured");
            } else {
                var newFile = "./uploads/"+filename;
                var stats = fs.statSync(newFile);
                var size = stats.size;
                console.log("Done: " + filename);
                var results = {
                    'size' : size
                };
                res.send(results);
                
            }
        });
    }

});
        




app.listen(port, function() {
    console.log("Server started on port: " + port + "......");
});