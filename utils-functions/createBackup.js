function createBackup() {
    var documentoId = "ID_DEL_DOCUMENTO"; // Reemplaza "ID_DEL_DOCUMENTO" con el ID del documento que deseas hacer backup
    var nombreBackup = "Backup del documento " + new Date().toLocaleString(); // Define el nombre del backup
    
    var documento = DriveApp.getFileById(documentoId);
    var folder = DriveApp.getRootFolder(); // Define la carpeta donde se guardará el backup (en este ejemplo, la carpeta raíz)
    
    documento.makeCopy(nombreBackup, folder); // Genera la copia de seguridad del documento y la guarda en la carpeta definida
  }