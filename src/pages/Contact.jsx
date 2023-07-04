import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'

import '../styles/contact-page.css'
import avatarImg from '../assets/images/avatarDefault.png'
import { useState } from 'react'
import { useRef } from 'react'
//radio button gender
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useQuery } from '@tanstack/react-query'
import { thunkUserTypes } from '../constants/thunkTypes.js'
import { getUSer, updateUSer } from '../api/fetchers/user'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
//-----------------------------------------------------------------------------


const Contact = () => {

  const {isLoading, data} = useQuery([thunkUserTypes.GET_USER],getUSer)
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm()
  

  const onSubmit = async (dataForm) => {
    const {firstname, lastname, email, phone, address} = dataForm;
    const formData = new FormData()
    formData.set("firstname", firstname);
    formData.set("lastname", lastname);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("address", address);
    
    const {
      data: {status, message},
    } = await updateUSer(2,formData);
    if(status === "BAD_REQUEST") {
      alert(message);
    }
  }
  useEffect(() => {
    if(data) {
      setValue("firstname",data.data.name.firstname);
      setValue("lastname",data.data.name.lastname);
      setValue("email",data.data.email);
      setValue("phone",data.data.phone);
      setValue("address",data.data.address.city);
    }
  }, [data, setValue]);


  const [tab, setTab] = useState('changePassword')

  const loginNameRef = useRef()
  const loginPasswordRef = useRef()
  const loginPasswordAgainRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()
  }

  // radio gender:
  const [valueGender, setValueGender] = React.useState('female');

  const handleChange = ((e) => {
    setValueGender(e.target.value)

  })
  // upload avatar images
  const [file, setFile] = useState(avatarImg);
  const  handleChangeAvatar = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }


  if(isLoading) {
    return <div>...Loading</div>
  }
  return (
    <Helmet title='Contact'>
      <CommonSection title='Contact' />

      <section>
        <Container>
          <Row>
            {/* <Col lg='12'> */}
            <div className="tabs d-flex align-items-center gap-3 py-3">
              <h6 className={`${tab === 'information' ? 'tab__active' : ''}`} onClick={() => setTab('information')}>Information</h6>
              <h6 className={`${tab === 'changPassword' ? 'tab__active' : ''}`}
                onClick={() => setTab('changPassword')}>Change Password</h6>
            </div>
            {/* </Col> */}

            {
              tab === 'information' ? (
                <>
                  <Col xs='5'>
                    <div className="tab__form mb-3">

                      {/* NAME */}
                      <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__group">
                          <h5>First Name</h5>
                          <input type="text"
                          value={data.data.name.firstname}
                          {...register("firstname", { required: true })} />

                        </div>
                        <div className="form__group">
                          <h5>Last Name</h5>
                          <input type="text" 

                          value={data.data.name.lastname}
                          {...register("lastname", { required: true })} />

                        </div>
                        <div className="form__group">
                          <h5>Date Of Birth</h5>

                          <input type="date" name="begin"
                            value="04/11/2022"
                            min="1990-01-01" max="2050-12-31"
                            required
                          />


                        </div>

                        <div className="form__group">
                          <h5>Phone Number</h5>
                          <input type="text" 
                            value={data.data.phone}
                            {...register("phone", { required: true })}
                            />

                        </div>

                        <FormControl>
                          {/* <FormLabel id="demo-controlled-radio-buttons-group"><h5>Gender</h5></FormLabel> */}
                          <h5>Gender</h5>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={valueGender}
                            onChange={handleChange}
                          >
                            <div className='gender__radio-btn'>
                              <FormControlLabel value="male" control={<Radio />} label="Male" />
                              <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </div>
                          </RadioGroup>
                        </FormControl>
                        {/* EMAIL */}
                        <div className="form__group">
                          <h5>Email</h5>
                          <input type="text" 
                            value={data.data.email}
                            {...register("email", { required: true })}
                            required />
                        </div>
                        {/* MESSAGES */}
                        <div className="form__group">
                          <h5>Address</h5>
                          <textarea
                            rows={4}
                            type="text"
                            
                            value={data.data.address.city}
                          {...register("address", { required: true })}
                            required />
                        </div>
                        {/* BUTTON SUBMIT */}
                        <button type='' className='addTOCart__btn'>
                          Save
                        </button>
                      </form>

                    </div>
                  </Col>
                  <Col xs='5'>
                    
                    <div className="avatar">
                      
                      <img src={file} alt="" className='avatar__image w-50' />
                      <input className='avatar__btn addTOCart__btn mb-3' type="file" onChange={handleChangeAvatar} />

                    </div>
                  </Col>
                </>


              ) :
                (
                  <Col>
                    <form className='form mb-5' onSubmit={submitHandler}>
                      <div className="form__group">
                        <h5>Username</h5>
                        <input type="email" value={data.data.username} required
                          ref={loginNameRef} />
                      </div>
                      <div className="form__group">
                        <h5>Password</h5>
                        <input type="password" value={data.data.password} required
                          ref={loginPasswordRef} />
                      </div>
                      <div className="form__group">
                        <h5>Password again</h5>
                        <input type="password" value={data.data.password} required
                          ref={loginPasswordAgainRef} />
                      </div>
                      <button className="addToCart__btn">
                        Save password
                      </button>
                    </form>
                  </Col>
                )
            }



          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Contact