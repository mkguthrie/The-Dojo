import { useSignup } from '../../hooks/useSignup'
import { useState } from 'react'
import './Signup.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()

        signup( email, password, displayName, thumbnail )
    }

    const handleFileChange = (e) => {
        // reset thumbnail
        setThumbnail(null)

        // select first file
        let selected = e.target.files[0]

        // make the checks/rules on the selected file
        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Please select an image file')
            return
        }
        if (selected.size > 100000) {
            setThumbnailError('Please select a file size less then 100kb')
            return
        }

        // if all the above checks pass, reset error just in case and then set state of thumnail to selected
        setThumbnailError(null)
        setThumbnail(selected)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>
                <span>Email:</span>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </label>
            <label>
                <span>Password:</span>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input 
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    required
                />
            </label>
            <label>
                <span>Profile Thumnail:</span>
                <input 
                    type="file"
                    onChange={handleFileChange}
                    // value={email}
                    required
                />
                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>
            {!isPending && <button className="btn">Sign Up</button>}
            {isPending && <button className="btn" disabled>Loading...</button>}
            {error && <p className="error">{error}</p>}
        </form>
    )
}
