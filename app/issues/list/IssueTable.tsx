import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { Issue, Status } from '@prisma/client'

export interface IssueQuery {
    status: Status, 
    orderBy: keyof Issue,
   page: string
}


interface Props {
    searchParams: IssueQuery
  issues: Issue[]
   
  }



const IssueTable = ( { searchParams, issues} : Props) => {



  return (
    <Table.Root variant='surface'>
    <Table.Header>
      <Table.Row>
        {/* MAP ALL COLUMSN */}
  
        { columns.map( column => 
          <Table.ColumnHeaderCell key={column.value} className={column.className}>
  
            {/* IN THIS LINK WE USE SORTING WE GET ALL PARAMS LIKE FILTERING and then we add another params of SORTING*/}
            <Link href={{
              query: { ...searchParams, orderBy: column.value}
            }}>{column.label}</Link>
             {/* IF THE PARAMS WE HAVE CONTAINS ORDERBY WE ADD AN ICON */}
             {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
            </Table.ColumnHeaderCell>
         )}
        {/* if the screen is mobile hide description, status, and date, only status Show div  */}
      
      </Table.Row>
    </Table.Header>
  
    <Table.Body>
      {issues.map(issue => (
        <Table.Row key={issue.id}>
        <Table.RowHeaderCell>
          <Link href={`/issues/${issue.id}`}>
          
          {issue.title}
          </Link>
  
         
        
          <div className="block md:hidden"><IssueStatusBadge status={issue.status}/></div>
          </Table.RowHeaderCell>
        <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
        <Table.Cell className='hidden md:table-cell'>{issue.description}</Table.Cell>
        <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
        </Table.Row>
      ))}
     
  
    </Table.Body>
  </Table.Root>
  )
}

     // TO MAKE SORTING FIRST WE NEED TO GET ALL COLUMNS AS AN OBJECT ARRAY
     const columns: { 
        label: string;
         value: keyof Issue;
         className?: string;
        }[] = [
        { label : 'Issue', value: 'title', className: "hidden md:table-cell"},
        { label : 'Status', value: 'status', className: "hidden md:table-cell"},
        { label : 'Description', value: 'description', className: "hidden md:table-cell"},
        { label : 'Created', value: 'createdAt', className: "hidden md:table-cell"},
      ]

      export const columnNames = columns.map(column => column.value)
export default IssueTable
