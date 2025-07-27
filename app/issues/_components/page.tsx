'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from '@/app/validationSchemas'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { Issue } from '@/app/generated/prisma'
import SimpleMDE from 'react-simplemde-editor'


type IssueData = z.infer<typeof IssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueData>({
        resolver: zodResolver(IssueSchema)
    })
    const onSubmit = async (data: IssueData) => {
        try {
            setIsSubmitting(true)
            if (issue) await axios.patch('/api/issues/' + issue.id, data)
            else await axios.post('/api/issues', data)
            router.push('/issues')
            router.refresh()

        } catch (error) {
            setError('An unexpected error occurred.')
            console.log('Error', error)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className='max-w-xl'>
            {error &&
                (<Callout.Root className='mb-5' color='red'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>)}

            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root placeholder='Title' defaultValue={issue?.title} {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    control={control}
                    name='description'
                    defaultValue={issue?.description || ''}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description' {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button type='submit' disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{''}  {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm
