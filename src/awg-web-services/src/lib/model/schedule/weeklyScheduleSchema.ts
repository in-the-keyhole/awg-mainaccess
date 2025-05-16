import { z } from 'zod';

import { Day, daysOfWeek, WeeklySchedule } from './weeklySchedule';

const dayScheduleSchema = z.object({
    enabled: z.boolean(),
    windows: z.string().optional(),
});

export const WeeklyScheduleSchema: z.ZodType<WeeklySchedule> = z.object(
    Object.fromEntries(daysOfWeek.map((day) => [day, dayScheduleSchema])) as Record<Day, typeof dayScheduleSchema>
);

export type WeeklyScheduleSchemaType = z.infer<typeof WeeklyScheduleSchema>;
