const settings = {
  volume: 0,
  username: "",
  darkMode: false,
  language: null,
  fontSize: undefined,
};

const user = {
  profile: null,
};

console.log("volume with || :", settings.volume || 50);
console.log("volume with ?? :", settings.volume ?? 50);

console.log("username with || :", settings.username || "Guest");
console.log("username with ?? :", settings.username ?? "Guest");

console.log("darkMode with || :", settings.darkMode || true);
console.log("darkMode with ?? :", settings.darkMode ?? true);

console.log("language :", settings.language ?? "ko");
console.log("fontSize :", settings.fontSize ?? 16);

console.log("email :", user?.profile?.email ?? "No email");
/*
volume with || : 50
volume with ?? : 0
username with || : Guest
username with ?? : 
darkMode with || : true
darkMode with ?? : false
language : ko
fontSize : 16
email : No email
*/
