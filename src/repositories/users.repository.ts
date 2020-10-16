import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Users, UsersRelations, Roles} from '../models';
import {LocalhostDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RolesRepository} from './roles.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly roles: BelongsToAccessor<Roles, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.localhost') dataSource: LocalhostDataSource, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Users, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
