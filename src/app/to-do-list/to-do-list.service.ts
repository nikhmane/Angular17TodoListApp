import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  constructor(private readonly httpClient: HttpClient) {}

  getTaskListDetailsFromJSON() {
    return this.httpClient.get('assets/mocks/tasks.json');
  }

  /**
   * @description This function is used to check string value if value is null,
   *  undefined then it returns true else false
   * @param  {string} str this paramater is used for checking the value
   * @returns boolean
   */
  private isEmptyString(str: string) {
    try {
      return str === null || str === undefined || str.trim().length < 1;
    } catch (_e) {
      return false;
    }
  }

  /**
   * @description This function is used to check string value if value is null,
   *  undefined then it returns true else false
   * @param  {number} num this paramater is used for checking the value
   * @returns boolean
   */
  private isEmptyNumber(num: number) {
    return num === null || num === undefined || Number.isNaN(num);
  }

  /**
   * @description This function is used to check string value if value is null,
   *  undefined then it returns true else false
   * @param  object this paramater is used for checking the value
   * @returns boolean
   */
  private isEmptyObject(object: any) {
    return (
      object === null || object === undefined || Object.keys(object).length < 1
    );
  }

  /**
   * @description This function is used to check array if value is null,
   *  undefined then it returns true else false
   * @param  array this paramater is used for checking the value
   * @returns boolean
   */
  private isEmptyArray(array: any) {
    return array === null || array === undefined || array.length < 1;
  }

  /**
   * @description Function to return if given value is empty based on its type
   * @param  {any} value
   * @returns boolean
   */
  isEmpty(value: any) {
    if (Array.isArray(value)) {
      return this.isEmptyArray(value);
    } else if (typeof value === 'string') {
      return this.isEmptyString(value);
    } else if (typeof value === 'number') {
      return this.isEmptyNumber(value);
    }

    return this.isEmptyObject(value);
  }
}
