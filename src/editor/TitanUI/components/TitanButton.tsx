import type { FC } from 'react'
import type { TitanButtonProps } from '@titanui/types'

const TitanButton: FC<TitanButtonProps> = ({ children, onClick }) => {
  return (
    <button className="titan-button" onClick={onClick}>
      {children}
    </button>
  )
}

export default TitanButton
