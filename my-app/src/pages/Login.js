import React  from 'react';
import {useState , useEffect} from "react";
import { MDBCard , MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, } from 'mdb-react-ui-kit';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../redux/feature/auth';
const initialState ={
    email:"",
    password:""
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {email,password }=formValue;
    const {loading , error }= useSelector((state)=>({ ...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
     error && toast.error(error);
    },[error]);

    const handleSubmit = (e)=> {
        e.preventDefault();
        if (email && password) {
          dispatch(login({ formValue, navigate, toast }));
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    };
  return (
    
    <div
    style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "450px",
      alignContent: "center",
      marginTop: "120px",
    }}
>
    <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x'/>
        <h4>SignIn</h4>
        <MDBCardBody>
            <MDBValidation onSubmit={ handleSubmit} noValidate className='row g-3'>
                <div className='col-md-12'>
                    <MDBInput
                    label="Email"
                    value={email}
                    type="email"
                    name='email'
                    onChange={onInputChange}
                    required
                    invalid
                    validation="Must provide your email"
                    />
                    </div>
                    <div className='col-md-12'>
                    <MDBInput
                    label="Password"
                    value={password}
                    type="password"
                    name='password'
                    onChange={onInputChange}
                    required
                    invalid
                    validation="Must provide your password"
                    />
                    </div>
                    <div className='col-12'>
                    <MDBBtn style={{width:"100%"}} color ="dark" className="mt-2" >
                    {loading && (
                    <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}Login</MDBBtn>
                    
                    </div>
                    
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
            <Link to={"/register"}>
            <br/><h5 style={{color: 'black'}}>Don't have an accout ? Signup</h5>
            </Link>
            </div>
  );
}

export default Login