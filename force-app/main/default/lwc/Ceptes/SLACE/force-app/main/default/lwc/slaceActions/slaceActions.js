import { LightningElement, api, track } from 'lwc';

export default class SlaceActions extends LightningElement {
    @api recordId;
    @track updateSlaceAction=false;
    @track manageSlackAction = false;
    @track UserAction = false;
    @track nextCount = 0;
    @track nextDisable = true;
    @track heading = 'Update Slace Action';
    @track vol=0;
    @track zero=true;
    @track half=false;
    @track full=false;
    @track pathAlign = [
        { status: 'slds-progress__item slds-is-active', id: '#isUpdateSlaceAction', name: ' Update Slace Action', active: true, complete: false, val:0},
        { status: 'slds-progress__item', id: '#isManageSlackAction', name: 'Manage Slack Action', active: false, complete: false,val:0},
        { status: 'slds-progress__item', id: '#isSlaceActionPermission', name: 'Slace Action Permission', active: false, complete: false,val:0},
    ];

    connectedCallback()
    {
        setTimeout(() => {
            this.updateSlaceAction = true;
       }, 100);
    }

    nextMethod()
    {
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
                this.manageSlackAction = true;
                this.heading = 'Manage Slack Action';
                this.vol=33;
                this.zero=false;
                this.half=true;
                this.template.querySelector("c-slace-update-sale-action").parentSubmit();
            } else if (i === 2) {
                this.manageSlackAction = false;
                this.UserAction = true;
                this.heading = 'Slace Action Permission';
                this.nextDisable =false;
                this.vol=100;
                this.half=false;
                this.full=true;
                this.template.querySelector("c-slace-update-actions").parentSubmit();
            }
            this.nextCount += 1;
        }
    }

    saveMethod()
    {
        if(this.updateSlaceAction===true)
        {
            this.template.querySelector("c-slace-update-sale-action").handleSubmit();
        }
        else if(this.manageSlackAction===true)
        {
            this.template.querySelector("c-slace-update-actions").handleSubmit();
        }
        else if(this.UserAction===true)
        {
            this.template.querySelector("c-slace-user-permission").handleSubmit();
        }
    }
}