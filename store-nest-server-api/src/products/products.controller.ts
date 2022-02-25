import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}

    @Get()
    async getProducts(){
        return await this.productsService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string){
        return await this.productsService.getProductById(prodId);
    }

    @Post()
    async addProduct(@Body('name') prodName: string,
               @Body('description') prodDesc,
               @Body('price') prodPrice: number,
               @Body('imgUrl') prodImg: string) {
        const generatedId = await this.productsService.insertProduct(
            prodName,
            prodDesc,
            prodPrice,
            prodImg);
        return {id: generatedId}
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodId,
                        @Body('name') prodName: string,
                        @Body('description') prodDesc,
                        @Body('price') prodPrice: number,
                        @Body('imgUrl') prodImg: string){
                                await this.productsService.updateProduct(
                                prodId,
                                prodName,
                                prodDesc,
                                prodPrice,
                                prodImg);
    }
    
    @Delete(':id')
    async removeProduct (@Param('id') prodId){
        await this.productsService.deleteProduct(prodId);
    }
}
