import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const formData = data.submissionData as Record<string, any[]>

  const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))

  return (
    <div className="space-y-6">
      {arrayFields.map(([fieldName, items]) => (
        <div key={fieldName}>
          <h2 className="text-2xl font-bold mb-3 capitalize">{fieldName}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {/* Display date if available */}
                    {item.date && format(item.date, 'MMM d, yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(item).map(
                    ([key, value]) =>
                      // Skip date as it's shown in the title
                      key !== 'date' && (
                        <p key={key} className="">
                          <span className="capitalize">{key}</span>:{' '}
                          {typeof value === 'string' ? value : JSON.stringify(value)}
                        </p>
                      ),
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FormData
