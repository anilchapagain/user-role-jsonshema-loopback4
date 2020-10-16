import {Entity, model, property} from '@loopback/repository';
@model({settings: {strict: false}})
export class TestModel extends Entity {
  // alternatively use @property.array('array')
  @property({
    type: 'Number',
    id: true,
  })
  id: Number;
  // @property({name: 'apis'})
  @property({
    type: 'object',
    jsonSchema: {properties: {name: {type: 'string'}}},
  })
  apis?: Object;

  constructor(data?: Partial<TestModel>) {
    super(data);
  }
}
