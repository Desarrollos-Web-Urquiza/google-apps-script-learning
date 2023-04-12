function checkAnswer() {
  // https://docs.google.com/forms/d/e/1FAIpQLSddUu96_59W5A_erBxxYP7036CjeEnQulH62w-YZOzpBesW2Q/viewform
  // let answerFile = SpreadsheetApp.getActiveSheet(); //https://docs.google.com/spreadsheets/d/1gN2eF_l9xek_ax_dFDFSbVw3izU8c7YeNWqOcCMvbBY/edit#gid=1264652990
  let answerItems = SpreadsheetApp.openById("1gN2eF_l9xek_ax_dFDFSbVw3izU8c7YeNWqOcCMvbBY").getSheets()[0].getRange("B:B").getValues();
  let sheetToCheck = SpreadsheetApp.openById("1xLMllURPx5Hpdi2Ebx6S74JW6jYusIsJYNJnEofa5oM").getSheets()[0].getRange("A:A").getValues();
  sheetToCheck = deleteEmptyStringsFromArray(sheetToCheck);
  answerItems = deleteEmptyStringsFromArray(answerItems);
  let coincidences = compareArrays(sheetToCheck, answerItems);
  console.log(sheetToCheck)
  console.log(answerItems)
  console.log(coincidences)
  searchAndCheck(coincidences, sheetToCheck)
}

function deleteEmptyStringsFromArray (array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element[0] !== '') {
      newArray.push(element);
    }
  }
  return newArray;
}

function compareArrays(arr1, arr2) {
  let coincidences = [];
  for (let i = 0; i < arr1.length; i++) {
    let value1 = arr1[i][0]; // acceder al valor dentro del array interno
    for (let j = 0; j < arr2.length; j++) {
      let value2 = arr2[j][0]; // acceder al valor dentro del array interno
      if (value1 === value2) {
        coincidences.push([value1]); // envolver en array interno
        break;
      }
    }
  }
  return coincidences;
}

function searchAndCheck(itemsToCheck, sheetToCheck) {
  // var hoja =  SpreadsheetApp.openById("1xLMllURPx5Hpdi2Ebx6S74JW6jYusIsJYNJnEofa5oM").getSheetByName("Hoja 1");
  var allItems = sheetToCheck.getDataRange().getValues();
  for (var i = 0; i < itemsToCheck.length; i++) {
    for (var j = 0; j < allItems.length; j++) {
      if (allItems[j][0] == itemsToCheck[i][0]) {
        sheetToCheck.getRange(j+1, 2).setValue("TRUE");
        break;
      }
    }
  }
}