export interface XhsImage {
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
  imageList: XhsImage[]
  // tagList: Array< TagList$4Type >
  // atUserList: Array< unknow >
  // time: number
  noteId: string
  title: string
  desc: string
  user: User
}

export interface DefalutResult {
  note: {
    firstNoteId: string
    noteDetailMap: {
      [key: string]: {
        note: Note
        [key: string]: any
      }
    }
    [key: string]: any
  }
  [key: string]: any
}

export interface XhsResult {
  user: {
    avatar: string
    nickname: string
  }
  info: {
    title: string
    desc: string
    imgList: string[]
  }

}
