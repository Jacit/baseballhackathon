var OAuth = require('oauth');

// within this radius of coordinates
var radius = '50mi';

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
    getTweets: function (coords, city, callback) {
        oauth.get(
            'https://api.twitter.com/1.1/search/tweets.json?q='
                + '&geocode=' + coords[1] + ',' + coords[0]
                + ',' + radius + '&result_type=recent'
                + '&count=100',
            accessInfo.token,
            accessInfo.token_secret,
            function (error, data, response) {
                if (error) {
                    console.error(error);
                    process.exit(2);
                }
                tweets = JSON.parse(data).statuses;
                callback(tweets, city);
            }
        );
    }
};