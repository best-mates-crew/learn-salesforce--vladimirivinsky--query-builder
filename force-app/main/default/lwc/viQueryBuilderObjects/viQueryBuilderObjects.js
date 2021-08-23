import { LightningElement, wire, api, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import workbenchStaticResource from "@salesforce/resourceUrl/workbenchStaticResource";
import getSObjects from "@salesforce/apex/ObjectInfoRetrieve.getSObjects";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { OPTIONS, ARCHIVE_OPTIONS } from "./viQueryBuilderObjectsHelper";

export default class ViQueryBuilderObjects extends LightningElement {
    viewOptions = [];
    vOptions = OPTIONS;
    archiveOptions = ARCHIVE_OPTIONS;
    isSpinner = true;

    @api selectedObjectApiName;
    selectedObjInfo;

    @wire(getObjectInfo, { objectApiName: "$selectedObjectApiName" })
    selectedObjInfo;

    get fields() {
        const fields = this.selectedObjInfo?.data?.fields || [];
        console.log('fields:', fields);
        return fields;
    }

    async connectedCallback() {
        await loadStyle(this, workbenchStaticResource + "/styles/main.css");
        this.viewOptions = await getSObjects();
        console.log('CONNECTED');
        this.isSpinner = false;
    }

    handleChange(event) {
        this.selectedObjectApiName = { objectApiName: event.detail.value };
        // console.log("this.selectedObjInfo: ", this.selectedObjInfo);
        // console.log("this.fieldsName: ", this.fieldsName);
    }
    // changeFileds(event) {
    //     console.log("this.fieldsName: ", this.fields);
    // }
}
