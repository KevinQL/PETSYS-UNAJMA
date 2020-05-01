


/**
 * Regresa el mensaje especificado en mayuscula.
 * @param {string} msj 
 * @return {string} 
 */
function msjpruebaM(msj){
    return msj.toLocaleUpperCase();
}



/**
 * 
 * @param {object} knn 
 * @param {string} name 
 */
// Temporary save code until ml5 version 0.2.2
const save1 = (knn, name) => {
    const dataset = knn.knnClassifier.getClassifierDataset();
    if (knn.mapStringToIndex.length > 0) {
      Object.keys(dataset).forEach(key => {
        if (knn.mapStringToIndex[key]) {
          dataset[key].label = knn.mapStringToIndex[key];
        }
      });
    }
    const tensors = Object.keys(dataset).map(key => {
      const t = dataset[key];
      if (t) {
        return t.dataSync();
      }
      return null;
    });
    let fileName = 'myKNN.json';
    if (name) {
      fileName = name.endsWith('.json') ? name : `${name}.json`;
    }
    saveFile(fileName, JSON.stringify({
      dataset,
      tensors
    }));
};
  


const saveFile = (name, data) => {
    const downloadElt = document.createElement('a');
    const blob = new Blob([data], {
    type: 'octet/stream'
    });
    const url = URL.createObjectURL(blob);
    downloadElt.setAttribute('href', url);
    downloadElt.setAttribute('download', name);
    downloadElt.style.display = 'none';
    document.body.appendChild(downloadElt);
    downloadElt.click();
    document.body.removeChild(downloadElt);
    URL.revokeObjectURL(url);
};

  
  
/**
 * 
 * @param {*} etiqueta 
 */
function tratarEtiqueta(etiqueta){
    let nombre_tag, id_tag;
    let arrayResult = etiqueta.split(",");
    nombre_tag = arrayResult[0];
    id_tag = arrayResult[1];

    return { 
        nombre_tag, 
        id_tag
    };    

}