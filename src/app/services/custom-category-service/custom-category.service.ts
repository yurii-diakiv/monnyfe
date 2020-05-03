import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomCategory } from 'src/app/models/customCategory';

@Injectable()
export class CustomCategoryService {

  constructor(private http: HttpClient) { }

  add(customCategory: CustomCategory) {
    return this.http.post<CustomCategory>("https://monnybe.herokuapp.com/customCategories", customCategory);
  }

  getCustomCategories(userId: number) {
    return this.http.get<CustomCategory[]>(`https://monnybe.herokuapp.com/customCategories/${userId}`);
  }

  delete(id: number) {
    return this.http.delete(`https://monnybe.herokuapp.com/customCategories/${id}`);
  }
}
