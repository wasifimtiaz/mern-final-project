import React  from 'react';
import {useState , useEffect} from "react";
import { MDBCard , MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, } from 'mdb-react-ui-kit';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../redux/feature/auth';
const initialState ={
  fname:"",
  lname:"",
    email:"",
    password:"",
    confirmpassword:"",
}

const Register = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {email,password,fname,lname,confirmpassword}=formValue;
    const {loading , error }= useSelector((state)=>({ ...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
     error && toast.error(error);
    },[error]);

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(password !== confirmpassword){
          return toast.error("Password must be matched")
        }
        if (email && password && fname && lname && confirmpassword) {
          dispatch(register({ formValue, navigate, toast }));
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
        <h4>Signup</h4>
        <MDBCardBody>
            <MDBValidation onSubmit={ handleSubmit} noValidate className='row g-3'>
            <div className='col-md-6'>
                    <MDBInput
                    label="First Name"
                    value={fname}
                    type="text"
                    name='fname'
                    onChange={onInputChange}
                    required
                    invalid
                    validation="Enter your First Name"
                    />
                    </div>
                    <div className='col-md-6'>
                    <MDBInput
                    label="Last Name"
                    value={lname}
                    type="text"
                    name='lname'
                    onChange={onInputChange}
                    required
                    invalid
                    validation="Enter your Last Name"
                    />
                    </div>
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
                    <div className='col-md-12'>
                    <MDBInput
                    label="Password confirm"
                    value={confirmpassword}
                    type="password"
                    name='confirmpassword'
                    onChange={onInputChange}
                    required
                    invalid
                    validation="Reconfirm your Password"
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
                )}REGISTER</MDBBtn>
                    
                    </div>
                    
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
            <Link to={"/login"} >
            <br/><h5 style={{color: 'black'}} >ALREADY have an accout ? SignIn</h5>
            </Link>
            </div>
  );
}

export default Register