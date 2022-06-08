export interface IComment {
  id? : number,
  createdAt? : string,
  updatedAt? : string,
  content : string,
  author : number,
  topicId : number,
  commentId : number | null
}
