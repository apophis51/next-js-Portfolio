'use client'
import Container from '@mui/material/Container';
import { Upgrade, UpgradeCollection, BarStats } from './Upgrade'

import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import './App.css';

export default function ClickerGame() {
    const [clicks, setClicks] = useState(0);
    const [daysElapsed, setDaysElapsed] = useState(0);
    const [entertainment, setEntertainment] = useState(50);
    const [hunger, setHunger] = useState(90);
    const [bills, setBills] = useState(0);
    const [applications, setApplications] = useState(0);
    const [softwareSkills, setSoftwareSkills] = useState(1);
    const [money, setMoney] = useState(0);
    const [job, setJob] = useState('begger');
    const [fulltime, setFulltime] = useState(false);
    const [manager, setManager] = useState(false);
    const [pay, setPay] = useState(0);

    const handleClick = () => {
        setClicks(clicks + 1);
        let ammount = money + 2
        setMoney(Number(ammount.toFixed(2)));
    };

    const handlePowerUpClick = (upgrade) => {
        setJob(upgrade)
        setPay(pay + 50);
        setMoney(money - 5);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMoney((prevClicks) => prevClicks + pay);
            setDaysElapsed((prevClicks) => prevClicks + 1);
            setEntertainment((prevClicks) => prevClicks - 1);
            setHunger((prevClicks) => prevClicks - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [pay]);

    return (
        <Container maxWidth="xl"  >
            <div className="App ">
                <header className="App-header">
                    <h2 className='text-4xl'> The WebDeveloper Game</h2>
                    <br></br>
                    <p className='text-2xl'>(strategy clicker game)</p>
                    <br></br>
                    <div className="flex items-center justify-center">
                        <Image src={`/clickerGame/${job}.jpg`}
                            alt="homeless"
                            width={300}
                            height={300}
                        />
                    </div>
                    <br></br>
                    <h3 className='text-2xl'>  Do you have what it Takes to be a Software Developer?</h3>
                    <br></br>
                    <div className='collapse collapse-arrow bg-base-200 border-base-300 text-black'>
                        <input type='checkbox'  />
                        <p className='text-4xl collapse-title '>Instructions:</p>
                        <br></br>
                        <div className='collapse-content'>
                            <p >  To Win - Become A Software Developer in 1460 days (4 years).</p>
                            <br></br>
                            <p> If your Entertainment or Hunger Drops to Zero you will die.</p>
                            <br></br>
                            <p> If you Run out of Money You will die.</p>
                            <p>Be sure to pay your bills before they reach 100%!</p>
                            <br></br>
                            <p>Take Time to Search For Software Jobs - Be warned Your bills will continue to pileup if you search for jobs Instead of working</p>
                            <br></br>
                            <p>Searching for Software Jobs will result in temporary 50% penality to you income</p>
                            <br></br>
                            <p>Your software skill will drop slowly overtime if you dont take time to keep learning</p>
                        </div>
                    </div>
                    <br></br>
                    <p>You currently work as a {job} person.</p>
                    <p>Current Pay: ${pay}</p>
                    <br></br>
                    <p>Days Elapsed: {daysElapsed} </p>
                    <p>Software Applications: {applications}</p>
                    <p>Rent and Bills: {bills}</p>
                    <br></br>
                    <p>Total Clicks: {clicks}</p>
                    <p>Money earned: ${money}</p>
                    <br></br>
                    <button onClick={handleClick} className='btn'>Work</button>
                    <br></br>
                    <br></br>
                    <div className='flex flex-wrap gap-4 items-center justify-center'>
                        <button className='btn btn-sm'>Learn Software</button>
                        <button className='btn btn-sm'>Search Software Jobs</button>
                        <button className='btn btn-sm'>Eat</button>
                        <button className='btn btn-sm'>Pay Bills</button>
                        <button className='btn btn-sm'>Entertainment</button>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="flex-col  items-center justify-center">

                        <BarStats percent={bills} stat={'Bills:' + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} />
                        <BarStats percent={entertainment} stat={'Entertainment:'} />
                        <BarStats percent={hunger} stat={'Hunger :' + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} />
                        <BarStats percent={softwareSkills} stat={'Software Skills:'} />
                    </div>
                    <br></br>
                    <div>
                        {clicks >= 10 && (job == 'begger') && (
                            <UpgradeCollection
                                collection={['driver', 'retail', 'food', 'warehouse']}
                                handlePowerUpClick={handlePowerUpClick} />
                        )}
                    </div>
                    <div onClick={() => setFulltime(true)}>
                        {clicks >= 15 && (fulltime == false) && (
                            <UpgradeCollection
                                collection={['Full Time Driver', 'Full Time Retail', 'Full Time Food', 'Full Time Warehouse']}
                                handlePowerUpClick={handlePowerUpClick}

                            />
                        )}
                    </div>
                    <div onClick={() => setManager(true)}>
                        {clicks >= 30 && (manager == false) && (
                            <UpgradeCollection
                                collection={['Restaurant Manager', 'Retail Manager', 'Restaurant Manager', 'Warehouse Manager']}
                                handlePowerUpClick={handlePowerUpClick} />
                        )}
                    </div>
                    <p>Auto Increment: {pay}</p>
                </header>
            </div>
        </Container>
    );
}


