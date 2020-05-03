import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { FormControl, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense-service/expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomCategoryService } from 'src/app/services/custom-category-service/custom-category.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-custom-expense-dialog',
  templateUrl: './custom-expense-dialog.component.html',
  styleUrls: ['./custom-expense-dialog.component.css'],
  providers: [ExpenseService, CustomCategoryService, UserService]
})
export class CustomExpenseDialogComponent implements OnInit {
  userId: number;

  categories: Category[] = [];

  currentDate = new Date();
  date = new FormControl(this.currentDate);
  price = new FormControl('', [Validators.required, Validators.min(0.1)]);
  selectedId = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<CustomExpenseDialogComponent>,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar,
    private customCategoryService: CustomCategoryService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.currentUserId();
    this.getCategories();
  }

  getCategories() {
    this.customCategoryService.getCustomCategories(this.userId).subscribe(categories => this.categories = categories);
  }

  getPriceErrorMessage() {
    if (this.price.hasError('required')) {
      return 'You must enter a value';
    }

    return this.price.hasError('min') ? 'Value have to be greater than 0.1' : '';
  }

  addExpense() {
    if (this.price.valid && this.selectedId.valid) {
      
      let expense: Expense = new Expense();
      expense.date = new Date(this.date.value);
      expense.customCategoryId = this.selectedId.value;
      expense.amountOfMoney = this.price.value;
      expense.userId = this.userId;
      
      this.expenseService.add(expense).subscribe(
        response => { 
          this.snackBar.open("Done!", "", {duration: 2000});
          this.dialogRef.close(expense.amountOfMoney);

          console.log(response);
        },
        err => console.log(err)
      );;
    }
  }
}
