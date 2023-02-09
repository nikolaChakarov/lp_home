import { LightningElement, wire } from 'lwc';
import MY_MESSAGE_CHANNEL from '@salesforce/messageChannel/test__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class ComponentA extends LightningElement {
    @wire(MessageContext)
    messageContext;

    message;
    timer;

    handleChange(e) {
        clearTimeout(this.timer);
        const val = e.target.value;

        this.message = {
            origin: 'componentA',
            to: 'componentB',
            data: {
                value: val
            },
            lmsData: val
        }

        this.timer = setTimeout(() => {
           publish(this.messageContext, MY_MESSAGE_CHANNEL, this.message) 
        }, 500);
    }
}