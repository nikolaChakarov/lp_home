import { LightningElement, api } from 'lwc';

export default class CarFilters extends LightningElement {

    @api filterEl;

    closeFilters() {
        this.dispatchEvent(new CustomEvent('closefilters'));
    }
}