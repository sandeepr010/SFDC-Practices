import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import allData from '@salesforce/apex/SlaceLWC.slaceUpdateActionData';
import updateData from '@salesforce/apex/SlaceLWC.slaceUpdateActionUpdate';


export default class CreateViewDefinition extends NavigationMixin(LightningElement) {
    @api recordId;
    @api reid;
    @track objectName;
    @track Yaml;
    @track fieldSet = [];
    @track fieldSetLabel;
    @track fieldSetValue = 'Select an option!';
    @track json = [];
    @track quickActions = [];
    @track quickActionLabel;
    @track quickActionFieldValue = 'Select an option!';
    @track listView = [];
    @track listviewLabel;
    @track listViewFieldValue = 'Select an option!';
    @track messageHeader;
    @track messageBody;
    @track slaceAlert;
    @track selectedRadioOptions = [];
    @track jsonQueryParams = [];
    @track jsonRequestPayload = [];

    @track fieldSetNull = false;
    @track quickActionsNull = false;
    @track listViewNull = false;

    @track yamlFieldValue = false;
    @track fieldSetFieldValue = false;
    @track fieldSetDropDown = false;
    @track jsonFieldValue = false;
    @track jsonShowDeleteButton = false;
    @track quickActionValue = false;
    @track quickActionDropDown = false;
    @track listViewValue = false;
    @track listViewDropDown = false;
    @track messageFieldValue = false;
    @track slaceAlertFieldValue = false;
    @track submitButton = false;

    get radioOptions() {
        return [
            { label: 'Yaml', value: 'Yaml', disable: false },
            { label: 'FieldSet', value: 'FieldSet', disable: false },
            { label: 'Json', value: 'Json', disable: false },
            { label: 'QuickAction', value: 'QuickAction', disable: false },
            { label: 'ListView', value: 'ListView', disable: false },
            { label: 'Message', value: 'Message', disable: false },
        ];

        //{ label: 'SlaceAlert', value: 'SlaceAlert' },
    }

    get DataTypeOptions() {
        return [
            { label: 'textInput', value: 'textInput' },
            { label: 'datepicker', value: 'datepicker' },
            { label: 'timepicker', value: 'timepicker' },
            { label: 'select', value: 'select' },
            { label: 'externalselect', value: 'externalselect' },
        ];
    }

    connectedCallback() {
        console.log(this.reid);
        this.dataCollection(this.reid);
        setTimeout(() => {
            this.radioActiveCheck();
       }, 1000);
    }

    dataCollection(recId) {
        allData({ Idval: recId }).then((result) => {
            let jsonData = JSON.parse(result);
            console.log(jsonData.fieldSet);
            if (jsonData.objectName !== null) {
                this.objectName = jsonData.objectName;
            }
            if (jsonData.yaml !== null) {
                this.Yaml = jsonData.yaml;
            }
            if (jsonData.fieldSet !== null) {
                jsonData.fieldSet.forEach(element => {
                    this.fieldSet.push(element);
                });
                //this.fieldSet = jsonData.fieldSet;
                this.fieldSetLabel = this.objectName + '- Slack View FieldSet';
            }
            if (jsonData.json !== null) {
                let jsonArray = JSON.parse(jsonData.json);
                if (jsonArray.length > 1) {
                    this.jsonShowDeleteButton = true;
                }
                this.json = jsonArray;
            }
            else {
                let emptyArry = [];
                let arry = {};
                arry.Label = '';
                arry.Path = '';
                arry.Type = 'textInput';
                arry.Required = false;
                arry.QueryParam = false;
                emptyArry.push(arry);
                this.json = emptyArry;
            }
            if (jsonData.queryParam !== null) {
                let jsonArray = JSON.parse(jsonData.queryParam);
                this.jsonQueryParams = jsonArray;
            }
            if (jsonData.required !== null) {
                let jsonArray = JSON.parse(jsonData.required);
                this.jsonRequestPayload = jsonArray;
            }
            if (jsonData.quickAction !== null) {
                this.quickActionLabel = this.objectName + '- Slack View Quick Actions';
                this.quickActions = Object.values(jsonData.quickAction);
            }
            if (jsonData.listView !== null) {
                this.listviewLabel = this.objectName + '- Slack View ListView';
                this.listView = jsonData.listView;
            }
            if (jsonData.messageHeader !== null) {
                this.messageHeader = jsonData.messageHeader;
            }
            if (jsonData.messageBody !== null) {
                this.messageBody = jsonData.messageBody;
            }
            /*
            if (jsonData.slaceAlert !== null) {
                this.slaceAlert = jsonData.slaceAlert;
            }*/
        }).catch((error) => {
            console.log(error);
        });
    }

