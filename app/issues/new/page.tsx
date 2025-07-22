'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



const issueForm = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
})

type IssueForm = z.infer<typeof issueForm>

const NewIssuePage = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setError('An unexpected error occurred.')
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
                <Controller
                    control={control}
                    name='description'
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description' {...field} />
                    )}
                />
                <Button type='submit'>Submit New Issue</Button>
            </form >
        </div>
    )
}

export default NewIssuePage
