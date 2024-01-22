'use client'
import  * as gameFunctions from './Upgrade'
import { atom, useAtom, Provider } from 'jotai'

import Container from '@mui/material/Container';
import { Upgrade, UpgradeCollection, BarStats } from './Upgrade'

import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import './App.css';

import dynamic from 'next/dynamic'

const AudioPlayer = dynamic(() => import('./AudioPlayer'), { ssr: false })
import GameIntroOutro from './GameIntroOutro';

export const textAtom = atom('Developers Clicker Game') /////////////////////////////////////////////////////
export const deadAtom = atom(false)

export default function ClickerGame() {
    const [clicks, setClicks] = useState(0);
    const [daysElapsed, setDaysElapsed] = useState(0);
    const [entertainment, setEntertainment] = useState(50);
    const [health, setHealth] = useState(50);
    const [hunger, setHunger] = useState(90);
    

    const[healthDrain, setHealthDrain] = useState(1);
    const[entertainmentDrain, setEntertainmentDrain] = useState(1);
    const[hungerDrain, setHungerDrain] = useState(1);
    const [bills, setBills] = useState(0);
    const [softwareSkills, setSoftwareSkills] = useState(1);


    const [applications, setApplications] = useState(0);
    const [money, setMoney] = useState(0);
    const [job, setJob] = useState('begger');
    const [fulltime, setFulltime] = useState(false);
    const [manager, setManager] = useState(false);
    const [house, setHouse] = useState(false);
    const [pay, setPay] = useState(0);


    const [myAtom, setmyAtom] = useAtom(textAtom)///////////////////////////////////////////////////
    const [dead, setDead] = useAtom(deadAtom)

    console.log(money)
    if (hunger <=0 || entertainment <=0 || health <= 0 || money <= -1)  {
        setDead(true)
        console.log('you died')
    }

    const handleClick = () => {
        setClicks(clicks + 1);
        let ammount = money + 2
        setMoney(Number(ammount.toFixed(2)));
    };

    const handleFoodClick = (upgrade) => {
        setMoney(money - 30);
        setHunger(hunger + 10);
    }

    const handleHouseClick = (upgrade) => {
        console.log('null')
    }

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
            setHealth((prevClicks) => prevClicks - 1);
            setHunger((prevClicks) => prevClicks - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [pay]);

    return (
        <Container maxWidth="xl"  >
            <div className="App ">
                <p className='bg-white'>{myAtom}</p>
                <header className="App-header">
                    
                        <GameIntroOutro />
                    {dead && <GameIntroOutro />}
                    <div className="flex  justify-center gap-5">
                        <div >
                            <AudioPlayer />
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
                            <br></br>
                            <div className="flex-col  items-center justify-center">

                                <BarStats percent={bills} stat={'Bills:' + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} />
                                <BarStats percent={entertainment} stat={'Entertainment:'} />
                                <BarStats percent={health} stat={'Health:' + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} />
                                <BarStats percent={hunger} stat={'Hunger :' + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} />
                                <BarStats percent={softwareSkills} stat={'Software Skills:'} />
                            </div>
                            <br></br>
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
                            
                           
                            
                        </div>
                        <div className='self-end min-w-[600px]'>
                            <gameFunctions.Instructions />
                            <br></br>
                            <div>
                                {clicks >= 10 && (job == 'begger') && (
                                    <UpgradeCollection
                                        collection={['driver', 'retail', 'food', 'warehouse']}
                                        functionHandler={handlePowerUpClick} />
                                )}
                            </div>
                            <div onClick={() => setFulltime(true)}>
                                {clicks >= 15 && (fulltime == false) && (
                                    <UpgradeCollection
                                        collection={['Full Time Driver', 'Full Time Retail', 'Full Time Food', 'Full Time Warehouse']}
                                        functionHandler={handlePowerUpClick}

                                    />
                                )}
                            </div>
                            <div onClick={() => setManager(true)}>
                                {clicks >= 30 && (manager == false) && (
                                    <UpgradeCollection
                                        collection={['Restaurant Manager', 'Retail Manager', 'Restaurant Manager', 'Warehouse Manager']}
                                        functionHandler={handlePowerUpClick} />
                                )}
                            </div>
                            <div>
                                {(true == true) && (
                                    <UpgradeCollection
                                        collection={['burger', 'carrot', 'vegies']}
                                        functionHandler={handleFoodClick} />
                                )}
                            </div>
                            <div onClick={() => setHouse(true)}>
                                {(house == false) && (
                                    <UpgradeCollection
                                        collection={['broke house', 'medium house', 'rich house']}
                                        functionHandler={handleHouseClick} />
                                )}
                            </div>
                        </div>
                    </div >
                </header >
            </div >
        </Container >
    );
}


