'use client'

import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { useState } from 'react';
import { MalcButton } from './Draggable';

export function Droppable(props) {
  const [toggleColor, setToggleColor] = useState(false);
  const {isOver, setNodeRef, over} = useDroppable({
    // id: 'droppable',
    id: props.id
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  const color = isOver ? 'bg-green-200' : 'bg-white';
  const toggle = over ? true : undefined;
  
  function toggleIt(){
    setToggleColor(true);
  }
  
  return (
    <div ref={setNodeRef} style={style} className={`${color}`}>
      {props.children}
      {/* <p>cool</p>
      {toggle ? <MalcButton/> : null} */}

    </div>
  );
}