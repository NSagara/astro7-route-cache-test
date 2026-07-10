export type WpRestImgSizes = {
  thumbnail: string
  ['thumbnail-height']: number
  ['thumbnail-width']: number
  medium: string
  ['medium-height']: number
  ['medium-width']: number
  medium_large: string
  ['medium_large-height']: number
  ['medium_large-width']: number
  large: string
  ['large-height']: number
  ['large-width']: number
  ['1536x1536']: string
  ['1536x1536-height']: number
  ['1536x1536-width']: number
  ['2048x2048']: string
}
export type WpRestAcfImg = {
  id: number
  title: string
  filename: string
  filesize: number
  url: string
  link: string
  alt:string
  author: number
  description: string
  caption: string
  name: string
  status: string
  uploaded_to: number
  date: Date
  modified: Date
  menu_order: number
  mime_type: string
  type: string
  subtype: string
  icon: string
  width: number
  height: number
  sizes: WpRestImgSizes
}

export type WpWorkImg = {
  img: string
  width: number
  height: number
  srcset: string
  tags: string[]
}
export type WorkImg = Omit<WpWorkImg, 'img'> & {
  src: string
}

export type WpWork = WpRestPost & {
  acf: {
    id: string
    h1: string
    read: string
    title: string
    description: string
    place: string
    thumbnail: WpRestAcfImg

    heroimage: string
    isfirstimageherohref: boolean,
    categorycopy: string
    category: string
    middle_category: string,
    sub_category: string[],
    caption: string
    address: string
    comname_url: string,
    content: string
  }
  images: WpWorkImg[]
  related_enabled: boolean
  related_caption: string
  related_items: {
    type: 'blog' | 'example'
    id: string
  }[]
}

export type Work = Omit<WpWork, 'images'> & {
  images: WorkImg[]
}

export type WpRestPost = {
  id: number
  date: Date
  date_gmt: Date
  guid: {
    rendered: string
  }
  modified: Date
  modified_gmt: Date
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: string
  }
  excerpt: {
    rendered: string
    protected: string
  }
  meta: [string]
  categories: [string] | [number]
  tags: [number]
  jetpack_featured_media_url: string
  _embedded: {
    ['wp:featuredmedia']: [
      {
        media_details: {
          sizes: WpRestImgSizes2
          source_url: string
          width: number
          height: number
        },
        source_url: string
      }
    ]
  }
}

export type WpRestImgSizes2 = {
  thumbnail: {
    source_url: string
    width: number
    height: number
  }
  medium: {
    source_url: string
    width: number
    height: number
  }
  medium_large: {
    source_url: string
    width: number
    height: number
  }
  ['1536x1536']: {
    source_url: string
    width: number
    height: number
  }
}