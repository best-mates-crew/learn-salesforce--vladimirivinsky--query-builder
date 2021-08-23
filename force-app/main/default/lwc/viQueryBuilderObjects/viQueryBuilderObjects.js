import { LightningElement, wire, api, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import workbenchStaticResource from "@salesforce/resourceUrl/workbenchStaticResource";
import getSObjects from "@salesforce/apex/ObjectInfoRetrieve.getSObjects";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { OPTIONS, ARCHIVE_OPTIONS } from "./viQueryBuilderObjectsHelper";

export default class ViQueryBuilderObjects extends LightningElement {
    viewOptions = [];
    fields = [];
    vOptions = OPTIONS;
    archiveOptions = ARCHIVE_OPTIONS;

    @api selectedObjectApiName;
    @track selectedObjInfo;

    @wire(getObjectInfo, { objectApiName: "$selectedObjectApiName" })
    selectedObjInfo;

    _fields = [];
    get fields() {
        if (this.selectedObjInfo && this.selectedObjInfo.data && this.selectedObjInfo.data.fields) {
            this._fields = this.selectedObjInfo.data.fields;
        }
        console.log('fileds:', this._fileds);
        return this._fields;

    }

    async connectedCallback() {
        await loadStyle(this, workbenchStaticResource + "/styles/main.css");
        this.viewOptions = await getSObjects();
    }

    handleChange(event) {
        this.selectedObjectApiName = { objectApiName: event.detail.value };
        // console.log("this.selectedObjInfo: ", this.selectedObjInfo);
        // console.log("this.fieldsName: ", this.fieldsName);
    }
    changeFileds(event) {
        console.log("this.fieldsName: ", this.fields);
    }
}
