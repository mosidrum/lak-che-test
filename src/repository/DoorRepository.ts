import {Door} from '../entities';

import type { IRepository } from './repository';
import type { FindOneOptions, Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import {handleGetRepository} from "../database";

export class DoorRepository implements IRepository<Door> {
    private repository: Repository<Door>;

    constructor() {
        this.repository = handleGetRepository(Door);
    }

    async findOne(options: FindOneOptions<Door>): Promise<Door | null> {
        return this.repository.findOne(options);
    }

    async find(options?: FindManyOptions<Door>): Promise<Door[]> {
        return this.repository.find(options);
    }

    async findById(id: string): Promise<Door | null> {
        return this.repository.findOneBy({ id });
    }

    create(Door: Partial<Door>) {
        return this.repository.create(Door);
    }

    async update(
      criteria: string | number | FindOptionsWhere<Door>,
      data: Partial<Door>
    ) {
        return this.repository.update(criteria, data);
    }

    async save(Door: Partial<Door>) {
        return this.repository.save(Door);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
