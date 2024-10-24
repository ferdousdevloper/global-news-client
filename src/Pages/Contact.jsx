import React, { useEffect, useRef } from 'react';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import emailjs from '@emailjs/browser';

const Contact = () => {

    useEffect(() => {
        // Initialize EmailJS with your public key
        emailjs.init('uXl16mb1q4qr5jvMw');
    }, []);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_nz6xy8n', 'template_ixmowuk', form.current, {
                publicKey: 'uXl16mb1q4qr5jvMw',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div className='my-28'>
            <h2 
             data-aos="zoom-in"
             data-aos-duration="1000" 
             data-aos-delay="100"
            className='mx-auto text-center text-3xl font-bold text-white'>CONTACT US</h2>
            <p 
             data-aos="zoom-in"
             data-aos-duration="1000" 
             data-aos-delay="100"
            className='mx-auto text-center pb-3 text-white'>Our team of Global News is ready to hear from you.</p>
            <hr 
             data-aos="zoom-in"
             data-aos-duration="1000" 
             data-aos-delay="200"
            className=' container mx-auto my-10' />
            
            {/* Contact Form Section */}
            <section 
             data-aos="zoom-in"
             data-aos-duration="1000" 
             data-aos-delay="300"
            className="py-6 border container mx-auto rounded-3xl glass text-gray-200">
                <div 
                 data-aos="zoom-in"
                 data-aos-duration="1000" 
                 data-aos-delay="400"
                className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                    <form ref={form} onSubmit={sendEmail} noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6 md:relative">
                        <h2 className='font-semibold text-2xl'>Reach out to us!</h2>
                        <p className="pt-2 pb-2">Fill in the form to start a conversation</p>
                        <label className="block">
                            <span className="mb-1">Full name</span>
                            <input type="text" placeholder="Your full name" name="full_name" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 p-2 border" />
                        </label>

                        <label className="block">
                            <span className="mb-1">Email address</span>
                            <input type="email" placeholder="Your email" name="email" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 p-2 border" />
                        </label>

                        <label className="block">
                            <span className="mb-1">Message</span>
                            <textarea rows="3" placeholder='Write your message' name="message" className="block w-full rounded-md focus:ring focus:ring-opacity-75 p-2 border bg-tra"></textarea>
                        </label>

                        <button type='submit' className="bg-colorPrimary text-lg py-1 text-white rounded-xl">Submit</button>
                    </form>

                    {/* Contact Information Section */}
                    <div className="py-6 md:py-0 md:px-6">
                        <div className='mb-8'>
                            <h2 className='font-semibold text-2xl pb-2 mb-2'>Our services team</h2>
                            <div className='flex gap-2 items-center mb-4'>
                                <img className='w-16 h-16 rounded-full' src="https://i.ibb.co/pJCBQtt/b-ed-pic.jpg" alt="" />
                                <div>
                                    <h2 className='font-semibold'>Rabindro Nath Barman</h2>
                                    <p>MERN stack web developer</p>
                                    <p className='flex items-center gap-5'><a href="https://www.facebook.com/rabindro.rabi.7"><FaFacebookF></FaFacebookF></a><a href="#"><FaTwitter></FaTwitter></a></p>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <img className='w-16 h-16 rounded-full' src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                                <div>
                                    <h2 className='font-semibold'>Mohammad Ferdous Hossain</h2>
                                    <p>MERN stack web developer</p>
                                    <p className='flex items-center gap-5'><a href="https://www.facebook.com/rabindro.rabi.7"><FaFacebookF></FaFacebookF></a><a href="#"><FaTwitter></FaTwitter></a></p>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-2xl font-semibold">Other ways to contact</h1>
                        <div className="space-y-4">
                            <p className="flex items-center">
                                <FaPhone className='mr-3'></FaPhone>
                                <span>+8801774720271</span>
                            </p>
                            <p className="flex items-center">
                                <MdEmail className='mr-3'></MdEmail>
                                <span>rnrabi913@gmail.com</span>
                            </p>
                            <p className="flex items-center">
                                <FaLocationDot className='mr-3'></FaLocationDot>
                                <span>Kurigram, Rangpur, Dhaka, Bangladesh</span>
                            </p>
                            <p className='flex gap-8 justify-center'>
                                <FaFacebookF className='text-5xl p-3 border rounded-full bg-green-500 border-[#02AA08] hover:bg-[#02AA08]'></FaFacebookF>
                                <FaTwitter className='text-5xl p-3 border rounded-full border-[#02AA08] bg-green-500 hover:bg-[#02AA08]'></FaTwitter>
                                <GrLinkedinOption className='text-5xl p-3 border rounded-full bg-green-500 border-[#02AA08] hover:bg-[#02AA08]'></GrLinkedinOption>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map Section */}
            <div 
             data-aos="zoom-in"
             data-aos-duration="1000" 
             data-aos-delay="400"
            className=" container mx-auto mt-10">
                <h2 className="text-2xl font-bold text-center text-white mb-4">Our Location</h2>
                <iframe
                    title="Google Map"
                    className="w-full h-96 rounded-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38756341664!2d90.27923774311354!3d23.780573256914188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77ff3e52d3f%3A0x88e1a917a1aa0c13!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1697113432681!5m2!1sen!2sbd"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
