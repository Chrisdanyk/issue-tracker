'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from '@/app/validationSchemas'
import dynamic from 'next/dynamic'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { Issue } from '@/app/generated/prisma'

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
    loading: () => <p>Loading editor...</p>
})

type IssueData = z.infer<typeof createIssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueData>({
        resolver: zodResolver(createIssueSchema)
    })
    const onSubmit = async (data: IssueData) => {
        try {
            setIsSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setError('An unexpected error occurred.')
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
                    Submit New Issue {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm
