import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {IDropDownItem, DropDownItemType} from './IDropDownItem';

import './DropDown.pcss';

export default function DropDown({children, options} : {
  children,
  options : IDropDownItem[]
}) {
  const [isOpen, setOpen] = useState(false);

  return <div className={'drop-down'}>
    <div className={'drop-down__label'} onClick={() => setOpen(!isOpen)}>
      {children}
    </div>
    {isOpen ?
      <div className={'drop-down__menu'}>
        {options.map((el, id) => <DropDownItem key={id} item={el}/>)}
      </div> : ''
    }
  </div>
}

// TODO: Возможно стоит сделать прокидываемым
function DropDownItem({item} : {item : IDropDownItem}) {
  if (item.type === DropDownItemType.BUTTON) {
    return <div className={'drop-down-item'}>
      <button className={'drop-down-item__btn'} onClick={item.action}>
        {item.title}
      </button>
    </div>
  }

  if (item.type === DropDownItemType.LINK) {
    return <div className={'drop-down-item'}>
      <Link className={'drop-down-item__link'} to={item.link}>
        {item.title}
      </Link>
    </div>
  }

  /* Если попадается неизвестный тип - исключение */
  throw new Error('Undefined drop down item type !');
}
