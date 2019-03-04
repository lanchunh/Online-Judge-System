import { Injectable } from '@angular/core';
import {Problem } from '../module/problem-module';

import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ServicesService {
  private problemsSource = new BehaviorSubject<Problem[]>([]);


  constructor(private httpClient: HttpClient) { }
  getProblems(): Observable<Problem[]> {
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this.problemsSource.next(res);
      })
      .catch(this.handleError);
    return this.problemsSource.asObservable();

  }

  getProblem(id: number): Promise<Problem> {
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }

  // add problem
  addProblem(problem: Problem) {
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post('api/v1/problems', problem, options)
      .toPromise()
      .then((res) => {
        this.getProblems();
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.body || error);
  }
}
