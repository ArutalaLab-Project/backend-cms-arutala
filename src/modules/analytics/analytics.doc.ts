import { t } from 'elysia'
import { docs, successDoc } from '../../utils/doc-builder'

// 1. Data Structure for Documentation
const MessageStatsSchema = t.Object({
  total_leads: t.String(),
  closed_won: t.String(),
  closed_lost: t.String(),
  conversion_rate: t.String(),
})

const MessageMonthlySchema = t.Object({
  month: t.String(),
  sort_key: t.String(),
  total: t.Integer(),
})

const MessageStatusSchema = t.Object({
  title: t.String(),
  number: t.String(),
})

const MessageSubjectSchema = t.Object({
  title: t.String(),
  number: t.String(),
})

const MessageStatsResponseSchema = t.Object({
  messageStats: t.Array(MessageStatsSchema),
  messageMonthly: t.Array(MessageMonthlySchema),
  messageStatus: t.Array(MessageStatusSchema),
  messageSubject: t.Array(MessageSubjectSchema),
})

const AnalyticsOverviewSchema = t.Object({
  messages: t.Object({
    stats: MessageStatsResponseSchema,
  }),
})

// 2. Response Schemas
export const GetOverviewResponse = successDoc(
  AnalyticsOverviewSchema,
  'Mengambil overview analytics berhasil'
)

// 3. Complete Route Documentation Objects
const AnalyticsTags = ['Analytics']

export const GetOverviewDoc = {
  ...docs('Get Dashboard overview analytics', AnalyticsTags, {
    200: GetOverviewResponse,
  }),
}
