import { LightningElement, api, track } from 'lwc';

export default class ApplicationDetailPageView extends LightningElement {
    @api recordId;
    @track applic;
    @track application = true;
    @track updateSlaceAction = false;
    @track SlaceAction = false;
    @track UserAction = false;
    @track nextButtonValidation = true;
    @track nextCount = 0;
    @track pathAlign = [
        { status: 'slds-progress__item slds-is-active', id: '#isUpdateSlaceAction', name: ' Update Slace Action', active: true, complete: false },
        { status: 'slds-progress__item', id: '#isManageSlackAction', name: 'Manage Slack Action', active: false, complete: false },
        { status: 'slds-progress__item', id: '#isSlaceActionPermission', name: 'Slace Action Permission', active: false, complete: false },
    ];

    /*handleScroll(event) {

        var compEvent = component.getEvent("pathEvent");
        compEvent.setParams({ "pathIndex": indexToActive });
        compEvent.fire();

    }*/

    connectedCallback()
    {
        setTimeout(() => {
            this.updateSlaceAction = true;
       }, 100);
    }

    handleNext(event) {
        if (this.nextCount <=1) {
            let i = this.nextCount + 1;
            let j = i - 1;
            this.pathAlign[i]['status'] = 'slds-progress__item slds-is-active';
            this.pathAlign[i]['active'] = true;
            this.pathAlign[i]['complete'] = false;
            this.pathAlign[j]['status'] = 'slds-progress__item slds-is-completed';
            this.pathAlign[j]['active'] = false;
            this.pathAlign[j]['complete'] = true;
            if (i === 1) {
                this.updateSlaceAction = false;
                this.SlaceAction = true;
                this.template.querySelector("c-slace-update-sale-action").parentSubmit();
            } else if (i === 2) {
                this.SlaceAction = false;
                this.UserAction = true;
                this.nextButtonValidation =false;
                this.template.querySelector("c-slace-update-actions").parentSubmit();
            }
            this.nextCount += 1;
        }
    }

    handleBack(event) {
        let textVal = event.detail;
    }

    applingto(event) {
        let textVal = event.detail;
        this.applic = textVal;
    }

}