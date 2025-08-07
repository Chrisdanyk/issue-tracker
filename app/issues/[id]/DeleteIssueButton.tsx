'use client'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'


const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const deleteIssue = async (issueId: number) => {
        const res = await fetch(`/api/issues/${issueId}`, {
            method: 'DELETE'
        })
        if (!res.ok) {
            // toast.error('Failed to delete issue')
        }
    }
    return (
        <Button color="red">
            <TrashIcon />
            Delete
        </Button>
    )
}

export default DeleteIssueButton