    tostMessage(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    radioActiveCheck() {
        this.radioOptions.forEach(Element => {
            if (Element.value.toString() === 'FieldSet') {
                if (this.fieldSet.length === 0) {
                    this.fieldSetNull = true;
                }
            } else if (Element.value === 'QuickAction' && this.quickActions.length === 0) {
                this.quickActionsNull = true;
            } else if (Element.value === 'ListView' && this.listView.length === 0) {
                this.listViewNull = true;
            }
        })
    }

    handleRadioChange(event) {
        let selectedOption = event.target.value;
        this.submitButton = true;
        if (selectedOption === 'Yaml') {
            this.yamlFieldValue = true;
            let count = 0;
            this.selectedRadioOptions.forEach(Element => {
                if (Element === 'Yaml') {
                    count = 1;
                }
            })
            if (count === 0) {
                this.selectedRadioOptions.push('Yaml');
            }
        } else {
            this.yamlFieldValue = false;
        }
        /*
        if (selectedOption === 'SlaceAlert') {
            this.slaceAlertFieldValue = true;
            let count = 0;
            this.selectedRadioOptions.forEach(Element => {
                if (Element === 'SlaceAlert') {
                    count = 1;
                }
            })
            if (count === 0) {
                this.selectedRadioOptions.push('SlaceAlert');
            }
        } else {
            this.slaceAlertFieldValue = false;
        }*/

        if (selectedOption === 'Message') {
            this.messageFieldValue = true;
            let count = 0;
            this.selectedRadioOptions.forEach(Element => {
                if (Element === 'Message') {
                    count = 1;
                }
            })
            if (count === 0) {
                this.selectedRadioOptions.push('Message');
            }
        } else {
            this.messageFieldValue = false;
        }

        if (selectedOption === 'FieldSet') {
            if (this.fieldSetNull === false) {

                this.fieldSetFieldValue = true;
                let count = 0;
                let index = 0;
                let validate = false;
                let i = 0;
                this.selectedRadioOptions.forEach(Element => {
                    if (Element === 'FieldSet') {
                        count = 1;
                    }
                    if (Element === 'QuickAction') {
                        index = i;
                        validate = true;
                    }
                    i++;
                })
                if (validate === true) {
                    this.selectedRadioOptions.splice(index, 1);
                }
                if (count === 0) {
                    this.selectedRadioOptions.push('FieldSet');
                }
            }
            else {
                this.tostMessage('Object Missing', 'Please Check Object Name is populated in Object Name Field!', 'warning');
            }
        } else {
            this.fieldSetFieldValue = false;
        }

        if (selectedOption === 'ListView') {
            if (this.listViewNull === false) {
                this.listViewValue = true;
                let count = 0;
                this.selectedRadioOptions.forEach(Element => {
                    if (Element === 'ListView') {
                        count = 1;
                    }
                })
                if (count === 0) {
                    this.selectedRadioOptions.push('ListView');
                }
            }
            else {
                this.tostMessage('Object Missing', 'Please Check Object Name is populated in Object Name Field!', 'warning');
            }
        } else {
            this.listViewValue = false;
        }
        if (selectedOption === 'Json') {
            this.jsonFieldValue = true;
            let count = 0;
            this.selectedRadioOptions.forEach(Element => {
                if (Element === 'Json') {
                    count = 1;
                }
            })
            if (count === 0) {
                this.selectedRadioOptions.push('Json');
            }
        } else {
            this.jsonFieldValue = false;
        }
        if (selectedOption === 'QuickAction') {
            if (this.quickActionsNull === false) {
                this.quickActionValue = true;
                let index = 0;
                let validate = false;
                let count = 0;
                let i = 0;
                this.selectedRadioOptions.forEach(Element => {
                    if (Element === 'QuickAction') {
                        count = 1;
                    }
                    if (Element === 'FieldSet') {
                        index = i;
                        validate = true;
                    }
                    i++;
                })
                if (validate === true) {
                    this.selectedRadioOptions.splice(index, 1);
                }
                if (count === 0) {
                    this.selectedRadioOptions.push('QuickAction');
                }
            }
            else {
                this.tostMessage('Object Missing', 'Please Check Object Name is populated in Object Name Field!', 'warning');
            }
        } else {
            this.quickActionValue = false;
        }
    }

    handleInputChange(event) {
        let changedField = event.target.name;
        let changedData = event.target.value;
        let index = event.currentTarget.dataset.index;
        let i = 0;
        this.json.forEach(Element => {
            if (i.toString() === index) {
                if (changedField === 'Label') {
                    Element.Label = changedData;
                }
                else if (changedField === 'Name') {
                    Element.Path = changedData;
                }
                else if (changedField === 'Type') {
                    Element.Type = changedData;
                }
                else if (changedField === 'Required') {
                    let checkVal = event.target.checked;
                    Element.Required = checkVal;
                    if (checkVal === true) {
                        let arr = {};
                        arr.index = i;
                        arr.Label = Element.Label;
                        arr.Path = Element.Path;
                        this.jsonRequestPayload.push(arr);
                    } else {
                        let rIndex;
                        let j = 0
                        this.jsonRequestPayload.forEach(Element => {
                            if (Element.index.toString() === i.toString()) {
                                rIndex = j;
                            }
                        })
                        if (rIndex !== undefined) {
                            this.jsonRequestPayload.splice(rIndex, 1);
                        }
                    }
                }
                else if (changedField === 'QueryParam') {
                    let checkVal = event.target.checked;
                    Element.QueryParam = checkVal;
                    if (checkVal === true) {
                        let arr = {};
                        arr.index = i;
                        arr.Label = Element.Label;
                        arr.Path = Element.Path;
                        this.jsonQueryParams.push(arr);
                    }
                    else {
                        let rIndex;
                        let j = 0;
                        this.jsonQueryParams.forEach(Element => {
                            if (Element.index.toString() === i.toString()) {
                                rIndex = j;
                            }
                            j++;
                        })
                        if (rIndex !== undefined) {
                            this.jsonQueryParams.splice(rIndex, 1);
                        }
                    }
                }
            }
            i++;
        })
    }

    addNewRow() {
        let arry = {};
        arry.Label = '';
        arry.Path = '';
        arry.Type = 'textInput';
        arry.Required = false;
        arry.QueryParam = false;
        this.json.push(arry);
        if (this.json.length > 1) {
            this.jsonShowDeleteButton = true;
        }
    }

    removeRow(event) {
        let index = event.target.name;
        this.json.splice(index, 1);
        if (this.jsonRequestPayload.length > 0) {
            let indexV;
            let i = 0;
            this.jsonRequestPayload.forEach(Element => {
                if (Element.index === index) {
                    indexV = i;
                }
                i++;
            })
            if (indexV !== undefined) {
                this.jsonRequestPayload.splice(indexV, 1);
            }
        }
        if (this.jsonQueryParams.length > 0) {
            let indexV;
            let i = 0;
            this.jsonQueryParams.forEach(Element => {
                if (Element.index === index) {
                    indexV = i;
                }
                i++;
            })
            if (indexV !== undefined) {
                this.jsonQueryParams.splice(indexV, 1);
            }
        }
        if (this.json.length === 1) {
            this.jsonShowDeleteButton = false;
        }
    }

    handleBlurChange(event) {

    }

    @track fieldSetClickCount = 0;
    @track fieldSetSeletedOption;

    fieldSetClick() {
        if (this.fieldSetClickCount === 0) {
            this.fieldSetDropDown = true;
            this.fieldSetClickCount = 1;
        }
        else {
            this.fieldSetDropDown = false;
            this.fieldSetClickCount = 0;
        }
    }

    fieldSetOption(event) {
        let option = event.currentTarget.dataset.id;
        this.fieldSetValue = option;
        this.fieldSetSeletedOption = option;
        this.fieldSetDropDown = false;
        this.fieldSetClickCount = 0;
    }

    @track quickActionClickCount = 0;
    @track quickActionSeletedOption;
    quickActionClick() {
        if (this.quickActionClickCount === 0) {
            this.quickActionDropDown = true;
            this.quickActionClickCount = 1;
        }
        else {
            this.quickActionDropDown = false;
            this.quickActionClickCount = 0;
        }
    }
    quickActionOption(event) {
        let option = event.currentTarget.dataset.id;
        this.quickActionFieldValue = option;
        this.quickActionSeletedOption = option;
        this.quickActionDropDown = false;
        this.quickActionClickCount = 0;
    }

    @track listViewClickCount = 0;
    @track listViewSeletedOption;
    listViewClick() {
        if (this.listViewClickCount === 0) {
            this.listViewDropDown = true;
            this.listViewClickCount = 1;
        }
        else {
            this.listViewDropDown = false;
            this.listViewClickCount = 0;
        }
    }

    listViewOption(event) {
        let option = event.currentTarget.dataset.id;
        this.listViewFieldValue = option;
        this.listViewSeletedOption = option;
        this.listViewDropDown = false;
        this.listViewClickCount = 0;
    }

    @track NewYaml;
    @track NewSlaceAlert;
    @track newMessageHeader;
    @track newMessageBody;

    handleTextAreaChange(event) {
        let fieldName = event.target.name;
        let value = event.target.value;
        if (fieldName === 'yaml') {
            this.NewYaml = value;
            this.Yaml = value;
        }
        /*
        if (fieldName === 'slaceAlert') {
            this.NewSlaceAlert = value;
            this.slaceAlert = value;
        }*/
        if (fieldName === 'MessageHeader') {
            this.newMessageHeader = value;
            this.messageHeader = value;
        }
        if (fieldName === 'MessageBody') {
            this.newMessageBody = value;
            this.messageBody = value;
        }
    }
    handleTextChange(event) {
        console.log(event.target.value);
    }

    @api handleSubmit() {
        let jsonData = {};
        let mainJson;
        let jsonQueryParams;
        let jsonRequestPayload;
        this.selectedRadioOptions.forEach(Element => {
            if (Element === 'Yaml') {
                if (this.NewYaml !== undefined) {
                    jsonData.Yaml = this.NewYaml;
                }
            }
            else if (Element === 'Json') {
                mainJson = JSON.stringify(this.json);
                jsonQueryParams = JSON.stringify(this.jsonQueryParams);
                jsonRequestPayload = JSON.stringify(this.jsonRequestPayload);
            }
            else if (Element === 'FieldSet') {
                if (this.fieldSetSeletedOption !== undefined) {
                    jsonData.FieldSet = this.fieldSetSeletedOption;
                }
            }
            else if (Element === 'QuickAction') {
                if (this.quickActionSeletedOption !== undefined) {
                    jsonData.QuickAction = this.quickActionSeletedOption;
                }
            }
            else if (Element === 'ListView') {
                if (this.listViewFieldValue !== undefined) {
                    jsonData.ListView = this.listViewFieldValue;
                }
            }/*
            else if (Element === 'SlaceAlert') {
                if (this.NewSlaceAlert !== undefined) {
                    jsonData.SlaceAlert = this.NewSlaceAlert;
                }
            }*/
            else if (Element === 'Message') {
                if (this.newMessageHeader !== undefined) {
                    jsonData.messageHeader = this.newMessageHeader;
                }
                if (this.newMessageBody !== undefined) {
                    jsonData.messageBody = this.newMessageBody;
                }
            }
        })
        let jsonStringLWC = JSON.stringify(jsonData);
        updateData({ Id: this.recordId, data: jsonStringLWC, jsonStrig: mainJson, queryParams: jsonQueryParams, requestPayload: jsonRequestPayload }).then((result) => {
            console.log(result);
            if (result.toString() === 'success') {
                this.navigateToRecordPage();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    navigateToRecordPage() {
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
        let jsonData = {};
        let mainJson;
        let jsonQueryParams;
        let jsonRequestPayload;
        this.selectedRadioOptions.forEach(Element => {
            if (Element === 'Yaml') {
                if (this.NewYaml !== undefined) {
                    jsonData.Yaml = this.NewYaml;
                }
            }
            else if (Element === 'Json') {
                mainJson = JSON.stringify(this.json);
                jsonQueryParams = JSON.stringify(this.jsonQueryParams);
                jsonRequestPayload = JSON.stringify(this.jsonRequestPayload);
            }
            else if (Element === 'FieldSet') {
                if (this.fieldSetSeletedOption !== undefined) {
                    jsonData.FieldSet = this.fieldSetSeletedOption;
                }
            }
            else if (Element === 'QuickAction') {
                if (this.quickActionSeletedOption !== undefined) {
                    jsonData.QuickAction = this.quickActionSeletedOption;
                }
            }
            else if (Element === 'ListView') {
                if (this.listViewFieldValue !== undefined) {
                    jsonData.ListView = this.listViewFieldValue;
                }
            }/*
            else if (Element === 'SlaceAlert') {
                if (this.NewSlaceAlert !== undefined) {
                    jsonData.SlaceAlert = this.NewSlaceAlert;
                }
            }*/
            else if (Element === 'Message') {
                if (this.newMessageHeader !== undefined) {
                    jsonData.messageHeader = this.newMessageHeader;
                }
                if (this.newMessageBody !== undefined) {
                    jsonData.messageBody = this.newMessageBody;
                }
            }
        })
        let jsonStringLWC = JSON.stringify(jsonData);
        updateData({ Id: this.recordId, data: jsonStringLWC, jsonStrig: mainJson, queryParams: jsonQueryParams, requestPayload: jsonRequestPayload }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
        console.log(jsonData);
    }
}