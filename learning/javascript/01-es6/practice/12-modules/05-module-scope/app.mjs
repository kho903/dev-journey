import { getUserName } from "./user.mjs";
import { getProductName } from "./product.mjs";

console.log("getUerName() :", getUserName());
console.log("getProductName() :", getProductName());

// 다른 모듈의 변수는 자동으로 현재 파일에 노출되지 않음
/*
getUerName() : JIHUN
getProductName() : Keyboard
*/
