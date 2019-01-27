import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, mapTo, mergeMap, tap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';

// ACTIONS

const actionCreator = actionCreatorFactory('APP::STATE');
export const init = actionCreator('INIT');
export const searchTasks = actionCreator('SEARCH_TASK');
export const createTask = actionCreator('CREATE_TASK');
export const removeTask = actionCreator('DELETE_TASK');
export const editTask = actionCreator('EDIT_TASK');

// SELECTS
export const selectTasksList = ({ appState }) => appState.tasksList;


const INITIAL_STATE = {
	initialized: false,
	tasksList: [],
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.case(init, (state) => ({
		...state,
		initialized: true,
	}))
	.case(searchTasks, (state) => {
		return {
			...state,
			tasksList: getTasks()
		}
	})
	.build();

export function getTasks() {
	const tasks = localStorage.getItem('tasks');
	return JSON.parse(tasks || '[]');
}

const createTaskEpic = (action$) => action$.pipe(
	filter(createTask.match),
	tap((action) => {
		const tasks = getTasks();
		tasks.push(action.payload.task);
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}),
	mapTo(searchTasks()),
);

const removeTaskEpic = (action$) => action$.pipe(
	filter(removeTask.match),
	tap((action) => {
		const tasks = getTasks();

		tasks.forEach((task) => {
			if (task.id === action.payload.idTask) {
				const index = tasks.indexOf(task);

				if (index > -1) {
					tasks.splice(index, 1);
					localStorage.setItem('tasks', JSON.stringify(tasks))
				}
			}
		})
	}),
	mapTo(searchTasks()),
);

const editTaskEpic = (action$) => action$.pipe(
	filter(editTask.match),
	tap((action) => {
		const tasks = getTasks();
		tasks.forEach((task) => {
			if (task.id === action.payload.idTask) {
				const index = tasks.indexOf(task);

				if (index > -1) {
					if (action.payload.textEdit) {
						tasks[index].text = action.payload.textEdit
					}
					else {
						if (action.payload.listId) {
							tasks[index].listId = action.payload.listId
						}
					}
					localStorage.setItem('tasks', JSON.stringify(tasks))
				}
			}
		})
	}),
	mapTo(searchTasks()),
);
export const epics = combineEpics(
	createTaskEpic,
	removeTaskEpic,
	editTaskEpic
);

