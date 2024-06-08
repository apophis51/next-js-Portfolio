'use client'

import React from 'react';
import {useDraggable} from '@dnd-kit/core';


export function MalcButton(){
    return (
        <button className='bg-green-400'>Drag me to the bottom</button>
    );
}


export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    // id: 'draggable',
    id: props.id
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
      {/* <MalcButton/> */}
    </button>
  );
}