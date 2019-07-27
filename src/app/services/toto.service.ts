import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotoService {

  constructor() { }
  
  sayHi(): string{
    return "Hi !";
  }
}
