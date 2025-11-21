import {Property} from '../entities';

import type { IRepository } from './repository';
import type { FindOneOptions, Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import {handleGetRepository} from "../database";

export class PropertyRepository implements IRepository<Property> {
    private repository: Repository<Property>;

    constructor() {
        this.repository = handleGetRepository(Property);
    }

    async findOne(options: FindOneOptions<Property>): Promise<Property | null> {
        return this.repository.findOne(options);
    }

    async find(options?: FindManyOptions<Property>): Promise<Property[]> {
        return this.repository.find(options);
    }

    async findById(id: string): Promise<Property | null> {
        return this.repository.findOneBy({ id });
    }

    create(Property: Partial<Property>) {
        return this.repository.create(Property);
    }

    async update(
      criteria: string | number | FindOptionsWhere<Property>,
      data: Partial<Property>
    ) {
        return this.repository.update(criteria, data);
    }

    async save(Property: Partial<Property>) {
        return this.repository.save(Property);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
