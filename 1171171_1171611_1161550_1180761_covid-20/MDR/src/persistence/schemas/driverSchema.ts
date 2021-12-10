import mongoose from 'mongoose';
import { IDriverPersistence } from '../../dataschema/IDriverPersistence';

const DriverSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true },

    description: { 
      type: String,
      minlength: 20,
      maxlength: 250}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IDriverPersistence & mongoose.Document>('Driver', DriverSchema);
