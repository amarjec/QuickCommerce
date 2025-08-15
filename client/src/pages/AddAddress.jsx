import React, { useState } from 'react'
import { assets } from '../assets/assets'


const InputField = ({type, placeholder, name, handleChange, address}) => (
    <input 
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name]}
    onChange={handleChange}     // Assuming handleChange is a function passed as a prop to handle input changes
    required
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    />
)


const AddAddress = () => {

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        City: '',
        State: '',
        ZipCode: '',
        Country: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
        console.log(address);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
    }
  return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'> Add Shipping <span className='font-semibold text-primary'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

                    <div className='grid grid-cols-2 gap-4'>
                        {/* Input fields for first name and last name */}
                        <InputField
                            type="text"
                            placeholder="First Name"
                            name="FirstName"
                            handleChange={handleChange} 
                            address={address} 
                        />
                        <InputField
                            type="text"
                            placeholder="Last Name"
                            name="LastName"
                            handleChange={handleChange} 
                            address={address} 
                        />
                    </div>

                    {/* Input fields for email, street address */}
                    <InputField
                        type="email"
                        placeholder="Email"
                        name="email"
                        handleChange={handleChange} 
                        address={address} 
                    />
                    <InputField
                        type="text"
                        placeholder="Street Address"
                        name="street"
                        handleChange={handleChange} 
                        address={address}
                    />
                    {/* input fields for city and state */}

                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                            type="text"
                            placeholder="City"
                            name="City"
                            handleChange={handleChange} 
                            address={address}
                        />
                        <InputField
                            type="text"
                            placeholder="State"
                            name="State"
                            handleChange={handleChange} 
                            address={address} 
                        />
                    </div>

                    {/* input field for zipcode and country */}
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                            type="Number"
                            placeholder="Zip Code"
                            name="ZipCode"
                            handleChange={handleChange} 
                            address={address} 
                        />
                        <InputField
                            type="text"
                            placeholder="Country"
                            name="Country"
                            handleChange={handleChange} 
                            address={address} 
                        />
                    </div>

                    {/* input field for phone number */}
                    <InputField
                        type="tel"
                        placeholder="Phone Number"
                        name="phone"
                        handleChange={handleChange} 
                        address={address} 
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

export default AddAddress


