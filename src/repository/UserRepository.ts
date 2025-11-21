import {User} from '../entities';

import type { IRepository } from './repository';
import type { FindOneOptions, Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import {handleGetRepository} from "../database";

export class UserRepository implements IRepository<User> {
    private repository: Repository<User>;

    constructor() {
        this.repository = handleGetRepository(User);
    }

    async findOne(options: FindOneOptions<User>): Promise<User | null> {
        return this.repository.findOne(options);
    }

    async find(options?: FindManyOptions<User>): Promise<User[]> {
        return this.repository.find(options);
    }

    async findById(id: string): Promise<User | null> {
        return this.repository.findOneBy({ id });
    }

    create(user: Partial<User>) {
        return this.repository.create(user);
    }

    async update(
      criteria: string | number | FindOptionsWhere<User>,
      data: Partial<User>
    ) {
        return this.repository.update(criteria, data);
    }

    async save(user: Partial<User>) {
        return this.repository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
