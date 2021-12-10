import mongoose from 'mongoose';
import { AggregateRoot } from '../core/domain/AggregateRoot';
import { Result } from '../core/logic/Result';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import ITripResultDTO from '../dto/TripResult/tripResultDTO';


interface TripResultProps {
    time: number;
    noI: string;
    noF: string;
    caminho: Array<any>;
    finalTime: number;
}

export class TripResult extends AggregateRoot<TripResultProps>{
 
    get id(): UniqueEntityID {
        return this._id;
    }
    
    get time(): number {
        return this.props.time;
    }

    get noI(): string {
        return this.props.noI;
    }

    get noF(): string {
        return this.props.noF;
    }

    get caminho():  Array<any> {
        return this.props.caminho;
    }

    get finalTime(): number {
        return this.props.finalTime;
    }

    private constructor(props: TripResultProps, id?: UniqueEntityID
    ) {
        super(props, id);
    }

    public static create(tripResultDTO: ITripResultDTO, id?: UniqueEntityID): Result<TripResult> {
        const time= tripResultDTO.time;
        const noI = tripResultDTO.noI;
        const noF = tripResultDTO.noF;
        const caminho = tripResultDTO.caminho;
        const finalTime = tripResultDTO.finalTime;

        const tripResult = new TripResult({
                time:time,
                noI: noI,
                noF: noF,
                caminho: caminho,
                finalTime: finalTime

            }, id);
        return Result.ok<TripResult>(tripResult)
    }
 }
 