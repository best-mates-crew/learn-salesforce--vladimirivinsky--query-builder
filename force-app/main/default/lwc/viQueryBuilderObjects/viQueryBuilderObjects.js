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
        const values = Object.values(fields);
        const result = values.map(v => ({ label:v.label, value:v.apiName }) );
        console.log('fields:', fields);
        console.log('values:', values);
        console.log('result:', result);
        return result;
    }
    
    async connectedCallback() {
        await loadStyle(this, workbenchStaticResource + "/styles/main.css");
        this.viewOptions = await getSObjects();
        console.log('CONNECTED');
        this.isSpinner = false;
    }

    selectObjectHandler(event) {
        this.selectedObjectApiName = { objectApiName: event.detail.value };
        // console.log("this.selectedObjInfo: ", this.selectedObjInfo);
        // console.log("this.fieldsName: ", this.fieldsName);
    }
    _selected = []
    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    handleChange(e) {
        this._selected = e.detail.value;
    }
 

}
