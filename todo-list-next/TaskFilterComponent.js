class TaskFilterComponent {
    constructor(id) {
        this.taskFilter = document.querySelector('#' + id);
         this.taskFilter.innerHTML = `
                <span class = 'counter'>0</span>
                <button class = 'filter_btn show-all'>All</button>
                <button class = 'filter_btn show-active'>Active</button>
                <button class = 'filter_btn show-checked'>Done</button>`;
        this.showAllBtn = null;
        this.showActiveBtn = null;
        this.showDoneBtn = null;
        this.counter = null;
        this.bindSelectors();
        this.bindListeners();
        this.sendFilterState = null;
    }
    bindSelectors() {
        this.showAllBtn = this.taskFilter.querySelector('.show-all');
        this.showActiveBtn = this.taskFilter.querySelector('.show-active');
        this.showDoneBtn = this.taskFilter.querySelector('.show-checked');
        this.counter = this.taskFilter.querySelector('.counter');
    }
    bindListeners() {
        this.showAllBtn.addEventListener('click', () => { this.sendFilterState('all'); });
        this.showDoneBtn.addEventListener('click', () => { this.sendFilterState('done'); });
        this.showActiveBtn.addEventListener('click', () => { this.sendFilterState('active'); });
    }
    setCounterValue(val) {
        this.counter.innerHTML = '';
        this.counter.innerHTML = val;
    }
    
}