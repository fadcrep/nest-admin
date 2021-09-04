import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../models/product.entity';
import { CommonModule } from '../common/common.module';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CommonModule],
  controllers: [ProductController, UploadController],
  providers: [ProductService]
})
export class ProductModule {}
