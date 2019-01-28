import React from 'react';
import styled from 'styled-components';
import { AddTask } from '../'
import { connect } from 'react-redux';
import { editTask } from '../../store/app/state';



const Card = styled.div`
    width: 20%;
    margin: 0 12px 0 4px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #e6e6e6;
    vertical-align: top;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.1);
    border-radius: 4px;
    
    @media (max-width: 1370px) {
      width: 272px;
    }

    > h1 {
      color: white;
      margin: 0;
      padding: 5px 10px;
      font-size: 22px;
      background: #1F2227;
      font-weight: 300;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    > .cardContent {
      padding: 16px;
      cursor: pointer;
    }
    `


class TaskList extends React.PureComponent {
  render() {
    const { children, title, listId } = this.props;
    return (
      <Card onDragOver={this.onDragOver} onDrop={this.onDrop(listId)}>
        <h1>
          {title}
        </h1>
        <div className='cardContent'>
          {children}
          <AddTask listId={listId} />
        </div>
      </Card>
    );
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (listId) => (event) => {
    let idTask = Number(event.dataTransfer.getData("id"));
    this.props.editTask(listId, idTask)
  }
}


const mapDispatchToProps = (dispatch) => ({
  editTask: (listId, idTask) => (dispatch(editTask({ listId, idTask })))
})

export default connect(null, mapDispatchToProps)(TaskList);