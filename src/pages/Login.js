import React from 'react';
import { Link} from "react-router-dom"
import bplogo from '../assets/images/browser-party-logo.png'


const styles = {
  logo: {
    margin: '18vh auto 5px auto',
  },
  component:
  {
    width: '333px',
    margin: '0 auto auto auto',
    padding: '26px',

  },
  form: {
    fontSize: '25px',
    marginLeft: '-8px'
  },
  input:
  {
    border: '1px solid black',
    marginBottom: '10px',
    maxWidth: '90%'
  },
  h3: {
    display: 'inline',
    marginLeft: '70px'
  },
  logout:
  {
    display: 'inline',
    marginLeft: '10px'
  }
}

export default function Login({loggedIn, logMeOut, logMeIn, username, loginInfo, handleInputChange, loading}) {

  return (
      <div>
        <style>
                {`
        cursor: pointer
      `}
            </style>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src={bplogo}></img>
        <div style={styles.component} className="component">
          <div>
            {loading ? <h2>Loading...</h2> :
              <div>
                {username ? (
                  <div>
                    <h2>You are now logged in, {username}</h2>
                    <Link to="/" style={styles.button} className="button">Home</Link>
                  </div>
                ) : (
                  <div>
    
                    <div style={styles.form} className="form-group">
                      <label>Username</label>
                      <input style={styles.input} className="input" type="text" value={loginInfo.username} onChange={handleInputChange} name="username"/>
                    </div>
                    <div  style={styles.form} className="form-group">
                      <label>Password</label>
                      <input style={styles.input} className="input" type="password" value={loginInfo.password} onChange={handleInputChange} name="password"/>
                      <button style={{marginTop: '9px', marginLeft: '98px', fontSize: '25px'}} className="button" onClick={logMeIn}>Login</button>
                    </div>
                  </div>
                )}
              </div>
            }
              </div>
          </div>
      </div>
      
    );
  }
