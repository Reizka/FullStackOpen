import React from "react";

const Course = ({ course }) => {
  console.log("course", course);
  let parts = course.parts;
  console.log("array", parts);

  let c = parts.map(function(part) {
    return (
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>
    );
  });

  console.log("mapped array", c);
  return (
    <>
      <ul>{c}</ul>
      <Total parts={parts} />
    </>
  );
};

const Total = ({ parts }) => {
  let t = parts.reduce(function(sum, part) {
    return sum + part.exercises;
  }, 0);
  console.log("t", t);
  return (
    <>
      <b>Total of {t} exercises</b>
    </>
  );
};

export default Course;
