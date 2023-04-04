import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import People_item from '../components/People_item'
import {useEffect, useState} from 'react';


const index_number = [];
const remove_number = [];
var repeat=0;   //用於判斷index在index_number內是否有重複
var index=0;   //用於給component 一個key值
export default function TTSA_Create_My_Audio() {
    const [people_num_block, set_people_num_block] = useState(1);
    const [Click_key, set_Click_key] = useState(null);
    const components = [];

    const add_people_block = () => {        
        set_people_num_block(people_num_block+1);
        index++;
    };

    const delete_people_block = (key) => {
        set_people_num_block(people_num_block-1);
        set_Click_key(key);

        let remove_index = 2;//components.indexOf(Click_key);   
        remove_number.push(remove_index);

        console.log("Click_key type=", typeof(Click_key));
        console.log("remove_index=",remove_index);
        console.log("key=",key);
        console.log("remove_number=",remove_number);

        index_number.splice(remove_index, 1);
        console.log("index_number=", index_number);

        if (remove_index > -1) 
        {
            console.log("remove=");
            components.splice(remove_index, 1);  //index: 要移除的元素的index ,1: The number of elements to remove.
            console.log("components=",components);
        }
    }
    console.log("F-index_number=", index_number);
/*
    components.push(
        <People_item
            people_image="/Sally.svg"
            item_alt="Sally image"
            people_Name="Sally"
            function={delete_people_block}
            key={0}
        />
    );
*/
    console.log("remove_number=",remove_number);
    for(var i=0; i< people_num_block; i++)
    {       
        repeat = 0;
        for(var j=0; j<index_number.length; j++)
        {
            if(index == index_number[j])  //若i在index_number陣列內
            {
                repeat++;  //表示重複了
            }
        }
        if(repeat == 0 )
        {
            index_number.push(index);
            console.log("add~");
        }
        console.log("repeat=",repeat);
        console.log("index_number type=!",typeof(index_number[0]));
        console.log("index_number=!",index_number);
        components.push(
            <People_item
                people_image="/Tom.svg"
                item_alt="Tom image"
                people_Name="Tom"
                function={delete_people_block}
                key={index_number[i]}
            />
        );
        console.log("key=",index_number[i]);
        console.log("index_number:",index_number[i]);
    }
    console.log("final:",index_number);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.TTSA_Create_My_Audio_grid2}>
                    <div>
                        <div id='people_block'>
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
