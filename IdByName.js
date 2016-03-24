var OAuth = require('oauth');

// store our access info
var accessInfo = {
    key : '<Enter your twitter user key here>',
    secret : '<Enter your twitter user key secret here>',
    token : '<Enter your twitter token here>',
    token_secret : '<Enter your twitter token secret here>'
};

// create the oauth object
var oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    accessInfo.key,
    accessInfo.secret,
    "1.0A",
    null,
    "HMAC-SHA1"
);

// export function to make the data request
module.exports = {
    getCity: function (requestCity, callback) {
        oauth.get(
            'https://api.twitter.com/1.1/geo/search.json?query='
                                                + requestCity,
            accessInfo.token,
            accessInfo.token_secret,
            function (error, data, response) {
                if (error) {
                    console.error('error occurred');
                    process.exit(2);
                }
                city = JSON.parse(data).result.places[0];
                callback( {
                            'name' : city.name,
                            'id' : city.id,
                            'coords' : city.bounding_box.coordinates[0][1],
                          }
                );
            }
        );
    }
};