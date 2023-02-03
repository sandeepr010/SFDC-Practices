import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';
import jsonData from '@salesforce/apex/SlaceLWC.slaceActionJson';
import jsonUpdateData from '@salesforce/apex/SlaceLWC.slaceActionJsonUpdate';



export default class UpdateSlaceActionJSON extends NavigationMixin(LightningElement) {
    @api recordId;
    @track slaceAlert;
    @track oldJsonData = [];
    @track isShowDeleteButton = false;

    handleScroll(event) {

        var compEvent = component.getEvent("pathEvent");
        compEvent.setParams({ "pathIndex": indexToActive });
        compEvent.fire();

    }

    connectedCallback() {
        this.jsonFeatchDataMethod(this.recordId);
        console.log(this.recordId);
    }

    jsonFeatchDataMethod(id) {
        jsonData({ Id: id }).then((result) => {
            let jsonData = JSON.parse(result);
            this.slaceAlert = jsonData.SlaceAlert;
            console.log(jsonData);
            console.log(jsonData.Json);
            if (jsonData.Json === null) {
                let newRow = {};
                newRow.Action = '';
                newRow.Label = '';
                newRow.Path = '';
                newRow.View = '';
                this.oldJsonData.push(newRow);
            }
            else {
                this.oldJsonData = JSON.parse(jsonData.Json);
                if (this.oldJsonData.length > 1) {
                    this.isShowDeleteButton = true;
                }
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }

    addNewRow() {
        let newRow = {};
        newRow.Action = '';
        newRow.Label = '';
        newRow.Path = '';
        newRow.View = '';
        this.oldJsonData.push(newRow);
        if (this.oldJsonData.length > 1) {
            this.isShowDeleteButton = true;
        }
    }

    handleInputChange(event) {
        let changedData = event.target.value;
        let fieldName = event.target.name;
        let index = event.currentTarget.dataset.index;
        let i = 0;
        this.oldJsonData.forEach(Element => {
            if (index === i.toString()) {
                if (fieldName === 'Action') {
                    Element.Action = changedData;
                }
                else if (fieldName === 'Label') {
                    Element.Label = changedData;
                }
                else if (fieldName === 'Path') {
                    Element.Path = changedData;
                }
                else if (fieldName === 'View') {
                    Element.View = changedData;
                }
            }
            i++;
        })
    }

    handleBlurChange(event) {

    }

    removeRow(event) {
        let index = event.currentTarget.dataset.index;
        this.oldJsonData.splice(index, 1);
        if (this.oldJsonData.length === 1) {
            this.isShowDeleteButton = false;
        }
    }
    handleTextAreaChange(event) {
        this.slaceAlert = event.target.value;
        console.log(this.slaceAlert);
    }

    @api handleSubmit(event) {
        let jsonString = JSON.stringify(this.oldJsonData);
        jsonUpdateData({ Id: this.recordId, jsonData: jsonString, slaceAlert: this.slaceAlert })
            .then((result) => {
                console.log(result);
                if (result.toString() === 'success') {
                    this.navigateToRecordPage(event);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    navigateToRecordPage(evn) {
        /*setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
       }, 100);*/
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'slace__Slack_Action__c',
                actionName: 'view'
            }
        });
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    @api parentSubmit() {
        let jsonString = JSON.stringify(this.oldJsonData);
        jsonUpdateData({ Id: this.recordId, jsonData: jsonString, slaceAlert: this.slaceAlert })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}