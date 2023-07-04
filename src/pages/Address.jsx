import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const userID = sessionStorage.getItem("userID")

const Address = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (dataForm) => {
        const { apartmentNumber, ward, district, province, defaultAddress } = dataForm;
        // fetch api
        var formdata = new FormData();
        formdata.append("province", province);
        formdata.append("district", district);
        formdata.append("ward", ward);
        formdata.append("apartmentNumber", apartmentNumber);
        formdata.append("defaultAddress", defaultAddress);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/v1/address/user?userId=${userID}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        window.location.reload();
    };

    return (
        <>
        <form className='form mb-5' id="form" onSubmit={handleSubmit(onSubmit)}>
            <h5>Thêm mới địa chỉ</h5>
            <div className="form__group">
                <input
                    type="text"
                    placeholder="Số nhà"
                    {...register("apartmentNumber", { required: true })}
                />

            </div>
            <div className="form__group">
                <input
                    type='text'
                    placeholder='Phường / xã'
                    {...register("ward", { required: true })}

                />
            </div>
            <div className="form__group">
                <input
                    type='text'
                    placeholder='Quận / huyện'
                    {...register("district", { required: true })}

                />
            </div>
            <div className="form__group">
                <input
                    type='text'
                    placeholder='Tỉnh / Thành phố'
                    {...register("province", { required: true })}
                    
                />
            </div>
            <div className="form__group">
                <select className='defaultAddress_select' id="defaultAddress"
                    defaultValue={true}
                    {...register("defaultAddress")}
                >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </div>

            <div className='d-flex justify-content-between'>
                <button
                    // onClick={handleClick}
                    className="addToCart__btn m-2">
                    Create
                </button>
                <Link to={`/userinformation/${userID}`}>
                <span className='addToCart__btn p-3'>
                    <i class="ri-arrow-left-circle-line"></i>
                </span>
                </Link>
            </div>
        </form>
        
        </>
    )
}

export default Address