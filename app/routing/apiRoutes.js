//this is our data source
var friendInfo = require("../data/friends");

//routing
module.exports = function (app) {
  // API GET Requests to get JSON data  
  app.get("/api/friends", function (req, res) {
    res.json(friendInfo);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array

  app.post('/api/friends', function (req, res) {
    //collects the submitted survey scores to compare with friends in friendInfo
    var newSurveyScores = req.body.scores;
    var scoresArray = [];
    var closestMatch = 0;

    //run through friends in list, push results into array
    for (var i = 0; i < friendInfo.length; i++) {
      var scoreDifferences = 0;
      for (var j = 0; j < newSurveyScores.length; j++) {
        scoreDifferences += (Math.abs(parseInt(friendInfo[i].scores[j]) - parseInt(newSurveyScores[j])));
      }
      scoresArray.push(scoreDifferences);
    }

    //after comparing find closest match
    for (var i = 0; i < scoresArray.length; i++) {
      if (scoresArray[i] <= scoresArray[closestMatch]) {
        closestMatch = i;
      }
    }

    var bestFriend = friendInfo[closestMatch];
    res.json(bestFriend);

    friendInfo.push(req.body);
  });
};