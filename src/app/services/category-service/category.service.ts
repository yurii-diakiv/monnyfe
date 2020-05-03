import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  // add(category: Category) {
  //   return this.http.post<Category>("https://localhost:5001/categories", category);
  // }

  // delete(id: number) {
  //   return this.http.delete("https://localhost:5001/categories/"+id);
  // }

  getAll() {
    // return this.http.get<Category[]>("https://localhost:5001/categories");
    return this.http.get<Category[]>("https://monnybe.herokuapp.com/categories");
  }
}
