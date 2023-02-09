import { LightningElement, api } from 'lwc';

export default class SetterChildComponent extends LightningElement {
    user;
    inputValue;

    @api
    get userInfo() {
        return this.user;
    }
    set userInfo(data) {
        console.log('data', JSON.stringify(data));
        this.user = data;
    }

    handleChange(e) {
        this.inputValue = e.target.value;
    }

    handleClick(e) {
        if (!this.inputValue) return;

        this.userInfo = {...this.user, name: this.inputValue};
    }

    /* ---------------------------- */
    
    today = new Date();
    currentYear = this.today.getFullYear();
    _monthIndex;

    get monthIndex() {
        return this._monthIndex;
    }

    set monthIndex(val) {
        this._monthIndex = val;
    }

    get months() {
        const months = [];

        for (let i = 0; i < (this.monthIndex || 12); i++) {
            const date = new Date(this.today.getFullYear(), i, this.today.getDate());
        
            const month = date.toLocaleString("default", { month: "long" });
            months.push(month);
        }
        return months;
    }

    selectedYear;
    get year() {
        return this.selectedYear;
    }

    set year(val) {
        this.selectedYear = val;
    }

    changeYear(e) {
        const currentSelection = this.template.querySelector('.year-input');
        this.selectedYear = currentSelection.value;

        console.log(this.selectedYear, ' ', this.currentYear);
        
        if (this.currentYear == this.selectedYear) {
            console.log('okkkk');
            this.monthIndex = this.today.getMonth() + 1;
        } else {
            this.monthIndex = 12;
        }
    }
    
}