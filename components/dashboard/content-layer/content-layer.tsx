import React from 'react'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'

const ContentLayer = () => {
  return (
    <div>
      {allPosts.map((post) => (
        <article
          key={post._id}
          className="prose mx-auto px-4 dark:prose-invert md:px-0"
        >
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}

export default ContentLayer
