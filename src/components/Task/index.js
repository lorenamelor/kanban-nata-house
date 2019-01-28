import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeTask, editTask } from '../../store/app/state';
import { Input } from '../'

const Card = styled.div`
    cursor: pointer;
    padding: 2px 12px;
    position: relative;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
    min-height: 20px;
    border-radius: 3px;
    margin-bottom: 8px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    > .actions  {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      > span {
          font-weight: 600;
          font-family: cursive;
          color: #ea5757;
       }
       & :first-child {
        margin-bottom: 7px;
      }
    }
    > .body-text {
      align-items: center;
      width: 100%;
      display: flex;
      > p {
        color: #676666;
      font-size: 14px;
      margin-top: 10px;
      font-weight: normal;
      white-space: initial;
      }
      > textarea {
        background-color: rgba(9,45,66,.08);
        border-radius: 3px;
        color: #6b808c;
        padding: 7px 9px;
        border: none;
        width: 90%;
        resize: none;
        margin: 3px 0;
      }
    }
`

class Task extends React.Component {
  state = {
    textEdit: this.props.task.text,
    isEditingTask: false,
  }

  render() {
    const { task } = this.props;
    const { isEditingTask, textEdit } = this.state
    return (
      <Card draggable onDragStart={this.onDragStart(task.id)}>
        <div className='actions'>
          <span onClick={this.handleRemoveTask(task.id)}>x</span>
           <span onClick={this.handleEditTask}><img src={require(`../../assets/${!isEditingTask ? 'edit' : 'save'}.png`)}/></span>
        </div>
        <div className='body-text' title="Clique para editar">
          {
            !isEditingTask
              ?
              <p>
                {task.text}
              </p>
              :
              <textarea
                type="text"
                name="textEdit"
                rows="3"
                value={textEdit}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKey}
                onBlur={this.handleEditTask}
              />
          }
        </div>
      </Card>
    );
  }

  onDragStart = (id) => (event) => {
    event.dataTransfer.setData("id", id)
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRemoveTask = (idTask) => () => {
    this.props.removeTask(idTask)
  }

  handleEditTask = () => {
    if(this.state.isEditingTask){
      const textEdit = this.state.textEdit
      const idTask = this.props.task.id

      this.props.editTask(textEdit, idTask)
    }

    this.setState(state => ({
      ...state,
      isEditingTask: !this.state.isEditingTask
    }));   
  }

  handleKey = (event) => {
    if (event.key === 'Enter') {
      this.handleEditTask()
    }
  }
}


const mapDispatchToProps = (dispatch) => ({
  removeTask: (idTask) => (dispatch(removeTask({ idTask }))),
  editTask: (textEdit, idTask) => (dispatch(editTask({ textEdit, idTask })))
})

export default connect(null, mapDispatchToProps)(Task);   
