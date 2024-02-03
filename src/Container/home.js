import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Tab, Todo } from "../Componets"
import { updateCompleted, updateDeleted } from "../Store/store";

import TodoBg from "../Assets/add-todo-img.jpg";
import NoTodo from "../Assets/no-todo.jpg";


//Custom Data
const TABS = [
	{
		id: 1,
		label: "Create To-Do's"
	},
	{
		id: 2,
		label: "Completed Todo's"
	}
];

function Home() {


	const reduxData = useSelector((store) => store);
	const dispatch = useDispatch();

	const [activeTabId, setActiveTabId] = useState(1);

	const [inputTodo, setInputTodo] = useState("");
	const [todoList, setTodoList] = useState(() => {
		let todolist = JSON.parse(localStorage.getItem("todo-list"));
		return todolist || [];
	});
	const [editing, setEditing] = useState(false);
	const [editingTodoId, setEditingTodoId] = useState("");

	const _handleActiveTab = (id) => {
		setActiveTabId(id)
	};

	const _handleInputTodoChange = (e) => {
		setInputTodo(e.target.value);
	};

	const _handleCreateTodo = () => {
		if (inputTodo == "" || inputTodo.trim() == "") {
			setInputTodo("");
			return
		};


		if (editing == false) {
			let new_todo = {
				id: todoList.length + 1,
				todo: inputTodo,
				status: "pending",
			};

			let todo_list = [
				...todoList,
				new_todo,
			]

			setTodoList(todo_list);

			// Saving list in user broweser, for showing again when user came back
			localStorage.setItem("todo-list", JSON.stringify(todo_list));


			toast.dismiss();
			toast.success("Todo Created Successfully", {
				className: "text-dark fw-bold"
			});


		} else {

			let updated_todo = todoList;

			updated_todo = updated_todo.map((item => {
				if (item.id === editingTodoId) {
					item.todo = inputTodo;
					return item;
				} else {
					return item;
				}
			}));

			setTodoList(updated_todo);
			// Saving list in user broweser, for showing again when user came back
			localStorage.setItem("todo-list", JSON.stringify(updated_todo));

			setEditing(false);
		};

		setInputTodo("");

	};

	const _handleDelete = (todo) => {
		let updatedTodoList = todoList.filter((item) => item.id !== todo.id);
		setTodoList(updatedTodoList);

		// Saving list in user broweser, for showing again when user came back
		localStorage.setItem("todo-list", JSON.stringify(updatedTodoList));

		setInputTodo("");
		document.querySelector("input").blur();

		dispatch(updateDeleted(todo));
	};

	const _handleEdit = (item) => {
		setEditing(true);
		setEditingTodoId(item.id);
		setInputTodo(item.todo);
		document.querySelector("input").focus();
	};

	const _handleStatusChange = (todo) => {
		let updatedTodoList = todoList.filter((item) => item.id !== todo.id);
		setTodoList(updatedTodoList);
		// Saving list in user broweser, for showing again when user came back
		localStorage.setItem("todo-list", JSON.stringify(updatedTodoList));

		dispatch(updateCompleted(todo));

	};

	const _handleDeleteCompleted = (todo) => {
		let updatedTodoList = reduxData.completed_todo.filter((item) => item.id !== todo.id);

		// Saving list in user broweser, for showing again when user came back
		localStorage.setItem("completed", JSON.stringify(updatedTodoList));
		dispatch(updateDeleted(todo));
	};

	return (
		<div className="container py-4 vh-100 ">
			<div className="d-flex flex-column gap-5 p-4 bg-success-subtle rounded-3 h-100 ">
				<div className="row ">
					<div className="col-12 col-lg-6 d-flex bg-warning-subtle rounded-3 mx-auto px-0">
						{
							TABS.map((item, key) => (
								<div className={`${item.id == activeTabId ? "bg-success" : "cursor-pointer"} col col-lg-6  text-center py-2 rounded-3 transition-point-3s`}
									key={key}
									onClick={() => _handleActiveTab(item.id)}>
									<Tab data={item}
										activeTabId={activeTabId}
									/>
								</div>
							))
						}
					</div>
				</div>

				{
					activeTabId == 1 &&
					<>

						{/* Todo Input */}
						<div className="row">
							<div className="col-12  col-lg-6 mx-auto text-center bg-warning-subtle py-3 py-lg-4 rounded-3">
								<div className="d-flex gap-3 flex-wrap justify-content-center">
									<input type="search"
										value={inputTodo}
										className="flex-fill border-0 outline-none rounded-3 p-2"
										name="to-do"
										placeholder="add your to-do.."
										onChange={_handleInputTodoChange} />
									<button className="w-100 border-0 outline-none p-2 rounded-3 px-4 bg-success text-white fw-bold"
										onClick={_handleCreateTodo}>
										{editing ? "Confirm" : "Add +"}
									</button>
								</div>
							</div>
						</div>

						{/* List of todo's */}
						{
							todoList.length > 0 &&
							<div className="bg-white p-3 p-sm-4 col-lg-6 col-12 mx-auto rounded-3 flex-fill pb-2 overflow-scroll">
								<div className="row flex-nowrap">
									<div className="col-4 col-sm-2 text-center ">
										<p className="mb-0 fw-bold bg-warning-subtle py-2 rounded-3">
											No
										</p>
									</div>
									<div className="col-12 col-sm-7 text-center">
										<p className="fw-bold bg-primary-subtle py-2 rounded-3">
											Your Todo's
										</p>
									</div>
									<div className="col-8 col-sm-3 text-center">
										<p className="fw-bold bg-info-subtle py-2 rounded-3">
											Status
										</p>
									</div>
								</div>
								{
									todoList.map((item, key) => (
										<Todo key={item.id}
											item={item}
											itemNo={key + 1}
											onEdit={() => _handleEdit(item)}
											onDelete={() => _handleDelete(item)}
											onStatusChange={() => _handleStatusChange(item)} />
									))
								}
							</div>
						}
						{
							todoList.length == 0 && (
								<div className="row mb-5 flex-fill">
									<div className="col-6 rounded-3 mx-auto text-center bg-white">
										<p className="text-success fw-bold h2 my-4">
											Add your todo now !
										</p>
										<img
											src={TodoBg}
											alt="add todo"
											className="img-fluid col-5" />
									</div>
								</div>
							)
						}
					</>
				}

				{
					activeTabId == 2 &&
					<div className="row overflow-y-scroll">
						{
							reduxData.completed_todo.length == 0 ?
								<div className="col-lg-6 d-flex flex-column rounded-3  bg-white p-3 gap-3 text-center  pt-5 text-black mx-auto h3 fw-600">
									Nothing to show !
									<img src={NoTodo} className="col-6 mx-auto" alt="no to do" />
								</div> :
								<div className="col-lg-6 col-10 mx-auto bg-warning-subtle p-4 h-100 rounded-3">
									<h1 className="text-success h2 fw-600 border-bottom border-bottom-3">Your completed todo's</h1>

									<div className="row mt-5" >
										<div className="mx-auto">
											<div className="row">
												<div className="col-2 text-center ">
													<p className="mb-0 fw-bold bg-danger-subtle py-2 rounded-3">
														No
													</p>
												</div>
												<div className="col-7 text-center">
													<p className="fw-bold bg-primary-subtle py-2 rounded-3">
														Your Todo's
													</p>
												</div>
												<div className="col-3 text-center">
													<p className="fw-bold bg-info-subtle py-2 rounded-3">
														Status
													</p>
												</div>
											</div>
											{
												reduxData.completed_todo.map((item, key) => (
													<Todo key={item.id}
														item={item}
														itemNo={key + 1}
														type={2}
														status="completed"
														onDelete={() => _handleDeleteCompleted(item)}
													/>
												))
											}
										</div>
									</div>
								</div>
						}

					</div>
				}

			</div>
			<ToastContainer />
		</div >
	)
}

export default Home