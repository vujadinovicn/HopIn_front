import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js' 
import dayjs, { Dayjs } from 'dayjs';
import { UserGraphService } from '../userGraphService/user-graph.service';
import { RideForReport } from '../userGraphService/user-graph.service';
import { Observable } from 'rxjs';
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
  rides!: RideForReport[] 


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

  if (this.selectedDates.start == undefined || this.selectedDates.end == undefined) {
    return
  }

  // let rides: RideForReport[] = this.userGraphService.getAll(this.selectedDates.start, this.selectedDates.end);
  this.userGraphService.getAll(this.selectedDates.start, this.selectedDates.end).subscribe((res) => {
    this.rides = res;
  });


  if (this.selectedType === "Distance traveled") {
    this.setDataForNumberOfRides();
  } else {
    this.setDataForDuration();
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

setDataForNumberOfRides(): void {
  let currentDate = this.rides[0].startTime;
  this.data = [1];
  this.labels = [''];
  this.total = 1;
  for(let i = 1; i < this.rides.length; i++) {
    this.total += 1;
    if (this.rides[i].startTime.getTime === currentDate.getTime) {
      this.data[this.data.length - 1] += this.rides[i].distance;
    }else {
      currentDate = this.rides[i].startTime;
      this.data.push(1);
      this.labels.push('');
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

setDataForDuration(): void {
  let currentDate = this.rides[0].startTime;
  this.data = [this.rides[0].estimatedTimeInMinutes];
  this.labels = [''];
  this.total = this.rides[0].estimatedTimeInMinutes
  for(let i = 1; i < this.rides.length; i++) {
    this.total += this.rides[i].estimatedTimeInMinutes
    if (this.rides[i].startTime.getTime === currentDate.getTime) {
      this.data[this.data.length - 1] += this.rides[i].estimatedTimeInMinutes;
    }else {
      currentDate = this.rides[i].startTime;
      this.data.push(this.rides[i].estimatedTimeInMinutes);
      this.labels.push('');
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

}



