import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import state, { removeTask, editTask } from '../../store/app/state';
import { Input } from '../'

const Card = styled.div`
    cursor: pointer;
    padding: 6px 12px 2px;
    position: relative;
    max-width: 300px;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
    min-height: 20px;
    border-radius: 3px;
    margin-bottom: 8px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    >span {
      font-weight: 600;
    color: #ea5757;
    font-family: cursive;
    }
    div {
      width:100%
    }
    div > p {
      color: #676666;
    font-size: 14px;
    margin-top: 10px;
    font-weight: normal;
    font-family: Roboto;
    white-space: initial;
    }
    div > textarea {
      background-color: rgba(9,45,66,.08);
      border-radius: 3px;
      color: #6b808c;
      padding: 7px 9px;
      border: none;
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
      <Card>
        <span onClick={this.handleRemoveTask(task.id)}>x</span>
        <div onClick={this.handleEditTask}>
          {
            !isEditingTask ?
              <p>
                {task.text}
              </p>
              :
              <textarea
                type="text"
                name="textEdit"
                value={textEdit}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKey}
              />
          }
        </div>
      </Card>
    );
  }

  handleRemoveTask = (idTask) => () => {
    this.props.removeTask(idTask)
  }

  handleEditTask = () => {
    this.setState(estado => ({
      ...estado,
      isEditingTask: !this.props.isEditingTask
    }));
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleKey = (event) => {
    if (event.key === 'Enter') {
      const textEdit = this.state.textEdit
      const idTask = this.props.task.id

      this.props.editTask(textEdit, idTask)
      this.handleEditTask()
    }
  }

}


const mapDispatchToProps = (dispatch) => ({
  removeTask: (idTask) => (dispatch(removeTask({ idTask }))),
  editTask: (textEdit, idTask) => (dispatch(editTask({ textEdit, idTask })))
})

export default connect(null, mapDispatchToProps)(Task);   
