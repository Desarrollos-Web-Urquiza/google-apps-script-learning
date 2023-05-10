function checkAnswer(letterOfColumnOfItemsForChecks, URLofAnswers, letterOfColumnFromAnswers, letterOfColumnOfItemsForCheck) {
  let sheetToCheck = SpreadsheetApp.getActiveSheet();
  let sheetToCheckSheets =  sheetToCheck.getRange(letterOfColumnFromAnswers + ":" + letterOfColumnFromAnswers).getValues();
  
  let answerItems = SpreadsheetApp.openById(URLofAnswers).getSheets()[0];
  let answerItemsSheets = answerItems.getRange(letterOfColumnOfItemsForChecks + ":" + letterOfColumnOfItemsForChecks).getValues();
  
  letterOfColumnOfItemsForCheck = letterToNumber(letterOfColumnOfItemsForCheck)
  
  let toCheckList  = deleteEmptyStringsFromArray(sheetToCheckSheets);
  let answerItemsList = deleteEmptyStringsFromArray(answerItemsSheets);
  
  let coincidences = compareArrays(toCheckList, answerItemsList);
  
  searchAndCheck(coincidences, sheetToCheck, toCheckList, letterOfColumnOfItemsForCheck)
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
    let value1 = arr1[i][0];
    for (let j = 0; j < arr2.length; j++) {
      let value2 = arr2[j][0];
      if (value1 === value2) {
        coincidences.push([value1]);
        break;
      }
    }
  }
  return coincidences;
}

function searchAndCheck(itemsToCheck, allItems, allItemsSeheets, letterOfColumnOfItemsForCheck) {
  for (var i = 0; i < itemsToCheck.length; i++) {
    for (var j = 0; j < allItemsSeheets.length; j++) {
      if (allItemsSeheets[j][0] == itemsToCheck[i][0]) {
        allItems.getRange(j+1, letterOfColumnOfItemsForCheck).setValue("TRUE");
        break;
      }
    }
  }
}
