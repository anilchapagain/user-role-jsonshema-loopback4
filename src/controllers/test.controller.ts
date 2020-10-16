import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {TestModel} from '../models';
import {TestRepository} from '../repositories';

export class TestController {
  constructor(
    @repository(TestRepository)
    public testRepository: TestRepository,
  ) {}

  @post('/test', {
    responses: {
      '200': {
        description: 'test model instance',
        content: {'application/json': {schema: getModelSchemaRef(TestModel)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestModel, {
            title: 'Newtest',
            exclude: ['id'],
          }),
        },
      },
    })
    test: Omit<TestModel, 'id'>,
  ): Promise<TestModel> {
    return this.testRepository.create(test);
  }

  @get('/test/count', {
    responses: {
      '200': {
        description: 'test model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TestModel) where?: Where<TestModel>,
  ): Promise<Count> {
    return this.testRepository.count(where);
  }

  @get('/test', {
    responses: {
      '200': {
        description: 'Array of test model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TestModel, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TestModel) filter?: Filter<TestModel>,
  ): Promise<TestModel[]> {
    return this.testRepository.find(filter);
  }

  @patch('/test', {
    responses: {
      '200': {
        description: 'test PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestModel, {partial: true}),
        },
      },
    })
    test: TestModel,
    @param.where(TestModel) where?: Where<TestModel>,
  ): Promise<Count> {
    return this.testRepository.updateAll(test, where);
  }

  // @get('/test/{name}', {
  //   responses: {
  //     '200': {
  //       description: 'test model instance',
  //       content: {
  //         'application/json': {
  //           schema: getModelSchemaRef(TestModel, {includeRelations: true}),
  //         },
  //       },
  //     },
  //   },
  // })
  // async hello(
  //   @param.path.string('name') name: string,
  //   @param.filter(TestModel, {exclude: 'where'})
  //   filter?: FilterExcludingWhere<TestModel>,
  // ): Promise<TestModel> {
  //   return this.testRepository.hello(name, filter);
  // }
  @get('/test/{id}', {
    responses: {
      '200': {
        description: 'test model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TestModel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TestModel, {exclude: 'where'})
    filter?: FilterExcludingWhere<TestModel>,
  ): Promise<TestModel> {
    return this.testRepository.findById(id, filter);
  }

  @patch('/test/{id}', {
    responses: {
      '204': {
        description: 'test PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestModel, {partial: true}),
        },
      },
    })
    test: TestModel,
  ): Promise<void> {
    await this.testRepository.updateById(id, test);
  }

  @put('/test/{id}', {
    responses: {
      '204': {
        description: 'test PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() test: TestModel,
  ): Promise<void> {
    await this.testRepository.replaceById(id, test);
  }

  @del('/test/{id}', {
    responses: {
      '204': {
        description: 'test DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testRepository.deleteById(id);
  }
}
