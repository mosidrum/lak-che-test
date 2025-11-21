import type { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import AppDataSource from "./data-source";

/**
 * A utility function to retrieve a TypeORM repository for a specific entity.
 * Always uses the main application DataSource.
 *
 * @param entity The entity for which to get the repository.
 * @returns A TypeORM repository for the given entity.
 */
export const handleGetRepository = <T extends ObjectLiteral>(
  entity: EntityTarget<T>
): Repository<T> => {
    return AppDataSource.manager.getRepository(entity);
};
