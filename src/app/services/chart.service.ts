import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
  
  sayHi(): string{
    return "Hi !";
  }
}
