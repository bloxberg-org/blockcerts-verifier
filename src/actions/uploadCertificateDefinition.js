import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import updateCertificateDefinition from './updateCertificateDefinition';
//import pdfjs from "../../node_modules/@bundled-es-modules/pdfjs-dist/build/pdf";
import pdfjs from "../helpers/pdf.js"

pdfjs.GlobalWorkerOptions.workerSrc =
    "../helpers/pdf.worker.js";

export default function uploadCertificateDefinition (file) {
  return async function (dispatch) {
    dispatch({
      type: ACTIONS.UPLOAD_CERTIFICATE_DEFINITION
    });

    if (file.type === "application/pdf"){
      console.log(file)
      console.log(typeof(file))

      var test = URL.createObjectURL( file )
      var loadingTask = pdfjs.getDocument(test);
      loadingTask.promise.then(async function(pdf) {
        const test2 = await pdf.getAttachments()
        const blob = new Blob([JSON.stringify(test2, null, 2)], {type : 'application/json'});
        const blobContent = new Blob([JSON.stringify(test2.bloxbergJSONCertificate.content, null, 2)], {type : 'application/json'})
        let jsonCert = ArrayToJSON(test2.bloxbergJSONCertificate.content)

        return dispatch(updateCertificateDefinition(jsonCert));
      }) // Promise
      function ArrayToJSON (binArray)
      {
        var str = "";
        for (var i = 0; i < binArray.length; i++) {
          str += String.fromCharCode(parseInt(binArray[i]));
        }
        return JSON.parse(str)
      } // ArrayToJson
    } // If PDF
    else {
      const definition = await domain.certificates.read(file);
      console.log(definition)
      console.log(typeof(definition))
      dispatch(updateCertificateDefinition(JSON.parse(definition)));
    }
  };
}
