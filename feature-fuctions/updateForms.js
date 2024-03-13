const agregarValorDeSheetAGoogleForm = () => {
  const GOOGLE_SHEET_NAME = 'Hoja 1';
  let COLUMN_INDEX_FROM_FORMS = 4; // Índice de la columna que contiene los IDs de los formularios (empezando desde 1)

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
  let COLUMN_INDEX_FROM_HORARIES = 2
  formIds.forEach(formId => {
    const form = FormApp.openById(formId);
    if (!form) {
      console.error("No se encontró el formulario con ID:", formId);
      return;
    }
    lastRow = sheet.getLastRow();
    
    columnRange = sheet.getRange(2, COLUMN_INDEX_FROM_DATES, lastRow - 1, 1); // Obtenemos el rango de la columna Horarios
    columnValues = columnRange.getValues().flat().filter(value => value); // Obtenemos los valores de la columna y los aplanamos, eliminando valores vacíos
    
    columnRangeHoraries = sheet.getRange(2, COLUMN_INDEX_FROM_HORARIES, lastRow - 1, 1); // Obtenemos el rango de la columna Horarios
    columnValuesHoraries = columnRangeHoraries.getValues().flat().filter(value => value); // Obtenemos los valores de la columna y los aplanamos, eliminando valores vacíos
    
    console.log('columnValuesHoraries', columnValuesHoraries)
    console.log("Datos de la columna:", columnValues);

    const formItem = form.getItems(FormApp.ItemType.CHECKBOX_GRID)[0]; // Obtenemos el primer elemento de tipo "Grupo de casillas" (CHECKBOX_GRID)
    const gridItem = formItem.asCheckboxGridItem();

    // Borramos todas las filas existentes en la cuadrícula
    while (gridItem.getRows() > 0) {
      gridItem.removeRow(0);
      gridItem.removeColumn(0);
    }

    // Creamos un array para las filas
    const rows = [];
    const columns = [];
    // Creamos una fila en el array para cada valor en la columna Horarios
    columnValues.forEach(value => {
      rows.push([value]); // Cada fila es un array de una sola columna con el valor de la celda
    });

    columnValuesHoraries.forEach(value => {
      columns.push([value]); // Cada fila es un array de una sola columna con el valor de la celda
    });

    // Establecemos todas las filas de la cuadrícula
    gridItem.setColumns(columns);

    // Establecemos todas las filas de la cuadrícula
    gridItem.setRows(obtenerFechasSabadosDomingos());

    console.log('fechas', obtenerFechasSabadosDomingos());

    console.log('Valores de hoja de cálculo agregados al formulario Google.');
  });
};

function obtenerFechasSabadosDomingos() {
const hoy = new Date(); // Obtener la fecha actual
const mesActual = hoy.getMonth(); // Obtener el mes actual (0-11)
const añoActual = hoy.getFullYear(); // Obtener el año actual

const fechasSabadosDomingos = [];

// Iterar por cada día del mes actual
for (let dia = 1; dia <= 31; dia++) {
  const fecha = new Date(añoActual, mesActual, dia);
  // Verificar si la fecha pertenece al mes actual
  if (fecha.getMonth() === mesActual) {
    const diaSemana = fecha.getDay(); // Obtener el día de la semana (0-6, 0:Domingo, 1:Lunes, ..., 6:Sábado)
    // Verificar si es sábado (6) o domingo (0)
    if (diaSemana === 6 || diaSemana === 0) {
      const nombreDia = diaSemana === 6 ? 'SÁB' : 'DOM';
      const fechaFormato = `${nombreDia} ${fecha.getDate().toString().padStart(2, '0')}`;
      fechasSabadosDomingos.push(fechaFormato);
    }
  }
}

// Imprimir las fechas encontradas
console.log("Fechas de sábados y domingos del mes actual:");
fechasSabadosDomingos.forEach(fecha => {
  console.log(fecha);
});

// Devolver las fechas en un array (opcional, según tus necesidades)
return fechasSabadosDomingos;
}