'use client'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'


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
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">
                        <TrashIcon />
                        Delete
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This action cannot be undone.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red">
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>


        </>
    )
}

export default DeleteIssueButton