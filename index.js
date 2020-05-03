var Twit = require("twit");
require("dotenv").config();

const Bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_KEY_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCEESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

console.log("This bot is running");

function BotInit() {
  var query = {
    q: "guerramemeal",
    result_type: "recent",
  };

  Bot.get("search;tweets", query, BotGotLatestTweet);

  function BotGotLatestTweet(error, data, response) {
    if (error) {
      console.log("Bot could not find latest tweet, :" + error);
    } else {
      var id = {
        id: data.statuses[0].id_str,
      };

      Bot.post("statuses/retweet/:id", id, BotRetweeted);

      function BotRetweeted(error, response) {
        if (error) {
          console.log("Bot could not retweet, : " + id.id);
        } else {
          console.log("Bot retweeted : " + id.id);
        }
      }
    }
  }
}

setTimeout(BotRetweeted, 30 * 60 * 1000);

BotInit();
