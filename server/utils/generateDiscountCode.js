export default function () {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  // Generating a 6 letter code in which first four char will be string and last to chat will be discount %
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * letters.length);
    code += letters.charAt(index);
  }

  return code + 10;
}
