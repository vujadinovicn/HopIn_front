import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js' 
import dayjs, { Dayjs } from 'dayjs';
import { UserGraphService } from '../userGraphService/user-graph.service';
import { RideForReport } from '../userGraphService/user-graph.service';
Chart.register(...registerables)

@Component({
  selector: 'user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css'],
})
export class UserGraphComponent implements OnInit {

  selectedDates!: {start: Dayjs, end: Dayjs};
  selectedType: String = 'Distance traveled'
  reportVisibility: boolean = false;
  myChart!: Chart;
  data: number[] = [];
  labels: string[] = []
  total: number = 0;
  average: number = 0;


  constructor(private userGraphService: UserGraphService) { }

  ngOnInit(): void {
    this.RenderChart()
  }

  RenderChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if(this.myChart !=  undefined && this.myChart != null) {
      this.myChart.destroy();
    }

  this.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: this.labels,
      datasets: [{
        label:'',
        data: this.data,
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
            display: false,
            font: {
              size: 9
            }
          },
          
        }
      }
    }
  });

}

generateBtnOnClick():void {
  this.reportVisibility = true;

  let rides: RideForReport[] = this.userGraphService.getAll();

  if (this.selectedType === "Distance traveled") {
    this.setDataForDistance(rides);
  } else {
    this.setDataForDuration(rides);
  }
  
  this.RenderChart();
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
}

setDistanceTraveledDD():void {
  this.selectedType = "Distance traveled"
}
setRidesNumDD():void {
  this.selectedType = "Number of rides"
}

setDataForDistance(rides: RideForReport[]): void {
  let currentDate = rides[0].startTime;
  this.data = [rides[0].distance];
  this.labels = [''];
  this.total += rides[0].distance;
  for(let i = 1; i < rides.length; i++) {
    this.total += rides[0].distance;
    if (rides[i].startTime.getTime() === currentDate.getTime()) {
      this.data[this.data.length - 1] += rides[i].distance;
    }else {
      currentDate = rides[i].startTime;
      this.data.push(rides[i].distance);
      this.labels.push('');
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

setDataForDuration(rides: RideForReport[]): void {
  let currentDate = rides[0].startTime;
  this.data = [rides[0].estimatedTimeInMinutes];
  this.labels = [''];
  this.total += rides[0].estimatedTimeInMinutes
  for(let i = 1; i < rides.length; i++) {
    this.total += rides[i].estimatedTimeInMinutes
    if (rides[i].startTime.getTime() === currentDate.getTime()) {
      this.data[this.data.length - 1] += rides[i].estimatedTimeInMinutes;
    }else {
      currentDate = rides[i].startTime;
      this.data.push(rides[i].estimatedTimeInMinutes);
      this.labels.push('');
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

}



