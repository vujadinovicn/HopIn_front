import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js' 
import dayjs, { Dayjs } from 'dayjs';
import { UserGraphService } from '../userGraphService/user-graph.service';
import { RideForReport } from '../userGraphService/user-graph.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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


  constructor(private userGraphService: UserGraphService,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
  if (this.selectedDates.start == undefined || this.selectedDates.end == undefined) {
    this.snackBar.open("Pick a date range!", "", {
      duration: 2000,
   });
   return;
  }

  this.userGraphService.getAll(this.selectedDates.start, this.selectedDates.end).subscribe((res) => {
    this.rides = res;
    if (this.selectedType === "Distance traveled") {
      this.setDataForDistance();
    } else {
      this.setDataForNumberRides();
    }
    this.RenderChart();
  });
  this.reportVisibility = true;

}

setDistanceTraveledDD():void {
  this.selectedType = "Distance traveled"
}
setRidesNumDD():void {
  this.selectedType = "Number of rides"
}

setDataForDistance(): void {
  let currentDate = this.rides[0].startTime;
  this.data = [this.rides[0].distance];
  this.labels = [''];
  this.total = this.rides[0].distance;
  for(let i = 1; i < this.rides.length; i++) {
    this.total += this.rides[0].distance;
    if (this.rides[i].startTime === currentDate) {
      this.data[0] += this.rides[i].distance;
    }else {
      currentDate = this.rides[i].startTime;
      this.data.push(this.rides[i].distance);
      this.labels.push('');
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

setDataForNumberRides(): void {
  let currentDate = this.rides[0].startTime;
  this.data = [1];
  this.labels = [''];
  this.total = 1;
  for(let i = 1; i < this.rides.length; i++) {
    this.total += 1;
    if (this.rides[i].startTime === currentDate) {
      this.data[0] += this.rides[i].distance;
    }else {
      currentDate = this.rides[i].startTime;
      this.data.push(1);
      this.labels.push('');
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

}



