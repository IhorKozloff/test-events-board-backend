import Joi from 'joi';
import { KnownAvailableSortTypes, KnownAvailableSortDirectionTypes } from '../types/entities/filter';

const listQueryParams = Joi.object({
    limit: Joi.number().optional(),
    offset: Joi.number().optional(),
    sortBy: Joi.string().optional().valid(...KnownAvailableSortTypes),
    sortDirection: Joi.number().valid(...KnownAvailableSortDirectionTypes).optional()
});

export default {
    listQueryParams,
};