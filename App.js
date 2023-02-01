import './App.css';
import { useState, useEffect } from 'react';
import Slots from './components/Slots';

function App() {

  let date2 = new Date()

    const [date, setDate] = useState(new Date().toLocaleString())

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);
 
    return () => {
      clearInterval(interval)
    }
  }, [date])


  const now = Date.now();
  const DAY = 60 * 60 * 24 * 1000;
  const today = new Date(now);
  let days = [];

  const [currentDate, setCurrentDate] = useState(date2)
  const [currenWeek, setCurrentWeek] = useState([...days])

  const consoleOnCurrentDate = () => {
    (today < currentDate) ? console.log('Today is less') : console.log('Today is more')
  }

  const next = () => {
    let nextWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
    consoleOnCurrentDate();
    console.log(currentDate);
  }

  const prev = () => {
    let prevWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
    consoleOnCurrentDate();
    console.log(currentDate);
  }

  const name = [
    {name: "Sun", isHoliday: true},
    {name: "Mon", isHoliday: false},
    {name: "Tue", isHoliday: false},
    {name: "Wed", isHoliday: false},
    {name: "Thu", isHoliday: false},
    {name: "Fri", isHoliday: false},
    {name: "Sat", isHoliday: true}
];
    

const createCal = () => {
  days=[]
  const timeStamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  for (let i = currentDate.getDay(); i >= 0; i--) {
    const date = new Date(timeStamp - DAY * i);
    console.log('Here is date prev', date)
    days.push({day: name[date.getDay()], date: date});
  }
  for (let i = 1; i < 7 - currentDate.getDay(); i++) {
    const date = new Date(timeStamp.getTime() + DAY * i);
    console.log('Here is date next', date, i, currentDate.getDay())
    days.push({day: name[date.getDay()], date: date});
  }
  setCurrentWeek([...days])
}   

 useEffect(()=>{
  createCal()
  console.log('Here are final days',days)
 },[currentDate])

  return (
    <div className="App">
      <div className="header">
        <button onClick={()=>prev(date2)}>Previous</button>
        {date}
        <button onClick={()=>next(date2)}>Next</button>
      </div>

              <div className='timezone'>
              <h2>Timezone</h2>
        <select>
          <option value="EST">Eastern Standard Time (EST)</option>
          <option value="PST">Pacific Standard Time (PST)</option>
        </select>
        </div>
        <hr />

      <div className="table">
        <table>
          <tbody>
            <tr>
              <th className='bg--black pad'>Week</th>
              <th>Slots</th>
            </tr>
            {(currenWeek.length > 0) && currenWeek.map((ele,i)=>{
              console.log('Entered here',ele,i)
            return(
              (!ele.day.isHoliday) && 
                <tr key={i}>
                  <tr>{ele.day.name}</tr>
                  <tr>{ele.date.getDate()}</tr>
                  <br />
                  <br />
                  <br />
                  {(today > ele.date)
                  ? <td>Past</td>
                   : 
                   <td><Slots/></td>}
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
