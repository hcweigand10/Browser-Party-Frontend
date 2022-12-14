import React from 'react';
import { useNavigate } from "react-router-dom";
import bplogo from '../assets/images/browser-party-logo.png'
import carddeck from '../assets/images/card-deck.png'

export default function Home(props) {

  let navigate = useNavigate();
  const loginChange = () => {
    let path = `/login`;
    navigate(path);
  }
  const registerChange = () => {
    let path = `/register`;
    navigate(path);
  }

  const styles = {
    logo: {
      margin: '20vh auto 5px auto',
    },
    component:
    {
      width: '370px',
      margin: '0 auto',
      padding: '5px 35px 35px 35px',
    },
    h1:
    {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '0.8'
    },
    button:
    {
      marginTop: '28px',
      padding: '5px 17px'
    },
  }

  return (
    <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src={bplogo}></img>
      <div style={styles.component} className="component">
        {props.username ? (
          <div style={{padding: '24px 10px 0px 0px',}}>
            <img style={{maxWidth: '90px', float: 'left', marginRight: '15px', flexWrap: 'wrap'}} className="component-logo" alt="Browser Party logo" src={carddeck}></img>
            <h4 style={{paddingTop: '5px', fontSize: '20px', textAlign: 'left', flexWrap: 'wrap'}}> Your friends are waiting for you! Press play up top!</h4>
          </div>
        ) : (
          <div className='text-center'>
          <div className="row">
            <div className="col">
              <div>
                <button style={styles.button} className="button" type="submit" onClick={loginChange}>Login</button>
              </div>
              <div>
                <button style={styles.button} className="button" type="submit" onClick={registerChange}>Create Account</button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}