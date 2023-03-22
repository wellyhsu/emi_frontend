import React from 'react'   //用於Home.js Page  實驗室相關消息
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import People_item from '../components/Text-to-Speech_Audio_People_item'

function Add_people_item() {
    return (
        <People_item
            people_image="/Tom.svg"
            item_alt="Tom image"
            people_Name="Tom"
        />
    );
}
