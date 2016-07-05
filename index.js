'use strict'

const TwitterClient = require('twitter')
const translate = require('pirate-translator')

var client = new TwitterClient({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

client.stream('statuses/filter', {track: '@captainbotbeard'},  function(stream) {
  stream.on('data', function(tweet) {
    var reply = "@" + tweet.user.screen_name + " " + translate(tweet.text.slice(17));

    client.post('statuses/update',
                { status: reply, in_reply_to_status_id: tweet.id },
                function(error, tweets, response) {
                });
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
