import { Component, OnInit, OnChanges, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { PlayerWar } from '../../../assets/data/playerwar.model';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-bjs-chart',
  templateUrl: './bjs-chart.component.html',
  styleUrls: ['./bjs-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BjsChartComponent implements OnChanges {
  @ViewChild('chart', {static: false}) 
  private chartContainer: ElementRef;

  @Input() data: PlayerWar[];

  margin = {top: 40, right: 20, bottom: 80, left: 40};

  constructor() { }

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart();
  }

  onResize(e) {
    this.createChart();
  }

  private createChart(): void {
    d3.selectAll('svg').remove();

    const element = this.chartContainer.nativeElement;
    console.log(`${element.offsetWidth} is the width of the container`);
    console.log(`${element.offsetHeight} is the height of the container`);

    const data = this.data;
  
    const svg = d3.select(element).append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', '100%');
        

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;
    console.log(`${contentWidth} is the content width inside the container`);

    const x = d3
      .scaleBand()
      .range([this.margin.left, contentWidth - this.margin.right])
      .padding(0.1)
      .domain(data.map(d => d.name));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.value)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(20, 's'))
      

    g.selectAll('.axis--x text')
      .attr('transform', 'rotate(45)')
      .attr('text-anchor', 'start')
      .attr('y', 9)
			.attr('x', 9)
			.attr('dy', '.35em')

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => contentHeight - y(d.value));
  }

  

}

