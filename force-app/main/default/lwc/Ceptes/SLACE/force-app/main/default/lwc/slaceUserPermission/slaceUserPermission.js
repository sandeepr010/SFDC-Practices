import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';
import slaceActionPermissionApex from '@salesforce/apex/SlaceLWC.slaceActionPermission';
import updateSecurityJson from '@salesforce/apex/SlaceLWC.slaceUserSecurityJson';

export default class UpdateUserPermission extends NavigationMixin(LightningElement) {
    @api recordId;
    @track userNameList = [];
    @track profileNameList = [];
    @track groupNameList = [];
    @track roleNameList = [];

    @wire(slaceActionPermissionApex, {})
    Wiredperm({ error, data }) {
        if (data) {
            try {
                var result = JSON.parse(data);
                this.userNameList = result.userNameList;
                this.profileNameList = result.profileNameList;
                this.groupNameList = result.groupNameList;
                this.roleNameList = result.roleNameList;
            } catch (error) {
                console.error('error==>', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }

    }

    connectedCallback() {
        //this.dispatchEvent(new CustomEvent('user', { detail: false }));
    }

    //User Related Values;
    @track updatedMap;
    @track updatedUserList = [];
    @track search = false;
    @track toNull = '';
    @track userInputList = []; //User Selected List
    @track noOfSelection = 0;
    @track userSelectedOptionView = false;
    @track userLenth;
    sp = '';

    userFilter(event) {
        let inpVal = event.target.value;
        this.toNull = inpVal;
        let listVal = [];
        let mapVal = [];
        if (inpVal.length > 0) {
            this.userNameList.forEach(Element => {
                if (Element !== null) {
                    if (Element.toLowerCase().startsWith(inpVal.toLowerCase())) {
                        if (this.userInputList.length === 0) {
                            let arr = {};
                            listVal.push(Element);
                            arr.name = Element;
                            arr.icon = "utility:adduser";
                            mapVal.push(arr);
                        }
                        else {
                            if (!this.userInputList.includes(Element)) {
                                let arr = {};
                                listVal.push(Element);
                                arr.name = Element;
                                arr.icon = "utility:adduser";
                                mapVal.push(arr);
                            }
                            else {
                            }
                        }
                    }
                }
            })
            this.updatedUserList = listVal;
            this.updatedMap = mapVal;
            if (this.updatedMap.length >= 5) {
                this.search = true;
                this.userLenth = 'abcdef';
            }
            else {
                if (this.updatedMap.length !== 0) {
                    this.search = true;
                    let s = 'a';
                    for(let i=0;i<=this.updatedMap.length;i++)
                    {
                        s=s+'a';
                        console.log(i);
                    }
                    this.userLenth = s;
                }
            }
            console.log(this.userLenth);
        }
        else {
            this.updatedUserList = [];
            this.search = false;
        }
    }

    userOptionSelect(event) {
        let inpVal = event.currentTarget.dataset.id;
        let index = event.currentTarget.dataset.index;
        let dupeCount = 0;
        if (this.userInputList.length > 0) {
            this.userInputList.forEach(Element => {
                if (Element === inpVal) {
                    dupeCount += 1;
                }
            })
            if (dupeCount === 0) {
                this.userInputList.push(inpVal);
                this.updatedMap.forEach(Element => {
                    if (Element.name === inpVal) {
                        this.noOfSelection += 1;
                        this.toNull = this.noOfSelection + ' No of Option Selected!';
                        Element.icon = "utility:check";
                    }
                })
            }
            else {
                this.updatedMap.forEach(Element => {
                    if (Element.name === inpVal) {
                        this.noOfSelection -= 1;
                        this.toNull = this.noOfSelection + ' No of Option Selected!';
                        Element.icon = "utility:adduser";
                        for (var i = 0; i < this.userInputList.length; i++) {
                            if (this.userInputList[i] === inpVal) {
                                index = i;
                            }
                        }
                        this.userInputList.splice(index, 1);
                    }
                })
            }
        }
        else if (this.userInputList.length === 0) {
            this.noOfSelection += 1;
            this.toNull = this.noOfSelection + ' No of Option Selected!';
            this.userInputList.push(inpVal);
            this.updatedMap.forEach(Element => {
                if (Element.name === inpVal) {
                    Element.icon = "utility:check";
                }
            })
        }
    }

    userDelete(event) {
        let delVal = event.currentTarget.dataset.id;
        let index;
        for (var i = 0; i < this.userInputList.length; i++) {
            if (this.userInputList[i] === delVal) {
                index = i;
            }
        }
        this.userInputList.splice(index, 1);
        this.noOfSelection -= 1;
        if (this.userInputList.length === 0) {
            this.userSelectedOptionView = false;
        }
    }

    optionValidation() {
        if (this.userInputList.length > 0) {
            this.userSelectedOptionView = true;
            this.search = false;
            this.toNull = '';
        }
        else {
            this.userSelectedOptionView = false;
        }
    }

    //Profile Related Values;
    @track profileSelectedList = [];
    @track profileDropDown = false;
    @track profileInp = 'Select Profile';
    @track profileMap = [];
    @track profileDropCount = 0;
    @track profileSelectCount;
    @track profileSelected;
    @track profileSelectValidate = false;

    profileSearch() {
        if (this.profileDropCount === 0) {
            this.profileDropCount = 1;
            this.profileDropDown = true;
            if (this.profileSelectedList.length === 0) {
                let newProfileArray = [];
                this.profileNameList.forEach(Element => {
                    if (Element !== null) {
                        let forArry = {};
                        forArry.name = Element;
                        forArry.icon = "utility:identity";
                        newProfileArray.push(forArry);
                    }
                })
                this.profileMap = newProfileArray;
            }
            else {
                this.profileDropDown = true;
            }
        }
        else {
            this.profileDropCount = 0;
            this.profileDropDown = false;
        }
    }

    profileClick(event) {

        this.profileSelected = event.currentTarget.dataset.id;
        this.profileMap.forEach(Element => {
            if (Element.name === this.profileSelected) {
                if (!this.profileSelectedList.includes(Element.name)) {
                    this.profileSelectedList.push(Element.name);
                    Element.icon = "utility:check";
                }
                else {
                    let index;
                    for (var i = 0; i < this.profileSelectedList.length; i++) {
                        if (this.profileSelectedList[i] === this.profileSelected) {
                            index = i;
                        }
                    }
                    this.profileSelectedList.splice(index, 1);
                    Element.icon = "utility:identity";

                }
            }
        })
        this.profileSelectCount = this.profileSelectedList.length;
        if (this.profileSelectCount === 0) {
            this.profileInp = 'Select Profile';
            this.profileSelectValidate = false;
        }
        else {
            this.profileInp = this.profileSelectCount + " no of Profile Selected!";
            this.profileSelectValidate = true;
        }
    }

    profileRemove(event) {
        let delIndexVal = event.currentTarget.dataset.index;
        this.profileSelectedList.splice(delIndexVal, 1);
        if (this.profileSelectedList.length === 0) {
            this.profileInp = 'Select Profile';
            this.profileSelectValidate = false;
        }
        if (this.profileSelectedList.length !== 0) {
            this.profileInp = this.profileSelectedList.length + " no of Profile Selected!";
        }

    }
    //Group Related Values;
    @track groupSelectedList = [];
    @track groupDropDown = false;
    @track groupInp = 'Select Group';
    @track groupMap = [];
    @track groupDropCount = 0;
    @track groupSelectCount;
    @track groupSelected;
    @track groupSelectValidate = false;

    groupSearch() {
        if (this.groupDropCount === 0) {
            this.groupDropCount = 1;
            this.groupDropDown = true;
            if (this.groupSelectedList.length === 0) {
                let newGroupArray = [];
                this.groupNameList.forEach(Element => {
                    if (Element !== null) {
                        let forArry = {};
                        forArry.name = Element;
                        forArry.icon = "utility:new";
                        newGroupArray.push(forArry);
                    }
                })
                this.groupMap = newGroupArray;
            }
            else {
                this.groupDropDown = true;
            }
        }
        else {
            this.groupDropCount = 0;
            this.groupDropDown = false;
        }
    }

    groupClick(event) {

        this.groupSelected = event.currentTarget.dataset.id;
        this.groupMap.forEach(Element => {
            if (Element.name === this.groupSelected) {
                if (!this.groupSelectedList.includes(Element.name)) {
                    this.groupSelectedList.push(Element.name);
                    Element.icon = "utility:check";
                }
                else {
                    let index;
                    for (var i = 0; i < this.groupSelectedList.length; i++) {
                        if (this.groupSelectedList[i] === this.groupSelected) {
                            index = i;
                        }
                    }
                    this.groupSelectedList.splice(index, 1);
                    Element.icon = "utility:new";
                }
            }
        })
        this.groupSelectCount = this.groupSelectedList.length;
        if (this.groupSelectCount === 0) {
            this.groupInp = 'Select Group';
            this.groupSelectValidate = false;
        }
        else {
            this.groupInp = this.groupSelectCount + " no of Profile Selected!";
            this.groupSelectValidate = true;
        }
    }

    groupRemove(event) {
        let delIndexVal = event.currentTarget.dataset.index;
        this.groupSelectedList.splice(delIndexVal, 1);
        if (this.groupSelectedList.length === 0) {
            this.groupInp = 'Select Group';
            this.groupSelectValidate = false;
        }
        if (this.groupSelectedList.length !== 0) {
            this.groupInp = this.groupSelectedList.length + " no of Profile Selected!";
        }

    }
    //Role Related Values;
    @track roleSelectedList = [];
    @track roleDropDown = false;
    @track roleInp = 'Select Role';
    @track roleMap = [];
    @track roleDropCount = 0;
    @track roleSelectCount;
    @track roleSelected;
    @track roleSelectValidate = false;

    roleSearch() {
        if (this.roleDropCount === 0) {
            this.roleDropCount = 1;
            this.roleDropDown = true;
            if (this.roleSelectedList.length === 0) {
                let newRoleArray = [];
                this.roleNameList.forEach(Element => {
                    if (Element !== null) {
                        let forArry = {};
                        forArry.name = Element;
                        forArry.icon = "utility:new";
                        newRoleArray.push(forArry);
                    }
                })
                this.roleMap = newRoleArray;
            }
            else {
                this.roleDropDown = true;
            }
        }
        else {
            this.roleDropCount = 0;
            this.roleDropDown = false;
        }
    }

    roleClick(event) {

        this.roleSelected = event.currentTarget.dataset.id;
        this.roleMap.forEach(Element => {
            if (Element.name === this.roleSelected) {
                if (!this.roleSelectedList.includes(Element.name)) {
                    this.roleSelectedList.push(Element.name);
                    Element.icon = "utility:check";
                }
                else {
                    let index;
                    for (var i = 0; i < this.roleSelectedList.length; i++) {
                        if (this.roleSelectedList[i] === this.roleSelected) {
                            index = i;
                        }
                    }
                    this.roleSelectedList.splice(index, 1);
                    Element.icon = "utility:new";
                }
            }
        })
        this.roleSelectCount = this.roleSelectedList.length;
        if (this.roleSelectCount === 0) {
            this.roleInp = 'Select Group';
            this.roleSelectValidate = false;
        }
        else {
            this.roleInp = this.roleSelectCount + " no of Profile Selected!";
            this.roleSelectValidate = true;
        }
    }

    roleRemove(event) {
        let delIndexVal = event.currentTarget.dataset.index;
        this.roleSelectedList.splice(delIndexVal, 1);
        if (this.roleSelectedList.length === 0) {
            this.roleInp = 'Select Group';
            this.roleSelectValidate = false;
        }
        if (this.roleSelectedList.length !== 0) {
            this.roleInp = this.roleSelectedList.length + " no of Profile Selected!";
        }

    }

    //Submit Button
    @api handleSubmit() {
        let jsonString = JSON.stringify({
            'Users': this.userInputList, 'Profiles': this.profileSelectedList,
            'Gropes': this.groupSelectedList, 'Roles': this.roleSelectedList
        });
        updateSecurityJson({ Id: this.recordId, jsonData: jsonString })
            .then((result) => {
                console.log(result);
                if (result === 'success') {
                    this.navigateToRecordPage();
                }
            })
            .catch((error) => {
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
}