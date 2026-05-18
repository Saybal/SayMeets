'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const EndCallButton = () => {
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const participant = useLocalParticipant();
    const router = useRouter();

    const isHost = participant && 
        call?.state.createdBy &&
        call?.state.createdBy.id === participant.userId
    
    if (!isHost) return null;
  return (
      <Button onClick={async () => {
          await call.endCall();
          router.push('/')
    }} className="bg-red-700 cursor-pointer">End Call For Everyone</Button>
  )
}

export default EndCallButton