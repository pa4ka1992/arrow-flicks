export const getReleaseDate = (releseDate?: string) => {
  if (!releseDate) {
    return null;
  }

  const date = new Date(releseDate);

  const formatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' });
  return formatter.format(date);
};
