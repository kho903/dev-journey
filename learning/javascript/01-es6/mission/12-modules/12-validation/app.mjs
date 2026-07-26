import { validatePassword, validateUserId } from "./validation.mjs";

console.log('validateUserId("jihun_01") :', validateUserId("jihun_01"));
console.log('validateUserId("1jihun") :', validateUserId("1jihun"));
console.log(
  'validatePassword("password123") :',
  validatePassword("password123"),
);
console.log('validatePassword("1234") :', validatePassword("1234"));
/*

validateUserId("jihun_01") : true
validateUserId("1jihun") : false
validatePassword("password123") : true
validatePassword("1234") : false

*/
