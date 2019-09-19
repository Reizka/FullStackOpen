import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return ( 
    <div>
      <Header course={course.name} />
      <Content  parts = {course.parts}/>
      <Total parts={course.parts}/>
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
  console.log(props);
    return(
      <div>
        <Part partObj ={props.parts[0]}/>
        <Part partObj ={props.parts[1]}/>
        <Part partObj ={props.parts[2]}/>
       </div>   
    )


 
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.partObj.name} {props.partObj.exercises}
      </p>
    </div> 
  )
}


const Total = (props) => {
  return(
    <>
      <p>
        Number of excercises: {props.parts[0].exercises +props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))