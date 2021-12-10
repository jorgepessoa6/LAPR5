
import { ValueObject } from '../core/domain/ValueObject';

interface CrewTravelTimesProps {
    duration: number
}

export class CrewTravelTimes extends ValueObject<CrewTravelTimesProps> {
    get duration(): number {
        return this.duration;
    }

    public constructor(props: CrewTravelTimesProps) {
        super(props);
    }

    public static create(duration: number): CrewTravelTimes {

        const crew = new CrewTravelTimes({
            duration: duration 
        });
        return crew;
    }
}
