export default function () {
  let code = ''
  for (let i = 0; i < 4; i++) {
    // Decide if the character is a letter or number
    const numOrLetter = Math.random() * 10
    if (numOrLetter < 5) {
      code += `${Math.floor(Math.random() * 10)}`
    } else {
      code += `${String.fromCharCode(Math.random() * (91 - 65) + 65)}`
    }
  }
  return code
}
