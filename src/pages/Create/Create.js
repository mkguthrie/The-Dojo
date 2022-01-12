import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import './Create.css'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]

export default function Create() {
    const history = useNavigate()
    const { addDocument, response } = useFirestore('projects')
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])
    const { user } = useAuthContext()
    
    // form field state
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormEffor] = useState(null)

    useEffect(() => {
        if (documents) {
            const options = documents.map(users => {
                return { value: users, label: users.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormEffor(null)

        if (!category) {
            setFormEffor('Please select a category')
            return 
        }

        if (assignedUsers.length < 1) {
            setFormEffor('Please assign a user')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name: name,
            details: details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy: createdBy,
            assignedUsersList: assignedUsersList
        }

        // console.log(project)
        await addDocument(project)

        if (!response.error) {
            history('/')
        }
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name</span>
                    <input 
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </label>
                <label>
                    <span>Project Details</span>
                    <textarea
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                        required
                    ></textarea>
                </label>
                <label>
                    <span>Set Due Date</span>
                    <input 
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        required
                    />
                </label>
                <label>
                    <span>Project Category</span>
                    <Select 
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assigned To:</span>
                    <Select 
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
                <button className="btn">Submit</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}
