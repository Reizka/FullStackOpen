import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return ( 
    <div>
      <Header course={course} />
      <Content 
      part1={part1} 
      count1={exercises1}
      part2={part2} 
      count2={exercises2}
      part3={part3} 
      count3={exercises3}
      />
      <Total total={exercises1 +exercises2 + exercises3}/>
    </div>
  )
}



const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return(
    <div>
        <Part part={props.part1} count ={props.count1}/>
        <Part part={props.part2} count ={props.count2}/>
        <Part part={props.part3} count ={props.count3}/>
     </div>   
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.part} {props.count}
      </p>
    </div> 
  )
}


const Total = (props) => {
  return(
    <>
      <p>
        Number of excercises: {props.total}
      </p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))