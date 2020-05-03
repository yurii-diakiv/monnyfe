import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { FormControl } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense-service/expense.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.css'],
  providers: [ExpenseService, UserService]
})
export class StatisticPageComponent implements OnInit {
  
  userId: number;
  
  currentDate = new Date();
  
  date1 = new FormControl(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1));
  date2 = new FormControl(this.currentDate);

  chart: Chart;

  noExpenses: boolean = false;
  
  constructor(
    private expenseService: ExpenseService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.userId = this.userService.currentUserId();

    this.createChart();
  }

  createChart() {
    let fromDate: Date = this.date1.value;
    let toDate: Date = this.date2.value;
    toDate.setHours(23, 59, 59);

    this.expenseService.getFromTo(this.userId, fromDate, toDate).subscribe(
      expenses => {

        if(this.chart != undefined)
          this.chart.destroy();

        if (expenses.length == 0) {
          this.noExpenses = true;
          return;
        }
        else
          this.noExpenses = false;

        let labels = expenses.map(expense => expense.category);
        let data = expenses.map(expense => expense.expenses);
        let backgroundColor = this.generateRandomColors(expenses.length);

        this.chart = new Chart('myChart', {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: backgroundColor
            }]
          },
          options: {
            legend: {
              position: 'left'
            }
          }
        });
    });
  }

  generateRandomColors(count: number): string[] {
    let colors: string[] = [];
    for(let i = 0; i < count; ++i){
      colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }
    return colors;
  }
}
