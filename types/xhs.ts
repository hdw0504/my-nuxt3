export interface Image {
  traceId: string
  fileId: string
  height: number
  width: number
  url: string
}

export interface User {
  avatar: string
  nickname: string
  userId: string
}

export interface Note {
  // shareInfo: ShareInfo$1Type
  type: string
  // interactInfo: InteractInfo$2Type
  // lastUpdateTime: number
  ipLocation: string
  imageList: Image[]
  // tagList: Array< TagList$4Type >
  // atUserList: Array< unknow >
  // time: number
  noteId: string
  title: string
  desc: string
  user: User
}

export interface DetailResult {
  note: {
    note: Note
    [key: string]: any
  }
  [key: string]: any
}
