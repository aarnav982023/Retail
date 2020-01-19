import React from "react";

const SectionPage = ({ match: { params } }) => {
  return <div>{params.section}</div>;
};

export default SectionPage;
