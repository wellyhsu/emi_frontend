import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import People_item from '../components/Text-to-Speech_Audio_People_item'
//import Add_people_item from '../components/Add_people_item'
import {useEffect, useState} from 'react';




export default function How_to_Make_video() {
    const [people_num_block, set_people_num_block] = useState(0);

    const add_people_block= () => {        
        set_people_num_block(people_num_block+1);
    };
    
    const components = [];
    
    for(var i=0; i< people_num_block; i++)
    {
        components.push(
            <People_item
                people_image="/Tom.svg"
                item_alt="Tom image"
                people_Name="Tom"
            />
        );
    }

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
                            {components}
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
