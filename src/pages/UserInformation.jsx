import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, ListGroup, ListGroupItem, ListInlineItem } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import '../styles/userinformation.css'
import '../components/UploadImage/UploadImage.css'
import {
    Alert, Box, CircularProgress, Radio, RadioGroup, FormControlLabel, Fade, Typography, Modal, Backdrop
    , Select, MenuItem, Breadcrumbs
} from '@mui/material'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import NavigationNexIcon from '@mui/icons-material/NavigateNext';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LinkBreadcrums from '@mui/material/Link'
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { baseURL } from '../constants/baseURL'
import axios from 'axios'

// TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { AppContext } from '../Context/AppProvider'

import rank1 from '../assets/images/rank/DiamondRank.png'
import rank2 from '../assets/images/rank/GoldRank.png'
import rank3 from '../assets/images/rank/SilverRank.png'
import rank4 from '../assets/images/rank/BronzeRank.png'

import avatarDefault from '../assets/images/avatarDefault.png'

const UserInformation = () => {

    const { userData } = useContext(AppContext)

    const { userId } = useParams()
    const navigate = useNavigate();

    const [phoneGG, setPhoneGG] = useState();

    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();

    const [linkImageURL, setLinkImageURL] = useState();

    const [gender, setGender] = useState()
    // REACT HOOK FORM
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // TAB PROFILE
    const [tab, setTab] = useState('information')
    

    // STATE
    const [hidePassword, setHidePassword] = useState(true);
    const [modalAddressVisible, setModalAddressVisible] = useState(false);
    const [modalRankDetail, setModalRankDetail] = useState(false);
    // ADDRESS LIST DATA:

    const [provinceString, setProvinceString] = useState('');
    const [districtString, setDistrictString] = useState('');
    const [wardString, setWardString] = useState('');

    const [age, setAge] = React.useState();
    const [provinceData, setProvinceData] = useState([]);
    const [districtValue, setDistrictValue] = useState();
    const [districtData, setDistrictData] = useState([]);
    const [wardValue, setWardValue] = useState();
    const [wardData, setWardData] = useState([]);
    const [apartmentNumber, setApartmentNumber] = useState('');
    // USER INFO
    // const [userData, setUserData] = useState({});===============================================
    // CHANGE PASSWORD STATE:
    const [password0, setPassword0] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    // ADDRESS BY USERID
    const [allAddressOriginal, setAllAddressOriginal] = useState([]);
    const [allAddress, setAllAddress] = useState([]);
    // VOUCHER:
    const [voucherUser, setVoucherUser] = useState([]);
    const [voucherUserOriginal, setVoucherUserOriginal] = useState([]);
    // TOASTIFY
    const showToastMessageSuccess = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    // CREATE NEW ADDRESS
    const createAddress = () => {
        let wardObject = JSON.stringify({
            ward_id: wardValue,
            ward_name: wardString
        })
        let districtObject = JSON.stringify({
            district_id: districtValue,
            district_name: districtString,
        })


        var formData = new FormData();
        formData.append('apartmentNumber', apartmentNumber);
        formData.append('ward', wardObject);
        formData.append('district', districtObject);
        formData.append('province', provinceString);
        formData.append('defaultAddress', '0');

        axios.post(`${baseURL}/api/v1/address/user?userId=${userId}`, formData)
            .then((res) => console.log(res.data))
            .catch((err) => console.log("Address create err: ", err))

        let xyz = {
            "user": userId,
            "address": {
                "id": 3,
                "apartmentNumber": apartmentNumber,
                "ward": wardObject,
                "district": districtObject,
                "province": provinceString,
            },
            "defaultAddress": false
        }
        allAddressOriginal.push(xyz);
        setAllAddress(allAddressOriginal);
    }
    // UPDATE CUSTOMER
    const onSubmit = (data) => {
        setLoading(true);
        const { name, email, phone } = data;

        if (selectedImage) {
            var dataForm = new FormData();
            dataForm.append('name', name);
            dataForm.append('email', email);
            dataForm.append('phone', phone);
            dataForm.append('image', selectedImage);
            if (gender === 'male') {
                dataForm.append('gender', '1');
            }
            else {
                dataForm.append('gender', '0');
            }

            axios.put(`${baseURL}/api/v1/user/${userId}`, dataForm, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    console.log(res.data)
                    showToastMessageSuccess(res.data.message);
                })
                .catch((err) => console.log("Save customer err: ", err))
                .finally(() => setLoading(false))
        }
        else {
            
            var dataForm = new FormData();
            dataForm.append('name', name);
            dataForm.append('email', email);
            dataForm.append('phone', phone);
            if (gender === 'male') {
                dataForm.append('gender', '1');
            }
            else {
                dataForm.append('gender', '0');
            }
            axios.put(`${baseURL}/api/v1/user/${userId}`, dataForm, {
            })
                .then((res) => {
                    // alert(res.data.message)
                    showToastMessageSuccess(res.data.message);
                })
                .catch((err) => console.log("Save customer err: ", err))
        }
    }
    // DELETE ADDRESS FUNTION
    const removeAddress = (addressId) => {
        let x = allAddressOriginal.filter(
            (item) => item.address.id !== addressId
        )
        setAllAddress(x);

        axios.delete(`${baseURL}/api/v1/address/user?userId=${userId}&addressId=${addressId}`)
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log("Address delete err: ", err))
    }
    // DELETE VOUCHER FUNCTION:
    const removeVoucher = (voucherID) => {
        let x = voucherUser.filter(
            (item) => item.voucher.id !== voucherID
        )
        setVoucherUser(x);
        axios.delete(`${baseURL}/api/v1/voucher/user?userId=${userId}&voucherId=${voucherID}`)
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log("Voucher delete err: ", err))

    }
    // CHANGE PASSWORD FUNCTION:
    const handleChangePassword = () => {
        if (password1 !== password2) {
            alert("Two password is not match!!!");
        }
        else {
            var dataForm = new FormData();
            dataForm.append('phone', userData.phone);
            dataForm.append('password', password0);
            axios.post(`${baseURL}/auth/login`, dataForm)
                .then((res) => {
                    if (res.data.status === 'OK') {
                        var data1 = new FormData();
                        data1.append('newPassword', password1);
                        data1.append('confirmPassword', password2);
                        axios.put(`${baseURL}/api/v1/user/${userId}/password`, data1)
                            .then((res) => alert(res.data.message))
                            .catch((err) => console.log("Change password err: ", err))
                    }
                    else {
                        alert('Current password is incorrect!!!')
                    }
                })
                .catch((err) => console.log("Login error: ", err))
        }
    }

    useEffect(() => {
        setLoading(true);

        setGender(userData.gender);
        setValue('name', userData.name);
        setValue('email', userData.email);
        setValue('phone', userData.phone);
        setValue('role', userData.role.name);
        setValue('rank', userData.rank.name);

        setPhoneGG(userData.phone);

        if(userData.image !== null) {
            // GET IMAGE URL
            axios.get(`${baseURL}/api/v1/user/image?filename=${userData.image}`)
                .then((res) => {
                    let x = res.data
                    let b = x.slice(0, -1);
                    setLinkImageURL(b);
                })
                .catch((err) => console.log("Image url error: ", err))
        }
        else {
            setLinkImageURL(avatarDefault);
        }

        // GET ALL ADDRESS BY USERID
        axios.get(`${baseURL}/api/v1/address/user?userId=${userId}`)
            .then((res) => {
                setAllAddress(res.data);
                setAllAddressOriginal(res.data);
            })
            .catch((err) => console.log("Address error: ", err))
        // GET VOUCHER USER
        axios.get(`${baseURL}/api/v1/voucher/user?userId=${userId}`)
            .then((res) => {
                setVoucherUser(res.data);
                setVoucherUserOriginal(res.data);
            })
            .catch((err) => console.log("Voucher error: ", err))
        // GET PROVINCES ADDRESS
        axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
            {
                headers: {
                    'token': '466cdca6-febd-11ed-a967-deea53ba3605'
                }
            }
        )
            .then((res) => {
                console.log("Response province: ", res.data.data.length);
                setProvinceData(res.data.data);

            })
            .catch((err) => {
                console.log("Error province: ", err);
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${age}`,
            {
                headers: {
                    'token': '466cdca6-febd-11ed-a967-deea53ba3605',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                console.log("Response district: ", res.data.data.length);
                setDistrictData(res.data.data);

            })
            .catch((err) => {
                console.log("Error district response: ", err);
            })
        // SAVE PROVINCE NAME:
        axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', // lay ra danh sach province
            {
                headers: {
                    'token': '466cdca6-febd-11ed-a967-deea53ba3605'
                }
            }
        )
            .then((res) => {
                let x = res.data.data.filter(
                    (item) => age === item.ProvinceID
                )
                setProvinceString(x[0].ProvinceName);
            })
            .catch((err) => {
                console.log("Error province: ", err);
            })
    }, [age])

    useEffect(() => {
        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtValue}`,
            {
                headers: {
                    'token': '466cdca6-febd-11ed-a967-deea53ba3605',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                console.log("Response ward: ", res.data.data.length);
                setWardData(res.data.data);
            })
            .catch((err) => {
                console.log("Error district response: ", err);
            })
        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${age}`, // lay ra danh sach district
            {
                headers: {
                    'token': '466cdca6-febd-11ed-a967-deea53ba3605',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                let y = res.data.data.filter(
                    (item) => item.DistrictID === districtValue
                )
                setDistrictString(y[0].DistrictName);

            })
            .catch((err) => {
                console.log("Error district response: ", err);
            })
    }, [districtValue])
    useEffect(() => {
        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtValue}`, // lay ra danh sach ward
            {
                headers: {
                    'token': '466cdca6-febd-11ed-a967-deea53ba3605',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                let z = res.data.data.filter(
                    (item) => item.WardCode === wardValue
                )
                setWardString(z[0].WardName);
            })
            .catch((err) => {
                console.log("Error district response: ", err);
            })
    }, [wardValue])

    // UPDAte ADDRESS
    const updateDefaultAddress = (item) => {
        var datas = new FormData();

        datas.append('apartmentNumber', item.address.apartmentNumber);
        datas.append('ward', item.address.ward);
        datas.append('district', item.address.district);
        datas.append('province', item.address.province);
        datas.append('defaultAddress', true);

        axios.put(`${baseURL}/api/v1/address/user?userId=${userId}&addressId=${item.address.id}`, datas)
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log("Error edit address: ", err))

        window.location.reload();
    }

    if (loading) {
        return (
            <div style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}>
                
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }

    return (
        <Helmet title='User Information'>
            <ToastContainer />
            <Box m={2} style={{ padding: 10, marginTop: 50, marginLeft: 100 }}>
                <Breadcrumbs
                    // maxItems={}
                    // itemsBeforeCollapse={2}
                    aria-label='breadcrumb'
                    separator={<NavigationNexIcon fontSize='small' />}
                >
                    <LinkBreadcrums underline='hover' color={'#F9813A'}>
                        <Link to={"/home"}>Trang chủ</Link>
                    </LinkBreadcrums>
                    <Typography color={"black"}>Thông tin tài khoản</Typography>
                </Breadcrumbs>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalRankDetail}
                onClose={() => setModalRankDetail(!modalRankDetail)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalRankDetail}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" fontWeight={'bold'}>
                            Xếp hạng của tài khoản
                        </Typography>
                        <p style={{marginTop: 30}}>Điểm tích lũy</p>
                        <div style={{marginTop: 40}}>
                            <div style={{width: 600, height: 40, backgroundColor: 'grey', position: 'relative'}}>
                                <img src={rank4} style={{width: 40, height: 30, position: 'absolute', left: 1, top: -35}} />
                                <img src={rank3} style={{width: 40, height: 30, position: 'absolute', left: 150, top: -35}} />
                                <img src={rank2} style={{width: 40, height: 30, position: 'absolute', left: 300, top: -35}} />
                                <img src={rank1} style={{width: 40, height: 30, position: 'absolute', left: 580, top: -35}} />
                                <div style={{width: userData.point*3 > 600 ? 600 :
                                    userData.point*3, height: 40, backgroundColor: 'orange'}}>
                                </div>
                            </div>
                        </div>
                        {
                            userData.rank.id === 1 ?
                            <p style={{marginTop: 10}}>
                                <MilitaryTechIcon />Tài khoản của bạn đã đạt xếp hạng cao nhất !!!
                            </p>
                            :
                            <p style={{marginTop: 10}}><MilitaryTechIcon />Bạn cần thêm <span style={{fontWeight: 'bold', color: 'red'}}>
                                {
                                    userData.rank.id === 4 && 50-userData.point
                                }
                                {
                                    userData.rank.id === 3 && 100-userData.point
                                }
                                {
                                    userData.rank.id === 2 && 200-userData.point
                                }
                                </span> điểm để nâng cấp hạng</p>
                        }
                        
                        <p style={{width: 600}}><ThumbUpAltIcon />Khi mua sản phẩm ở cửa hàng, với mỗi 100K trong tổng thanh toán khách hàng đã mua sắm sẽ được tích lũy 1 điểm</p>
                        <div style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', height: 250, backgroundColor: '#fde4e4'}}>    
                            <div style={{display: 'flex', alignItems: 'center', paddingLeft: 10}}>
                                <img src={rank4} style={{width: 40, height: 30}} />
                                <p style={{margin: 'auto'}}>Khi điểm tích lũy của khách hàng đạt mức dưới 50 điểm. Mức ưu đãi là 0 %</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', paddingLeft: 10}}>
                                <img src={rank3} style={{width: 40, height: 30}} />
                                <p style={{margin: 'auto'}}>Khi điểm tích lũy của khách hàng đạt mức 50-100 điểm. Mức ưu đãi là 5 %</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', paddingLeft: 10}}>
                                <img src={rank2} style={{width: 40, height: 30}} />
                                <p style={{margin: 'auto'}}>Khi điểm tích lũy của khách hàng đạt mức 100-200 điểm. Mức ưu đãi là 10 %</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', paddingLeft: 10}}>
                                <img src={rank1} style={{width: 40, height: 30}} />
                                <p style={{margin: 'auto'}}>Khi điểm tích lũy của khách hàng đạt mức trên 200 điểm. Mức ưu đãi là 15 %</p>
                            </div>
                        </div>

                        
                    </Box>
                </Fade>
            </Modal>
            <Container className='profile__container'>
                <Row className='profile__header' style={{ color: 'white' }}>
                    <h5 style={{ fontSize: 30, fontWeight: 'bold' }}>Thông tin tài khoản</h5>
                    <p>Quản lý hồ sơ để bảo mật tài khoản</p>

                </Row>
                <Row>
                    <Col lg='2' md='9'>
                        <div className='profile__userInfo-title'>
                            <img src={linkImageURL}
                                style={{ height: 50, width: 50, borderRadius: 25 }}
                            />
                            <div style={{ marginLeft: 25 }}>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {
                                            userData.rank.id === 1 &&
                                            <img src={rank1} style={{ height: 40, width: 50 }} />
                                        }
                                        {
                                            userData.rank.id === 2 &&
                                            <img src={rank2} style={{ height: 40, width: 50 }} />
                                        }
                                        {
                                            userData.rank.id === 3 &&
                                            <img src={rank3} style={{ height: 40, width: 50 }} />
                                        }
                                        {
                                            userData.rank.id === 4 &&
                                            <img src={rank4} style={{ height: 40, width: 50 }} />
                                        }
                                        <p style={{ fontSize: 12 }}>{userData.rank.name.toUpperCase()}</p>

                                    </div>
                                    <p style={{ fontSize: 12 }}>{userData.point} điểm</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <div style={{ cursor: 'pointer', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>

                                <p
                                    className={`${tab === 'information' ? 'tab__active' : ''}`}
                                    onClick={() => setTab('information')}
                                ><AccountCircleIcon /> Thông tin cá nhân</p>
                            </div>
                            <div style={{ cursor: 'pointer', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>

                                <p
                                    className={`${tab === 'password' ? 'tab__active' : ''}`}
                                    onClick={() => setTab('password')}
                                ><LockIcon /> Đổi mật khẩu</p>
                            </div>
                            <div style={{ cursor: 'pointer', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>

                                <p onClick={() => setTab('changPassword')}
                                    className={`${tab === 'changPassword' ? 'tab__active' : ''}`}
                                ><HomeIcon /> Địa chỉ</p>
                            </div>
                            <div style={{ cursor: 'pointer', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>

                                <p onClick={() => setTab('voucher')}
                                    className={`${tab === 'voucher' ? 'tab__active' : ''}`}
                                ><CardGiftcardIcon /> Ưu đãi của tôi</p>
                            </div>

                        </div>
                    </Col>
                    {
                        tab === 'information' ? (
                            <>
                                <Col lg='7' md='9' className='profile__content'>
                                    <div className='profile__item'>
                                        <p className='profile__label'>Tên tài khoản</p>
                                        <div className="newsletter">
                                            <input type="email"
                                                {...register("name", { required: true })}
                                            />
                                        </div>
                                    </div>
                                    <div className='profile__item'>
                                        <p className='profile__label'>Số điện thoại</p>
                                        <div className="newsletter">
                                            <input type="email" readOnly={phoneGG === null ? false : true}
                                                {...register("phone", { required: true })}
                                            />
                                        </div>
                                    </div>
                                    <div className='profile__item'>
                                        <p className='profile__label'>Email</p>
                                        <div className="newsletter" >
                                            <input type="email" style={{ width: '18rem' }}
                                                {...register("email", { required: true })}
                                            />
                                        </div>
                                    </div>
                                    <div className='profile__item'>
                                        <p className='profile__label' style={{ marginLeft: -150 }}>Giới tính</p>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue={userData.gender ? 'male' : 'female'}
                                            name="radio-buttons-group"
                                            style={{ display: 'flex', flexDirection: 'row' }}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                            <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                        </RadioGroup>
                                    </div>
                                    <div className='profile__item' style={{ cursor: 'pointer' }} onClick={() => setModalRankDetail(true)}>
                                        <p className='profile__label'>Xếp hạng</p>
                                        <div className="newsletter">
                                            <input type="email" readOnly
                                                {...register("rank")}
                                            />
                                        </div>
                                    </div>
                                    <div className='profile__item'>
                                        <p className='profile__label'>Loại tài khoản</p>
                                        <div className="newsletter">
                                            <input type="email"
                                                {...register("role")}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <button className='newAddress_btn' style={{ marginLeft: 320 }} onClick={handleSubmit(onSubmit)}
                                        >Lưu</button>
                                    </div>
                                </Col>
                                <Col lg='3' md='9' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* UPLOAD IMAGE */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img
                                            alt="not found"
                                            width={"250px"}
                                            height={"250px"}
                                            style={{ borderRadius: '125px' }}
                                            src={selectedImage ? URL.createObjectURL(selectedImage) : linkImageURL}

                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <div className="buttonUpload buttonImage">
                                                <FileUploadIcon />
                                                <input
                                                    type="file"
                                                    // name="myImage"
                                                    className="inputfile"
                                                    onChange={(event) => {
                                                        setSelectedImage(event.target.files[0]);
                                                        console.log("Name file choose: ", event.target.files[0])

                                                    }}
                                                />
                                            </div>
                                            <div
                                                className="buttonRemove buttonImage"
                                                onClick={() => setSelectedImage(null)}
                                            >
                                                <ClearIcon />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </>
                        ) : null
                    }
                    {

                        tab === 'changPassword' && (
                            <Col lg='10' md='9'>
                                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 80 }}>
                                    <h5 style={{ color: '#F9813A', fontWeight: 'bold' }}>Địa chỉ</h5>
                                    <button className='newAddress_btn'
                                        onClick={() => setModalAddressVisible(true)}
                                    ><AddLocationIcon /> Địa chỉ</button>
                                </div>
                                <div >
                                    {
                                        allAddress.map((item, index) => (
                                            <div key={index} style={{
                                                backgroundColor: 'white', marginBottom: 3, display: 'flex', flexDirection: 'row'
                                                , alignItems: 'center', justifyContent: 'space-between', padding: 5, borderRadius: 10
                                            }}>
                                                <div className='address__item-text'>
                                                    <p>{item.address.apartmentNumber}</p>
                                                    <p style={{ color: 'grey' }}>
                                                        {item.address.ward[0] === '{' ? JSON.parse(item.address.ward).ward_name : item.address.ward},
                                                        {item.address.district[0] === '{' ? JSON.parse(item.address.district).district_name : item.address.district},
                                                        {item.address.province}</p>
                                                    {
                                                        item.defaultAddress == true && <p className='defaultAddress__flag'>Mặc định</p>

                                                    }
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {/* <button className='addressItem__btn'><EditIcon /></button> */}
                                                    <input
                                                        type='radio'
                                                        style={{ width: 20, height: 20, marginRight: 30 }}
                                                        checked={
                                                            item.defaultAddress ? true : false
                                                        }
                                                        onChange={() => updateDefaultAddress(item)}
                                                    />
                                                    <button className='addressItem__btn' style={{ backgroundColor: 'red' }}
                                                        onClick={() => removeAddress(item.address.id)}
                                                    ><DeleteIcon /></button>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={modalAddressVisible}
                                    onClose={() => setModalAddressVisible(!modalAddressVisible)}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                        backdrop: {
                                            timeout: 500,
                                        },
                                    }}
                                >
                                    <Fade in={modalAddressVisible}>
                                        <Box sx={style}>
                                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                                Thêm địa chỉ
                                            </Typography>
                                            <div>
                                                <div className='profile__item'>
                                                    <p className='profile__label'>Tỉnh / Thành phố</p>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={age}
                                                        label="Age"
                                                        onChange={(e) => setAge(e.target.value)}
                                                        fullWidth
                                                    >
                                                        {
                                                            provinceData.map((item) => (
                                                                <MenuItem value={item.ProvinceID}>{item.ProvinceName}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </div>
                                                <div className='profile__item'>
                                                    <p className='profile__label'>Quận / Huyện</p>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={age}
                                                        label="Age"
                                                        onChange={(e) => setDistrictValue(e.target.value)}
                                                        fullWidth
                                                    >
                                                        {
                                                            districtData.map((item) => (
                                                                <MenuItem value={item.DistrictID}>{item.DistrictName}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </div>
                                                <div className='profile__item'>
                                                    <p className='profile__label'>Phường / xã</p>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={age}
                                                        label="Age"
                                                        onChange={(e) => setWardValue(e.target.value)}
                                                        fullWidth
                                                    >
                                                        {
                                                            wardData.map((item) => (
                                                                <MenuItem value={item.WardCode}>{item.WardName}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </div>

                                                <div className='profile__item'>
                                                    <p className='profile__label'
                                                        style={{ marginLeft: -0 }}
                                                    >Số nhà</p>
                                                    <div className="newsletter1"
                                                        style={{ marginLeft: -30 }}
                                                    >
                                                        <input type="email"
                                                            style={{ height: 50, width: 300 }}
                                                            onChange={(e) => setApartmentNumber(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    style={{ padding: 5, backgroundColor: '#F9813A', color: 'white', border: 'none', outline: 'none', padding: 10 }}
                                                    onClick={() => {
                                                        setModalAddressVisible(!modalAddressVisible);

                                                        createAddress();

                                                    }}>Lưu</button>
                                            </div>

                                        </Box>
                                    </Fade>
                                </Modal>
                            </Col>
                        )
                    }
                    {
                        tab === 'password' && (
                            <Col lg='10' md='9' className='profile__content'>
                                <div className='profile__item'>
                                    <p className='profile__label'>Mật khẩu hiện tại</p>
                                    <div className="newsletter">
                                        <input type={hidePassword ? 'password' : 'email'}
                                            onChange={(e) => setPassword0(e.target.value)}
                                        />
                                        {
                                            hidePassword ? <VisibilityIcon onClick={() => setHidePassword(!hidePassword)} />
                                                : <VisibilityOffIcon onClick={() => setHidePassword(!hidePassword)} />
                                        }
                                    </div>
                                </div>
                                <div className='profile__item'>
                                    <p className='profile__label'>Mật khẩu mới</p>
                                    <div className="newsletter">
                                        <input type={hidePassword ? 'password' : 'email'}
                                            onChange={(e) => setPassword1(e.target.value)}
                                        />
                                        {
                                            hidePassword ? <VisibilityIcon onClick={() => setHidePassword(!hidePassword)} />
                                                : <VisibilityOffIcon onClick={() => setHidePassword(!hidePassword)} />
                                        }
                                    </div>
                                </div>
                                <div className='profile__item'>
                                    <p className='profile__label'>Nhập lại mật khẩu</p>
                                    <div className="newsletter">
                                        <input type={hidePassword ? 'password' : 'email'}
                                            onChange={(e) => setPassword2(e.target.value)}
                                        />
                                        {
                                            hidePassword ? <VisibilityIcon onClick={() => setHidePassword(!hidePassword)} />
                                                : <VisibilityOffIcon onClick={() => setHidePassword(!hidePassword)} />
                                        }
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleChangePassword()}
                                    className='newAddress_btn'
                                    style={{ marginLeft: 490 }}
                                >Lưu mật khẩu</button>
                            </Col>
                        )

                    }
                    {
                        tab === 'voucher' && (
                            <Col lg='10' md='9' className='profile__content'>
                                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 80 }}>
                                    <h5 style={{ color: '#F9813A', fontWeight: 'bold' }}>Ưu đãi của tôi</h5>
                                    <Link to={"/voucher"}>

                                        <button className='newAddress_btn'

                                        ><AddCircleIcon /> Ưu đãi</button>
                                    </Link>
                                </div>
                                <div style={{ backgroundColor: '#F9813A' }}>
                                    {

                                        voucherUser.map((item) => (
                                            <div style={{
                                                backgroundColor: 'white', marginBottom: 3, display: 'flex', flexDirection: 'row'
                                                , alignItems: 'center', justifyContent: 'space-between', padding: 5
                                            }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <img src={item.voucher.thumbnail}
                                                        style={{ width: 80, height: 80, marginRight: 20 }}
                                                    />
                                                    <div>
                                                        <p style={{ fontWeight: 'bold' }}>{item.voucher.title}</p>
                                                        <p>{item.voucher.description}</p>
                                                    </div>

                                                </div>
                                                <div style={{ width: 100 }}>
                                                    <button className='addressItem__btn' style={{ backgroundColor: 'red' }}
                                                        onClick={() => removeVoucher(item.voucher.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </Col>
                        )

                    }
                </Row>
            </Container>
        </Helmet>
    )
}

export default UserInformation


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

