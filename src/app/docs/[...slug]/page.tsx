import React from 'react'
import path from 'path'
import fs from 'fs'
import DocsLayout from '@/components/docs/DocsLayout'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

type Props = { params: { slug: string[] } }

export default async function DocPage({ params }: Props){
  const slugArr = params?.slug ?? []
  const slugPath = Array.isArray(slugArr) ? slugArr.join('/') : ''
  const filePath = path.join(process.cwd(), 'src', 'data', 'docs', `${slugPath}.mdx`)

  if (!fs.existsSync(filePath)){
    return (
      <DocsLayout>
        <h1>Document not found</h1>
        <p>No document found for {slugPath}</p>
      </DocsLayout>
    )
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  let mdxSource = null
  try {
    mdxSource = await serialize(raw)
  } catch (e) {
    // If serialization fails, render a helpful fallback instead of crashing
    console.error('MDX serialization error for', filePath, e)
    return (
      <DocsLayout>
        <article className="docs-prose">
          <h1>Document rendering error</h1>
          <p>There was a problem rendering this document. Please check the source MDX file.</p>
        </article>
      </DocsLayout>
    )
  }

  return (
    <DocsLayout>
      <article className="docs-prose">
        <MDXRemote {...mdxSource} />
      </article>
    </DocsLayout>
  )
}
