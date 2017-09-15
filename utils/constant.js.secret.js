//吃苹果
var CHIPINGGUO = "../../images/吃苹果.png";
//url相关
var BASE_URL = "http://gank.io/api";
var GET_MEIZHI_URL = BASE_URL.concat("/data/%E7%A6%8F%E5%88%A9/10/");
var DETECTION_URL = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
var DETECTION_API_KEY = "cood3XxjyGfvm16dPz203aLcFSxHo-PY";
var DETECTION_API_SECRET = "Y-A2vOXNLu9lVl_rkR19nt9EPKuhG5B_";
var PUBLISH_AID = 1284960;
var PUBLISH_URL = "http://up.imgapi.com/";
var PUBLISH_TOKEN = "9f2298aa8b27a8b93f1ddfb30126547d6206f51d:ljw_ybPUH2FzAyKbgPS1IjizTFw=:eyJkZWFkbGluZSI6MTQ4OTIyMDU5MSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNTg3ODQ2IiwiYWlkIjoiMTI4NDk2MCIsImZyb20iOiJmaWxlIn0=";
// 将方法、变量暴露出去
module.exports = {
    CHIPINGGUO: CHIPINGGUO,
    BASE_URL: BASE_URL,
    GET_MEIZHI_URL: GET_MEIZHI_URL,
    DETECTION_URL: DETECTION_URL,
    DETECTION_API_KEY: DETECTION_API_KEY,
    DETECTION_API_SECRET: DETECTION_API_SECRET,
    PUBLISH_AID: PUBLISH_AID,
    PUBLISH_URL: PUBLISH_URL,
    PUBLISH_TOKEN: PUBLISH_TOKEN
}
