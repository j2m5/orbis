import type { FC } from 'react'
import type { TitanTextareaProps } from '@titanui/types'

const TitanTextarea: FC<TitanTextareaProps> = ({
  value,
  label,
  placeholder,
  rows = 3,
  invalid = false,
  disabled = false,
  style = {},
  onChange
}) => {
  return (
    <label className={`titan-field ${invalid ? 'invalid' : ''}`} style={style}>
      {label && <span className="titan-field-label">{label}</span>}
      <textarea
        className="titan-input titan-textarea"
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

export default TitanTextarea
