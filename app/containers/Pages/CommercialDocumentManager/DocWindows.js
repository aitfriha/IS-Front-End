import React, { Component } from 'react';
//import './App.css';

class DocWindows extends Component {


  componentDidMount() {

    const doc = this.props.doc;
    let fileType = doc.extension !== "cell" ? doc.extension.replace(".", "") : "xlsx";
    let documentType = ""
    switch (fileType) {
      case "ots": case "fods": case "xltx": case "xltm": case "xlt": case "xlsm": case "gsheet": case "xlsy":
      case "xlst": case "csv": case "ods": case "xls":
      case "xlsx": {
        documentType = "cell";
        break;
      }
      case "otp": case "fodp": case "pptm": case "ppsm": case "potx": case "potm": case "gslides":
      case "ppty": case "pptt": case "odp": case "ppsx": case "pps": case "ppt":
      case "pptx": {
        documentType = "slide";
        break
      }
      case "ott": case "fodt": case "dotx": case "dotm": case "dot": case "docm": case "xps": case "djvu": case "epub":
      case "html": case "htm": case "mht": case "pdf": case "rtf": case "txt": case "gdoc": case "odt": case "doct": case "doc":
      case "docx": {
        documentType = "word"
        break
      }
      default: {
        break;
      }
    }
    if (fileType !== "" && documentType !== "") {
      let config = {
        //"type": "embedded",
        "document": {
          "fileType": fileType,
          "key": doc.id,
          "title": doc.name,
          "url": doc.src
        },
        "parentOrigin": "https://192.168.100.8",
        "documentType": documentType,
        "editorConfig": {
          "callbackUrl": "https://192.168.100.8/url-to-callback.ashx"
        }
      };
      new window.DocsAPI.DocEditor("placeholder", config);
    }
  }

  render() {
    return (
      <div id="placeholder">
      </div>
    );
  }

}
export default DocWindows;