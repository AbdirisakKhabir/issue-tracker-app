'use client';
import React from 'react'
import { TextField, Text, Button, Callout } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

// Create Interface form Issue Form
type IssueFormData = z.infer<typeof IssueSchema>


const IssueForm = ({issue} : {issue?: Issue}) => {

    const router = useRouter();

    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
      resolver: zodResolver(IssueSchema)
    });

    // error State
    const [error, setError] = useState('');

    // Loading button State
    const [isSubmitting, setIsSubmitting] = useState(false);

    
  // Completely Separate Logic and Markup
const onSubmit = handleSubmit( async (data) => {
  try {

    setIsSubmitting(true)

    // if we have Updated Issue send this API
    if(issue)
    await axios.patch('/api/issues/' + issue.id, data)
    // Otherwise if we have new Issue Call this API
    else
      await axios.post('/api/issues', data)
    router.push('/issues/list')

    // FINALY MAKE REFRESH PAGE
    router.refresh()
    
  } catch (error) {
    setIsSubmitting(false)
      setError('Unexpected Error Occured.');
  }
}

)


  return (
    <div className='max-w-xl space-y-3'>

        {/* DIsplay Callout Component When error Occured */}
        { error && <Callout.Root color="red">
    <Callout.Icon>
      
    </Callout.Icon>
    <Callout.Text>
      {error}
    </Callout.Text>
  </Callout.Root>}

        <form
         className=' space-y-3'
         onSubmit={onSubmit}>

          {/* In here we Make Client side Validation,  we use ZOD resolvers to display the error,
           we make new file of validation which makes validating form, and then we change the */}
          <TextField.Root placeholder="Issue Title" {...register('title')} defaultValue={issue?.title}>
       
            </TextField.Root>
              {/* Display error Message From ErrorMessage Component */}
           <ErrorMessage  >
           {errors.title?.message}
           </ErrorMessage>

            <Controller
            name='description'
            control={control}
            defaultValue={issue?.description}
            render={ ({ field}) => <SimpleMDE placeholder="Issue Description" {...field} /> }
            />
            {/* Display error Message From ErrorMessage Component */}
              <ErrorMessage  >
           {errors.description?.message}
           </ErrorMessage>

            {/* Call Snipper Component Which makes Button Rendering When Form is Submitted */}
            <Button  disabled={isSubmitting}>

                {/* IF WE HAVE UPDATED ISSUE MKAE DYNAMIC LABEL  */}
                {issue ? 'Update Issue' : "Submit New Issue"} { ' '}
               {isSubmitting && <Spinner />}
              </Button>
        </form>
    </div>
  )
}

export default IssueForm
