import { MovieSort } from 'enums';
import z from 'zod';

export const sortTypeSchema = z.nativeEnum(MovieSort);

export const searchQuerySchema = z.object({
  page: z.string().optional(),
  with_genres: z.string().optional(),
  primary_release_year: z.string().optional(),
  'vote_average.lte': z.string().optional(),
  'vote_average.gte': z.string().optional(),
  sort_by: sortTypeSchema.optional(),
});
