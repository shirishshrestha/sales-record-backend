import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  businessType: { type: String, required: true },
  saleAmount: { type: Number, required: true },
  dateOfSale: { type: Date, required: true },
  paidAmount: { type: Number, required: true },
  dueAmount: { type: Number, required: true },
  remarks: { type: String },
});

export default mongoose.model("Sale", saleSchema);
