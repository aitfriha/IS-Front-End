import React, { Component } from 'react';
import interact from 'interactjs';

export class DragAndDropTest extends Component {
  componentDidMount() {
    interact('[id^=dropzone]').dropzone({
      accept: '[id^=element]',
      overlap: 0.75,
      ondropactivate(event) {
        const item = event.relatedTarget;
        item.classList.add('dragging');
      },
      ondropdeactivate(event) {
        const item = event.relatedTarget;
        item.classList.remove('dragging', 'cannot-drop');
        console.log(
          'the item: '
            + event.relatedTarget.id
            + ' is dropped in: '
            + event.currentTarget.id
        );
      },
      ondragenter(event) {
        const item = event.relatedTarget;
        item.classList.remove('cannot-drop');
        item.classList.add('can-drop');
      },
      ondragleave(event) {
        const item = event.relatedTarget;
        item.classList.remove('can-drop');
        item.classList.add('cannot-drop');
      }
    });
    interact('[id^=element]').draggable({
      inertia: true,
      // enable autoScroll
      autoScroll: true,
      restrict: {
        restriction: '#dropSpace',
        drag: document.getElementById('dropSpace'),
        endOnly: true,
        elementRect: {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1
        }
      },
      listeners: {
        // call this function on every dragmove event
        move: this.dragMoveListener,
        // call this function on every dragend event
        end: this.dragMoveEnd
      }
    });
  }

  dragMoveListener = event => {
    const { target } = event;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform = 'translate(' + x + 'px, ' + y + 'px)';
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  dragMoveEnd = event => {
    const { target } = event;
    const initialX = 0;
    const initialY = 0;
    target.style.webkitTransform = 'translate(' + initialX + 'px, ' + initialY + 'px)';
    target.style.transform = 'translate(' + initialX + 'px, ' + initialY + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', initialX);
    target.setAttribute('data-y', initialY);
  };

  render() {
    return (
      <div>
        <div
          id="element1"
          style={{ backgroundColor: '#E9573F', width: '50px' }}
        >
          Test drag 1
        </div>
        <div
          id="element2"
          style={{ backgroundColor: '#E9573F', width: '50px' }}
        >
          Test drag 2
        </div>
        <div
          id="element3"
          style={{ backgroundColor: '#E9573F', width: '50px' }}
        >
          Test drag 3
        </div>
        <div
          id="dropzone1"
          style={{
            margin: 20,
            height: '200px',
            width: '200px',
            backgroundColor: '#F6BB42'
          }}
        >
          Drop zone 1
        </div>
        <div
          id="dropzone2"
          style={{
            margin: 20,
            height: '200px',
            width: '200px',
            backgroundColor: '#F6BB42'
          }}
        >
          Drop zone 2
        </div>
        <div
          id="dropzone3"
          style={{
            margin: 20,
            height: '200px',
            width: '200px',
            backgroundColor: '#F6BB42'
          }}
        >
          Drop zone 3
        </div>
      </div>
    );
  }
}

export default DragAndDropTest;
