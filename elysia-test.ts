import { Elysia, t } from 'elysia'

const ParamsSlugPathModel = t.Object({
  '*': t.String(),
})

const app = new Elysia()
  .get(
    '/public/seo-active/*',
    ({ params }) => {
      return { slug: params['*'] }
    },
    {
      params: ParamsSlugPathModel,
    }
  )
  .listen(3002)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

async function test() {
  const res = await fetch(
    'http://localhost:3002/public/seo-active/articles/blockchain-introductions'
  )
  console.log('Status:', res.status)
  console.log('Result:', await res.text())
  process.exit(0)
}

test()
