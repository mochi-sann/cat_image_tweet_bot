"use strict";
// var imports = require("import");
const fs = require("fs");
const fetch = require("node-fetch");
global.fetch = fetch;
const Unsplash = require("unsplash-js").default;
const { toJson } = require("unsplash-js");
const Twit = require("twit");
const cron = require("node-cron");

// import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_API_ACSESS_KEY,
  secret: process.env.UNSPLASH_API_SECRET_KEY,
});


const twitter = new Twit({
  consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
  access_token: process.env.TWITTER_API_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
}); //ツイッターのAPI

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var results;
/*async */function get_cat_pic(picNnmber) {
  // console.log("写真を取得するよ");

  /*await*/ unsplash.search
    .photos("cat", picNnmber, 1)
    .then(toJson)
    .then((json) => {
      
      console.log("pic Nnmber = " + picNnmber); //画像の番号を出すやつ
      console.log(
        "json.results[0].links.html  === " + json.results[0].links.html
      );
      // ツイートするとこ
      results = json.results[0].links.html;
      console.log("results = " + results);

      twitter.post("statuses/update", { status: results }, function (
        err,
        data,
        response
      ) {
        // ツイートする
        // console.log(data);
        // console.log(response);
      });

      console.log(json["results"][0]["urls"]["full"]);
      console.log("json['results'][0]['urls']['full']");

      // fs.writeFileSync("./txt.json", JSON.stringify(json));
    })
    .catch((err) => {
      console.log("写真を取得できませんでした");
    });
  console.log("results ==== " + results);
  // setTimeout(() => {
  //   results = "ぶりぶりぶり";
  // }, 1000);
  return results;
}

const now = new Date();
let hour = now.getHours();
let min = now.getMinutes() + 1;
if (min == 59) {
  min = 0;
  hour++;
}

// cron.schedule("0 0,15,30,47 * * * *", () => {
cron.schedule("00 " + min + " " + hour + " * * *", () => {
  // console.log("おやつの時間だよ！屋台のラーメン食べに行こうよ！(*'▽')");
  get_cat_pic(getRandomInt(1, 500));
});
cron.schedule("0 * * * * *", () => {
  console.log(new Date());
});

cron.schedule("0 * * * * *", () => {
  // console.log(new Date());
  unsplash.search
    .photos("cat", 1, 1)
    .then(toJson)
    .then((json) => {
      console.log(new Date() + "取得しました");
    })
    .catch((err) => {
      // console.log("写真を取得できませんでした");
      // console.log(err);
      // get_cat_pic()
    });
});
