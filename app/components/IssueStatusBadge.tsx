import React from 'react'
import { Status } from '../generated/prisma'
import { Badge } from '@radix-ui/themes'

const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
    "OPEN": { label: "Open", color: "red" },
    "IN_PROGRESS": { label: "In Progress", color: "violet" },
    "CLOSED": { label: "Closed", color: "green" }
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color} className='capitalize'>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge
