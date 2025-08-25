import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


const InputField = ({ type, placeholder, name, handleChange, value }) => (
    <input 
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={handleChange}
    required
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    />
)


const AddAddress = () => {

    const { axios, user, navigate } = useAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',    
        state: '',   
        zipCode: '', 
        country: '', 
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // ✅ Sending the address object directly instead of nesting it
            const { data } = await axios.post("/api/address/add", address);
            if (data.success) {
                toast.success(data.message);
                navigate("/cart");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/cart");
        }
    }, [user, navigate]); // ✅ Added dependencies to useEffect

    return (
        <div className='mt-16 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-500'> Add Shipping <span className='font-semibold text-primary'>Address</span></p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField
                                type="text"
                                placeholder="First Name"
                                name="firstName" 
                                handleChange={handleChange}
                                value={address.firstName}
                            />
                            <InputField
                                type="text"
                                placeholder="Last Name"
                                name="lastName" 
                                handleChange={handleChange}
                                value={address.lastName}
                            />
                        </div>
                        <InputField
                            type="email"
                            placeholder="Email"
                            name="email"
                            handleChange={handleChange}
                            value={address.email}
                        />
                        <InputField
                            type="text"
                            placeholder="Street Address"
                            name="street"
                            handleChange={handleChange}
                            value={address.street}
                        />
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField
                                type="text"
                                placeholder="City"
                                name="city" 
                                handleChange={handleChange}
                                value={address.city}
                            />
                            <InputField
                                type="text"
                                placeholder="State"
                                name="state" 
                                handleChange={handleChange}
                                value={address.state}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField
                                type="number"  
                                placeholder="Zip Code"
                                name="zipCode" 
                                handleChange={handleChange}
                                value={address.zipCode}
                            />
                            <InputField
                                type="text"
                                placeholder="Country"
                                name="country" 
                                handleChange={handleChange}
                                value={address.country}
                            />
                        </div>
                        <InputField
                            type="tel"
                            placeholder="Phone Number"
                            name="phone"
                            handleChange={handleChange}
                            value={address.phone}
                        />
                        <button type='submit' className='w-full bg-primary text-white py-3 rounded hover:bg-primary-dull transition cursor-pointer uppercase'>
                            Add Address
                        </button>
                    </form>
                </div>
                <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
            </div>
        </div>
    )
}

export default AddAddress;