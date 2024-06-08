'use client'

import React from 'react';
import { DndContext } from '@dnd-kit/core';

import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { useState } from 'react';
import { MalcButton } from './Draggable';

export default function App() {
  const containers = ['A', 'B', 'C','D','E','F','G','H','I','J'] 
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable id='draggable'><div><MalcButton /></div></Draggable>
  );

  function handleDragEnd(event) {
    const {over} = event;
    setIsDropped(over? over.id : null);
    // if (event.over && event.over.id === 'droppable') {
    //   // setIsDropped(true);
    //   setIsDropped(over ? over.id : null);
    // }
  }

  return (
    <div className='bg-white w-[50%]'>
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        {/* <Draggable /> */}
        {/* <Droppable>
          <div>
            <p>start drop</p>
            {isDropped ? draggableMarkup : 'Drop here'}
            <p>end drop</p>
          </div>
        </Droppable> */}
        <div className='flex flex-wrap flex-row'> 
        {containers.map((id) => (
              // We updated the Droppable component so it would accept an `id`
              // prop and pass it to `useDroppable`
              <div className='flex-auto w-40'>
              <Droppable key={id} id={id}>
                <p>start drop</p>
                {isDropped === id ? draggableMarkup : 'Drop here'}
                <p>end drop</p>
              </Droppable>
              </div>
            ))}
            </div>
      </DndContext>
    </div>
  )
}