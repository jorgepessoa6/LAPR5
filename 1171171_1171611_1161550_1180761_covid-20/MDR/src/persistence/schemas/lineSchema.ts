import mongoose from 'mongoose';
import { Driver } from '../../models/driver';
import { ILinePersistence } from '../../dataschema/ILinePersistance';
import { LinePath } from '../../models/linePath';
import { VehicleType } from '../../models/vehicleType';

const LineSchema = new mongoose.Schema(
  {
    key: { type: String },

    name: { type: String, unique:true },

    firstNode: { type: String },

    lastNode: { type: String },

    color: { type: String },

    linePath: { type: Array<LinePath>() },

    allowedDrivers: { type: Array<Driver>() },

    disallowedDrivers: { type: Array<Driver>() },

    allowedVehicles: { type: Array<VehicleType>() },

    disallowedVehicles: { type: Array<VehicleType>() },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ILinePersistence & mongoose.Document>('Line', LineSchema);
