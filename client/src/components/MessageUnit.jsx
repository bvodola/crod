import React, { Component } from 'react';

const MessageUnit = (props) => {

  let backgroundColor = '#F0F0F0';
  let display = 'inline-block'
  let marginLeft = 'none'

  if(props.isMe){
    backgroundColor = ' #d8ecf3';
    display = 'table';
    marginLeft = 'auto';
  }

  let styles = {
    message:{
      backgroundColor: backgroundColor,
      maxWidth: '65%',
      color: 'black',
      padding: '5px 10px',
      fontSize: '14px',
      border: 'solid 1px #F5F5F5',
      borderRadius: '8px',
      display: display,
      marginLeft: marginLeft,
    },
    parentMessage:{
      display: 'block',
      margin: '5px',
    },
    hour: {
      fontSize: '12px',
      color: 'gray',
    },
  }

  
  return(
    <div style={styles.parentMessage}>
      <div style={styles.message}>
        {props.children}
        <div style={styles.hour}> {props.hour}</div>
      </div>
    </div>
  )

}

export default MessageUnit;
