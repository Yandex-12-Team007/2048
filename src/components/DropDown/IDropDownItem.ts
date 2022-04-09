export enum IDropDownItemType {
  BUTTON,
  LINK
}

export interface IDropDownItem {
  type : IDropDownItemType,
  title : string,
  action? : () => void,
  link? : string
}
