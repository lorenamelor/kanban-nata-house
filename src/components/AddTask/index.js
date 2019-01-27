import React from 'react';
import styled from 'styled-components';
import { createTask } from '../../store/app/state'
import { connect } from 'react-redux';
import { Input } from '../'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
    > input {
      background-color: rgba(9,45,66,.08);
      border-radius: 3px;
      color: #6b808c;
      padding: 7px 9px;
      border: none;
      width: 80%;
    }
    > button {
      cursor: pointer;
      font-size: 25px;
      padding: 0px 6px;
      height: 29px;
      border-radius: 4px;
      border: none;
      color: #fff;
      background: #16b5ac;
    }
   `



class AddTask extends React.PureComponent {
  state = {
    textTask: ''
  }

  render() {
    return (
      <Wrapper>
        <input
          type="text"
          name="textTask"
          placeholder='Criar nova tarefa...'
          value={this.state.textTask}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKey}
        />
        <button onClick={this.handleCreateTask}>+</button>
      </Wrapper>
    );
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleKey = (event) => {
    if (event.key === 'Enter') {
      this.handleCreateTask();
    }
  }
  
  handleCreateTask = () => {
    const text = this.state.textTask
    const listId = this.props.listId

    //Criando um id auto increment
    const id = (Number(localStorage.getItem('countIdTasks')) || 0) + 1;
    localStorage.setItem('countIdTasks', id)

    const task = { id, text, listId }
    this.props.createTask(task)
    this.setState({
      textTask: ''
    });
  }
}

const mapDispatchToProps = (dispatch) => ({
  createTask: (task) => (dispatch(createTask({ task }))),
})

export default connect(null, mapDispatchToProps)(AddTask);   