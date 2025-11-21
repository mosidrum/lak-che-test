import type { FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

export interface IRepository<T> {
    findOne: (options: FindOneOptions<T>) => Promise<T | null>;
    create: (data: Partial<T>) => T;
    save: (data: T) => Promise<T>;
    update: (id: string, data: Partial<T>) => Promise<UpdateResult>;
    remove: (id: string) => Promise<void>;
    find: (options?: FindManyOptions<T>) => Promise<T[]>;
    findById: (id: string) => Promise<T | null>;
}
