import { Component, OnInit } from '@angular/core';
import { PlayerWar } from '../../../assets/data/playerwar.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  metadata = {
    name: 'A Taste of What I Can Do',
    bio: 'I spend a lot of time building small Angular Apps to show what I can do. Lazy loading, server side rendering and other progressive modern web techniques are use. Have a look for yourself.'
  }
  data: Observable<PlayerWar>;
  dataUrl = 'assets/data/data.json';

  constructor(private http: HttpClient, private title: Title, private meta: Meta) { 
    this.data = this.http.get<PlayerWar>(this.dataUrl);
    
  }

  ngOnInit() {
    this.title.setTitle(this.metadata.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'this.metadata.name'},
      { name: 'og:url', content: '/portfolio' },
      { name: 'og:title', content: this.metadata.name },
      { name: 'og:description', content: this.metadata.bio }
    ])
  }

}
