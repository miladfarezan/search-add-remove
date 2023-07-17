const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function uuidv4() {
  let result = "";
  const charactersLength = characters.length;
  for (let itemNumber = 1; itemNumber <= 30; itemNumber++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
