'use client'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../_components/IssueFormSkeleton'
// import IssueForm from '../_components/page'

const IssueForm = dynamic(() => import('@/app/issues/_components/page'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />
})

const NewIssuePage = () => {
    return (
        <IssueForm />
    )
}

export default NewIssuePage
