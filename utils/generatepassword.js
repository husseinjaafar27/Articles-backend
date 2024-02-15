export const generatepassword = (myLength) => {
  const chars = "123456789abcdefghijklmnopqrstuvwxyz";
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

export const add_minutes = function (dt, minutes) {
  return new Date(dt.getTime() + minutes * 60000);
};
