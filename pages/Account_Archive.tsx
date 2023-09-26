import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useLayoutEffect, useEffect, useState} from 'react';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/router';
import { Dialog } from "@headlessui/react";
import Archive_View_video from '../components/Archive_View_video'
import AlertMessage from '../components/AlertMessage'

const token =  Cookies.get('token');
const index_number = [];   //component的id
const remove_number = [];   //被移除掉的component的id
var repeat=0;   //用於判斷index在index_number內是否有重複
var index=0;   //用於給component 一個key值
var API=0;
var UserName;
var data_video_name;
var Video_Name_array=[];
var Video_array=[];

var i=0;

const videoPath = Cookies.get('video_path');  //"/home/roy/test/video/roy/uploads/test1.mp4";//Cookies.get('video_path');
console.log("video_path=", videoPath);

export default function Account_Archive() {
  const router = useRouter();
  const [video_number, setVideo_Number] = useState(0);
  const [video_name_array, setVideoNameArray] = useState([]);
  const [video_array, setVideoArray] = useState([]);


  function alert_message(){
    router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
  }

  useLayoutEffect(() => {

    if((token == "null") || (token == null) || (token == "undefined"))
    {
      console.log("useEffect triggered");
//      router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
    }

    console.log("API=",API);
    if(API == 0)
    {   
      API = 1;  
      console.log("Get Video path!!");
      UserName = Cookies.get('userName');
      UserName = UserName?.substring(1, UserName?.lastIndexOf(`"`));  //" "中間字串
      console.log("username!!", UserName);

      //取得使用者影片總數
      fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_video + UserName + "/number", { 
        method: 'GET',
      })
        .then((response) => {
            console.log('response=',response);
            var information = response.text();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
          console.log("data=",typeof(data));  
          setVideo_Number(parseInt(data));
          console.log("video_number=", video_number);  
          API=2;
        })
        .catch((error) => console.log("error", error));
    }
  }, [])

  useLayoutEffect(() => {   //當取得影片總數後 影片有增加或是減少時
    if(API == 2)
    {
      console.log("C_video_number=", video_number);
      //取得使用者影片路徑、檔名
      fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + UserName, {  
        method: 'GET',
      })
        .then((response) => {
            console.log('response=',response);
            var information = response.json();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
          console.log("data=",data[0]);  
          console.log("Video_Number=", video_number);
          for(i=0; i<video_number; i++)    
          {
            console.log("key=", i);
            data_video_name = String(data[i])?.substring(String(data[i])?.lastIndexOf(`/`)+1);
            Video_Name_array.push(data_video_name);
            Video_array.push(
              <div 
               key={"video" + i}
              >
                <Archive_View_video
                  videoName={Video_Name_array[i]}
                  videoPath={`/api/video?videoPath=${encodeURIComponent(data[i])}`}
                  
                />
              </div>
            )
          }
          setVideoNameArray(Video_Name_array);
          const send_Video_Name = [...video_name_array];    //用於建立副本，渲染畫面
          send_Video_Name.push(Video_Name_array);
          setVideoNameArray(send_Video_Name);

          setVideoArray(Video_array);
          const send_Video = [...video_array];    //用於建立副本，渲染畫面
          send_Video.push(Video_array);
          setVideoArray(send_Video);

          console.log("F_Video_Name=", video_name_array);
          console.log("F_video_array=", video_array);

        })
        .catch((error) => console.log("error", error));
    }
  }, [video_number]);

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

  const delete_vedio = (event) => {
      document.getElementById("preview_video").style= "display : none;" ;

      set_video_num_block(video_num_block - 1);

      let remove_index = event.target.id;  //components.indexOf(Click_key);   
      remove_number.push(remove_index);  //把要移除的component id放入remove_number

      console.log("remove_index=",remove_index);
      console.log("event=",event);
      console.log("event.target=",event.target);
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

        var VideoName="MathClass"+ String(index_number[i])+ ".mp4";
        components.push(
          <Archive_View_video
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
                <Archive_View_video
                  videoName="MathClass01.mp4"
                  Deletefunction={delete_vedio}
                />
              </div>
              <div>
                <Archive_View_video
                  videoName="MathClass03.mp4"
                  Deletefunction={delete_vedio}
                />
              </div>
{/*
              <button  onClick={add_video_block}>
                add
              </button>
                */}
            </div>
          </div>

        </main>
      </>
    )
}