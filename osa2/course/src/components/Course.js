import React from "react";

const Course = ({ course }) => {
  let parts = course.parts;
  let c = parts.map(function(part) {
    return (
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>
    );
  });

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
  return (
    <>
      <b>Total of {t} exercises</b>
    </>
  );
};

export default Course;
