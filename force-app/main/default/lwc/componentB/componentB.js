import { LightningElement, wire } from 'lwc';
import MY_MESSAGE_CHANNEL from '@salesforce/messageChannel/test__c';
import { subscribe, MessageContext, APPLICATION_SCOPE, unsubscribe } from 'lightning/messageService';

export default class ComponentB extends LightningElement {
    @wire(MessageContext)
    messageContext;

    message;
    subscribtion = null;

    connectedCallback() {
        this.subscribtion = subscribe(this.messageContext, MY_MESSAGE_CHANNEL, (msg) => this.handleMessage(msg), { scope: APPLICATION_SCOPE });
    }

    handleMessage(msg) {
        if (msg.to !== 'componentB') return;
        this.message = msg.data.value;
    }

    disconnectedCallback() {
        unsubscribe(this.subscribtion);
        this.subscribtion = null;
    }
}