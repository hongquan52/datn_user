import React from 'react'
import '../../../styles/common-section.css'
import {Container} from 'reactstrap'

const CommonSection = (props) => {
  return (
    <section className='common__section'>
        <Container>
            <h2 className='text-white'>{props.title}</h2>
        </Container>
    </section>
  )
}

export default CommonSection