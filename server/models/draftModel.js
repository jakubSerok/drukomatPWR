import mongoose from "mongoose";

const DraftSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  DraftFile: {
    type: String,
    required: true,
  },
});

const draftModel =
  mongoose.models.Drafts || mongoose.model("drafts", DraftSchema);
export default draftModel;
