import { LightningElement, wire, api, track } from 'lwc';
import { loadStyle } from "lightning/platformResourceLoader";
import workbenchStaticResource from "@salesforce/resourceUrl/workbenchStaticResource";
import getSObjects from "@salesforce/apex/ObjectInfoRetrieve.getSObjects";
import { getObjectInfo } from 'lightning/uiObjectInfoApi';


export default class ViQueryBuilderObjects extends LightningElement {


    @api selectedObjectApiName;
    @track selectedObjInfo;

    @wire(getObjectInfo, { objectApiName: '$selectedObjectApiName' }) selectedObjInfo;

    // get multiselectOpitns() {
    //     console.log('this.selectedObjInfo:', this.selectedObjInfo);
    //     return this.selectedObjInfo || 'JOPA';
    // }

    viewOptions = [];

    dValue = [];

    vOptions = [
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

    async connectedCallback() {
        await loadStyle(this, workbenchStaticResource + "/styles/main.css");
        this.viewOptions = await getSObjects();
    }

    handleChange(event) {
        this.selectedObjectApiName = { objectApiName: event.detail.value };
        console.log("this.viewValue: ", this.selectedObjectApiName);
    }


}