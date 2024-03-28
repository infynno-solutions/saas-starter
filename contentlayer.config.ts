import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields<'Post'> = {
  slug: {
    type: 'string',
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc: any) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blogs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: '../saas-starter/components/dashboard/content-layer/content',
  documentTypes: [Post],
})
