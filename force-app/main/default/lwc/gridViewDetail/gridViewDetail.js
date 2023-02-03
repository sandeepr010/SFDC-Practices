import { LightningElement, api, track } from 'lwc';

export default class GridViewDetail extends LightningElement {
    @api recordId;
    objectApiName = 'Account';
    @track data = ['Cold', 'Warm', 'Hot', 'Undefined']
    @track option = 'Select and Option';
    @track onClickOption = false;
    @track clcickCount = 0;
    home() {
        this.dispatchEvent(new CustomEvent('home'));
        console.log(this.recordId);
    }

    optionDrop() {
        if (this.clcickCount === 0) {
            this.onClickOption = true;
            this.clcickCount = 1
        }
        else if (this.clcickCount === 1) {
            this.onClickOption = false;
            this.clcickCount = 0
        }
    }

    optionSelect(event) {
        this.option = event.currentTarget.dataset.id;
        this.onClickOption = false;
        this.clcickCount = 0
        console.log(this.option);
    }
}