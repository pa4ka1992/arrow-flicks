export enum MovieSort {
  ORIGINAL_ASC = 'original_title.asc',
  ORIGINAL_DESC = 'original_title.desc',
  POPULARITY_ASC = 'popularity.asc',
  POPULARITY_DESC = 'popularity.desc',
  REVENUE_ASC = 'revenue.asc',
  REVENUE_DESC = 'revenue.desc',
  RELEASE_DATE_ASC = 'primary_release_date.asc',
  RELEASE_DATE_DESC = 'primary_release_date.desc',
  TITLE_ASC = 'title.asc',
  TITLE_DESC = 'title.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  VOTE_AVERAGE_DESC = 'vote_average.desc',
  VOTE_COUNT_ASC = 'vote_count.asc',
  VOTE_COUNT_DESC = 'vote_count.desc',
}

export enum QuerySeparator {
  OR = '|',
  AND = ',',
}
