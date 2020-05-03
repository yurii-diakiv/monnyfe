import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { CustomExpenseDialogComponent } from '../custom-expense-dialog/custom-expense-dialog.component';
import { LimitationService } from 'src/app/services/limitation-service/limitation.service';
import { Limitation } from 'src/app/models/limitation';
import { ExpenseService } from 'src/app/services/expense-service/expense.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css'],
  providers: [LimitationService, ExpenseService, UserService]
})
export class ExpensePageComponent implements OnInit {
  userId: number;
  
  limitation: Limitation = new Limitation();

  sumOfExpenses: number;

  pbValue: number = 0;

  constructor(
    public dialog: MatDialog,
    private limitationService: LimitationService,
    private expenseService: ExpenseService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.currentUserId();

    this.limitationService.getByUserId(this.userId).subscribe(limitation => this.limitation = limitation);

    this.expenseService.getExpensesForThisMonth(this.userId).subscribe(expenses => {
      this.sumOfExpenses = expenses.reduce((a, b) => a + b.amountOfMoney, 0);

      this.pbValue = this.sumOfExpenses / this.limitation.limit * 100;
    });
  }

  openDialog(cat: string, catId: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      category: cat,
      id: catId
    };

    const dialogRef = this.dialog.open(ExpenseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.sumOfExpenses += result;
        this.pbValue = this.sumOfExpenses / this.limitation.limit * 100;
      }
    });
  }

  openCustomDialog() {
    const dialogRef = this.dialog.open(CustomExpenseDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.sumOfExpenses += result;
        this.pbValue = this.sumOfExpenses / this.limitation.limit * 100;
      }
    });
  }
}
