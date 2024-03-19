import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: String,
  headers: Object,
  chatQueries: { type: Array, default: [] },
});

const UserHistoryModel = mongoose.model("user", UserSchema);

export default UserHistoryModel;
