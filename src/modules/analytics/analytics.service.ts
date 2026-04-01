import { supabasePool } from '../../supabase/supabasePool'

export class AnalyticsService {
  static async getMessageStatistical() {
    const { rows } = await supabasePool.query(
      `SELECT 
          COUNT(*) AS total_leads,
          COUNT(*) FILTER (WHERE message_status = 'CLOSED_WON') AS closed_won,
          COUNT(*) FILTER (WHERE message_status = 'CLOSED_LOST') AS closed_lost,
          ROUND(
              (COUNT(*) FILTER (WHERE message_status = 'CLOSED_WON')::numeric / 
              NULLIF(COUNT(*), 0)) * 100, 2
          ) AS conversion_rate
      FROM messages
      WHERE is_deleted = false;`
    )
    return rows
  }

  static async getMessageStatus() {
    const { rows } = await supabasePool.query(
      `SELECT 
          message_status AS title,
          COUNT(*) AS number
      FROM messages
      WHERE is_deleted = false
      GROUP BY message_status
      ORDER BY number DESC`
    )
    return rows
  }

  static async getMessageSubject() {
    const { rows } = await supabasePool.query(
      `SELECT 
            LOWER(REPLACE(subject_item, ' ', '_')) AS title,
            COUNT(*) AS number
        FROM messages,
        LATERAL UNNEST(subject) AS subject_item
        WHERE is_deleted = false
        GROUP BY subject_item
        ORDER BY number DESC;`
    )
    return rows
  }

  static async getMessageMonthlyStats() {
    const { rows } = await supabasePool.query(
      `WITH last_12_months AS (
        SELECT
            date_trunc(
            'month',
            (CURRENT_DATE AT TIME ZONE 'Asia/Jakarta')
            ) - INTERVAL '1 month' * gs.i AS month_start
        FROM generate_series(0, 11) AS gs(i)
        ),
        
        message_stats AS (
        SELECT
            date_trunc(
            'month',
            created_date AT TIME ZONE 'Asia/Jakarta'
            ) AS month_start,
            COUNT(*)::int AS total
        FROM messages
        WHERE is_deleted = false
        GROUP BY month_start
        )

        SELECT
            to_char(l.month_start, 'Mon YYYY') AS month,
            l.month_start AS sort_key,
            COALESCE(ms.total, 0) AS total
        FROM last_12_months l
        LEFT JOIN message_stats ms
        ON ms.month_start = l.month_start
        ORDER BY l.month_start;
        `
    )
    return rows
  }
}
