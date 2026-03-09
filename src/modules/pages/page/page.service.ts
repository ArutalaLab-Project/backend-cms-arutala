import { ResourceNotFoundError } from '../../../exceptions/client.error'
import { supabasePool } from '../../../supabase/supabasePool'

export class PageService {
  static async getParentPageId(pageTitle: string) {
    const { rows } = await supabasePool.query(
      `SELECT page_id FROM pages 
      WHERE page_title = $1`,
      [pageTitle]
    )

    if (rows.length === 0) {
      throw new ResourceNotFoundError(
        `Halaman: '${pageTitle}' bukan merupakan parent page`
      )
    }
    return rows[0].page_id
  }
  static async addPage(
    pageTitle: string,
    parentPageId: string | null,
    pageSlug: string,
    userWhoCreated: string
  ) {
    const { rows } = await supabasePool.query(
      `INSERT INTO pages (
        page_title, parent_page_id, page_slug, created_by)
      VALUES($1, $2, $3, $4) RETURNING page_id`,
      [pageTitle, parentPageId, pageSlug, userWhoCreated]
    )
    return rows[0]
  }

  static async getAllPages() {
    const { rows } = await supabasePool.query(
      `SELECT 
        child.page_id,
        child.page_title,
        child.page_slug,
        parent.page_title AS parent_page_title,
        CASE 
            WHEN COUNT(s.seo_id) = 0
              THEN 'NO_SEO'
            WHEN SUM(CASE WHEN s.is_active = TRUE THEN 1 ELSE 0 END) > 0 
              THEN 'ACTIVE'
            ELSE 'INACTIVE'
        END AS seo_status

      FROM pages AS child
      LEFT JOIN pages AS parent
        ON child.parent_page_id = parent.page_id
      LEFT JOIN seos AS s
        ON s.seo_page_id = child.page_id
        
      WHERE child.is_deleted = FALSE
      GROUP BY child.page_id, child.page_title, child.page_slug, parent.page_title`
    )
    return rows
  }

  static async verifyPageIsExist(pageId: string) {
    const { rows } = await supabasePool.query(
      `SELECT 1 FROM pages WHERE page_id = $1 AND is_deleted = FALSE`,
      [pageId]
    )
    if (rows.length === 0) {
      throw new ResourceNotFoundError('Resource page tidak ditemukan')
    }
  }

  static async getActiveSeoBySlugPath(slugPath: string) {
    const segments = slugPath.split('/')

    let parentId: string | null = null
    let page: any = null

    for (const slug of segments) {
      const { rows } = await supabasePool.query(
        `
        SELECT *
        FROM pages
        WHERE
          page_slug = $1
          AND parent_page_id IS NOT DISTINCT FROM $2
          AND is_deleted = FALSE
        `,
        [slug, parentId]
      )

      if (rows.length === 0) {
        throw new ResourceNotFoundError('Page tidak ditemukan')
      }

      page = rows[0]
      parentId = page.page_id
    }

    const { rows: seoRows } = await supabasePool.query(
      `
      SELECT
        p.page_id,
        p.page_title,
        p.page_slug,
        
          JSON_BUILD_OBJECT(
            'seo_id', s.seo_id,
            'meta_title', s.meta_title,
            'meta_description', s.meta_description
          ) as seos
        
      FROM seos s
      JOIN pages p
        ON s.seo_page_id = p.page_id
      WHERE
        s.seo_page_id = $1
        AND s.is_deleted = FALSE
        AND s.is_active = TRUE
      GROUP BY
        s.seo_id,
        s.meta_title,
        s.meta_description,
        p.page_id,
        p.page_title,
        p.page_slug
      `,
      [page.page_id]
    )

    if (seoRows.length === 0) {
      throw new ResourceNotFoundError('SEO aktif tidak ditemukan')
    }

    return seoRows[0]
  }

  static async getPageById(pageId: string) {
    const { rows } = await supabasePool.query(
      `SELECT page_id, page_title, page_slug FROM pages
        WHERE page_id = $1 AND is_deleted = FALSE`,
      [pageId]
    )
    return rows[0]
  }

  static async updatePage(
    pageId: string,
    data: {
      pageTitle: string
      parentPageId: string | null
      pageSlug: string
    },
    userWhoUpdated: string
  ) {
    const { rows } = await supabasePool.query(
      `
    UPDATE pages
    SET
      page_title = $1,
      parent_page_id = $2,
      page_slug = $3,
      updated_by = $4,
      updated_date = NOW()
    WHERE page_id = $5
    RETURNING page_id, page_title, page_slug
    `,
      [data.pageTitle, data.parentPageId, data.pageSlug, userWhoUpdated, pageId]
    )

    return rows[0]
  }

  static async deletePage(pageId: string) {
    const { rows } = await supabasePool.query(
      `UPDATE pages SET is_deleted = TRUE WHERE page_id = $1 RETURNING page_title`,
      [pageId]
    )
    return rows[0]
  }
}
