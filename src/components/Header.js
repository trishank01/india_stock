import styled from "@emotion/styled";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const StyledBox = styled(Box)`
  display: flex;
`;

function Header() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [userName, SetUserName] = useState("")
  console.log(userName)
  console.log(currentUser)

  useEffect(() =>{
    if(!currentUser){
        SetUserName("")
      }else {
        setTimeout(() => {
            SetUserName(currentUser?.displayName)
         },1500)
      }
  },[currentUser])

  const LogoutRoute = ({ children }) => {
    if (!currentUser) {
      return children;
    }
    return null;
  };

  const LoginInUser = ({ children }) => {
    if (currentUser) {
      return children;
    }
    return null;
  };



  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <StyledContainer>
        <Toolbar>
          <Typography
            onClick={() => navigate(`/`)}
            variant="h6"
            sx={{
              flex: 1,
              color: "gold",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Indian Stock Tracker
          </Typography>
        </Toolbar>
        <StyledBox>
        <Toolbar>
              <Typography
                variant="h6"
                sx={{
                  flex: 1,
                  color: "gold",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
               { userName !== "" && `Welcome ${userName}`}
              </Typography>
          </Toolbar>
          <Toolbar>
            <Link to="/watchlist">
              <Typography
                variant="h6"
                sx={{
                  flex: 1,
                  color: "gold",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                WatchList
              </Typography>
            </Link>
          </Toolbar>
          <LogoutRoute>
            <Toolbar>
              <Link to="/login">
                <Typography
                  variant="h6"
                  sx={{
                    flex: 1,
                    color: "gold",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Login
                </Typography>
              </Link>
            </Toolbar>
          </LogoutRoute>
          <LoginInUser>
            <Toolbar onClick={() => signOut(auth)}>
              <Link to="/login">
                <Typography
                  variant="h6"
                  sx={{
                    flex: 1,
                    color: "gold",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </Typography>
              </Link>
            </Toolbar>
          </LoginInUser>
        </StyledBox>
      </StyledContainer>
    </AppBar>
  );
}

export default Header;
