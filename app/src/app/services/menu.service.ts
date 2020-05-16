import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  navOpenEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  openNav() {
    this.navOpenEmitter.emit(null);
  }

  getNavOpen() {
    return this.navOpenEmitter;
  }
}
