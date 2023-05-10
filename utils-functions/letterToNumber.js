 function letterToNumber (letter) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = 0;
    for (let i = 0; i < letter.length; i++) {
      const position = alphabet.indexOf(letter[i]) + 1;
      number = number * 26 + position;
    }
    return number;
}