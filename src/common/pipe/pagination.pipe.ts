import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { PaginationDto } from '../../dto/request/pagination.dto';

export class PaginationPipe implements PipeTransform {
  transform(value: PaginationDto, metadata: ArgumentMetadata) {
    let { page, limit } = value;
    if (page == undefined || page == null) value.page = null;
    if (limit == undefined || limit == null) value.limit = null;
    if (page <= 0) throw new BadRequestException(`Page not equal ${value.page}`);
    if (limit <= 0) throw new BadRequestException(`Limit not equal ${value.limit}`);
    return value;
  }
}
