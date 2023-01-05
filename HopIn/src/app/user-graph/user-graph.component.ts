import { AdminReportOptionsService } from './../services/adminReportOptions.service';
import { RideForReport } from './../userGraphService/user-graph.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js' 
import dayjs, { Dayjs } from 'dayjs';
import { UserGraphService } from '../userGraphService/user-graph.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
Chart.register(...registerables)

@Component({
  selector: 'user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css'],
})
export class UserGraphComponent implements OnInit {

  _role: String = 'admin';
  inputIdFor: String = 'all';
  selectedDates!: {start: Dayjs, end: Dayjs};
  selectedType: String = 'Distance traveled';
  id: number = 1;
  reportVisibility: boolean = false;
  myChart!: Chart;
  data: number[] = [];
  labels!: string[];
  total: number = 0;
  average: number = 0;
  rides!: RideForReport[] 


  constructor(private userGraphService: UserGraphService,
    public snackBar: MatSnackBar,
    private userService: UserService,
    private adminReportOptionsService: AdminReportOptionsService) { }

  ngOnInit(): void {
    this._role = this.userService.role;
    this.recieveSelectedOption();
  }

  recieveSelectedOption(): void {
    this.adminReportOptionsService.recieveSelectedOption().subscribe((res: any) => {
      this.inputIdFor = res;
    });
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
            display: true,
            font: {
              size: 8,
              style: 'normal',
              family: 'sans-serif'
            },
            color: 'black'
          },
          
        }
      }
    }
  });

}

generateBtnOnClick():void {
  if (this.selectedDates.start == undefined || this.selectedDates.end == undefined  
    || (this.inputIdFor != 'all' && this.id == null)) {
    this.snackBar.open("Wrong input!", "", {
      duration: 2000,
   });
   return;
  }

  if (this._role === 'admin') {
    if (this.inputIdFor === 'driver') {
      this.getAllForDriver();
    } else if (this.inputIdFor === 'passenger') {
      this.getAllForPassenger();
    } else {
      this.getAll();
    }
  } else if (this._role === 'driver') {
    this.getAllForDriver();
  } else {
    this.getAllForPassenger();
  }
  
  this.reportVisibility = true;

}

setDistanceTraveledDD():void {
  this.selectedType = "Distance traveled"
}
setRidesNumDD():void {
  this.selectedType = "Number of rides"
}
setMoneySpentDD():void {
  this.selectedType = "Money spent"
}

setDataForDistance(): void {
  let currentDate: Date = this.rides[0].startTime;
  this.labels = [currentDate.toString().split('T')[0]];
  this.data = [this.rides[0].distance];
  this.total = this.rides[0].distance;
  for(let i = 1; i < this.rides.length; i++) {
    this.total += this.rides[0].distance;
    if (this.rides[i].startTime === currentDate) {
      this.data[0] += this.rides[i].distance;
    }else {
      currentDate = this.rides[i].startTime;
      this.data.push(this.rides[i].distance);
      this.labels.push(currentDate.toString().split('T')[0]);
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

setDataForNumberRides(): void {
  let currentDate: Date = this.rides[0].startTime;
  this.labels = [currentDate.toString().split('T')[0]];
  this.data = [1];
  this.total = 1;
  for(let i = 1; i < this.rides.length; i++) {
    this.total += 1;
    if (this.rides[i].startTime === currentDate) {
      this.data[0] += this.rides[i].distance;
    }else {
      currentDate = this.rides[i].startTime;
      this.data.push(1);
      this.labels.push(currentDate.toString().split('T')[0]);
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

setDataForMoneySpent(): void {
  let currentDate: Date = this.rides[0].startTime;
  this.labels = [currentDate.toString().split('T')[0]];
  this.data = [this.rides[0].totalCost];
  this.total = this.rides[0].totalCost;
  for(let i = 1; i < this.rides.length; i++) {
    this.total += this.rides[0].totalCost;
    if (this.rides[i].startTime === currentDate) {
      this.data[0] += this.rides[i].totalCost;
    }else {
      currentDate = this.rides[i].startTime;
      this.data.push(this.rides[i].totalCost);
      this.labels.push(currentDate.toString().split('T')[0]);
    }
  }
  this.average = Math.round(this.total / this.data.length);
}

private getAll(): void {
  this.userGraphService.getAll(this.selectedDates.start, this.selectedDates.end).subscribe((res) => {
    this.rides = res;
    if (this.selectedType === "Distance traveled") {
      this.setDataForDistance();
    } else if (this.selectedType === "Number of rides") {
      this.setDataForNumberRides();
    } else {
      this.setDataForMoneySpent();
    }
    this.RenderChart();
  });
}

private getAllForDriver(): void {
  this.userGraphService.getAllForDriver(this.selectedDates.start, this.selectedDates.end, this.id).subscribe((res) => {
    this.rides = res;
    if (this.selectedType === "Distance traveled") {
      this.setDataForDistance();
    } else if (this.selectedType === "Number of rides") {
      this.setDataForNumberRides();
    } else {
      this.setDataForMoneySpent();
    }
    this.RenderChart();
  });
}

private getAllForPassenger(): void {
  this.userGraphService.getAllForPassenger(this.selectedDates.start, this.selectedDates.end, this.id).subscribe((res) => {
    this.rides = res;
    if (this.selectedType === "Distance traveled") {
      this.setDataForDistance();
    } else if (this.selectedType === "Number of rides") {
      this.setDataForNumberRides();
    } else {
      this.setDataForMoneySpent();
    }
    this.RenderChart();
  });
}

}



