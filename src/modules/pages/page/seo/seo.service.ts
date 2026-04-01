import {
  BadRequest,
  ResourceNotFoundError,
} from '../../../../exceptions/client.error'
import { supabasePool } from '../../../../supabase/supabasePool'
import { ParamsSeoProps, SeoProps } from './seo.model'

export class SeoService {
  static async verifySeoIsExist(seoId: string) {
    const { rows } = await supabasePool.query(
      `SELECT 1 FROM seos WHERE seo_id = $1`,
      [seoId]
    )

    if (rows.length === 0) {
      throw new ResourceNotFoundError('Resource seo tidak ditemukan')
    }
  }
  static async verifyPageHasActiveSeo(pageId: string) {
    const { rows } = await supabasePool.query(
      `SELECT 1 FROM seos WHERE seo_page_id = $1 AND is_active = TRUE AND is_deleted = FALSE LIMIT 1`,
      [pageId]
    )
    if (rows.length >= 1) {
      throw new BadRequest('Masih terdapat SEO yang aktif')
    }
  }
  static async addSeo(
    payload: Omit<SeoProps, 'referenceImage'>,
    referenceImageUrl: string,
    pageId: string,
    userWhoCreated: string
  ) {
    const { metaTitle, metaDescription } = payload
    const { rows } = await supabasePool.query(
      `INSERT INTO seos (
        seo_page_id, meta_title, 
        meta_description, seo_reference_image, 
        seo_keyword, seo_type, created_by
      )
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING seo_id`,
      [
        pageId,
        metaTitle,
        metaDescription,
        referenceImageUrl,
        payload.keyword,
        payload.type,
        userWhoCreated,
      ]
    )
    return rows[0]
  }

  static async getSeoByPageId(pageId: string) {
    const { rows } = await supabasePool.query(
      `SELECT 
        seo_id, meta_title, 
        meta_description, seo_reference_image, 
        seo_keyword, seo_type, is_active
      FROM seos 
      WHERE is_deleted = FALSE AND seo_page_id = $1`,
      [pageId]
    )
    return rows
  }

  static async getSeoById(seoId: string) {
    const { rows } = await supabasePool.query(
      `SELECT 
        seo_id, meta_title, 
        meta_description, seo_reference_image, 
        seo_keyword, seo_type, is_active
      FROM seos
      WHERE is_deleted = FALSE AND seo_id = $1`,
      [seoId]
    )
    return rows[0]
  }

  static async updateSeo(
    payload: Partial<Omit<SeoProps, 'referenceImage'>>,
    params: ParamsSeoProps,
    userWhoUpdated: string,
    referenceImageUrl?: string
  ) {
    const { seoId } = params
    const fields: String[] = []
    const values: any[] = []
    let idx = 1

    if (payload.metaTitle) {
      fields.push(`meta_title = $${idx++}`)
      values.push(payload.metaTitle)
    }

    if (payload.metaDescription) {
      fields.push(`meta_description = $${idx++}`)
      values.push(payload.metaDescription)
    }

    if (payload.keyword) {
      fields.push(`seo_keyword = $${idx++}`)
      values.push(payload.keyword)
    }

    if (payload.type) {
      fields.push(`seo_type = $${idx++}`)
      values.push(payload.type)
    }

    if (referenceImageUrl) {
      fields.push(`seo_reference_image = $${idx++}`)
      values.push(referenceImageUrl)
    }

    fields.push(`updated_by = $${idx++}`)
    values.push(userWhoUpdated)

    values.push(seoId)

    const { rows } = await supabasePool.query(
      `UPDATE seos
      SET ${fields.join(', ')}
      WHERE seo_id = $${idx} RETURNING seo_id`,
      values
    )
    return rows[0]
  }

  static async changeStatusSeo(seoId: string, userWhoUpdated: string) {
    // cek status sekarang
    const { rows: current } = await supabasePool.query(
      `SELECT is_active FROM seos WHERE seo_id = $1`,
      [seoId]
    )

    const isActive = current[0].is_active

    if (isActive) {
      // 🔴 kalau sudah aktif → nonaktifkan saja
      await supabasePool.query(
        `UPDATE seos
        SET is_active = false,
          updated_by = $1,
          updated_date = NOW()
        WHERE seo_id = $2`,
        [userWhoUpdated, seoId]
      )
    } else {
      await supabasePool.query('BEGIN')

      try {
        // 1. Nonaktifkan semua dalam page yang sama
        await supabasePool.query(
          `UPDATE seos
          SET is_active = false
          WHERE seo_page_id = (
            SELECT seo_page_id FROM seos WHERE seo_id = $1
          )`,
          [seoId]
        )

        // 2. Aktifkan yang dipilih
        await supabasePool.query(
          `UPDATE seos
          SET is_active = true,
            updated_by = $1,
            updated_date = NOW()
          WHERE seo_id = $2`,
          [userWhoUpdated, seoId]
        )
        await supabasePool.query('COMMIT')
      } catch (err) {
        await supabasePool.query('ROLLBACK')
        throw err
      }
    }

    return { seo_id: seoId }
  }

  static async deleteSeo(params: ParamsSeoProps) {
    const { seoId } = params
    const { rows } = await supabasePool.query(
      `UPDATE seos 
        SET is_deleted = TRUE
        WHERE seo_id = $1
        RETURNING seo_id`,
      [seoId]
    )
    return rows[0]
  }
}
