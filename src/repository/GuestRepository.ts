import {Guest} from '../entities';

import type { IRepository } from './repository';
import type { FindOneOptions, Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import {handleGetRepository} from "../database";

export class GuestRepository implements IRepository<Guest> {
    private repository: Repository<Guest>;

    constructor() {
        this.repository = handleGetRepository(Guest);
    }

    async findOne(options: FindOneOptions<Guest>): Promise<Guest | null> {
        return this.repository.findOne(options);
    }

    async find(options?: FindManyOptions<Guest>): Promise<Guest[]> {
        return this.repository.find(options);
    }

    async findById(id: string): Promise<Guest | null> {
        return this.repository.findOneBy({ id });
    }

    create(Guest: Partial<Guest>) {
        return this.repository.create(Guest);
    }

    async update(
      criteria: string | number | FindOptionsWhere<Guest>,
      data: Partial<Guest>
    ) {
        return this.repository.update(criteria, data);
    }

    async save(Guest: Partial<Guest>) {
        return this.repository.save(Guest);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
