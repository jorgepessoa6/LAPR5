import mongoose from 'mongoose';
import { IRgbPersistence } from '../../dataschema/IRgbPersistence';


const RgbSchema = new mongoose.Schema({
  red: { type: Number },

  green: { type: Number },

  blue: { type: Number },
});

export default mongoose.model<IRgbPersistence & mongoose.Document>('RGB', RgbSchema);
