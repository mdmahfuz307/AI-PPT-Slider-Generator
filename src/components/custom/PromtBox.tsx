import type { KeyboardEvent } from 'react';
import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea
} from "@/components/ui/input-group";
import { ArrowUp, Loader2Icon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import { signInAnonymously } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { firebaseAuth, firebaseDb } from "../../../config/FirebaseConfig";



function PromtBox() {

  const [userInput, setUserInput] = useState<string>("");
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const CreateAndSaveProject = async ()=>{  
    if (!user) {
      alert('Please sign in to create a project');
      return;
    }

    const trimmed = userInput.trim();
    if (!trimmed) return;

    const projectId= uuidv4();
    try {
      setLoading(true);
      // Ensure the client is authenticated with Firebase (anonymous) so Firestore rules that require auth pass.
      // If your Firestore rules require specific UID handling, use a server-side solution or integrate Firebase Auth properly.
      if (!firebaseAuth.currentUser) {
        try {
          await signInAnonymously(firebaseAuth);
        } catch (authErr) {
          console.warn('Anonymous sign-in failed', authErr);
          // continue; Firestore write may still fail if rules require authenticated user
        }
      }
      // Save project to firebase
      await setDoc(doc(firebaseDb, "projects", projectId), {
        projectId,
        userInputPromt: trimmed,
        createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
        createdAt: Date.now(),
      });

    } catch (err: unknown) {
      // Log the error but do not block navigation to the outline page
      console.error('Failed to save project (will still navigate):', err);
    } finally {
      setLoading(false);
      // Navigate to the outline page (no projectId) regardless of save result
      navigate('/workspace/project/outline');
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift). Allow Shift+Enter for newline.
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading && userInput.trim()) CreateAndSaveProject();
    }
  }

  return (
    <div className="w-full flex items-center justify-center mt-28">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="font-bold text-4xl">
          Describe your topic, we’ll design the <span className='text-primary'>PPT</span> slides!
        </h2>
        <p className="text-xl text-gray-500">
          Your design will be saved as new project
        </p>

        <InputGroup>
          <InputGroupTextarea
            placeholder="Enter what kind of slider do you to create?"
            className='min-h-36'
            value={userInput}
            onChange={(event)=>setUserInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputGroupAddon align={"block-end"}>
            {/* <InputGroupButton>
              <PlusIcon className="w-6 h-6" />
            </InputGroupButton> */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select NO of Slider" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>No.Of Slider</SelectLabel>
                  <SelectItem value="4 to 6">4-6 Sliders</SelectItem>
                  <SelectItem value="6 to 8">6-8 Sliders</SelectItem>
                  <SelectItem value="8 to 10">8-12 Sliders</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
              <InputGroupButton 
                variant={'default'} 
                className='rounded-full ml-auto' 
                size={'icon-sm'} 
                onClick={()=> CreateAndSaveProject()} 
                disabled={!userInput.trim()}>
              {loading?<Loader2Icon className="animate-spin"/>:<ArrowUp/>}
              </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}

export default PromtBox