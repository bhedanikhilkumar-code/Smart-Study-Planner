import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['student', 'admin']).optional()
  })
});

export const loginSchema = z.object({
  body: z.object({ email: z.string().email(), password: z.string().min(6) })
});

export const subjectSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    weeklyHours: z.number().min(0),
    priority: z.number().min(1).max(5).optional()
  })
});

export const backlogSchema = z.object({
  body: z.object({
    subjectId: z.string().min(1),
    topic: z.string().min(2),
    status: z.enum(['pending', 'completed']).optional(),
    urgency: z.enum(['low', 'medium', 'high']).optional()
  })
});

export const examSchema = z.object({
  body: z.object({
    subjectId: z.string().min(1),
    examDate: z.string().datetime()
  })
});

export const studySessionSchema = z.object({
  body: z.object({
    subjectId: z.string().min(1),
    date: z.string().datetime(),
    duration: z.number().min(0.25),
    completed: z.boolean().optional(),
    priority: z.number().min(1).max(5).optional(),
    timeBlock: z.string().optional()
  })
});

export const aiPlanSchema = z.object({
  body: z.object({
    weeklyAvailableHours: z.number().min(1),
    weakSubjects: z.array(z.string()),
    upcomingExams: z.array(z.object({ subject: z.string(), daysRemaining: z.number() }))
  })
});
