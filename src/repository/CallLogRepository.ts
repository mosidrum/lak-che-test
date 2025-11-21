import {CallLog} from '../entities';

import type { IRepository } from './repository';
import type { FindOneOptions, Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import {handleGetRepository} from "../database";

export class CallLogRepository implements IRepository<CallLog> {
    private repository: Repository<CallLog>;

    constructor() {
        this.repository = handleGetRepository(CallLog);
    }

    async findOne(options: FindOneOptions<CallLog>): Promise<CallLog | null> {
        return this.repository.findOne(options);
    }

    async find(options?: FindManyOptions<CallLog>): Promise<CallLog[]> {
        return this.repository.find(options);
    }

    async findById(id: string): Promise<CallLog | null> {
        return this.repository.findOneBy({ id });
    }

    create(CallLog: Partial<CallLog>) {
        return this.repository.create(CallLog);
    }

    async update(
      criteria: string | number | FindOptionsWhere<CallLog>,
      data: Partial<CallLog>
    ) {
        return this.repository.update(criteria, data);
    }

    async save(CallLog: Partial<CallLog>) {
        return this.repository.save(CallLog);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
