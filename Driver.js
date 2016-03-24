var byName = require('./IdByName');
var byCoords = require('./ByCoords');
var indico = require('indico.io');

cities = [ 'Boston', 'Chicago', 'Baltimore',
           'Los Angeles', 'San Francisco', 'New York City' ];

function callback (result, name) {
    tweetsText = [];
    for (var i = 0; i < result.length; i++) {
        var s = result[i].text;
        tweetsText.push(s);
    }
    indico.textTags(tweetsText)
        .then(function (results) {
            var count = 0;
            for (var i = 0; i < results.length; i++) {
                if (results[i].baseball > .5) {
                    count++;
                }
            }
            console.log(name + ': ' + count);
        })
        .catch(function (err) { console.log('Oh dear, and error'); });
}

function tweets (result) {
    byCoords.getTweets(result.coords, result.name, callback);
}

for (var i = 0; i < cities.length; i++) {
    byName.getCity(cities[i], tweets);
}