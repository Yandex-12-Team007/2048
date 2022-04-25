import React from 'react';

import './DefaultModal.pcss';
import classNames from 'classnames';

export default function DefaultModal ({
  isOpen = true,
  close = () => {},
  addClass = '',
  children
}) {
  const modalClass = classNames({
    'modal' : true,
    'modal_open' : isOpen,
  })

  const modalFormClass = classNames({
    'modal__form' : true,
    [addClass] : true
  })

  return <div className={modalClass} onClick={close}>
    <div className={modalFormClass} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
}
