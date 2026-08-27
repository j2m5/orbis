import { useId, type ChangeEvent, type FC } from 'react'
import type { TitanFileInputProps } from '@titanui/types'

const TitanFileInput: FC<TitanFileInputProps> = ({
  accept,
  buttonLabel = 'Выбрать',
  fileName,
  label,
  message,
  placeholder = 'Файл не выбран',
  invalid = false,
  disabled = false,
  style = {},
  onChange,
  onClear
}) => {
  const inputId = useId()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.currentTarget.files?.[0]

    // File inputs cannot be controlled by React. Resetting the native value lets
    // the user deliberately select the same file again and trigger a new upload.
    event.currentTarget.value = ''

    if (file) {
      onChange(file)
    }
  }

  return (
    <div
      className={`titan-field titan-file-field ${invalid ? 'invalid' : ''} ${disabled ? 'disabled' : ''}`}
      style={style}
    >
      {label && (
        <label className="titan-field-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="titan-file-control">
        <input
          id={inputId}
          className="titan-file-native"
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleChange}
        />
        <label className="titan-file-select" htmlFor={inputId} aria-disabled={disabled}>
          {buttonLabel}
        </label>
        <span className={`titan-file-name ${fileName ? '' : 'placeholder'}`} title={fileName}>
          {fileName || placeholder}
        </span>
        {fileName && onClear && (
          <button
            className="titan-file-clear"
            type="button"
            aria-label={`Очистить поле «${label ?? fileName}»`}
            disabled={disabled}
            onClick={onClear}
          >
            ×
          </button>
        )}
      </div>
      {message && (
        <span className="titan-field-message" role={invalid ? 'alert' : undefined} aria-live="polite">
          {message}
        </span>
      )}
    </div>
  )
}

export default TitanFileInput
