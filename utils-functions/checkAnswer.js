function checkAnswer() {
    // https://docs.google.com/forms/d/e/1FAIpQLSddUu96_59W5A_erBxxYP7036CjeEnQulH62w-YZOzpBesW2Q/viewform
    // let answerFile = SpreadsheetApp.getActiveSheet(); //https://docs.google.com/spreadsheets/d/1gN2eF_l9xek_ax_dFDFSbVw3izU8c7YeNWqOcCMvbBY/edit#gid=1264652990
    let answerItems = SpreadsheetApp.openById("1gN2eF_l9xek_ax_dFDFSbVw3izU8c7YeNWqOcCMvbBY").getSheetByName("Respuestas de formulario 1").getRange("B:B").getValues();
    let itemsToCheck = SpreadsheetApp.openById("1xLMllURPx5Hpdi2Ebx6S74JW6jYusIsJYNJnEofa5oM").getSheetByName("Hoja 1").getRange("A:A").getValues();
    // let arrayOfNames = answerFile.getRange("A:A").getValues();
    itemsToCheck = deleteEmptyStringsFromArray(itemsToCheck);
    answerItems = deleteEmptyStringsFromArray(answerItems);
    let coincidences = compareArrays(itemsToCheck, answerItems);
    console.log(itemsToCheck)
    console.log(answerItems)
    console.log(coincidences)
    buscarYMarcarCheck(coincidences)
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

function buscarYMarcarCheck(valor = ['Ines']) {
    var hoja =  SpreadsheetApp.openById("1xLMllURPx5Hpdi2Ebx6S74JW6jYusIsJYNJnEofa5oM").getSheetByName("Hoja 1");
    var datos = hoja.getDataRange().getValues();
    for (var i = 0; i < valor.length; i++) {
        for (var j = 0; j < datos.length; j++) {
            if (datos[j][0] == valor[i][0]) {
                hoja.getRange(j+1, 2).setValue("TRUE");
                break;
            }
        }
    }
}