import { allPosts } from '@/.contentlayer/generated'
import Link from 'next/link'
import React from 'react'

const page = () => {
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

export default page
