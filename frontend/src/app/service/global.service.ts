import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  filterTable = (arr: any[], filters: any): any => {
    if (!arr) {
      return [];
    }
    const newArr = arr.filter(elemento => {
      return Object.keys(filters).every(key => {
        return elemento[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase());
      });
    });
    return newArr;
  }

  addLine = (set: Set<any>, row: any, multiple: number) => {
    if (multiple) {
      if (set.has(row)) {
        set.delete(row);
      } else {
        set.add(row);
      }
    } else {
      if (set.has(row)) {
        set.delete(row);
      } else {
        if (set.size) {
          set.clear();
        }

        set.add(row);
      }
    }
  }

  selectAll = (arr: any, set: Set<any>) => {
    if (set.size == arr.length) {
      set.clear();
    } else {
      set.clear();
      arr.forEach((elemento: any) => {
        set.add(elemento);
      });
    }
  }

  removeLine = (arr: any[], set: Set<any>): void => {
    let i = arr.length;
    while (i--) {
      if (set.has(arr[i])) {
        arr.splice(i, 1);
      }
    }
    set.clear();
  }
}
