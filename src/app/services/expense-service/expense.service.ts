import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from 'src/app/models/expense';

@Injectable()
export class ExpenseService {

  constructor(private http: HttpClient) { }

  add(expense: Expense) {
    return this.http.post<Expense>("https://monnybe.herokuapp.com/expenses", expense);
  }

  getExpensesForThisMonth(userId: number) {
    return this.http.get<Expense[]>("https://monnybe.herokuapp.com/expenses/forThisMonth/"+userId);
  }

  getFromTo(userId: number, from: Date, to: Date) {
    return this.http.get<any[]>(
      `https://monnybe.herokuapp.com/expenses/fromTo?userId=${userId}&from=${from.toISOString()}&to=${to.toISOString()}`);
  }
}
