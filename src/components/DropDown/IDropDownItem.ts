enum DropDownItemType {
  BUTTON,
  LINK
}

interface IDropDownItem {
  type : DropDownItemType,
  title : string,
  action? : () => void,
  link? : string
}

export {
  DropDownItemType,
  IDropDownItem,
}
