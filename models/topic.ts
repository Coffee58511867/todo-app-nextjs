import mongoose, { Schema } from "mongoose";
import IItem from "@/app/interfaces/Item";

const TopicSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a surname"],
    },
   },
  {
    timestamps: true,
  }
);

export default mongoose.model<IItem>(
  "TOPICS",
 TopicSchema
);
