/* import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Driver} from './driver';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const drivers = [
      { key: 21, name: 'Duart', description:"condutor muito experiente" },
  { key: 22, name: 'Marco', description:"condutor muito experiente"  },
  { key: 23, name: 'Bruno', description:"condutor muito experiente"  },
  { key: 24, name: 'Celeste' , description:"condutor muito experiente" },
  { key: 25, name: 'Maria', description:"condutor muito experiente"  },
  { key: 26, name: 'Ruben', description:"condutor muito experiente"  },
  { key: 27, name: 'Dino', description:"condutor muito experiente"  },
  { key: 28, name: 'David' , description:"condutor muito experiente" },
  { key: 29, name: 'Magda', description:"condutor muito experiente"  },
  { key: 30, name: 'Tomás', description:"condutor muito experiente"  }
    ];
    return {drivers};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId1(drivers: Driver[]): number {
    return drivers.length > 0 ? Math.max(...drivers.map(driver => driver.key)) + 1 : 11;
  }
} */