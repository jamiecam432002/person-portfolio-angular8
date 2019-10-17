import { Component, OnInit } from '@angular/core';
import { PlayerWar } from '../../../assets/data/playerwar.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  data: Observable<PlayerWar>;
  dataUrl = 'assets/data/data.json';

  constructor(private http: HttpClient) { 
    this.data = this.http.get<PlayerWar>(this.dataUrl);
    
  }

  ngOnInit() {
  }

}
