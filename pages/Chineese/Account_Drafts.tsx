import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Cookies from 'js-cookie';
import Archive_video from '../components/Archive_video'
import {useLayoutEffect, useEffect, useState} from 'react';
import { useRouter } from 'next/router';

const token =  Cookies.get('token');
var API=0;
var UserName;
var data_video_name;
var Video_Name_array=[];
var Video_array=[];
var video_path=null;
var video_path_array=[];

var video_ID;  //點擊影片時，取得片ID
var video_ID_array=[];  //用於儲存影片ID的順序
var video_index;    //取得被點擊影片在影片陣列中的index
var index=0;  //用於編碼影片id

var i=0;

function OK(){
  document.getElementById("preview_video").style= "display : none;" ;
}

function go_to_Add_quiz(){
  window.location.assign(process.env.NEXT_PUBLIC_Account_Drafts);
}


export default function Home() {
  const router = useRouter();
  const [video_number, setVideo_Number] = useState(0);
  const [video_name_array, setVideoNameArray] = useState([]);
  const [video_array, setVideoArray] = useState([]);
  const [view_video_URL, set_View_video_URL] = useState("");


  function add_quiz(){
    Cookies.set('video_path', view_video_URL);   //紀錄目前點擊的影片的URL
    window.location.assign(process.env.NEXT_PUBLIC_PoPup_Quiz_Modify_video);
  }

/*  
  function video_optimize(){
    Cookies.set('video_path', view_video_URL);  //紀錄目前點擊的影片的URL
    window.location.assign(process.env.NEXT_PUBLIC_PoPup_Quiz_Modify_video);
  }
*/

  function preview_video(clickID)
  {
    document.getElementById("preview_video").style= "display : flex;" ;
    video_ID = String(clickID.target.id);
    video_ID = video_ID?.substring(video_ID?.indexOf(`o`)+1);  //" "中間字串
  
    video_path = video_path_array[video_ID];
    set_View_video_URL(video_path);
    console.log("__video_path=",video_path);
  
    console.log("p_video_ID=", video_ID);
    console.log("video_path_array=",video_path_array);
    console.log("tagName", event.target.tagName);
  }

  function Delete()
  {
    document.getElementById("preview_video").style= "display : none;" ;
  
    console.log("video_ID=", video_ID);
    console.log("Video_array=", Video_array);
    console.log("video_ID_array.indexOf(video_ID)=",video_ID_array.indexOf(parseInt(video_ID)));

    Video_array.splice(video_ID_array.indexOf(parseInt(video_ID)), 1);
    Video_Name_array.splice(video_ID_array.indexOf(parseInt(video_ID)), 1);
    video_ID_array.splice(video_ID_array.indexOf(parseInt(video_ID)), 1);
    console.log("video_ID_array=", video_ID_array)

      setVideoNameArray([]);
      setVideoArray([]);

      console.log("F_Video_Name=", video_name_array);
      console.log("F_video_array=", video_array);

      console.log("D_Video_Name_array=", Video_Name_array);
      console.log("D_Video_array=", Video_array);  
     
      console.log("D_video_Name=", video_name_array);
      console.log("D_video_array=", video_array);
      
      setVideo_Number(video_number-1);

      fetch(process.env.NEXT_Cancel_upload, {            
          method: 'POST',
          headers:{
              "Metadata-Token": Metadata_token,
          },
          body: Cancel,
      })
          .then((response) => {
            information = response.text();
            console.log('info^^',information);
            return information;
          })
          .then((data) => {
              console.log('data=', data);
              console.log('data[message"]=', data["message"]);
          })
          .catch((error) => console.log("error", error));
    }

  useLayoutEffect(() => {

    if((token == "null") || (token == null) || (token == "undefined"))
    {
      console.log("useEffect triggered");
      router.push("/"+ process.env.NEXT_PUBLIC_Log_in);

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
      fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_video + UserName, {  
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
            video_path = data[i];  //把每個影片URL存下來
            video_path_array.push(video_path);
            console.log("A_video_path=",video_path); 
            
            data_video_name = String(data[i])?.substring(String(data[i])?.lastIndexOf(`/`)+1);
            Video_Name_array.push(data_video_name);

            const VideoElement = (
              <Archive_video
                key={"video" + index}
                button_id={"video" + index}
                videoName={Video_Name_array[i]}
                view_video={preview_video}
              />
            );

            Video_array.push(VideoElement);
            video_ID_array.push(index);
            index++;
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
          API = 3;   //只執行一次 
        })
        .catch((error) => console.log("error", error));
    }
  }, [video_number]);

  useLayoutEffect(() => {   //影片有增加或是減少時
    if(API ==3)
    {
      setVideoNameArray([]);
      const send_Video_Name = [...video_name_array];    //用於建立副本，渲染畫面
      send_Video_Name.push(Video_Name_array);
      setVideoNameArray(send_Video_Name);

      setVideoArray([]);
      const send_Video = [...video_array];    //用於建立副本，渲染畫面
      send_Video.push(Video_array);
      setVideoArray(send_Video);
    }
  }, [video_number]);

  console.log("video_array=", video_array);
  

  return (
      <main className={styles.main}>
        <div id="preview_video" className={styles.preview_video_background}>
          <div className={styles.preview_video_window}>
            <div className={styles.preview_video}>
              <div>
              {video_path && 
                <video 
                    src={`/api/video?videoPath=${encodeURIComponent(video_path)}`}
                    poster=""
                    autoPlay={false}
                    controls={true} 
                    className={styles.video}
                />}
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              <button className={styles.preview_video_button} onClick={Delete}>
                  Delete 
              </button>
              <button className={styles.preview_video_button} onClick={add_quiz}>
                  add quiz 
              </button>
{/*              
              <button className={styles.preview_video_button} onClick={video_optimize}>
                  Voice<br/>
                  optimization
              </button>
*/}               
              <button className={styles.preview_video_button} onClick={OK}>
                  Ok 
              </button>
            </div>
          </div>
        </div>

        <div className={styles.Account_My_Creations}>
          My Creations
            <button 
              style={{color: "rgba(0,0,0,1)"}}
              className={styles.Account_Drafts}
              onClick={go_to_Add_quiz}
            >
              Add quiz
            </button>
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
              View Archive videos
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
            {video_array}
        </div>

      </main>
  )
}
