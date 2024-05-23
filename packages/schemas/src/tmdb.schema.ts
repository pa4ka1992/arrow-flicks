import { MovieSort } from 'enums';
import z from 'zod';

import dbSchema from './db.schema';

export const sortTypeSchema = z.nativeEnum(MovieSort);

export const searchQuerySchema = z.object({
  page: z.string().optional(),
  with_genres: z.string().optional(),
  primary_release_year: z.string().optional(),
  'vote_average.lte': z.string().optional(),
  'vote_average.gte': z.string().optional(),
  sort_by: sortTypeSchema.optional(),
});

export const ratedMovieSchema = dbSchema.extend({
  id: z.number(),
  userId: z.string(),
  rating: z.number().min(0).max(10),
  genre_ids: z.array(z.number()),
  original_title: z.string(),
  poster_path: z.string(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});
