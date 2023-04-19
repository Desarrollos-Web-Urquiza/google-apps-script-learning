function crearDocumento () {
   
   let doc = DocumentApp.create('Mi primer documento en GAS');

   doc.getBody().appendParagraph('Hola mundo. ¿Cómo están?');

}

function abrirDocumento () {
   
  let doc = DocumentApp.openById('1kz37nx804o5Ho_r7rOAtZUz_-8bDEzGj-51mAO0Jo6k');

  doc.getBody().appendParagraph('Agregando un párrafo nuevo con GAS');

}

function modificarDocumento () {
   
  let doc = DocumentApp.openById('1kz37nx804o5Ho_r7rOAtZUz_-8bDEzGj-51mAO0Jo6k');

  let parrafos = doc.getBody().getParagraphs();

  if(parrafos[0].getText() === "Modificar el párrafo con GAS") parrafos[0].setText('Parrafo modificado con una condición')
  
  if(parrafos[0].isLeftToRight()) parrafos[0].setSpacingAfter(false)
  
  if(parrafos[0].isLeftToRight()) 
    parrafos[0].setSpacingAfter(false);
  else  
    parrafos[0].setSpacingAfter(true);

  Logger.log('Espacio despues del tercer parrafo' + parrafos[2].getSpacingAfter())

  if( parrafos[1].getSpacingAfter() == null)
    parrafos[1].setSpacingAfter(10)
  else if( parrafos[1].getSpacingAfter() == 10)
    parrafos[1].setSpacingAfter(10)
  else if( parrafos[1].getSpacingAfter() == 20)
    parrafos[1].setSpacingAfter(30)
  else
    parrafos[1].setSpacingAfter(null)




//   parrafos[0].setText('Modificar el párrafo con GAS');

//   parrafos[0].setLeftToRight(false);

//   let estilo1 = {};

//   estilo1[DocumentApp.Attribute.BACKGROUND_COLOR] = '#444444';
//   estilo1[DocumentApp.Attribute.FONT_SIZE] = 24;

//   parrafos[1].setAttributes(estilo1);
//   parrafos[2].setAttributes({
//     BACKGROUND_COLOR: '#444444',
//     FOREGROUND_COLOR: '#999999',
//     BOLD: true,
//     FONT_SIZE: 22
//   });

}