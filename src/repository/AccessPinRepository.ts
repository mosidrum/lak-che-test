import {AccessPin} from '../entities';

import type { IRepository } from './repository';
import type { FindOneOptions, Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import {handleGetRepository} from "../database";

export class AccessPinRepository implements IRepository<AccessPin> {
    private repository: Repository<AccessPin>;

    constructor() {
        this.repository = handleGetRepository(AccessPin);
    }

    async findOne(options: FindOneOptions<AccessPin>): Promise<AccessPin | null> {
        return this.repository.findOne(options);
    }

    async find(options?: FindManyOptions<AccessPin>): Promise<AccessPin[]> {
        return this.repository.find(options);
    }

    async findById(id: string): Promise<AccessPin | null> {
        return this.repository.findOneBy({ id });
    }

    create(AccessPin: Partial<AccessPin>) {
        return this.repository.create(AccessPin);
    }

    async update(
      criteria: string | number | FindOptionsWhere<AccessPin>,
      data: Partial<AccessPin>
    ) {
        return this.repository.update(criteria, data);
    }

    async save(AccessPin: Partial<AccessPin>) {
        return this.repository.save(AccessPin);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
