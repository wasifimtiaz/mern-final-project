import React, { useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { setlogout } from "../redux/feature/auth";
import { searchTours } from "../redux/feature/tourSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
     const [show, setShow]= useState(false);
     const [search, setSearch] = useState("");
     const navigate = useNavigate();
     const dispatch = useDispatch();
     
     
    const handleSubmit = (e) => {
      e.preventDefault();
      if (search) {
        dispatch(searchTours(search));
        navigate(`/tours/search?searchQuery=${search}`);
        setSearch("");
      } else {
        navigate("/");
      }
    };


     const logout = ()=>{
        dispatch(setlogout());
     };
     const {user} = useSelector((state)=>({...state.auth}));
  return(
   

    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#cfcfcf" }}>
    <MDBContainer>
      
      <MDBNavbarToggler
        type="button"
        aria-expanded="false"
        aria-label="Toogle navigation"
        onClick={() => setShow(!show)}
        style={{ color: "#222224" }}
      >
         <MDBIcon  icon="bars"  />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
        
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            
            {user?.result?._id && (
                <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">Add Place</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                </>

            )}
                
           {user?.result?._id? (
            <MDBNavbarItem>
            <MDBNavbarLink href="/login">
              <p className="header-text" 
               on onClick={logout}>Logout </p>
            </MDBNavbarLink>
          </MDBNavbarItem>
    ):(
           <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
            </MDBNavbarItem>
    )}
              {user?.result?._id && (
            <h4 style={{fontSize: "10px", marginTop:"60px" }}>Logged in as {user?.result?.name}</h4>
        )}
    
              
        </MDBNavbarNav>
        <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>

      </MDBCollapse>
    </MDBContainer>
    </MDBNavbar>
        

  )
}

export default Header;