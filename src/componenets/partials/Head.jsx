import React from 'react'
import { Helmet } from "react-helmet"

const Head = ({title}) => {
  return (
    <Helmet>
      <title>{title ? title + " | " : null} Multipurpose Tailwind CSS Admin Dashboard Template</title>
    </Helmet>
  )
}

export default Head