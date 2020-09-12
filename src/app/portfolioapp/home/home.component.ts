import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = {
    name: 'The Web Portfolio of Jamie Cameron - Angular Developer',
    bio: 'Hi. My name is Jamie Cameron. I am an experienced front end developer with a particular talent and experience for Angular (8+) and other frameworks. I am an expert at building responsive light-weight, SEO friendly Angular apps using server side rendering, lazy loading and other progressive features.',
    image: 'forkify-desktop.png'
  }

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:image', content: this.data.image },
      { name: 'og:url', content: '/' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio }
    ])
  }

}
