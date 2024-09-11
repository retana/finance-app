import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
      ) {}
    
      async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
      }
    
      async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
          throw new NotFoundException(`Categoría con id ${id} no encontrada`);
        }
        return category;
      }
    
      async create(categoryData: Partial<Category>): Promise<Category> {
        const category = this.categoryRepository.create(categoryData);
        return await this.categoryRepository.save(category);
      }
    
      async update(id: number, updateData: Partial<Category>): Promise<Category> {
        const category = await this.categoryRepository.preload({
          id,
          ...updateData,
        });
        if (!category) {
          throw new NotFoundException(`Categoría con id ${id} no encontrada`);
        }
        return await this.categoryRepository.save(category);
      }
    
      async delete(id: number): Promise<void> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Categoría con id ${id} no encontrada`);
        }
      }
}
