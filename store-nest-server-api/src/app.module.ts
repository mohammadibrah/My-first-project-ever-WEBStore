import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://root:root@cluster0.tnerh.mongodb.net/storeDatabase?retryWrites=true&w=majority'),
    ProductsModule],
})
export class AppModule {}
