import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useLayoutEffect, useEffect, useState} from 'react';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/router';
import { Dialog } from "@headlessui/react";
import Archive_video from '../components/Archive_video'
import AlertMessage from '../components/AlertMessage'

const token =  Cookies.get('token');
const index_number = [];   //component的id
const remove_number = [];   //被移除掉的component的id
var repeat=0;   //用於判斷index在index_number內是否有重複
var index=0;   //用於給component 一個key值
var VideoName="";

export default function Account_Archive() {
  var information;
  var id;
  var title;
  var description;
  var updated_at;
  var video_file;
  const router = useRouter();

  function alert_message(){
    router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
  }

  useLayoutEffect(() => {

    if((token == "null") || (token == null) || (token == "undefined"))
    {
      console.log("useEffect triggered");
//      router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
    }
  }, [])
/*
    return(
      <>
        <button className={styles.alert_background} onClick={alert_message}>
          
        </button>
        <div className={styles.alert_message}>
          <div style={{display: "inline-block", marginTop: "15vh",  verticalAlign: "middle"}}>
            <Image
              src="/warning-sign.png"
              alt="Add new question"
              width={70}
              height={70}
              priority
            />
          </div>
          <div className={styles.alert_content}>
            Please log in, thanks. 
          </div>
        </div>
      </>
    )

  }
}, [])
  */
  const [video_num_block, set_video_num_block] = useState(0);
  const components = [];   //畫面上的component

  const add_video_block = () => {        
    document.getElementById("preview_video").style= "display : none;" ;
    set_video_num_block(video_num_block + 1);
    index++;   //用於編component的id
  };

  const delete_vedio = (key) => {
      document.getElementById("preview_video").style= "display : none;" ;

      set_video_num_block(video_num_block - 1);

      let remove_index = key.target.id;  //components.indexOf(Click_key);   
      remove_number.push(remove_index);  //把要移除的component id放入remove_number

      console.log("remove_index=",remove_index);
      console.log("key=",key);
      console.log("key.target=",key.target);
      console.log("remove_number=",remove_number);
      console.log("index_number_r_index",index_number.indexOf(remove_index));

      index_number.splice(index_number.indexOf(remove_index), 1); //找到要移除的component id位址，並從index_number中移除
      console.log("index_number=", index_number);

      if (remove_index > -1) 
      {
          console.log("remove~");
          components.splice(index_number.indexOf(remove_index), 1);  //index: 要移除的元素的index ,1: The number of elements to remove.
          console.log("components=",components);
      }
  }
  console.log("F-index_number=", index_number);

  console.log("remove_number=",remove_number);
    for(var i=0; i< video_num_block; i++)
    {       
        repeat = 0;
        for(var j=0; j<index_number.length; j++)
        {                                      // remove_number.indexOf(index) == -1  代表remove_number內沒有index這個項目
            if(index == index_number[j] || remove_number.indexOf(index_number[j]) != -1)  //若i在index_number陣列內
            {
                repeat++;  //表示重複了
            }
        }
        if(repeat == 0 )
        {
            index_number.push(String(index));
            console.log("add~");
        }
        console.log("repeat=",repeat);
        console.log("index_number type=!",typeof(index_number[0]));
        console.log("index_number=!",index_number);

        VideoName="MathClass"+ String(index_number[i])+ ".mp4";
        components.push(
          <Archive_video
              videoName = {VideoName}
              Deletefunction={delete_vedio}
              key={index_number[i]}
              button_id={index_number[i]}
            />
        );
        console.log("key=",index_number[i]);
        console.log("index_number:",index_number[i]);
    }
    console.log("final:",index_number);

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
                className={styles.Account_Title_Black}
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
            <div id='video_block' className={styles.Account_grid4}>
              {components}
              <div>
                <Archive_video
                  videoName="MathClass01.mp4"
                  Deletefunction={delete_vedio}
                />
              </div>
              <div>
                <Archive_video
                  videoName="MathClass03.mp4"
                  Deletefunction={delete_vedio}
                />
              </div>
              
              <div>
                <Archive_video
                  videoName="MathClass03.mp4"
                  Deletefunction={delete_vedio}
                />
              </div>
              <div>
                <Archive_video
                  videoName="MathClass03.mp4"
                  Deletefunction={delete_vedio}
                />
              </div>
{/*              <button  onClick={add_video_block}>
                add
              </button>
*/}            </div>
          </div>

        </main>
      </>
    )
}