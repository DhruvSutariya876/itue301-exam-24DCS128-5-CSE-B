import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String, required: true },
})

export default mongoose.model('Member', memberSchema)
