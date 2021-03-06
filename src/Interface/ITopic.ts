export interface ITopicCreate {
  id? : number,
  createdAt? : string,
  updatedAt? : string,
  title : string,
  content : string,
  author : number
}

export interface ITopic {
  id : number,
  createdAt : string,
  updatedAt : string,
  title : string,
  content : string,
  author : number
}
