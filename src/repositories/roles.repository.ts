import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Roles, RolesRelations, Users} from '../models';
import {LocalhostDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsersRepository} from './users.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly users: HasManyRepositoryFactory<Users, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.localhost') dataSource: LocalhostDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Roles, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
