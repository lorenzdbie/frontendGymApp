import{memo, useCallback} from "react";
import {Link} from 'react-router-dom';
import {useThemeColors} from "/src/contexts/Theme.context.jsx";

import {IoTrashOutline, IoPencilOutline} from "react-icons/io5";

export default function Afspraak({id, user, date, training, startTime, endTime, intensity, specialRequest, onDelete}){
  console.log("test");

  const {theme} = useThemeColors();

  const durationInMinutes = (new Date(endTime).getTime() - new Date(startTime).getTime())/1000/60;

  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete(id);
    }
  );

  
} 