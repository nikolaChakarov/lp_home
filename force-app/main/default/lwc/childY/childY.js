import { LightningElement, wire, api } from 'lwc';
import { subscribe, MessageContext, APPLICATION_SCOPE, unsubscribe, publish } from 'lightning/messageService';
import MyMessageChannel from '@salesforce/messageChannel/test__c';

export default class ChildY extends LightningElement {
    @wire(MessageContext)
    messageContext;
    subscribtion = null;
    selected = false;

    @api
    get car() {
        return this._car;
    }

    set car(val) {
        this._car = val;
    }
    _car = {};

    // connectedCallback() {
    //     this.subscribtion = subscribe(this.messageContext, MyMessageChannel, (message) => this.handleMessageService(message));
    // }        

    // handleMessageService(message) {
    //     console.log('message: ', JSON.parse(JSON.stringify(message)));

    //     this.car = message.data;
    // }

    handleClick(e) {
        this.selected = !this.selected;

        publish(this.messageContext, MyMessageChannel, { childY: 'message from childY component...'})
    }

    // renderedCallback() {
    //     console.log('car: ', JSON.parse(JSON.stringify(this.car)));
    // }
}