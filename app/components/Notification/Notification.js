import { store } from 'react-notifications-component';
import { isString, values } from 'lodash';
import React from 'react';

const backendErrorMessagesFormatter = (messageContent) => (
  <ul>
    {values(messageContent)
      .map((message) => (
        <li key={message}>
          {message}
        </li>
      ))}
  </ul>
);

export default function (type, messageContent) {
  let title;

  switch (type) {
    case 'danger':
      title = 'Warning';
      break;
    case 'success':
      title = 'success';
      break;
    case 'warning':
      title = 'warning';
      break;
    case 'info':
      title = 'info';
      break;
    default:
      break;
  }

  store.addNotification({
    title,
    message: isString(messageContent) ? (messageContent) : backendErrorMessagesFormatter(messageContent),
    type,
    insert: 'bottom',
    container: 'bottom-left',
    animationIn: ['bounceIn'],
    animationOut: ['bounceOut'],
    textTransform: 'capitalize',
    dismiss: {
      duration: 7000,
      onScreen: true
    }
  });
}
