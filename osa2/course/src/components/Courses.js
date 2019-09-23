import React from "react";
import Course from "./Course";
import Header from "./Header";

const Courses = ({ courses }) => {
  let m = courses.map(function(course, i) {
    return (
      <>
        <Header name={course.name} />
        <Course course={course} />
      </>
    );
  });

  return (
    <>
      <ul>{m}</ul>
    </>
  );
};

export default Courses;
