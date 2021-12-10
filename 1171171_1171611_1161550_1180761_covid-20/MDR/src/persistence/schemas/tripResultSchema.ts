import mongoose from 'mongoose';
import { ITripResultPersistence } from '../../dataschema/ITripResultPersistance';
const TripResultSchema = new mongoose.Schema(
  {
    time: { type: Number},

    noI: { type: String},

    noF: { type: String},

    caminho: { type: Array<any>()},
    
    finalTime: { type: Number}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITripResultPersistence & mongoose.Document>('TripResult', TripResultSchema);