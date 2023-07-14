import mongoose, { Schema } from "mongoose";
import ITopic from "@/interfaces/Item";

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


const Topic = mongoose.models.Topics || mongoose.model<ITopic>("Topics", TopicSchema);

export default Topic;
