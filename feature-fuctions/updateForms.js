const agregarValorDeSheetAGoogleForm = () => {
    const GOOGLE_SHEET_NAME = 'Hoja 1';
    let COLUMN_INDEX_FROM_FORMS = 3; // Índice de la columna que contiene los IDs de los formularios (empezando desde 1)
  
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(GOOGLE_SHEET_NAME);
    
    if (!sheet) {
      console.error("No se encontró la hoja de cálculo.");
      return;
    }
  
    let lastRow = sheet.getLastRow();
    let formIdsRange = sheet.getRange(2, COLUMN_INDEX_FROM_FORMS, lastRow - 1, 1); // Obtenemos el rango de la columna que contiene los IDs de los formularios
    let formIds = formIdsRange.getValues().flat().filter(value => value); // Obtenemos los valores de la columna y los aplanamos, eliminando valores vacíos
    
    console.log("IDs de formularios:", formIds);
  
    let COLUMN_INDEX_FROM_DATES = 1
    formIds.forEach(formId => {
      const form = FormApp.openById(formId);
      if (!form) {
        console.error("No se encontró el formulario con ID:", formId);
        return;
      }
      lastRow = sheet.getLastRow();
      columnRange = sheet.getRange(2, COLUMN_INDEX_FROM_DATES, lastRow - 1, 1); // Obtenemos el rango de la columna Horarios
      columnValues = columnRange.getValues().flat().filter(value => value); // Obtenemos los valores de la columna y los aplanamos, eliminando valores vacíos
      
      console.log("Datos de la columna:", columnValues);
  
      const formItem = form.getItems(FormApp.ItemType.CHECKBOX_GRID)[0]; // Obtenemos el primer elemento de tipo "Grupo de casillas" (CHECKBOX_GRID)
      const gridItem = formItem.asCheckboxGridItem();
  
      // Borramos todas las filas existentes en la cuadrícula
      while (gridItem.getRows() > 0) {
        gridItem.removeRow(0);
      }
  
      // Creamos un array para las filas
      const rows = [];
      // Creamos una fila en el array para cada valor en la columna Horarios
      columnValues.forEach(value => {
        rows.push([value]); // Cada fila es un array de una sola columna con el valor de la celda
      });
  
      // Establecemos todas las filas de la cuadrícula
      gridItem.setRows(rows);
  
      console.log('Valores de hoja de cálculo agregados al formulario Google.');
    });
  };