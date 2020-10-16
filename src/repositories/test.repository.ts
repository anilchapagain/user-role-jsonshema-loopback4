import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalhostDataSource} from '../datasources';
import {TestModel} from '../models/test.model';

export class TestRepository extends DefaultCrudRepository<
  TestModel,
  typeof TestModel.prototype.id
> {
  constructor(
    @inject('datasources.localhost') dataSource: LocalhostDataSource,
  ) {
    super(TestModel, dataSource);
  }
}
