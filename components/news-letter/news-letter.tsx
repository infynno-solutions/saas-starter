import React from 'react'
import NewsLetterForm from './news-letter-form'

const NewsLetter = () => {
  return (
    <div className="bg-white py-8 sm:py-24" id="news-letter">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get notified when we are launching.
          </p>
          <p className="mt-4 text-lg text-secondary-foreground">
            Enter your email address to subscribe out news letter. Get the
            latest blogs and information about our launch first.
          </p>
          <NewsLetterForm />
        </div>
      </div>
    </div>
  )
}

export default NewsLetter
