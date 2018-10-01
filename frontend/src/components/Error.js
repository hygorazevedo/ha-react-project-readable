import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => (
 <div className="alert alert-danger">
   <p>Um erro ocorreu.</p>
   <Link to="/">Retornar para a página inicial</Link>
 </div>
)

export default Error