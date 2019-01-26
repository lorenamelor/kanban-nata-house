import * as React from 'react';
import styled from 'styled-components';
import { TaskList, Task } from '../../components/';
import { connect } from 'react-redux';
import { selectTasksList, searchTasks } from '../../store/app/state';
import Logo from '../../assets/Logo/'

const Page = styled.div`
	> .content {
		margin: 20px;
	}
	> header{
		height: 55px;
    background: #1F2227;
    justify-content: center;
    display: flex;
	}
	> .content > h1 {
		font-family: 'Roboto';
		margin-bottom: 5px;
    font-weight: 400;
		color: #333;
		font-size: 30px;
	}
 > .content > div {
	white-space: nowrap;
    overflow-x: auto;
    padding-bottom: 8px;
    height: -webkit-fill-available;
 }
`

class Kanban extends React.Component {

	componentDidMount() {
		this.props.searchTasks();
	}

	render() {
		const lists = [{ title: 'BackLog', listId: 0 },
		{ title: 'To do', listId: 1 },
		{ title: 'InProgress', listId: 2 },
		{ title: 'Testing', listId: 3 },
		{ title: 'Done', listId: 4 }]

		const { tasksList } = this.props;
		return (
			<Page>
				<header>
					<Logo />
				</header>

				<div className='content'>
					<h1>Tarefas</h1>
					<div>
						{
							lists.map((list) =>
								<TaskList title={list.title} key={list.listId} listId={list.listId}>
									{tasksList.filter(function (task) { return task.listId === list.listId; }).map((task) =>
										<Task task={task} key={task.text} />
									)}
								</TaskList>)
						}
					</div>
				</div>
			</Page >
		);
	}
}

const mapStateToProps = (state) => ({
	tasksList: selectTasksList(state)
});

const mapDispatchToProps = (dispatch) => ({
	searchTasks: () => (dispatch(searchTasks())),
})

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);

