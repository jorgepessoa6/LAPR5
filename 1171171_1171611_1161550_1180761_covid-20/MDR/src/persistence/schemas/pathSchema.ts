import mongoose from 'mongoose';
import { IPathPersistence } from '../../dataschema/IPathPersistance';
import { PathNode } from '../../models/pathNode';


const PathSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },

    isEmpty: { type: Boolean},

    pathNodes: { type: Array<PathNode>()},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);
