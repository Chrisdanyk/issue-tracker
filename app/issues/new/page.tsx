'use client'
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
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

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
    loading: () => <p>Loading editor...</p>
})

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const onSubmit = async (data: IssueForm) => {
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
                <TextField.Root placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    control={control}
                    name='description'
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description' {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button type='submit' disabled={true}>Submit New Issue {false && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
