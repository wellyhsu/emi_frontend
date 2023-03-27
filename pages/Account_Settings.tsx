import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

import Archive_video from '../components/Archive_video'
import User_item from '../components/User_item'

function Logout(){

  localStorage.removeItem('token');   //移除
  console.log("logout->", localStorage.getitem('token'));

  //  window.location.replace("/");
}

export default function Home() {
  
  return (
    <>
      <main className={styles.main}>
        <div className={styles.Account_My_Creations}>
          My Creations
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Account_Drafts }
                }}
              style={{color: "rgba(0, 0, 0, 1)"}} 
              className={styles.Account_Drafts}
            >
              Drafts
            </Link>
            <div className={styles.Account_dash}>
              |
            </div>
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Account_Archive }
                }}
              className={styles.Account_Title_Gray}
            >
              Archive
            </Link> 
            <div className={styles.Account_dash}>
              |
            </div>
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Account_Settings }
                }}
              className={styles.Account_Title_Gray}
            >
              Settings
            </Link> 
        </div>
        
        <div className={styles.Account_grid}>
          <div className={styles.Account_grid2}>
            <div>
              <div className={styles.block}>
               
                

              </div>

              <div className={styles.item_Subscription}>
                <User_item
                  image_name="Subscription_image.svg"
                  image_alt="Subscription image"
                  title="Subscription"
                />
              </div>

              <div className={styles.item}>
                <User_item
                  image_name="user_management.svg"
                  image_alt="user management image"
                  title="User management"
                />
              </div>
              <button className={styles.item} onClick={Logout}>
                <User_item
                  image_name="User_log_out.svg"
                  image_alt="log out image"
                  title="Log out"
                />
              </button>
            </div>
            <div>

            </div>
          </div>
        </div>

      </main>
    </>
  )
}
