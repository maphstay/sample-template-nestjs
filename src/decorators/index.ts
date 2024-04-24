import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiConflictResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

/**
 * Decorator function for defining a custom OK response in Swagger/OpenAPI documentation.
 * @param {object} options - Configuration options for the OK response.
 * @param {any} options.type - The type of the response data.
 * @param {string} [options.description] - The description of the OK response.
 */
export const ApiCustomOkResponse = (options: { type: any; description?: string }) => {
  const schema = options.type.message
    ? {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: options.type.message,
          },
        },
      }
    : {
        type: 'object',
        $ref: getSchemaPath(options?.type),
      };

  return applyDecorators(
    ApiExtraModels(options?.type),
    ApiOkResponse({
      description: options?.description || 'Ok',
      schema,
    }),
  );
};

/**
 * Decorator function for defining a custom Created response in Swagger/OpenAPI documentation.
 * @param {object} options - Configuration options for the Created response.
 * @param {string} options.message - The message of the response data.
 * @param {string} [options.description='Created'] - The description of the Created response.
 */
export const ApiCustomCreatedResponse = (options: { message: string; description?: string }) => {
  return applyDecorators(
    ApiCreatedResponse({
      description: options?.description || 'Created',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: options.message,
          },
        },
      },
    }),
  );
};

/**
 * Decorator function for defining a custom Bad request response in Swagger/OpenAPI documentation.
 * @param {object} [options] - Optional configuration options.
 * @param {string} [options.message='Bad request'] - The bad request message to be included in the response schema.
 * @param {string} [options.description='Bad request'] - The description of the Bad request response.
 */
export const ApiCustomBadRequestResponse = (options?: { message?: string; description?: string }) => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: options?.description || 'Bad request',
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            default: 400,
          },
          message: {
            type: 'array',
            default: options?.message ? [options.message] : ['Bad request'],
          },
          error: {
            type: 'string',
            default: 'Bad request',
          },
        },
      },
    }),
  );
};

/**
 * Decorator function for defining a custom Unauthorized request response in Swagger/OpenAPI documentation.
 * @param {object} [options] - Optional configuration options.
 * @param {string} [options.message='Unauthorized'] - The unauthorized message to be included in the response schema.
 * @param {string} [options.description='Unauthorized'] - The description of the unauthorized request response.
 */
export const ApiCustomUnauthorizedResponse = (options?: { message?: string; description?: string }) => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: options?.description || 'Unauthorized',
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            default: 401,
          },
          message: {
            type: 'array',
            default: options?.message ? [options.message] : ['Unauthorized'],
          },
          error: {
            type: 'string',
            default: 'Unauthorized',
          },
        },
      },
    }),
  );
};

/**
 * Decorator function for defining a custom Forbidden request response in Swagger/OpenAPI documentation.
 * @param {object} [options] - Optional configuration options.
 * @param {string} [options.message='Forbidden resource'] - The forbidden message to be included in the response schema.
 * @param {string} [options.description='Forbidden request'] - The description of the forbidden request response.
 */
export const ApiCustomForbiddenResponse = (options?: { message?: string; description?: string }) => {
  return applyDecorators(
    ApiForbiddenResponse({
      description: options?.description || 'Forbidden request',
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            default: 403,
          },
          message: {
            type: 'array',
            default: options?.message ? [options.message] : ['Forbidden resource'],
          },
          error: {
            type: 'string',
            default: 'Forbidden',
          },
        },
      },
    }),
  );
};

/**
 * Decorator function for defining a custom Conflict request response in Swagger/OpenAPI documentation.
 * @param {object} [options] - Optional configuration options.
 * @param {string} [options.message='Conflict exception'] - The conflict message to be included in the response schema.
 * @param {string} [options.description='Conflict exception'] - The description of the conflict request response.
 */
export const ApiCustomConflictResponse = (options?: { message?: string; description?: string }) => {
  return applyDecorators(
    ApiConflictResponse({
      description: options?.description || 'Conflict exception',
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            default: 409,
          },
          message: {
            type: 'array',
            default: options?.message ? [options.message] : ['Conflict exception'],
          },
          error: {
            type: 'string',
            default: 'Conflict',
          },
        },
      },
    }),
  );
};
