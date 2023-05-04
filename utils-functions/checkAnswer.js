function checkAnswer(letterOfColumnOfItemsForChecks, URLofAnswers, letterOfColumnFromAnswers) {
  let sheetToCheck = SpreadsheetApp.getActiveSheet()
  
  let sheetToCheckSheets =  sheetToCheck.getRange(letterOfColumnFromAnswers + ":" + letterOfColumnFromAnswers).getValues();
  let answerItems = SpreadsheetApp.openById(URLofAnswers).getSheets()[0];
  let answerItemsSheets = answerItems.getRange(letterOfColumnOfItemsForChecks + ":" + letterOfColumnOfItemsForChecks).getValues();
  let toCheckList  = deleteEmptyStringsFromArray(sheetToCheckSheets);
  let answerItemsList = deleteEmptyStringsFromArray(answerItemsSheets);
  
  let coincidences = compareArrays(toCheckList, answerItemsList);
  searchAndCheck(coincidences, sheetToCheck, toCheckList)
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
  console.log('arr1, arr2', arr1, arr2);
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

function searchAndCheck(itemsToCheck, allItems, allItemsSeheets) {
  // var allItems = SpreadsheetApp.openById("1xLMllURPx5Hpdi2Ebx6S74JW6jYusIsJYNJnEofa5oM").getSheetByName("Hoja 1");
  // allItemsSeheets = allItems.getDataRange().getValues();
  console.log('allItems', allItems);
  console.log('itemsToCheck', itemsToCheck);
  console.log('allItemsSeheets', allItemsSeheets.length);
  for (var i = 0; i < itemsToCheck.length; i++) {
    for (var j = 0; j < allItemsSeheets.length; j++) {
      console.log('allItems.getRange(j+1, 2)', allItems.getRange(j+1, 2));
      if (allItemsSeheets[j][0] == itemsToCheck[i][0]) {
        // console.log('allItems', allItems);
        allItems.getRange(j+1, 2).setValue("TRUE");
        break;
      }
    }
  }
}