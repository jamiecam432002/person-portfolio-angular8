import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-gdashboard',
  templateUrl: './gdashboard.component.html',
  styleUrls: ['./gdashboard.component.scss']
})
export class GdashboardComponent implements OnInit {

  data = {
    name: 'Grocery List App in Angular 8',
    bio: 'I built an app that allows you to build out a master shopping list of items you frequently purchase, and transfer them to a current list for shopping. It is built using Firebase so the data persists in a noSql database and all changes are reflected in realtime. Users can easily add or remove items from the list and do operations in bulk to save time.'
  }

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/grocery' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio }
    ])
  }

}
