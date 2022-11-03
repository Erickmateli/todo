import React from 'react';

//import title module styling
import Style from '../styles/modules/title.module.scss'

const PageTitle = ({children}) => {
  return (
    <>
    <p data-testid="pagetitle" className={Style.title}>{children}</p>
    </>
  )
}

export default PageTitle