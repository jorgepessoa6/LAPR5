
import mongoose from 'mongoose';
import { INodePersistence } from '../../dataschema/INodePersistance';
import { CrewTravelTimes } from '../../models/crewTravelTimes';


const NodeSchema = new mongoose.Schema(
  {
    /*   domainId: { type: String, unique: true },
   */
    key: { type: String, required:true, unique: true},

    name: { type: String, unique: true,max:200 },

    latitude: { type: Number },

    longitude: { type: Number },

    shortName: { type: String ,required:true, unique:true, max:20},

    isDepot: { type: Boolean },

    isReliefPoint: { type: Boolean },

    capacities: { type: Array<any>() },

    informationPoint: { type: Array<any>() },

    crewTravelTimes: { type: Array<CrewTravelTimes>() }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<INodePersistence & mongoose.Document>('Node', NodeSchema);
