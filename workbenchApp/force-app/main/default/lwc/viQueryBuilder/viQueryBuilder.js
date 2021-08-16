import { LightningElement } from "lwc";
import mySVG_icon from "@salesforce/resourceUrl/workbenchStaticResource";

export default class ViQueryBuilder extends LightningElement {
  warning_blueIcon = mySVG_icon + "#warning_blue";

  viewOptions = [
    {'label': 'List', 'value': 'List'},
    {'label': 'Matrix', 'value': 'Matrix'},
    {'label': 'Bulk', 'value': 'Bulk'},
    {'label': 'CSV', 'value': 'CSV'},
    {'label': 'Bulk XML', 'value': 'Bulk XML'},
];

  archiveOptions = [
    {'label': 'Exclude', 'value': 'Exclude'},
    {'label': 'Include', 'value': 'Include'},
  ]  

  async connectedCallback() {
    await loadStyle(this, workbenchStaticResource + '/styles/main.css');
    this.loaded = true;
}
}