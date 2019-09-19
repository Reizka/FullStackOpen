import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )


  const Statistics = ({bad,good,neutral,total}) => {

    if (total === 0) {
      return (
        <div>
          No Statistics to give yet
        </div>
      )
    }
  

    let avgGood = good/total;
    let avgNeutral = neutral/total;
    let avgBad = bad/total;
    let percentage = (good/total)*100
    return (
      <div>
        <tr>
            <td>Good</td>
            <td>{good}</td>
        </tr> 
        <tr>
            <td>Neutral</td>
            <td>{neutral}</td>
        </tr> 
        <tr>
            <td>bad</td>
            <td>{bad}</td>
        </tr>  
        <tr>
            <td>Total votes given</td>
            <td>{total}</td>
        </tr>  
        <tr>
            <td>Average positive votes given</td>
            <td>{avgGood}</td>
        </tr>  
        <tr>
            <td>Average neutral votes given</td>
            <td>{avgNeutral}</td>
        </tr>  
        <tr>
            <td>Average bad votes given</td>
            <td>{avgBad}</td>
        </tr>  
        <tr>
            <td>Percentage of positive votes given</td>
            <td>{percentage}%</td>
        </tr>  
      </div>
    )
  }
  
  
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
    setTotal(total+1)
  }

  const handleGoodClick = () => {
    setGood(good+1)
    setTotal(total+1)
  }


  return (
    <div>
        
        <h1>Give Feedback!</h1>      
      <Button onClick={handleBadClick} text='Bad'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleGoodClick} text='good'/>
      <Statistics  bad={bad} good={good} neutral={neutral} total={total}/> 
    </div>
  )
}




ReactDOM.render(<App />, 
  document.getElementById('root')
)
