import React, {Fragment} from 'react'
import ModeHeader from '../../Layout/ModeHeader'
import ModeFooter from '../../Layout/ModeFooter'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import es from 'date-fns/locale/es';
import { registerLocale, setDefaultLocale } from  "react-datepicker";

registerLocale('es', es)

function Planned() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Fragment>
    <ModeHeader activeMode={"Tasks"} />
        <h1>Planned </h1>
    <ModeFooter />

    <DatePicker  selected={startDate}  showTimeSelect onChange={(date) => setStartDate(date)} locale="es" />
    </Fragment>
  )
}

export default Planned
