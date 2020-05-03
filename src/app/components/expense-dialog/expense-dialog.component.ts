import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseService } from 'src/app/services/expense-service/expense.service';
import { Expense } from 'src/app/models/expense';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css'],
  providers: [ExpenseService, UserService]
})
export class ExpenseDialogComponent implements OnInit {
  userId: number;

  currentDate = new Date();

  category: string;
  catId: number;

  date = new FormControl(this.currentDate);
  price = new FormControl('', [Validators.required, Validators.min(0.1)]);

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.category = data.category;
    this.catId = data.id;
  }

  ngOnInit(): void {
    this.userId = this.userService.currentUserId();
  }

  getPriceErrorMessage() {
    if (this.price.hasError('required')) {
      return 'You must enter a value';
    }

    return this.price.hasError('min') ? 'Value have to be greater than 0.1' : '';
  }

  addExpense() {
    if (this.price.valid) {

      let expense: Expense = new Expense();
      expense.date = new Date(this.date.value);
      expense.categoryId = this.catId;
      expense.amountOfMoney = this.price.value;
      expense.userId = this.userId;

      this.expenseService.add(expense).subscribe(
        response => {
          this.snackBar.open("Done!", "", { duration: 2000 });
          this.dialogRef.close(expense.amountOfMoney);

          console.log(response);
        },
        err => console.log(err)
      );;

    }
  }
}
