import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent implements OnInit {
  data = {
    name: 'Other Skills',
    bio: 'Front End Developer, Expertise in Angular 8+'
  }

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/extras' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio }
    ])
  }

}
