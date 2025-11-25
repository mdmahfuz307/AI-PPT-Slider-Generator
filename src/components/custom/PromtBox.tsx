import React from 'react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

function PromtBox() {
  return (
    <div className='w-full flex items-center justify-center mt-28'>
        <div className='flex flex-col items-center justify-center space-y-4'>
            <h2 className='font-bold text-3xl'>Describe your topic, we’ll design the slides!</h2>
            <p className='text-xl text-gray-500'>Your design will be saved as new project</p>

            <InputGroup>
                <InputGroupTextarea placeholder='Enter what kind of slider do you to create?'/>
            </InputGroup>
        </div>
    </div>
  )
}

export default PromtBox