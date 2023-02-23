import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'



function Male_button(){
  document.getElementById("Male").style = "border-bottom-color: rgba(87, 196, 157, 1);";
  document.getElementById("Female").style = "border-bottom-color: rgba(217, 217, 217, 1);";
}

function Female_button(){
  document.getElementById("Male").style = "border-bottom-color: rgba(217, 217, 217, 1);";
  document.getElementById("Female").style = "border-bottom-color: rgba(87, 196, 157, 1);";
}

function Clear_form(){
  document.getElementById("Name").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("Phone").value = "";
  document.getElementById("Vertification_code").value = "";
  document.getElementById("Subject").value = "";
  document.getElementById("Feedback").value = "";
  
  document.getElementById("Male").style = "border-bottom-color: rgba(87, 196, 157, 1);";
  document.getElementById("Female").style = "border-bottom-color: rgba(217, 217, 217, 1);";
}

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.Contact_us_title}>
          Contact us
        </div>
        <div className={styles.Email_us_image}>
          <Image
            src="/Email_us_images.svg"
            alt="Email us images"
            width={1280}
            height={416}
            priority
          />
        </div>
        <div className={styles.Email_us_information}>
          <div>
            <div>
              <input type="text" id="Name" placeholder="Name (required)" className={styles.Email_us_Name} />
              <button id='Male' className={styles.Male_button} onClick={Male_button}>
                Male
              </button>
              <button id='Female' className={styles.Female_button} onClick={Female_button}>
                Female
              </button>
            </div>
            <input type="text" id="Email" placeholder="Email (required)" className={styles.Email_us_Email} />
            <input type="text" id="Phone" placeholder="Phone number (required)" className={styles.Email_us_Email} />
            <div>
              <input type="text" id="Vertification_code" placeholder="Vertification code" className={styles.Email_us_Name} />
              <button className={styles.Email_us_SendCode}>
                Send code
              </button>
            </div>
            <input type="text" id="Subject" placeholder="Subject (required)" className={styles.Email_us_Email} />
            <div className={styles.Feedback}>
              Feedback (required)<br/>
              <textarea id="Feedback" className={styles.Feedback_content}></textarea>
            </div>
            <div>
              <button className={styles.clear_button} onClick={Clear_form}>
                Fill out again
              </button>
              <button className={styles.send_button}>
                Send
              </button>
            </div>
          </div>
        </div>
            
        

      </main>
    </>
  )
}
