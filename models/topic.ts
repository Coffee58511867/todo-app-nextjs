import mongoose, { Schema } from "mongoose";
import IItem from "@/app/interfaces/Item";

const TopicSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title of topic"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
  },
  {
    timestamps: true,
  }
);


const Topic = mongoose.models.Topics || mongoose.model<IItem>("Topics", TopicSchema);

export default Topic;
