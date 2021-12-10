import mongoose from 'mongoose';
import { IVehicleTypePersistence } from '../../dataschema/IVehicleTypePersistence';

const VehicleTypeSchema = new mongoose.Schema(
  {
    //domainId: { type: String, unique: true },

    //key: { type: String, required:true },

    name: { type: String, required: true },

    autonomy: {
      type: Number, 
      min: 1,
      validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }},
      
    cost: { 
      type: Number,
      min: 0,},
    averageSpeed:{
      type: Number,
      min: 1},
    energySource: {
      type: Number,
      enum: [1, 20, 23, 50, 75]},
    consumption:{type:Number},
    emissions:{type:Number},
    ParametersValue:{type:Array<any>()},
    Vehicles: {type: Array<any>()}

    
  },
  
  {
    timestamps: true
  }
);
 //VehicleSchema.path('energySource').options.enum; // [enum só aceita os valores 1, 20, 23, 50, 75]
                                                  //correspondem a Gasolina, GPL, Gasoleo, Hidrgoenio, Eletrico

export default mongoose.model<IVehicleTypePersistence & mongoose.Document>('VehicleType', VehicleTypeSchema);
