export const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type Day = (typeof daysOfWeek)[number];

export type DailySchedule = {
    enabled: boolean;
    windows?: string;
};

export type WeeklySchedule = {
    [day in Day]: DailySchedule;
};

export const emptyDailySchedule = { enabled: false };
export const emptyWeeklySchedule: WeeklySchedule = Object.fromEntries(
    daysOfWeek.map((day) => [day, emptyDailySchedule])
) as Record<Day, DailySchedule>;
