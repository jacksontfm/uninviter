import { useState } from 'react';

interface Props {
    userId: number;
  }

export default function Guests({ userId }: Props) {

    return (
        <>
            <div>The guests, and your userId is {userId}</div>
        </>
    )
}
