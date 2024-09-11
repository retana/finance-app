import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Patch,
  } from '@nestjs/common';
  import { CategoryService } from './category.service';
  import { Category } from './category.entity';
  
  @Controller('categories')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    // Obtener todas las categorías
    @Get()
    async findAll(): Promise<Category[]> {
      return this.categoryService.findAll();
    }
  
    // Obtener una categoría por ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Category> {
      return this.categoryService.findOne(id);
    }
  
    // Crear una nueva categoría
    @Post()
    async create(@Body() categoryData: Partial<Category>): Promise<Category> {
      return this.categoryService.create(categoryData);
    }
  
    // Actualizar una categoría completa (PUT)
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateData: Partial<Category>): Promise<Category> {
      return this.categoryService.update(id, updateData);
    }
  
    // Actualizar parcialmente una categoría (PATCH)
    @Patch(':id')
    async partialUpdate(@Param('id') id: number, @Body() updateData: Partial<Category>): Promise<Category> {
      return this.categoryService.update(id, updateData);
    }
  
    // Eliminar una categoría
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      return this.categoryService.delete(id);
    }
  }
  