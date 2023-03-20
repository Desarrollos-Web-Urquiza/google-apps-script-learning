function deleteRepeatedColumns(letterOfColumn) {
  let letterForDeleteDuplicates = letterOfColumn.toUpperCase().charCodeAt(0) - 65;
  var sheet = SpreadsheetApp.getActiveSheet(); // Obtiene la hoja de cálculo activa
  var data = sheet.getDataRange().getValues(); // Obtiene los datos de la hoja de cálculo
  var newData = []; // Inicializa una matriz vacía para almacenar los datos únicos
  var uniqueData = {}; // Inicializa un objeto vacío para almacenar los datos únicos
  for (var i = data.length - 1; i >= 0; i--) { // Itera a través de cada fila de datos de forma inversa
    var row = data[i]; // Obtiene la fila actual
    var key = row[letterForDeleteDuplicates]; // Obtiene el valor de la columna pasada como parametro como clave en el objeto uniqueData
    if (!uniqueData[key]) { // Si la clave no está en el objeto uniqueData, agrega la fila a la matriz newData y la clave al objeto uniqueData
      newData.unshift(row);
      uniqueData[key] = true;
    } else { // Si la clave ya está en el objeto uniqueData, elimina la fila anterior (no la actual)
      sheet.deleteRow(i+2); // Suma 2 a i para ajustar el índice de fila para borrar (la primera fila es la 1, pero el índice de la matriz comienza en 0)
    }
  }
  sheet.getDataRange().clear(); // Borra todos los datos en la hoja de cálculo
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData); // Escribe los datos únicos en la hoja de cálculo

  Logger.log('Hello World from GAS')
}