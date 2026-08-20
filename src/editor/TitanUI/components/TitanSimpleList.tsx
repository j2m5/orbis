import type { FC } from 'react'
import type { Customizable, HasChildren } from '@titanui/types'

const TitanSimpleList: FC<HasChildren & Customizable> = ({ children, style = {} }) => {
  return (
    <div className="titan-list" style={style}>
      {children}
    </div>
  )
}

export default TitanSimpleList
