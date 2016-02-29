
var express = require('express'),
    app = express();

app.use(express.static('game'));

app.listen(3000, function () {
  console.log("Your server is now running on port 3000...");
});
