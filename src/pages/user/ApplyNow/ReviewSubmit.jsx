import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { resumes } from './dumyResume';

const ReviewSubmit = ({
  selectedResume,
  coverLetter,
  expectedSalary,
  availableFrom,
  job
}) => {

    const location = [job.city, job.state, job.country]
    .filter(Boolean)
    .join(", ");


    const selectedResumeTitle = resumes.find((r) => r.id.toString() === selectedResume)?.title ?? `Resume #${selectedResume}`

  return (
    <div className='space-y-6'>
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Review Your Application</h2>
        <p className="text-slate-600">
          Please review all information before submitting
        </p>
      </div>

      <Card>
        <CardContent  className="p-6 space-y-2">
          <h3 className="font-semibold text-slate-900 mb-2">Position</h3>
          <div  className="space-y-2 text-sm">
            <p  className="flex items-center justify-between">
              <span className="text-slate-600">
                Job Title:
              </span>
              <span className="font-medium text-slate-900">{job.title}</span>
            </p>
          </div>

          {/* company name */}
          <div  className="space-y-2 text-sm">
            <p  className="flex items-center justify-between">
              <span className="text-slate-600">
                Company Name:
              </span>
              <span className="font-medium text-slate-900">{job.company?.name}</span>
            </p>
          </div>

          {/* city */}
          <div  className="space-y-2 text-sm">
            <p  className="flex items-center justify-between">
              <span className="text-slate-600">
                Location:
              </span>
              <span className="font-medium text-slate-900">{location}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Selected Resume */}
      <Card>
        <CardContent  className="p-6 space-y-2">
          <h3 className="font-semibold text-slate-900 mb-2">Selected Resume</h3>
          <p className="text-slate-600">{selectedResumeTitle}</p>
        </CardContent>
      </Card>

      {/* Cover Letter */}
      <Card>
        <CardContent  className="p-6 space-y-2">
          <h3 className="font-semibold text-slate-900 mb-2">Cover Letter</h3>
          <p className="text-slate-600">{coverLetter}</p>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardContent  className="p-6 space-y-2">
          <h3 className="font-semibold text-slate-900 mb-2">Additional Information</h3>
          <div  className="space-y-2 text-sm">
            <p  className="flex items-center justify-between">
              <span className="text-slate-600">
                Expected Salary:
              </span>
              <span className="font-medium text-slate-900">${expectedSalary?.toLocaleString()}</span>
            </p>
            <p  className="flex items-center justify-between">
              <span className="text-slate-600">
                Available From:
              </span>
              <span className="font-medium text-slate-900">{availableFrom.toLocaleDateString()}</span>
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default ReviewSubmit