import { Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'

const LoadingIssuePage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Flex className='space-x-3' my="2">
                <Skeleton width="5rem" />
                <Skeleton width="8rem" />
            </Flex>
            <Card className='prose' mt="4">
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}

export default LoadingIssuePage
