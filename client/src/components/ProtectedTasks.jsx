import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useTasksStore } from '../../store/tasksStore'

function ProtectedTasks({ children }) {
	const [loading, setLoading] = useState(true)
	const [isAuth, setIsAuth] = useState(false)

	const getTasks = useTasksStore(state => state.getTasks)

	useEffect(() => {
		const verifyAuth = async () => {
			const tasks = await getTasks()
			setIsAuth(tasks)
			setLoading(false)
		}

		verifyAuth()
	}, [getTasks])

	if (loading) {
		return <h1 style={{ color: 'white' }}>Подождите...</h1>;
	}

	if (isAuth) return <Navigate to='/' />

	return children
}

ProtectedTasks.propTypes = {
	children: PropTypes.node.isRequired
}

export default ProtectedTasks