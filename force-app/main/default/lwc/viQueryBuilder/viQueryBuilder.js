import { LightningElement, wire } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import workbenchStaticResource from "@salesforce/resourceUrl/workbenchStaticResource";
import getobjNames from "@salesforce/apex.ObjectRetieveController.getobjNames"

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

    @wire(getobjNames)
    objNames;

    @wire(getobjNames)
    wiredobjNames({ error, data }) {
        if (data) {
            this.objNames = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.objNames = undefined;
        }
    }




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