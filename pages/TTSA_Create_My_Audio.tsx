import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import People_item from '../components/Text-to-Speech_Audio_People_item'
import Add_people_item from '../components/Add_people_item'

var button_shift = 1;
var new_people;
//var People_number = 0;

function add_people_block(){ 
    
    var newDiv = document.createElement('div');
    var newDiv2 = document.createElement('div');
    var people_block = document.getElementById("people_block");
    new_people = document.getElementById('new_people');

    document.getElementById("button_block").style = "margin-Top: 140px;";
    button_shift++;

    newDiv.appendChild(new_people);
    newDiv2.appendChild(new_people);
    people_block.appendChild(newDiv);
    people_block.appendChild(newDiv2);
    console.log("click");


}

export default function How_to_Make_video() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.TTSA_Create_My_Audio_grid2}>
                    <div>
                        <div id='people_block'>
                            <div id='new_people'>
                                <People_item
                                    people_image="/Tom.svg"
                                    item_alt="Tom image"
                                    people_Name="Tom"
                                />
                           </div>
                            <People_item
                                people_image="/Sally.svg"
                                item_alt="Sally image"
                                people_Name="Sally"
                            />
{/**/}                  </div>
                        <div id="button_block" className={styles.TTSA_button_center}>
                            <button className={styles.Add_more_Audios_button} onClick={add_people_block}>
                                <Image
                                    src="/add_more_audios_image.svg"
                                    alt="Add more Audios image"
                                    width={30}
                                    height={30}
                                    priority
                                />
                            </button>
                        </div>
                        <div className={styles.Add_more_Audios}>
                            Add more Audios
                        </div>
                    </div>

                    <div className={styles.TTSA_right_part}>
                        <Image
                            src="/TTSA_Cat_image.svg"
                            alt="TTSA Cat image image"
                            width={485}
                            height={300}
                            priority
                        />
                        <div className={styles.TTSA_button_block}>
                            <button className={styles.Build_Audio_button}>
                                Build Audio
                            </button>
                            <button className={styles.Export_button}>
                                Export
                            </button>
                        </div> 
                    </div>
                </div>

                
                

            </main>
        </>
    )
}
