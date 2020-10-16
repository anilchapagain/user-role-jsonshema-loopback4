import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Roles, Users} from '../models';
import {UsersRepository} from '../repositories';

export class UsersRolesController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) {}

  @get('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to Users',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.number('id') id: typeof Users.prototype.id,
  ): Promise<Roles> {
    return this.usersRepository.roles(id);
  }
}
