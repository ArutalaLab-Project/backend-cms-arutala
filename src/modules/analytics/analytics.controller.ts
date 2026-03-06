import { ApiResponse } from '../../types/response.type'
import { ResponseHelper } from '../../utils/responseHelper'
import { AnalyticsService } from './analytics.service'

export class AnalyticsController {
  static async getOverviewController(): Promise<ApiResponse> {
    const [messageStats, messageMonthly, messageStatus, messageSubject] =
      await Promise.all([
        AnalyticsService.getMessageStatistical(),
        AnalyticsService.getMessageMonthlyStats(),
        AnalyticsService.getMessageStatus(),
        AnalyticsService.getMessageSubject(),
      ])

    return ResponseHelper.success(`Mengambil overview analytics berhasil`, {
      messages: {
        stats: {
          messageStats,
          messageMonthly,
          messageStatus,
          messageSubject,
        },
      },
    })
  }
}
