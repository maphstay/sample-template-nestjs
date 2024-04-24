import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@bases/pagination/paginated-response.dto';

/**
 * Decorator for defining paginated API responses.
 *
 * @param options - The options available for the decorator.
 * @param options.type - The type of the response data (Must be a class).
 * @param options.description - The description for the API response.
 *
 */

export function ApiPaginatedResponse(options: { type: any; description?: string }) {
  const { type, description } = options;

  return applyDecorators(
    ApiExtraModels(type),
    ApiExtraModels(PaginatedResponseDto),
    ApiOkResponse({
      description,
      schema: {
        type: 'object',
        properties: {
          metadata: {
            $ref: getSchemaPath(PaginatedResponseDto),
          },
          data: {
            type: 'array',
            items: {
              $ref: getSchemaPath(type),
            },
          },
        },
      },
    }),
  );
}
