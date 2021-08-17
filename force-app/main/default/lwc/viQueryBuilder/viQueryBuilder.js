import { LightningElement, wire } from "lwc";
import { getObjectInfos } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
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

    @wire(getObjectInfos, { objectApiNames: [ ACCOUNT_OBJECT, OPPORTUNITY_OBJECT ] })
    objectInfo;




    async connectedCallback() {
        await loadStyle(this, workbenchStaticResource + "/styles/main.css");
        this.loaded = true;
    }

    get options() {
      return [
          { label: 'New', value: 'new' },
          { label: 'In Progress', value: 'inProgress' },
          { label: 'Finished', value: 'finished' },
      ];
  }

  handleChange(event) {
      this.value = event.detail.value;
  }

}
