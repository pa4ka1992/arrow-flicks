import z from 'zod';

import dbSchema from './db.schema';

export const userSchema = dbSchema.extend({
  ratedMovies: z.record(z.string(), z.number().optional()),
});
