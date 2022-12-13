import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js' 
Chart.register(...registerables)

@Component({
  selector: 'user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css'],
})
export class UserGraphComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
    this.RenderChart();
  }

  RenderChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'March', 'Apr', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label:'',
        data: [12, 19, 3, 5, 2, 3, 4, 2, 59, 4, 4, 6],
        borderWidth: 0,
      }],
    },
    options: {
      plugins: {
        legend: {
          display: false,
          labels: {
            font: {
              size: 1
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            display: false
          },
          grid: {
            display: false,
            drawTicks: false,
            drawOnChartArea: false
          }
        },
        x: {
          ticks: {
            display: true,
            font: {
              size: 9
            }
          },
          
        }
      }
    }
  });

}
}