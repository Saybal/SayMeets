import React from 'react'

type Props = {
    params: Promise<{id: string}>
}

const Meeting = async({ params }: Props) => {
  
  const { id } = await params;
  return (
      <div>Room Meeting : { id }</div>
  )
}

export default Meeting;
