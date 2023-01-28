import { LightningElement, track } from 'lwc';
import getAllCars from '@salesforce/apex/CarController.getAllCars';

export default class CarList extends LightningElement {

    @track cars = [];
    limit = 5;
    offset = 0;
    searchTerm = '';
    timer;

    connectedCallback() {
        this.updateCars(this.limit, this.offset, this.searchTerm);
    }

    async updateCars(limit, offset, searchTerm) {
        try {
            const dbRes = await getAllCars({ lmt: limit, offset: offset, searchTerm: searchTerm });

            const cars = dbRes.map(el => ({...el, selected: false}));

            this.cars = [...this.cars, ...cars];
            
            // console.log('cars: ', JSON.stringify(this.cars));
            // console.log('size: ', this.cars.length);
        } catch (err) {
            console.error('err: ',JSON.stringify(err));
        }
    }

    handleSearch(e) {
        // console.log('value ', e.currentTarget.value);
        if (e.target.value === '') {
            this.cars = [];
            this.searchTerm = '';
            this.offset = 0;
            this.updateCars(this.limit, this.offset, this.searchTerm);
            return;
        }

        if (e.target.value.length < 2) {
            return;
        };
        
        clearTimeout(this.timer);
        this.searchTerm = e.target.value;
        this.offset = 0;
        
        this.timer = setTimeout(() => {
            this.cars = [];
            // console.log('search term: ',  this.searchTerm);
            this.updateCars(this.limit, this.offset, this.searchTerm);
        }, 700);

    }

    handleScroll(e) {
        const domElHeight = e.target.clientHeight;
        const domElScrollTop = Math.ceil(e.target.scrollTop);
        const domElScrollHeight = e.target.scrollHeight;

        if (domElHeight + domElScrollTop >= domElScrollHeight) {
            this.offset += 5;

            this.updateCars(this.limit, this.offset, this.searchTerm);
        }
    }

    handleVisible(e) {
        const { id } = e.target.dataset;

        const car = this.cars.find(el => el.Id === id);
        car.selected = !car.selected;
    }

}