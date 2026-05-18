'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'

const EndCallButton = () => {
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const participant = useLocalParticipant();

    const isHost = participant && 
        call?.state.createdBy &&
        call?.state.createdBy.id === participant.userId
    
    if (!isHost) return null;
  return (
    <div>EndCallButton</div>
  )
}

export default EndCallButton