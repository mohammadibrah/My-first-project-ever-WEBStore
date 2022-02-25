import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    private products : Product[] = [ ];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async insertProduct (name: string, description: string, price: number, imgUrl: string){
        const newProduct = new this.productModel({
            name,
            description,
            price,
            imgUrl,
        });
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }
    async getProducts(){
        const products = await this.productModel.find().exec();
        return products as Product[];
    }

    async getProductById(id: string){
        return await this.findProduct(id);
    }
    
    private async findProduct(id: string): Promise<Product> {
        let product: Product;
        try {
             product = await this.productModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Product not found');
        }
        
       return product;
    }

    async updateProduct(prodId: string, prodName: string, prodDesc: string, prodPrice: number, prodImg: string){
        let updatedProduct;
        try {
            updatedProduct = await this.productModel.findById(prodId);
        } catch (error) {
            throw new NotFoundException('Product not found');
        }
        
        if (prodName) updatedProduct.name = prodName;
        if (prodDesc) updatedProduct.description = prodDesc;
        if (prodPrice) updatedProduct.price = prodPrice;
        if (prodImg) updatedProduct.imgUrl = prodImg;

        updatedProduct.save();
    }

    async deleteProduct (prodId: string){
        
        try {
            await this.productModel.findByIdAndDelete(prodId);
        } catch (error) {
            throw new NotFoundException('Product not found');
        }
    }

}
