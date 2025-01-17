import { Mapper } from '@owl/common';
import { Type } from '@nestjs/common';
import { Item } from '@owl/rbac-manager';
import moment from 'moment';
import { BaseRbacItemResponse } from '../dto/base/base-item.response.dto';
import { BaseRbacItemRequest } from '../dto/base/base-item.request.dto';

export class RbacItemMapper<
  Entity extends Item,
  Request extends BaseRbacItemRequest,
  Response extends BaseRbacItemResponse
> implements Mapper<Request, Entity, Response>
{
  constructor(private entity: Type<Entity>, private response: Type<Response>) {}

  toPersistence(request: Request): Entity {
    return new (this.entity)(
      request.name,
      request.description,
      request.ruleName
    );
  }

  toResponse(entity: Entity): Response {
    return new (this.response)(
      entity.name,
      entity.description,
      entity.ruleName,
      entity.createdAt !== null ? moment(entity.createdAt).format('YYYY-MM-DD HH:mm:ss') : null,
      entity.updatedAt !== null ? moment(entity.updatedAt).format('YYYY-MM-DD HH:mm:ss') : null,
    )
  }
}

