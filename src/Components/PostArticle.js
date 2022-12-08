import React from 'react';
import { useFormik} from 'formik';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import config from '../config';


export default function PostArticle() {
    var imageUrl = '';
    const formik = useFormik({
        initialValues:{
            title:'',
            author:'',
            description:'',
            urlToImage:''

        },
        onSubmit: (values, { resetForm }) => {
            
            console.log(values)

            const data = axios.post(config.postArticleURL,values,{
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(() => {
                    toast.success('Blog Post Successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    });

                }).catch(() => {
                    toast.error('Blog Not Posted ', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    });

                })
            resetForm();
        }
    })

    // const imageUpload = (event)=>{
    //     imageUrl = event.target.files[0].name;
    //     console.log(imageUrl);
    //     }

    return (
        <div className='container'>
            <div className="row mt-4 d-flex justify-content-center">
                <div className="col-md-6  ">
                    <form onSubmit={formik.handleSubmit}  encType='multipart/form-data'>
                        <div className='text-center' style={{ backgroundColor: 'rgb(33 37 41)', height: "45px" }}>
                            <h2 style={{ "color": 'white' }}>Post Your Blog</h2>
                        </div>
                        <input 
                        className="form-control mt-2" 
                        type="text"
                        name='author' 
                        required
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        placeholder="Blogger Name" />
                        <input
                         className="form-control mt-2" 
                         type="text" 
                         required
                         name='title'
                         value={formik.values.title}
                         onChange={formik.handleChange}
                         placeholder="Title Of Blog" />
                        <div className="form-group mt-2">
                            <textarea class="form-control" 
                            placeholder="Blog Description" 
                            required
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            id="exampleFormControlTextarea1"
                            rows="3"
                             />
                        </div>
                        <div class="form-group mt-2">
                            <input 
                             type="file"
                              class="form-control-file" 
                              id="exampleFormControlFile1"
                              name='urlToImage'
                            //   onChange={imageUpload}
                            onChange={(event)=>{formik.setFieldValue('urlToImage',event.target.files[0])}}
                              />
                        </div>
                        <div className="my-3 text-center">
                            <button type='botton' className="btn btn-secondary">Post Blog</button>

                        </div>

                    </form>
                </div>
            </div>
        </div >
    )
}
