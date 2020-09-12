import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-angular-projects',
  templateUrl: './angular-projects.component.html',
  styleUrls: ['./angular-projects.component.scss']
})
export class AngularProjectsComponent implements OnInit {
  data = {
    name: 'Experienced Angular Developer (8+)',
    bio: 'I have lots of experience developing Angular apps. I use server side rendering to provide SEO benefits and lazy loading and asset optimization to make fast responsive apps and websites. Here are a few samples.'
  }

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/angular-projects' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio }
    ])
  }

}
