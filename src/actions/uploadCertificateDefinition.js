import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import updateCertificateDefinition from './updateCertificateDefinition';
//import pdfjs from "../../node_modules/@bundled-es-modules/pdfjs-dist/build/pdf";
import pdfjs from '../helpers/pdf'

pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/build/pdf.worker.js';

export default function uploadCertificateDefinition (file) {

  return async function (dispatch) {
    dispatch({
      type: ACTIONS.UPLOAD_CERTIFICATE_DEFINITION
    });
    // Handler for pdf certificates
    if (file.type === "application/pdf"){
      console.log(file)
      console.log(typeof(file))

      let fileURL = URL.createObjectURL( file )
      let loadingTask = pdfjs.getDocument(fileURL);
      loadingTask.promise.then(async function(pdf) {
        const pdfAttachment = await pdf.getAttachments()
        let jsonCert = ArrayToJSON(pdfAttachment.bloxbergJSONCertificate.content)
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
      dispatch(updateCertificateDefinition(JSON.parse(definition)));
    }
  };
}
