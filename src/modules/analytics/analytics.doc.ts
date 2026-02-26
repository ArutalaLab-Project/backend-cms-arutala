import { t } from 'elysia'
import { createResponseSchema } from '../../utils/schemaHelper'

// 1. Data Structure for Documentation
const RecentMessageSchema = t.Object({
  message_id: t.String({ format: 'uuid' }),
  sender_name: t.String(),
  sender_email: t.String(),
  sender_phone: t.String(),
  subject: t.Array(t.String()),
  created_date: t.String(),
})

const UpcomingCourseSchema = t.Object({
  course_id: t.String({ format: 'uuid' }),
  course_title: t.String(),
  course_batch_name: t.String(),
  course_batch_start_date: t.String(),
  course_batch_status: t.String(),
})

const MessageMonthlyStatsSchema = t.Object({
  month: t.String(),
  sort_key: t.String(),
  total: t.Integer(),
})

const AnalyticsOverviewSchema = t.Object({
  messages: t.Object({
    recent: t.Array(RecentMessageSchema),
    stats: t.Array(MessageMonthlyStatsSchema),
  }),
  courses: t.Object({
    upcoming: t.Array(UpcomingCourseSchema),
  }),
})

// 2. Response Schemas
export const GetOverviewResponse = {
  description: 'Mengambil overview analytics berhasil',
  content: {
    'application/json': {
      schema: createResponseSchema(AnalyticsOverviewSchema),
    },
  },
}

// 3. Complete Route Documentation Objects
const AnalyticsTags = ['Analytics']

export const GetOverviewDoc = {
  detail: {
    tags: AnalyticsTags,
    summary: 'Get Dashboard overview analytics',
    responses: {
      200: GetOverviewResponse,
    },
  },
}
