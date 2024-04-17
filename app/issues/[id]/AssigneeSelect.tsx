"use client";
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = ( {issue}: {issue: Issue}) => {

  // TO GET ALL USERS WE MAKE USEUSERS HOOK TO THE BOTTOM AND CALL HERE
    const { data:users, error, isLoading } = useUsers();
   
    if(isLoading) return <Skeleton />

    if(error) return null;

    // CREATE UPDATE FUNCTION HERE
    const assignedIssue = (userId: string) => {
      axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null})
      .catch(() => {
        toast.error("Changes Could not be Saved")
      })
    }

  return (
    <>

      <Select.Root
      defaultValue={issue.assignedToUserId || "Unassigned"}
      onValueChange={assignedIssue}>
  <Select.Trigger />
  <Select.Content>
    <Select.Group>
      <Select.Label>Suggestions</Select.Label>
      <Select.Item value='Unassigned'>Unassigned</Select.Item>

    {users?.map(user => (

        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
    )

    )}
      
      
    </Select.Group>
    <Select.Separator />
 
  </Select.Content>
</Select.Root>
<Toaster />
</>
  )
}

// GET ALL USERS AND CACHING THEM
const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('/api/users').then(res => res.data),
  staleTime: 60 * 1000,
  retry: 3
})
export default AssigneeSelect
