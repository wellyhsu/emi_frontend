import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useLayoutEffect, useEffect, useState, useRef} from 'react';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/router';
import { Dialog } from "@headlessui/react";
import Archive_View_video from '../components/Archive_View_video'
import AlertMessage from '../components/AlertMessage'

const token =  Cookies.get('token');
var API=0;
var UserName;
var data_video_name;
var Video_Name_array=[];
var Video_array=[];
var video_path;
var video_path_array=[];

var video_ID;  //點擊影片時，取得片ID
var video_ID_array=[];  //用於儲存影片ID的順序
var video_index;    //取得被點擊影片在影片陣列中的index
var index=0;  //用於編碼影片id

var i=0;
var Video_height;
var Video_width;
var Search_before="";

const videoPath = Cookies.get('video_path');  //"/home/roy/test/video/roy/uploads/test1.mp4";//Cookies.get('video_path');
console.log("video_path=", videoPath);



function Cancel(){
  document.getElementById("preview_video").style= "display : none;" ;
}


export default function Account_Archive() {
  const router = useRouter();
  const [video_number, setVideo_Number] = useState(0);
  const [video_name_array, setVideoNameArray] = useState([]);
  const [video_array, setVideoArray] = useState([]);
  const [view_video_URL, set_View_video_URL] = useState("");
 
  const searchRef = useRef(undefined);
  // 為了方便操作，建立一個array來管理這些ref

  function preview_video(clickID)
  {
    document.getElementById("preview_video").style= "display : flex;" ;
    video_ID = String(clickID.target.id);
    video_ID = video_ID?.substring(video_ID?.indexOf(`o`)+1);  //" "中間字串
       //先透過儲存video_ID的video_ID_array找到
    video_path = video_path_array[video_ID_array?.indexOf(parseInt(video_ID))];
    console.log('preview_video video_path=', video_path);
    set_View_video_URL(video_path);

    console.log("video_ID_array=", video_ID_array);
    console.log("__video_path=",video_path);
  
    console.log("p_video_ID=", video_ID);
    console.log("video_path_array=",video_path_array);
    console.log("tagName", event.target.tagName);
  }

  function View(){
    document.getElementById("preview_video").style= "display : none;" ;
    Cookies.set('video_path', video_path);
    window.location.assign(process.env.NEXT_PUBLIC_View_video);
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
  }

  function Search()
  {
    console.log("searchRef.current.value=", searchRef.current.value);
    Video_array=[];
    video_ID_array=[];
    video_path_array=[];
    Video_Name_array=[];

    if(Search_before != searchRef.current.value)
    {
    //取得使用者搜尋之 影片路徑、檔名
    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_video_search + "?search=" + searchRef.current.value, {  
      method: 'GET',
    })
      .then((response) => {
          console.log('response=',response);
          var information = response.json();
          console.log('info^^',information);
          return information;
      })
      .then((data) => {
        console.log("data.length=", data.length);  
        console.log("data=",data);  
        console.log("Video_Number=", video_number);
        setVideo_Number(data['result'].length);

        for(i=0; i<data['result'].length; i++)    
        {
          console.log("key=", index);
          video_path = data['result'][i].video_path;  //把每個影片URL存下來
          video_path_array.push(video_path);
          console.log("A_video_path=",video_path); 
          
          data_video_name = String(data['result'][i].video_name);
          Video_Name_array.push(data_video_name);
          console.log("A_video_name", data_video_name);
          
          const VideoElement = (
            <Archive_View_video
              key={"video" + index}
              button_id={"video" + index}
              videoName={Video_Name_array[i]}
              view_video={preview_video}              />
          );

          Video_array.push(VideoElement);
          video_ID_array.push(index);
          index++;
        }
        
        setVideoNameArray([]);
        setVideoArray([]);


        console.log("F_Video_Name=", video_name_array);
        console.log("F_video_array=", video_array);
      })
      .catch((error) => console.log("error", error));
    }
    Search_before = searchRef.current.value; //紀錄上次搜尋的內容
  }

  function ShowAllVideo()
  {
    Video_array=[];
    video_ID_array=[];
    video_path_array=[];
    Video_Name_array=[];

/*    
//取得使用者影片總數
    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_all_videos, { 
      method: 'GET',
    })
      .then((response) => {
          console.log('response=',response);
          var information = response.json();
          console.log('info^^',information);
          return information;
      })
      .then((data) => {
        console.log("data=",data);  
        console.log("data=",data["video_number"]); 
        setVideo_Number(parseInt(data["video_number"]));
        console.log("video_number=", video_number);  
      })
      .catch((error) => console.log("error", error));
*/

    //取得使用者影片路徑、檔名
      fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_all_videos, {  
        method: 'GET',
      })
        .then((response) => {
            console.log('response=',response);
            var information = response.json();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
          console.log("data=", data);
          console.log("ALL_video_number=", video_number);
          if(video_number != data['videos'].length)
          {
            setVideo_Number(data['videos'].length);
            console.log("Video_Number=", video_number);
            
            for(i=0; i<data['videos'].length; i++)    
            {
              console.log("key=", index);

              console.log("data['videos'][i]=", data['videos'][i]['video_path']);
              video_path = data['videos'][i]['video_path'];  //把每個影片URL存下來
              video_path_array.push(video_path);
              console.log("A_video_path=",video_path); 
              
  //            data_video_name = String(data[i])?.substring(String(data[i])?.lastIndexOf(`/`)+1);
              data_video_name = data['videos'][i]['video_name'];
              Video_Name_array.push(data_video_name);
              
              const VideoElement = (
                <Archive_View_video
                  key={"video" + index}
                  button_id={"video" + index}
                  videoName={Video_Name_array[i]}
                  view_video={preview_video}              />
              );

              Video_array.push(VideoElement);
              video_ID_array.push(index);
              index++;
            }
            
            setVideoNameArray([]);
  //          const send_Video_Name = [...video_name_array];    //用於建立副本，渲染畫面
  //          send_Video_Name.push(Video_Name_array);
  //          setVideoNameArray(send_Video_Name);

            setVideoArray([]);
  //          const send_Video = [...video_array];    //用於建立副本，渲染畫面
  //          send_Video.push(Video_array);
  //          setVideoArray(send_Video);

            console.log("F_Video_Name=", video_name_array);
            console.log("F_video_array=", video_array);
          }
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
      fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_all_videos, { 
        method: 'GET',
      })
        .then((response) => {
            console.log('response=',response);
            var information = response.json();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
          console.log("data=", data);  
          setVideo_Number(parseInt(data['video_number']));
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
      fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_all_videos, {  
        method: 'GET',
      })
        .then((response) => {
            console.log('response=',response);
            var information = response.json();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
          console.log("data=",data);  
          setVideo_Number(data['videos'].length);
          console.log("Video_Number=", video_number);
          for(i=0; i<video_number; i++)    
          {
            console.log("key=", index);
            video_path = data['videos'][i]['video_path'];  //把每個影片URL存下來
            video_path_array.push(video_path);
            console.log("A_video_path=",video_path); 
            
//            data_video_name = String(data[i])?.substring(String(data[i])?.lastIndexOf(`/`)+1);
            data_video_name = data['videos'][i]['video_name'];
            Video_Name_array.push(data_video_name);
            
            const VideoElement = (
              <Archive_View_video
                key={"video" + index}
                button_id={"video" + index}
                videoName={Video_Name_array[i]}
                view_video={preview_video}              />
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

    return (
      <>
        <main className={styles.main}>
          <div id="preview_video" className={styles.preview_video_background}>
            <div className={styles.preview_video_window}>
              <div className={styles.preview_video}>
                  <video 
                    id='video'
                    src={`/api/videoPath?videoPath=${encodeURIComponent(view_video_URL)}`}
                    poster=""
                    autoPlay={false}
                    controls={true} 
                    className={styles.video}
                  />
              </div>
              <div style={{display: "flex", justifyContent: "center"}}>
                <button className={styles.preview_video_button} onClick={Cancel}>
                    Close 
                </button>
                <button className={styles.preview_video_button} onClick={Delete}>
                    Delete 
                </button>
                <button className={styles.preview_video_button} onClick={View}>
                    View 
                </button>
              </div>
            </div>
          </div>

          <div className={styles.Account_My_Creations}>
            Welcome~
            <div style={{width:"100%", display: "flex", alignContent: "center"}}>
              <input
                type="text" 
                name='Search'
                placeholder="Search" 
                ref={searchRef}
                className={styles.Search}
              >
              </input>
                <button className={styles.SearchButton} onClick={Search}>
                  Search
                </button>
            </div>
            <button className={styles.AllVideo} onClick={ShowAllVideo}>
              All
            </button>
          </div>
          

          <div className={styles.Account_grid}>
            {video_array}
          </div>
        </main>
      </>
    )
}