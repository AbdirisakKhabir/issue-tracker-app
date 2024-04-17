"use client";
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

// GET ALL STATUS TYPES FROM PRISMA CLIENTS
// MAKE THE VALUE OPTIONAL
const statuses: { label: string, value?: Status }[] = [
    {label: 'All'},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Closed', value: 'CLOSED'},
  
]

const IssueStatusFilter = () => {

  // CREATE QUERY FILTER FUNCTION
  const router = useRouter();
  
  const searchParams = useSearchParams();
  return (
    <Select.Root
    defaultValue={searchParams.get('status') || ''}
     onValueChange={(status) => {
      // FIRST GET THE PARAMS WE HAVE 
      const params = new URLSearchParams();

      // THERE IS AN ISSUE IF WE HAVE filter params and then make sorting it removes the filter params
      // TO fix this, we get params we have firstly and append the second params if we have
      if (status) params.append('status', status);
      if(searchParams.get('orderBy'))
        params.append('orderBy', searchParams.get('orderBy')!)

      // If the status is truthy then add this query otherwise add null
      const query = status ? `?status=${status}` : "";
      router.push('/issues/list/' + query)
    }}>
        <Select.Trigger placeholder='Filter By Status' />
        <Select.Content>
            {statuses.map( status => (
                <Select.Item key={status.value} value={status.value || 'null'}>{status.label}</Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
