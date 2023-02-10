export interface articleItem {
  article_id: number
  category: string
  origin: number
  tags: string[]
  src: string
  title: string
  description: string
  date: string
  view_num: number
  likes: number
  cmt_num: number
  content: string
  isLiked?: boolean
}
