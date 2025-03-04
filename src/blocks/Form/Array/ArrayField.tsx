import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { CardDescriptionDiv } from '@/components/ui/card'
import type { ArrayEntryField } from './types'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { DatePicker } from '../DatePicker'
import { Textarea } from '../Textarea'

interface ArrayFieldsProps {
  index: number
  name: string
  fields: ArrayEntryField[]
  labelSingular: string
  label: string
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<FieldValues>
  control: any
  remove: (index: number) => void
  minRows: number
  currentRows: number
}

type FieldComponentType = ArrayEntryField['blockType']

const fieldComponents: Record<FieldComponentType, React.ComponentType<any>> = {
  datePicker: DatePicker, // Make sure this matches the block slug exactly
  textarea: Textarea,
} as const

export const ArrayField: React.FC<ArrayFieldsProps> = ({
  index,
  fields,
  register,
  name,
  errors,
  labelSingular,
  control,
  remove,
  minRows,
  currentRows,
}) => {
  const renderField = (fieldItem: ArrayEntryField, fieldIndex: number) => {
    console.log('Rendering field:', fieldItem.blockType, fieldComponents[fieldItem.blockType]) // Add debug log
    const Field = fieldComponents[fieldItem.blockType]

    if (Field) {
      const fieldName = `${name}[${index}].${fieldItem.name}`
      const wrappedErrors = {
        [fieldName]: (errors?.[name] as any)?.[index]?.[fieldItem.name],
      }
      return (
        <Field
          {...(fieldItem as any)}
          name={fieldName}
          control={control}
          errors={wrappedErrors}
          register={register}
        />
      )
    } else {
      console.log('No matching component found for:', fieldItem.blockType) // Add debug log
    }
    return null
  }

  return (
    <div className="">
      <CardDescriptionDiv className="flex items-center justify-between">
        {labelSingular} {index + 1}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn('size-7 rounded-full transition-opacity hover:bg-red-100', {
            'pointer-events-none opacity-0': currentRows <= minRows,
            'opacity-100': currentRows > minRows,
          })}
          onClick={() => remove(index)}
        >
          <Trash2 className="size-4 text-red-700 hover:text-red-900" />
        </Button>
      </CardDescriptionDiv>
      <div className="flex flex-col gap-x-4 gap-y-2">
        {fields.map((fieldItem, fieldIndex) => (
          <React.Fragment key={fieldIndex}>{renderField(fieldItem, fieldIndex)}</React.Fragment>
        ))}
      </div>
    </div>
  )
}
