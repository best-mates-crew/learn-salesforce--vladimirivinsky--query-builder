import { LightningElement } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import workbenchStaticResource from "@salesforce/resourceUrl/workbenchStaticResource";


export default class ViQueryBuilder extends LightningElement {

  viewOptions = [
    { label: "List", value: "List" },
    { label: "Matrix", value: "Matrix" },
    { label: "Bulk", value: "Bulk" },
    { label: "CSV", value: "CSV" },
    { label: "Bulk XML", value: "Bulk XML" }
  ];

  archiveOptions = [
    { label: "Exclude", value: "Exclude" },
    { label: "Include", value: "Include" }
  ];

  connectedCallback() {
    loadStyle(this, workbenchStaticResource + "/styles/main.css");
    this.loaded = true;
  }
}
