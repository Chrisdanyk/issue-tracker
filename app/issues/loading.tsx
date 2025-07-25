import { Table } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'
import IssueActions from './IssueActions'

const IssuesLoadingPage = () => {
    const issues = [1, 2, 3, 4, 5]
    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue}>
                            <Table.RowHeaderCell>
                                <Skeleton className='w-32 h-5' />
                                <div className='block md:hidden'>
                                    <Skeleton className='w-32 h-5' />
                                </div>
                            </Table.RowHeaderCell>
                            <Table.Cell className='hidden md:table-cell'>
                                <Skeleton className='w-32 h-5' />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <Skeleton className='w-32 h-5' />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default IssuesLoadingPage
