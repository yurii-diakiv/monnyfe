import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Limitation } from 'src/app/models/limitation';

@Injectable()
export class LimitationService {

  constructor(private http: HttpClient) { }

  getByUserId(userId: number) {
    return this.http.get<Limitation>("https://monnybe.herokuapp.com/limitations/byUserId/" + userId);
  }

  update(limitation: Limitation) {
    return this.http.put<Limitation>("https://monnybe.herokuapp.com/limitations", limitation);
  }
}
