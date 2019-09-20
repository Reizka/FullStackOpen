import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const ShowVote =(props) =>{
    let val = points[props.votes]
    console.log('Show vote');
    return(
        <div>
            <p>Votes given {val}</p>
        </div>
    )
}

const MostPopularAnecdote =()=>{
    console.log('MostPopularAnecdote');
    let highest = 0;
    let c = 0; 
    points.forEach(element => {
        if(c>0){
            if(element>points[c-1]){
                highest = c;
            }
        } 
        c++ 
    });

    console.log('SelectedIn', highest);

    return(
        <div>
            <p>Most popular anecdote is:</p>
            <p>{anecdotes[highest]}</p>
            <p>With {points[highest]} votes</p>
        </div>
    )
}

const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
     
    </button>

    
  )


const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(0);


 const selectRandom =()=>{
      let val = Math.floor(Math.random() * anecdotes.length);
      setSelected(val) 
  }

  const vote =()=>{
      let v = points[selected]+1
      setVote(v) //only way I could get the view update...dropped the ball at somepoint I supposed
      points[selected] =v;
     
  }

  return (
    <div>
     <p>{props.anecdotes[selected]}</p>
      <Button onClick={selectRandom} text={'Random anecdote'}/>
      <Button onClick={vote} text={"Vote"}/>
      <ShowVote votes={selected}/>
      <MostPopularAnecdote/>
    </div>
  )
}
//<p>Votes given {points.find(selected)}</p>
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const points = Array(anecdotes.length).fill(0);
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)