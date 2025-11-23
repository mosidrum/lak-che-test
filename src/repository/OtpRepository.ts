
import type { IRepository } from './repository';
import type { FindOneOptions, Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import {handleGetRepository} from "../database";
import {Otp} from "../entities";

export class OtpRepository implements IRepository<Otp> {
    private repository: Repository<Otp>;

    constructor() {
        this.repository = handleGetRepository(Otp);
    }

    async findOne(options: FindOneOptions<Otp>): Promise<Otp | null> {
        return this.repository.findOne(options);
    }

    async find(options?: FindManyOptions<Otp>): Promise<Otp[]> {
        return this.repository.find(options);
    }

    async findById(id: string): Promise<Otp | null> {
        return this.repository.findOneBy({ id });
    }

    create(Otp: Partial<Otp>) {
        return this.repository.create(Otp);
    }

    async update(
      criteria: string | number | FindOptionsWhere<Otp>,
      data: Partial<Otp>
    ) {
        return this.repository.update(criteria, data);
    }

    async save(Otp: Partial<Otp>) {
        return this.repository.save(Otp);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
