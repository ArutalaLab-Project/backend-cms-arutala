import { Static, t } from 'elysia'

export const SeoType = {
  WEBSITE: 'WEBSITE',
  PROFILE: 'PROFILE',
  ARTICLE: 'ARTICLE',
} as const

// Model Request Body SEO
export const SeoModel = t.Object({
  metaTitle: t.String({
    minLength: 3,
    maxLength: 250,
    error: 'Meta title seo merupakan string dan karakter antara 3 - 250',
  }),
  metaDescription: t.String({
    minLength: 15,
    error: 'Meta Description merupakan string dengan minimal karakter 15',
  }),
  referenceImage: t.File({
    type: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: '5m',
    error:
      'File harus berupa gambar (JPG, PNG, WEBP) dengan ukuran maksimal 5MB',
  }),
  keyword: t
    .Transform(
      t.Union([
        t.String({ error: 'Isi minimal 1 keyword' }),
        t.Array(t.String(), {
          minItems: 1,
          error: 'Isi minimal 1 keyword',
        }),
      ])
    )
    .Decode((value) => {
      return Array.isArray(value) ? value : [value]
    })
    .Encode((value) => value),
  type: t.Enum(SeoType, {
    error:
      'Type tidak valid. Pilih salah satu antara website, article atau profile',
  }),
})
export type SeoProps = Static<typeof SeoModel>

// Model Params SEO
export const ParamsSeoModel = t.Object({
  pageId: t.String({
    format: 'uuid',
    error: 'Format page id tidak valid',
  }),
  seoId: t.String({
    format: 'uuid',
    error: 'Format seo id tidak valid',
  }),
})
export type ParamsSeoProps = Static<typeof ParamsSeoModel>
