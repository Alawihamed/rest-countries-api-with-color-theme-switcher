import React,{useState,useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import './CountryDetails.css';
import Loader from '../Loader/Loader';

export default function CountryDetails() {
    let { name } = useParams();
    const [ country , setCountry] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getCountries = () => {
            setLoading(true);
            axios
            .get(`https://restcountries.com/v2/name/${name}`)
            .then((res) => {
            if (res.status === 200) {
                setCountry(res?.data[0]);
                setLoading(false);
            } else {
                console.log(res.statusText);
                setLoading(false);
            }
            })
            .catch((e)=>{
                console.log(e.message);
                setLoading(false);
            });
        };
        getCountries();
    }, [name]);
  return (
    <div className='country-details'>
        <Link to={'/'}>
        <button className='back'>
            <i className="fa-solid fa-arrow-left-long"></i>
            Back
        </button>
        </Link>
        {loading? 
        (
            <Loader />
        )
        :    
        (
            <div className='content'>
            <div className='image'>
                <img src={country?.flags?.png} alt='country-flag'/>
            </div>
            <div className='info'>
                <h6 className='name'>{country?.name}</h6>
                <div className='row'>
                    <div>
                        <div className='info-wrapper'>
                            <p>Native Name:</p>
                            <span>{country?.nativeName}</span>
                        </div>
                        <div className='info-wrapper'>
                            <p>Population:</p>
                            <span>{country?.population}</span>
                        </div>
                        <div className='info-wrapper'>
                            <p>Region:</p>
                            <span>{country?.region}</span>
                        </div>
                        <div className='info-wrapper'>
                            <p>Sub Region:</p>
                            <span>{country?.subregion}</span>
                        </div>
                        <div className='info-wrapper'>
                            <p>Capital:</p>
                            <span>{country?.capital}</span>
                        </div>
                    </div>
                    <div>
                        <div className='info-wrapper'>
                            <p>Top Level Domain:</p>
                            <span>{country?.topLevelDomain}</span>
                        </div>
                        <div className='info-wrapper'>
                            <p>Currencies:</p>
                            {country?.currencies?.map((currency,index)=>(
                                <span key={index}>{currency?.name}</span>
                            ))}
                        </div>
                        <div className='info-wrapper'>
                            <p>Languages:</p>
                            {country?.languages?.map((lang,index)=>(
                                <span key={index}>{lang?.name},</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='border-countries'>
                    <p>Border Countries:</p>
                    <div>
                        {country?.borders?.map((item,index)=>(
                        <span key={index}>
                            {item}
                        </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}
