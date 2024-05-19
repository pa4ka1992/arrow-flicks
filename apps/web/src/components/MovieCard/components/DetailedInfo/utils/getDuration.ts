const formatter = (value: number, unit: string) => `${value ? `${value}${unit}` : ''}`;

const HOUR_UNIT = 'h';
const MINUTE_UNIT = 'm';

export const getDuration = (durationMinutes?: number) => {
  if (!durationMinutes) {
    return null;
  }

  const timestamp = new Date(durationMinutes * 60 * 1000);
  const hours = timestamp.getUTCHours();
  const minutes = timestamp.getUTCMinutes();

  return `${formatter(hours, HOUR_UNIT)} ${formatter(minutes, MINUTE_UNIT)}`;
};
