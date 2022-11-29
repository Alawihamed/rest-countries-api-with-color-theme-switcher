import React, { useState, useEffect } from 'react';
import './CountryList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function CountryList() {
    const [countries, setCountries] = useState([]);
    const [filterCountries,setFilterCountries] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getCountries = () => {
            setLoading(true);
            axios
                .get('https://restcountries.com/v3.1/all')
                .then((res) => {
                    if (res.status === 200) {
                        setCountries(res.data);
                        setFilterCountries(res.data);
                        setLoading(false);
                    } else {
                        console.log(res.statusText);
                        setLoading(false);
                    }
                })
                .catch((e) => {
                    console.log(e.message);
                    setLoading(false);
                });
        };
        getCountries();
    }, []);
    
    const filterByRegion = (e)=>{
        const all = countries.filter((country)=> e.target.value !== '' ?  country?.region===e.target.value: country);
        setFilterCountries(all);
    }
    const allCountries = filterCountries.filter((country)=> inputSearch !== '' ?  country?.name?.common.toLowerCase().includes(inputSearch.toLowerCase()): country);
    return (
        <div className='country-list'>
            <div className='top'>
                <div className='search'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} type='text' placeholder='Search for country...' />
                </div>
                <div className='filter'>
                    <select onChange={(e)=>filterByRegion(e)}>
                        <option value=''>Filter By Region</option>
                        <option value='Africa'>Africa</option>
                        <option value='Americas'>America</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                </div>
            </div>
            {loading ?
                (
                    <Loader />
                ) :
                (
                    <div className='countries'>
                        {allCountries.map((country, index) => (
                        <Link to={`/country/${country?.name?.common}`} key={index}>
                            <div className='country-card'>
                                <div className='image'>
                                    <img src={country?.flags?.png} alt='country-flag' />
                                </div>
                                <div className='info'>
                                    <h6 className='name'>{country?.name?.common}</h6>
                                    <div className='info-wrapper'>
                                        <p>Population:</p>
                                        <span>{country?.population}</span>
                                    </div>
                                    <div className='info-wrapper'>
                                        <p>Region:</p>
                                        <span>{country?.region}</span>
                                    </div>
                                    <div className='info-wrapper'>
                                        <p>Capital:</p>
                                        <span>{country?.capital}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                )}
        </div>
    )
}
