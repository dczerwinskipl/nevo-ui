export type EntityId = string | number;

export interface BaseEntity {
  id: EntityId;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationFilters {
  page: number;
  limit: number;
}

export interface DatabaseConfig<TEntity, TFilters> {
  filterEntities: (entities: TEntity[], filters: TFilters) => TEntity[];
  generateId: () => EntityId;
  initialData?: TEntity[];
}

export function createInMemoryDatabase<
  TEntity extends BaseEntity,
  TFilters extends PaginationFilters
>(config: DatabaseConfig<TEntity, TFilters>) {
  let entities: TEntity[] = config.initialData || [];

  const getEntities = (filters: TFilters): PaginatedResponse<TEntity> => {
    const filteredEntities = config.filterEntities([...entities], filters);

    const totalCount = filteredEntities.length;
    const totalPages = Math.ceil(totalCount / filters.limit);
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const data = filteredEntities.slice(startIndex, endIndex);

    return {
      data,
      totalCount,
      page: filters.page,
      limit: filters.limit,
      totalPages
    };
  };

  const getEntity = (id: EntityId): TEntity | null => {
    return entities.find(entity => entity.id === id) || null;
  };

  const createEntity = (data: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>): TEntity => {
    const now = new Date().toISOString();
    const entity = {
      ...data,
      id: config.generateId(),
      createdAt: now,
      updatedAt: now
    } as TEntity;

    entities.push(entity);
    return entity;
  };

  const updateEntity = (id: EntityId, data: Partial<Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>>): TEntity | null => {
    const index = entities.findIndex(entity => entity.id === id);
    if (index === -1) return null;

    const existingEntity = entities[index]!;
    const updatedEntity = {
      ...existingEntity,
      ...data,
      id: existingEntity.id,
      updatedAt: new Date().toISOString()
    } as TEntity;

    entities[index] = updatedEntity;
    return updatedEntity;
  };

  const deleteEntity = (id: EntityId): boolean => {
    const index = entities.findIndex(entity => entity.id === id);
    if (index === -1) return false;

    entities.splice(index, 1);
    return true;
  };

  const seed = (newEntities: TEntity[]): void => {
    entities = [...newEntities];
  };

  return {
    getEntities,
    getEntity,
    createEntity,
    updateEntity,
    deleteEntity,
    seed
  };
}