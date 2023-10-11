import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useRef} from "react";
import {useEffect, useState} from 'react';

var type;

function choose_type_Teacher(){
  document.getElementById("Teacher_button").style = "  background-color: rgba(255,0 ,0 , 1);";
  document.getElementById("Student_button").style = "  background-color: rgba(243, 241, 241, 1);";
  type = true;  //"Teacher";

}

function choose_type_Student(){
  document.getElementById("Teacher_button").style = "  background-color: rgba(243, 241, 241, 1);";
  document.getElementById("Student_button").style = "  background-color: rgba(255,0 ,0 , 1);";
  type = false;  //"Student";
}

export default function Create_Account() {
  const nameRef = useRef(undefined);
  const EmailRef = useRef(undefined);
  const passwordRef = useRef(undefined);
  const confirm_passwordRef = useRef(undefined);
  // 為了方便操作，建立一個array來管理這些ref
  const refArr = useRef([nameRef, EmailRef, passwordRef, confirm_passwordRef]);

  function Singn_up() {    //註冊按鈕
    var information;
    var username;
    var email;
    var password;
    var hashed_password;
    var is_active;

    console.log('press Create_Account')
    console.log(nameRef.current.name +" is "+ nameRef.current.value);
    console.log(EmailRef.current.name +" is "+ EmailRef.current.value);
    console.log(passwordRef.current.name +" is "+ passwordRef.current.value);
    console.log(confirm_passwordRef.current.name +" is "+ confirm_passwordRef.current.value);

    const Create_account_send =
    {
      "username": nameRef.current.value,
      "email": EmailRef.current.value,
      "password": passwordRef.current.value,  //轉json格式
      "is_stuff": type,
    }
  
    var Create_account_send_json = JSON.stringify(Create_account_send);  //轉json格式
    console.log("account_send_json is " + Create_account_send_json);
    console.log('account_send_json is ',typeof(Create_account_send_json));
  /*
    var User_Name = "";
    User_Name = "Invalid request data.";
    if(User_Name == "user_table with this username already exists.")
    {
      alert("This username is already exists.");
    }
    else if(User_Name == "Invalid request data.")
    {
      alert("Invalid request data.");
    }
    else
    {
      alert("Create account sucessfully.");
      window.location.replace("/" + process.env.NEXT_PUBLIC_Log_in);
    }
*/
    if(passwordRef.current.value != confirm_passwordRef.current.value)
    {
      alert("password error!");
    }

    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_signup, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: Create_account_send_json,
    })
    .then((response) => {
      information = response.json();
      console.log('info^^',information);
      return information;
    })
    .then((data) => {
      username = data["username"];
      email = data["email"];
      password = data["password"];

      console.log('username=',data["username"]);
      console.log('email=',data["email"]);
      console.log('password=',data["password"]);
      if(data["username"] ==  "A user with that username already exists.")
      {
        alert(data["username"]);
      }
      else
      {
        alert("Create account sucessfully.");
        window.location.replace("/" + process.env.NEXT_PUBLIC_Log_in);
      }
    })
    .catch((error) => console.log("error", error));
  }

  return (
    <>
      <main className={styles.main}>
        
        <div className={styles.center}>
          <div style={{marginTop: "-5em"}}>
            <Image
              src="/Create_Account_image.svg"
              alt="Create Account image"
              width={742}
              height={383}
              priority
            />
          </div>
          
          <div className={styles.CreateAccount_block}>
            <input 
              type="text" 
              placeholder="Name" 
              ref={nameRef}
              className={styles.Name}
            >
            </input>
            <input 
              type="text" 
              placeholder="E-mail" 
              ref={EmailRef}
              className={styles.Name}
            >
            </input>
            <input
              type="password" 
              placeholder="Password" 
              ref={passwordRef}
              className={styles.password}
            >
            </input>
            <input
              type="password"
              placeholder="Comfirm password"
              ref={confirm_passwordRef}
              className={styles.password}
            >
            </input>
            <div style={{display: "flex"}}>
              <div className={styles.select_content_PPT}>
                  <button id="Teacher_button" className={styles.checkbox} onClick={choose_type_Teacher}></button>
                  Teacher
              </div>
              <div className={styles.select_content_PPT}>
                  <button id="Student_button" className={styles.checkbox} onClick={choose_type_Student}></button>
                  Student
              </div>
            </div>
            

            <button className={styles.CreateAccount_button} onClick={Singn_up}>
              Create an account
            </button>
            <Link 
              href={{
              pathname: '/[page]',
              query: {page: process.env.NEXT_PUBLIC_Log_in}
              }}
              className={styles.LoginLink}
            >
              Log in
            </Link>
              
          </div>
        </div>
      </main>
    </>
  )
}
