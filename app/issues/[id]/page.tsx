import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';


interface Props {
    params: {id: string}
}
// USE FETCH USER FUNCTION FOR BOTH WHEN GETTING THE ISSUE DETAILS AND WHEN MAKING PAGE TITLE AND DESCRIPTION
 const fecthUser = cache((issueId: number) => prisma.issue.findUnique({ where : { id: issueId } }))

const IssueDetailPage = async ({params}: Props) => {

  // Get the current Loged in user, if the user is not logged in Hide the edit and delete buttons
  const session = await getServerSession(authOptions)
    // first Get the Passed Issue Id Detail to Display
    const issue = await fecthUser(parseInt(params.id))

    // if Issue is Falsy return Not found Page from next Navigation, you don't need any return statement
    if(!issue)
    notFound();


  return (
    <Grid columns={{ initial: '1', sm: "5"}} gap="5">
    <Box className='md:col-span-4'>
       <IssueDetails issue={issue} />
    </Box>

    {/* DISPLAY IF THERE IS ANY SESSION */}
    {session && 
    <Box>
      <Flex direction='column' gap='4'>
       <AssigneeSelect issue={issue}/>
       <EditIssueButton issueId={issue.id} />
       <DeleteIssueButton issueId={issue.id} />
       </Flex>
    </Box>
}
    </Grid>
  )
}

// WHEN DISPLAYING PAGE TITLE AND DESCRIPTION
export async function generateMetadata({params} : Props ){
  const issue  = await fecthUser(parseInt(params.id ))
  return {
    title: issue?.title,
    description: 'Details of Issue ' + issue?.id
  }
}

export default IssueDetailPage
