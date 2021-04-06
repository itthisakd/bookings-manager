import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { setToken } from '../../services/localStorageService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const history = useHistory()

  const { setAuthenticated } = useContext(AuthContext)

  const validateInput = () => {
    const newError = {}
    if (!email) newError.email = 'email is required'
    if (!password) newError.password = 'password is required'
    setError(newError)
  }

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault()
      validateInput()
      const res = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password
      })
      localStorage.setItem('token', res.data.token)
      history.push('/')
    } catch (err) {}
  }

  return (
    <div className="col-md-6">
      <h4>ลงชื่อเข้าสู่ระบบ</h4>
      <form onSubmit={handlerSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* {error.email && (<span className="help-block"}>{error.email}</span> */}
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  )
}

export default Login
