import { LightningElement, wire, api, track } from 'lwc';
import accountDatas from '@salesforce/apex/accountDataGrid.accountData';

export default class GridView extends LightningElement {
    @track id;
    @track error;
    @track homePage = true;
    @track detailPage = false;
    @track allAccountData = [];
    @track accountData = [];
    @track selectedValue;
    get options() {
        return [
            { label: 'All Records', value: 'All Records' },
            { label: 'Cold', value: 'cold' },
            { label: 'Warm', value: 'warm' },
            { label: 'Hot', value: 'hot' },
            { label: 'Undefined', value: 'undefined' },
        ];
    }
    /*@wire(accountDatas) wiredData({data,error})
    {
        if(data)
        {
            this.allAccountData = data;
            this.allAccountData.forEach(Element=>
                {
                    if(Element.Rating === 'Cold')
                    {
                        Element.topColour = 'padding: 0rem 0rem 0rem 0rem;background-color: #f3eee5;font-size:15px; border:2px solid #87CEEB';
                        console.log('Coulour is : '+Element.topColour)
                    }
                    else if(Element.Rating === 'Warm')
                    {
                        Element.topColour = 'padding: 0rem 0rem 0rem 0rem;background-color: #f3eee5;font-size:15px; border:2px solid #95630e';
                    }
                    else if(Element.Rating === 'Hot')
                    {
                        Element.topColour = 'padding: 0rem 0rem 0rem 0rem;background-color: #f3eee5;font-size:15px; border:2px solid #FFCCCB';
                    }
                })
            console.log(data);
        }
        else if(error)
        {
            this.error = error;
        }
    }*/
    connectedCallback() {
        //this.selectedValue='All Records';
        this.dataLoading();
    }

    dataLoading() {
        let modifiedData = [];
        accountDatas().then(
            result => {
                var resultData = JSON.parse(result);
                this.allAccountData = resultData;
                this.allAccountData.forEach(Element => {
                    if (Element.Rating === 'Cold') {
                        Element.topColour = 'padding: 0rem 0rem 0rem 0rem;background-color: #f3eee5;font-size:15px; border:2px solid #000000';
                        Element.fullColour = " background-color: #80ffff;font-size:15px;"
                        Element.buttonVal = false;
                        modifiedData.push(Element);
                    }
                    else if (Element.Rating === 'Warm') {
                        Element.topColour = 'padding: 0rem 0rem 0rem 0rem;background-color: #f3eee5;font-size:15px; border:2px solid #000000';
                        Element.fullColour = " background-color: #ffff80;font-size:15px;"
                        Element.buttonVal = false;
                        modifiedData.push(Element);
                    }
                    else if (Element.Rating === 'Hot') {
                        Element.topColour = 'padding: 0rem 0rem 0rem 0rem;background-color: #f3eee5;font-size:15px; border:2px solid #000000';
                        Element.fullColour = " background-color: #ff3333;font-size:15px;"
                        Element.buttonVal = false;
                        modifiedData.push(Element);
                    }
                    else {
                        Element.topColour = 'padding: 0rem 0rem 0rem 0rem;background-color: #f3eee5;font-size:15px; border:2px solid #000000';
                        Element.fullColour = " background-color: #8c8c8c;font-size:15px;"
                        Element.buttonVal = false;
                        modifiedData.push(Element);
                    }
                })
                this.accountData = modifiedData;
            })
            .catch(error => {
                console.log('Connected Error', error);
            })
    }
    onOptionSelect(event) {
        this.value = event.detail.value;
        const updatedData = [];
        this.allAccountData.forEach(Element => {
            if (Element.Rating === 'Cold' && this.value === 'cold') {
                Element.buttonVal = false;
                updatedData.push(Element);
                console.log(Element.Name + Element.buttonVal);
            }
            else if (Element.Rating === 'Warm' && this.value === 'warm') {
                Element.buttonVal = false;
                updatedData.push(Element);
                console.log(Element.Name + Element.buttonVal);
            }
            else if (Element.Rating === 'Hot' && this.value === 'hot') {
                Element.buttonVal = false;
                updatedData.push(Element);
                console.log(Element.Name + Element.buttonVal);
            }
            else if (Element.Rating === undefined && this.value === 'undefined') {
                Element.buttonVal = false;
                updatedData.push(Element);
                console.log(Element.Name + Element.buttonVal);
            }
        })
        if (this.value === 'All Records') {
            window.location.reload();
        }
        else {
            this.accountData = updatedData;
            console.log(this.accountData.map);
            console.log(this.allAccountData);
        }
    }

    recordClick(event) {
        this.id = event.currentTarget.dataset.id;
        if (this.id !== undefined) {
            this.buttonActivate(this.id);
        }
    }

    buttonActivate(id) {
        this.accountData.forEach(Element => {
            if (Element.Id === id) {
                Element.buttonVal = true;
            }
            else {
                Element.buttonVal = false;
            }
        })
    }

    recordDetailPage() {
        this.homePage = false;
        this.detailPage = true;
    }

    home() {
        window.location.reload();
        //this.accountData = JSON.parse(JSON.stringify(this.allAccountData));
        //this.dataLoading();
        this.homePage = true;
        this.detailPage = false;
    }
}