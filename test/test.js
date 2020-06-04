const get_cat_pic = require("./../index");

describe("番号の猫の写真を取得する", () => {
  it("3番の画像を取得しました", () => {
    // for (let index = 1; index < 10; index++) {
    //   // const element = array[index];

    // }
    get_cat_pic(3);
  });
});
