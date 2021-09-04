import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateProductDto } from '../dto/createProduct.dto';
import { UpdateProductDto } from '../dto/updateProduct.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProductService } from './product.service';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all(
    @Query('page') page: number
  ){
    return this.productService.paginate(page);
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto
  ){
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  async get(@Param('id') id: number){
    return this.productService.findOne({id});
  }

  @Put(':id')
  async update(@Param('id') id: number,
  @Body() updateProductDto: UpdateProductDto){

    await  this.productService.update(id, updateProductDto);
    return this.productService.findOne({id})

  }

  @Delete(':id')
  async delete(@Param('id') id: number){
    return this.productService.delete(id);
  }
}
