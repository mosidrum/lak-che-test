import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import AppDataSource from '../data-source';

export const handleGetRepository = <T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> => {
    return AppDataSource.manager.getRepository(entity);
};
