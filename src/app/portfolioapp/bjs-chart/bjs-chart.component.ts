import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { PlayerWar } from '../../../assets/data/playerwar.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bjs-chart',
  templateUrl: './bjs-chart.component.html',
  styleUrls: ['./bjs-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BjsChartComponent {
  @ViewChild('chart', {static: false}) 

  data: Observable<PlayerWar[]>;
  dataUrl = 'assets/data/data.json';
  playerData: PlayerWar[];
  
  constructor(private http: HttpClient) {}

  margin = { top: 20, right: 0, bottom: 70, left: 30 };
  width = 1000 - (this.margin.left + this.margin.right);
  height = 500;

  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this.data = this.http.get<PlayerWar[]>(this.dataUrl);
    this.data.subscribe(data => {
      this.playerData = data
      this.createChart();
    });
  }
  onResize(e) {
    this.createChart();
  }

  private  createChart() {
    

    d3.selectAll('svg').remove();

    const data = this.playerData;

    // add y-axis
    const y = d3
      .scaleLinear()
      .range([this.height - this.margin.bottom, this.margin.top])
      .domain([0, d3.max(data.map(d => d.value))])

    // x-axis
    const x = d3
      .scaleBand()
      .range([this.margin.left, this.width - this.margin.right])
      .domain(data.map(d => d.name))
      .padding(0.1);
  
    const svg = d3.select("#chart").append('svg')
        .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

       
    svg.append("g")
      .attr("fill", "#134a8e")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", 0)
        
    
    

    svg.append("g")
      .attr("transform", `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0) rotate(-45)")
      .style("text-anchor", "end");

      

    svg.append("g")
    .attr("transform", `translate(${this.margin.left}, 0)`)
    .call(d3.axisLeft(y));

    // bars


    svg.selectAll("rect")
    .data(this.playerData)
    .transition()
    .duration(1100)
    .attr('y', d => y(d.value))
    .attr("height", d => y(0) - y(d.value))
    .delay(function(d,i) {
      return (i * 100);
    });

    
  }

  

}

