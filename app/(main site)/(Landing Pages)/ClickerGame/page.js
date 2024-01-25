'use client'
import * as gameFunctions from './Upgrade'
import { atom, useAtom, Provider } from 'jotai'

import Container from '@mui/material/Container';
import { Upgrade, UpgradeCollection, BarStats } from './Upgrade'

import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import './App.css';

import dynamic from 'next/dynamic'

const AudioPlayer = dynamic(() => import('./AudioPlayer'), { ssr: false })
import GameIntroOutro from './GameIntroOutro';


/**
* These are the Atoms that are used to keep track of the game state
*/
export const textAtom = atom('Developers Clicker Game') /////////////////////////////////////////////////////
export const deadAtom = atom(false)



export default function ClickerGame() {
    const [clicks, setClicks] = useState(0);
    const [daysElapsed, setDaysElapsed] = useState(0);
    const [health, setHealth] = useState(50);
    const [healthDrain, setHealthDrain] = useState(1);
    const [entertainment, setEntertainment] = useState(50);
    const [entertainmentDrain, setEntertainmentDrain] = useState(1);
    const [hunger, setHunger] = useState(90);
    const [hungerDrain, setHungerDrain] = useState(1);
    const [pay, setPay] = useState(0);
    const [money, setMoney] = useState(0);
    const [bills, setBills] = useState(0);
    const [softwareSkills, setSoftwareSkills] = useState(1);
    const [applications, setApplications] = useState(0);
    const [job, setJob] = useState('begger');
    const [manager, setManager] = useState(false);
    const [fulltime, setFulltime] = useState(false);
    const [house, setHouse] = useState(false);
    const [functionActivator, SetFunctionActivator] = useState(false);




    const [gameStat, setGameStat] = useState({
        health: { points: 50, drain: 1 },
        entertainment: { points: 50, drain: 1 },
        hunger: { points: 90, drain: 1 },
        money: { points: 0, drain: 0 },
        softwareSkills: { points: 1, drain: 0 },
        applications: { points: 0, drain: 0 },
        bills: { points: 0, drain: 0 },
        job: { title: 'begger'},
        manager: false,
        fulltime: false,
        house: false,
        clicks: 0,
        daysElapsed: 0,
    }
    )







    /**
* These are the Atoms that are used to keep track of the game state
*/
    const [myAtom, setmyAtom] = useAtom(textAtom)///////////////////////////////////////////////////
    const [dead, setDead] = useAtom(deadAtom)


    /**
 * keeps track of death conditions
 */
    if (hunger <= 0 || entertainment <= 0 || health <= 0 || money <= -1) {
        // setDead(true)
        console.log('you died')
    }
    // health: {points: 50, drain:1},
    // entertainment: {points: 50, drain:1},
    // hunger: {points: 90, drain:1},
    // money: {points: 0, drain:0},
    // softwareSkills: {points: 1, drain:0},
    // applications: {points: 0, drain:0},
    // bills: {points: 0, drain:0},
    const handleStats = ({
        health = 0,  //healthPoints
        entertainment = 0, //entertainmentPoints
        entertainmentDrain = 0,
        hunger = 0, //hungerPoints  
        hungerDrain = 0,
        cost = 0,  //moneyPoints
        Daily_Pay = 0, // this is the daily pay
        softwareSkillsPoints = 0,
        softwareSkillsDrain = 0,
        applicationsPoints = 0,
        applicationsDrain = 0,
        billsPoints = 0,
        billsDrain = 0,
        Job = gameStat.job.title,  // initial is begger
        manager = gameStat.manager, // initial is false
        fulltime = gameStat.fulltime, // initial is false
        house = gameStat.house, // initial is false
        clicks = gameStat.clicks, // initial is 0
        daysElapsed = gameStat.daysElapsed, // initial is 0
    }) => {
        health = health + gameStat.health.points
        entertainment = entertainment + gameStat.entertainment.points
        hunger = hunger + gameStat.hunger.points
        hungerDrain = hungerDrain + gameStat.hunger.drain
        cost = gameStat.money.points - cost
        console.log(cost)
        Daily_Pay = Daily_Pay + gameStat.money.drain
        softwareSkillsPoints = softwareSkillsPoints + gameStat.softwareSkills.points
        softwareSkillsDrain = softwareSkillsDrain + gameStat.softwareSkills.drain
        applicationsPoints = applicationsPoints + gameStat.applications.points
        applicationsDrain = applicationsDrain + gameStat.applications.drain
        billsPoints = billsPoints + gameStat.bills.points
        billsDrain = billsDrain + gameStat.bills.drain
        setGameStat(prevState => ({
            ...prevState,
            money: { points: cost, drain: Daily_Pay },
            hunger: { points: hunger, drain: hungerDrain },
            entertainment: { points: entertainment, drain: entertainmentDrain },
            health: { points: health, drain: healthDrain },
            softwareSkills: { points: softwareSkillsPoints, drain: softwareSkillsDrain },
            applications: { points: applicationsPoints, drain: applicationsDrain },
            bills: { points: billsPoints, drain: billsDrain },
            job: { title: Job }
        }))
        console.log(gameStat)
    }

    const handleClick = () => {
        setClicks(clicks + 1);
        let ammount = gameStat.money.points + 2
        setGameStat(prevState => ({ ...prevState, money: { points: ammount, drain: gameStat.money.drain } }))
    };
    // const handleJobClick = ({ Daily_Pay = 0 }) => {
    //     // setJob(upgrade)
    //     console.log('triggered')
    //     Daily_Pay = Daily_Pay
    //     console.log(Daily_Pay)
    //     setGameStat(prevState => ({ ...prevState, money: { points: 0, drain: Daily_Pay } }))
    // };

    const handleHouseClick = (upgrade) => {
        console.log('null')
    }



    console.log('triggered')
    console.log(gameStat)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setGameStat((prevState) => ({ ...prevState, health: { points: prevState.health.points - prevState.health.drain, drain: prevState.health.drain }, entertainment: { points: prevState.entertainment.points - prevState.entertainment.drain, drain: prevState.entertainment.drain }, hunger: { points: prevState.hunger.points - prevState.hunger.drain, drain: prevState.hunger.drain }, money: { points: prevState.money.points + pay + prevState.money.drain, drain: prevState.money.drain }, softwareSkills: { points: prevState.softwareSkills.points - prevState.softwareSkills.drain, drain: prevState.softwareSkills.drain }, applications: { points: prevState.applications.points - prevState.applications.drain, drain: prevState.applications.drain }, bills: { points: prevState.bills.points - prevState.bills.drain, drain: prevState.bills.drain } }))
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
                                <Image src={`/clickerGame/${gameStat.job.title}.jpg`}
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
                                <BarStats percent={gameStat.bills.points} stat={'Bills:' + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} />
                                <BarStats percent={gameStat.entertainment.points} stat={'Entertainment:'} />
                                <BarStats percent={gameStat.health.points} stat={'Health:' + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} />
                                <BarStats percent={gameStat.hunger.points} stat={'Hunger :' + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} />
                                <BarStats percent={gameStat.softwareSkills.points} stat={'Software Skills:'} />
                            </div>
                            <br></br>
                            <br></br>
                            <p>You currently work as a {job} person.</p>
                            <p>Current Pay: ${pay}</p>
                            <br></br>
                            <p>Days Elapsed: {daysElapsed} </p>
                            <p>Software Applications: {gameStat.applications.points}</p>
                            <p>Rent and Bills: {bills}</p>
                            <br></br>
                            <p>Total Clicks: {clicks}</p>
                            <p>Money earned: ${gameStat.money.points}</p>
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
                                        functionHandler={handleJobClick} />
                                )}
                            </div>
                            <div >
                                {
                                    <gameFunctions.UpgradeCollection2
                                        collection={[
                                            { Image: 'Restaurant Manager', Job: 'Restaurant Manager', Daily_Pay: 200 },
                                            { Image: 'Retail Manager', Job: 'Retail Manager', Daily_Pay: 200 },
                                            { Image: 'Warehouse Manager', Job: 'Warehouse Manager', Daily_Pay: 200 },
                                            { Image: 'Driver Manager', Job: 'Driver Manager', Daily_Pay: 200 }

                                        ]}
                                        functionHandler={handleStats}
                                        upgradeText={'You Have Been Promoted to Manager!'} />
                                }
                            </div>
                            <div>
                                {
                                    <gameFunctions.UpgradeCollection2
                                        collection={[
                                            { Image: 'burger', Name: 'burger', cost: 30, hunger: 2, health: -2, entertainment: 2 },
                                            { Image: 'carrot', Name: 'carrot', cost: 10, hunger: 1, health: +1, entertainment: 0 },
                                            { Image: 'vegies', Name: 'Fancy Vegies', cost: 20, hunger: 2, health: +1, entertainment: 1 }
                                        ]}
                                        functionHandler={handleStats}
                                        upgradeText={'Click A Food Item to Eat it'} />
                                }
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


