import React from 'react'
import IssueForm from '../../_components/page'
import { prisma } from '@/prisma/client'


interface Props {
    params: {
        id: string
    }
}

const EditIssuePage = async ({ params }: Props) => {
    const { id } = await params
    const issue = await prisma.issue.findUnique({
        where: {
            id: Number(id)
        }
    })
    return (
        <IssueForm issue={issue ?? undefined} />
    )
}

export default EditIssuePage