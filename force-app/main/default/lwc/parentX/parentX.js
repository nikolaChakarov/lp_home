import { LightningElement, wire } from 'lwc';
import getAllCars from '@salesforce/apex/CarController.getAllCars';
import MyMessageChannel from '@salesforce/messageChannel/test__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class ParentX extends LightningElement {
    @wire(MessageContext)
    messageContext;

    cars = [];
    limit = 10;
    offset = 0;

    connectedCallback() {
        this.initialFetch(this.limit, this.offset);

        publish(this.messageContext, MyMessageChannel, { parentX: 'message from parentX'});
    }

    async initialFetch(limit, offset, searchTerm = '') {
        try {
            this.cars = await getAllCars({ lmt: limit, offset: offset, searchTerm: searchTerm });
            console.log('cars: ', JSON.parse(JSON.stringify(this.cars)));
        } catch (err) {
            console.log('err ', JSON.stringify(err));
        }
    }

    // handleClick(e) {
    //     const id = e.currentTarget.dataset.id;
    //     const clickedCar = this.cars.find(el => el.Id === id);

    //     console.log('clickedCar: ', clickedCar);
    
    //     const message = {
    //         ID: id,
    //         origin: 'parent-x',
    //         to: 'child-y',
    //         data: {...clickedCar}
    //     }

    //     publish(this.messageContext, MyMessageChannel, message)
    // }

}