'use client';
import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



const DeleteIssueButton = ({issueId} : {issueId : number}) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)

    // DELETE ISSUE LOGIC
    const deleteIssue = async () => {
        try {
            setIsDeleting(true)
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues/list')
            router.refresh()
        } catch (error) {
            setIsDeleting(false)
            setError(true)
        }
       
    }

  return (

<>


    <AlertDialog.Root>
  <AlertDialog.Trigger>
    {/* DISABLE THE BUTTON IF IS DELETING THE ISSUE IS TRUTHY and DIsplay SPINNEER COMPONENT */}
    <Button color="red" disabled={isDeleting}>
        Delete Issue
        {isDeleting && <Spinner />}
        </Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content maxWidth="450px">
    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
    <AlertDialog.Description size="2">
      Are you sure to delete this Issue?
    </AlertDialog.Description>

    <Flex gap="3" mt="4" justify="end">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button variant="solid" color="red" onClick={deleteIssue }>
          Delete Issue
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
</AlertDialog.Root>

{/* IF THERE IS AN ERROR DISPLAY THIS ALERT BY USING TRY CATCH BLOCK ERROR AND USE STATE HOOK */}
{/* THIS DIALOG BOX ONLY WILL OPEN IF THERE IS AN ERROR */}
<AlertDialog.Root open={error}>
    <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This Issue Could not Be Deleted</AlertDialog.Description>
        <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>Ok</Button>
    </AlertDialog.Content>
</AlertDialog.Root>
</>
  )
}

export default DeleteIssueButton
