import Product from '../models/product.js'

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.send(products)
    console.log('Server Accessed')
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id})
        res.send(product)
    } catch {
        res.status(404)
        res.send({ error: "Product doesn't exist!" })
    }
        
}

export const createProduct = async (req, res) => {
    const product = new Product ({
        name: req.body.name,
        price: req.body.price,
        descraption: req.body.descraption,
        imgUrl: req.body.imgUrl
    })
	if (!product.imgUrl) product.imgUrl = 'https://sc04.alicdn.com/kf/He0ef70deca0e4ec5a9a6d8be56fcf84aB.png'
    await product.save()
    res.send(product)
}

export const deleteProduct = async (req, res) => {
	try {
		await Product.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Product doesn't exist!" })
	}
}

export const updateProduct = async (req, res) => {
	try {
		const product = await Product.findOne({ _id: req.params.id })

		if (req.body.name) {
			product.name = req.body.name
		}
             
        if (req.body.price) {
			product.price = req.body.price
		}
        
        if (req.body.description) {
			product.description = req.body.description
		}

        if (req.body.imgUrl) {
			product.imgUrl = req.body.imgUrl
		} else product.imgUrl = 'https://sc04.alicdn.com/kf/He0ef70deca0e4ec5a9a6d8be56fcf84aB.png'

		await product.save()
		res.send(product)
	} catch {
		res.status(404)
		res.send({ error: "Product doesn't exist!" })
	}
}