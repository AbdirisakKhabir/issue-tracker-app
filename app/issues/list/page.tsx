import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import IssueActions from './issueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';


interface Props {
  searchParams: IssueQuery

 
}

// WHEN FILTERING THE ISSUES WE NEED TO PASS STATUS TO MAKE FILTER ALSO YOU CAN MAKE PROPS INTERFACE
const IssuesPage = async ( { searchParams } : Props ) => {

 
  // GET ALL THE STATUSES and VALIDATE IF THE STATUS WHICH IS THE USER SEND DOESNOT INCLUDE THE STATUESES
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  
  // CREATE ORDER BY LOGIC IF TRUTHY, IF WE PASS INCOREECT ORDERBY PARAMS FINCD THE ORDER BY COLUMNS VALUE
  const orderBy = columnNames
  .includes(searchParams.orderBy) 
   ? { [ searchParams.orderBy]: 'asc' } : undefined;

  //  CREATE WHERE STATUS 
  const where = {status};

  // PASSING PAGINATION COMPONENT
   const page = parseInt(searchParams.page) || 1;
   const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: ( page -1 ) * pageSize,
    take: pageSize
  });


// CREATE NEW QUERY, the where query is the above
const issueCount = await prisma.issue.count({ where })


  return (
    <Flex direction="column" gap="3">
    
    <IssueActions />
      {/* // Table for Displaying List of Issues COMPONENET */}
    
    <IssueTable searchParams={searchParams} issues={issues} />
{/* CREATE PAGINATION */}
<Pagination
 pageSize={pageSize}
  currentPage={page}
   itemCount={issueCount} />
    </Flex >


  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all Project Issues'
}

export default IssuesPage
