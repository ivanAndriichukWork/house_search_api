import { DataSource, EntityManager } from 'typeorm';

export class BaseRepository {
  constructor(protected dataSource: DataSource) {}

  protected getRepository<T>(entityCls: new () => T) {
    const entityManager: EntityManager = this.dataSource.manager;
    return entityManager.getRepository(entityCls);
  }
}
