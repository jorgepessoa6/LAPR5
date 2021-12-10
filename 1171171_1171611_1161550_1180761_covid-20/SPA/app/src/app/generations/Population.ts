export class Population {
  populations: string;
  order:number;
  orderGen: number;

  constructor(population: string, order:number, orderGen: number) {
    this.populations = population;
    this.order = order;
    this.orderGen = orderGen;
  }
}
