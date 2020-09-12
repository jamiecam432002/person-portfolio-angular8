import { Component, OnInit, OnChanges, AfterContentInit, AfterViewInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';



@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.scss']
})
export class BudgetDashboardComponent implements OnInit {

  data = {
    name: 'Budgeting App in Angular Developer (8+)',
    bio: 'I created an Angular 8 app that allows you to track your expenses, incomes, investment and debt. Items can be added and deleted and every item is tracked on a calendar. Supports recurring transactions as well. The app is integrated with Firebase so the data persists.'
  }

  color: string = 'primary';
  view: string = 'default';

  constructor(private title: Title, private meta: Meta) { 
    
  }

  ngOnInit() {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/budget' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio }
    ])
  };

  onViewToggle(e) {
    if(e.checked) {
      this.view = 'normalized';
    }else{
      this.view = 'default';
    }
  }
  

}
