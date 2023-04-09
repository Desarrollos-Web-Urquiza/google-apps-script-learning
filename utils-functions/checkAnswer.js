function checkAnswer() {
    let answerFile = SpreadsheetApp.getActiveSheet(); //https://docs.google.com/spreadsheets/d/1gN2eF_l9xek_ax_dFDFSbVw3izU8c7YeNWqOcCMvbBY/edit#gid=1264652990
    let destino = SpreadsheetApp.openById("1xLMllURPx5Hpdi2Ebx6S74JW6jYusIsJYNJnEofa5oM").getSheetByName("Hoja 1");
    
    Logger.log('Hello World from GAS')

    // // Obtener el valor de la celda de origen
    // let valor = origen.getRange("RANGO_DE_LA_CELDA_ORIGEN").getValue();
    
    // // Escribir el valor en la celda de destino
    // destino.getRange("RANGO_DE_LA_CELDA_DESTINO").setValue(valor);  
}