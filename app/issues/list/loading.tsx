import { Button, Link, Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import IssueActions from './issueActions'


const LoadingIssuePage = () => {
    const issues = [1,2,3,4,5]
  return (

    <div>
       <IssueActions  />
        
        <Table.Root variant='surface'>
          <Table.Header>
        <Table.Row>
          {/* if the screen is mobile hide description, status, and date, only status Show div  */}
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
        </Table.Row>
          </Table.Header>
        
          <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue}>
          <Table.RowHeaderCell>
            <Skeleton />
            <div className="block md:hidden">  <Skeleton /></div>
            </Table.RowHeaderCell>
          <Table.Cell className='hidden md:table-cell'>
           <Skeleton />
           </Table.Cell>
          <Table.Cell className='hidden md:table-cell'>  <Skeleton /></Table.Cell>
          <Table.Cell className='hidden md:table-cell'>  <Skeleton /></Table.Cell>
          </Table.Row>
        ))}
           
        
          </Table.Body>
        </Table.Root>
    </div>
  )
}

export default LoadingIssuePage
