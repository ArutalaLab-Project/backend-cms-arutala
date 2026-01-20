import { Static, t } from 'elysia'

export const MitraCreateModel = t.Object({
  mitraName: t.String({
    minLength: 2,
    maxLength: 100,
    error: 'Nama perusahaan harus memiliki 3 sampai 100 karakter',
  }),

  businessField: t
    .Transform(
      t.Union([
        t.String({ error: 'Isi minimal 1 bidang perusahaan' }), // Terima string (1 nilai)
        t.Array(t.String(), {
          minItems: 1,
          error: 'Isi minimal satu bidang perusahaan',
        }), // Atau array (multiple nilai)
      ])
    )
    .Decode((value) => {
      // Normalize: selalu jadikan array
      return Array.isArray(value) ? value : [value]
    })
    .Encode((value) => value), // Encode tetap array

  mitraLogo: t.File({
    type: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: '5m', // Batasi maksimal 2MB
    error:
      'File harus berupa gambar (JPG, PNG, WEBP) dengan ukuran maksimal 5MB',
  }),
})

export type MitraCreateProps = Static<typeof MitraCreateModel>

export const MitraUpdateModel = t.Object({
  mitraName: t.Optional(
    t.String({
      minLength: 2,
      maxLength: 100,
      error: 'Nama perusahaan harus memiliki 3 sampai 100 karakter',
    })
  ),

  businessField: t.Optional(
    t
      .Transform(
        t.Union([
          t.String({ error: 'Isi minimal 1 bidang perusahaan' }), // Terima string (1 nilai)
          t.Array(t.String(), {
            minItems: 1,
            error: 'Isi minimal satu bidang perusahaan',
          }), // Atau array (multiple nilai)
        ])
      )
      .Decode((value) => {
        // Normalize: selalu jadikan array
        return Array.isArray(value) ? value : [value]
      })
      .Encode((value) => value) // Encode tetap array
  ),

  mitraLogo: t.Optional(
    t.File({
      type: ['image/jpeg', 'image/png', 'image/webp'],
      maxSize: '5m', // Batasi maksimal 2MB
      error:
        'File harus berupa gambar (JPG, PNG, WEBP) dengan ukuran maksimal 5MB',
    })
  ),
})

export type MitraUpdateProps = Static<typeof MitraUpdateModel>
