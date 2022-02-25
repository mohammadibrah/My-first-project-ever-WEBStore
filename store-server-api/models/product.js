import mongoose from "mongoose"

const schema = mongoose.Schema({
	name: String,
    price: Number,
    description: String,
    imgUrl: String
})

export default mongoose.model("Product", schema)