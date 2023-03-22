import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

var choose = "nothing";
function choose_Yes(){
  document.getElementById("Yes_button").style = "  background-color: rgba(255,0 ,0 , 1);";
  document.getElementById("No_button").style = "  background-color: rgba(243, 241, 241, 1);";
  choose = "Yes";

}

function choose_No(){
  document.getElementById("Yes_button").style = "  background-color: rgba(243, 241, 241, 1);";
  document.getElementById("No_button").style = "  background-color: rgba(255,0 ,0 , 1);";
  choose = "No";
}


function Submit_needs() {    //選擇類型
  var back_data;
  var get_DATA;
  console.log('press choose')
  console.log("choose is " + choose);

  var detail = document.getElementById("detail").value;
  var Notes = document.getElementById("Notes").value;
  var language = document.getElementById("language").value;
  var Voice = document.getElementById("Voice").value;

  if(choose == "nothing")
  {
      alert("Please choose the second part");
      return false;
  }

  const choose_choose_send =
  {
    "language": language,
    "Voice": Voice,
    "choose" : choose,   
    "detail": detail,
    "Notes": Notes
  };

  var choose_choose_send_json = JSON.stringify(choose_choose_send);  //轉json格式
  console.log("choose_choose_send_json is " + choose_choose_send_json);
  console.log('typeof(choose_choose_send_json)=',typeof(choose_choose_send_json));

  fetch("http://localhost:3000/api/Next_Page_Link/", {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: choose_choose_send_json,
  })
    .then((response) => {
      back_data = response.json();
      console.log("back_data=",back_data);
      return back_data;
    })
    .then((data) => {
//      get_DATA = data["Next_Link"];
//      console.log('data',data["Next_Link"]);
//      console.log('data Type',typeof(data));
//        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
    })
    .catch((error) => console.log("EError", error));
  
}


export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.CV_Write_down_needs}>
          Write down your needs
        </div>
        <div className={styles.no_padding_center}>
          <div>
            <div className={styles.CV_Choose_voice}>
              1.Please choose a digital voice 
              <div>
                <div className={styles.language_part}>
                  <div className={styles.language}>
                      language
                  </div>
                  <select id="language" className={styles.select}>
                      <option></option>
                      <option>English (Australia)</option>
                      <option>English (India)</option>
                      <option>Chineese</option>
                  </select>
                </div>

                <div className={styles.Voice_part}>
                  <div className={styles.Voice}>
                      Voice
                  </div>
                  <select id="Voice" className={styles.select}>
                      <option></option>
                      <option>English</option>
                      <option>Chineese</option>
                  </select>
                </div>

                <button className={styles.Test_button}>
                    Test
                </button>
              </div>
            </div>  
            <div className={styles.Input_script}>
              <div className={styles.Input_script_word}>
                  2.Do you need to insert pop-up questions into your video? (Skip 3. if not)
              </div>
              <div>
                <div className={styles.select_content_Yes}>
                  <button id="Yes_button" className={styles.checkbox} onClick={choose_Yes}></button>
                  Yes
                </div>
                <div className={styles.select_content_No}>
                  <button id="No_button" className={styles.checkbox} onClick={choose_No}></button>
                  No
                </div>
              </div>
              <div className={styles.Input_script_word}>
                  3.Please write down your needs in detail.(eg. the pop-up questions, when and where the questions pop up)
              </div>
              <textarea id="detail" className={styles.CV_Input_script_block}>
                  
              </textarea>
              <div id="Notes" className={styles.Input_script_word}>
                  4.Notes
              </div>
              <textarea className={styles.Input_script_Notes}>
                  
              </textarea>
            </div>
          </div>
        </div>
        <div>
          <button className={styles.CV_Submit} onClick={Submit_needs}>
              Submit
          </button>
          <div className={styles.CV_under_Submit_word}>
            7-14 working days to create your video
          </div>
        </div>
      </main>
    </>
  )
}
