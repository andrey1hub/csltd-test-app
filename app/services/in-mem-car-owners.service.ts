import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemCarOwnersService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo) {
    return {
      owners: [
        {
          id: 1,
          surname: 'Иваненко',
          name: 'Иван',
          patronymic: 'Иванович',
          cars: [
            {
              id: 'AX1111HP',
              manufacturer: 'Mercedes-Benz',
              model: 'S1000',
              year: 2021
            }
          ]
        },
        {
          id: 2,
          surname: 'Алексеенко',
          name: 'Алексей',
          patronymic: 'Алексеевич',
          cars: [
            {
              id: 'AX2222HP',
              manufacturer: 'Mercedes-Benz',
              model: 'S1000',
              year: 2021
            }
          ]
        },
        {
          id: 3,
          surname: 'Василенко',
          name: 'Василий',
          patronymic: 'Васильевич',
          cars: [
            {
              id: 'AX3333HP',
              manufacturer: 'Mercedes-Benz',
              model: 'S1000',
              year: 2021
            }
          ]
        },
        {
          id: 4,
          surname: 'Борисенко',
          name: 'Борис',
          patronymic: 'Борисович',
          cars: [
            {
              id: 'AX4444HP',
              manufacturer: 'Mercedes-Benz',
              model: 'S1000',
              year: 2021
            }
          ]
        },
        {
          id: 5,
          surname: 'Иваненко',
          name: 'Мария',
          patronymic: 'Ивановна',
          cars: [
            {
              id: 'AX5555HP',
              manufacturer: 'Mercedes-Benz',
              model: 'S1000',
              year: 2021
            }
          ]
        },
        {
          id: 6,
          surname: 'Алексеенко',
          name: 'Юлия',
          patronymic: 'Алексеевна',
          cars: [
            {
              id: 'AX6666HP',
              manufacturer: 'Mercedes-Benz',
              model: 'S1000',
              year: 2021
            }
          ]
        },
        {
          id: 7,
          surname: 'Василенко',
          name: 'Наталья',
          patronymic: 'Васильевна',
          cars: [
            {
              id: 'AX7777HP',
              manufacturer: 'Mercedes-Benz',
              model: 'S1000',
              year: 2021
            }
          ]
        },
        {
          id: 8,
          surname: 'Борисенко',
          name: 'Екатерина',
          patronymic: 'Борисовна',
          cars: [
            {
              id: 'AX8888HP',
              manufacturer: 'Mercedes-Benz',
              model: 'S1000',
              year: 2021
            }
          ]
        }
      ]
    }
  }

}
