export class PathNode{
    node: string;
    duration: number;
    distance: number;

    constructor(node : string, distance : number, duration : number){
        this.node = node;
        this.distance = distance;
        this.duration = duration;
    }
    
}