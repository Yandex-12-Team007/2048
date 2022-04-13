export enum DropDownItemType {
  BUTTON,
  LINK
}

export interface IDropDownItem {
  type : DropDownItemType,
  title : string,
  action? : () => void,
  link? : string
}
