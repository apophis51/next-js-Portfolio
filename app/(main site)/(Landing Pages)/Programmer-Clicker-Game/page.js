'use client'
import * as gameFunctions from './Upgrade'
import { atom, useAtom, Provider } from 'jotai'

import Container from '@mui/material/Container';
import { BarStats } from './Upgrade'

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
    const [health, setHealth] = useState(50);
    const [healthDrain, setHealthDrain] = useState(1);
    const [entertainment, setEntertainment] = useState(50);
    const [hunger, setHunger] = useState(90);
    const [money, setMoney] = useState(0);
    const [job, setJob] = useState('begger');




    const [gameStat, setGameStat] = useState({
        health: { points: 50, drain: -2 },
        entertainment: { points: 50, drain: -2 },
        hunger: { points: 90, drain: -2 },
        money: { points: 0, drain: 2 },
        softwareSkills: { points: 1, drain: 0 },
        applications: { points: 0, drain: 0 },
        bills: { points: 0, drain: 0 },
        job: { title: 'begger' },
        manager: false,
        fulltime: false,
        house: false,
        clicks: 0,
        daysElapsed: 1,
        musicInit: false
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












    const handleStats = ({
        health = 0,  //healthPoints
        healthDrain = 0,
        entertainment = 0, //entertainmentPoints
        Daily_Entertainment = 0,
        hunger = 0, //hungerPoints  
        hungerDrain = 0,
        cost = 0,  //moneyPoints
        Daily_Pay = 0, // this is the daily pay
        softwareSkillsPoints = 0,
        softwareSkillsDrain = 0,
        applicationsPoints = 0,
        applicationsDrain = 0,
        Rent_Cost = 0, //billsPoints
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
        healthDrain = healthDrain + gameStat.health.drain
        Daily_Pay = Daily_Pay + gameStat.money.drain
        softwareSkillsPoints = softwareSkillsPoints + gameStat.softwareSkills.points
        softwareSkillsDrain = softwareSkillsDrain + gameStat.softwareSkills.drain
        applicationsPoints = applicationsPoints + gameStat.applications.points
        applicationsDrain = applicationsDrain + gameStat.applications.drain
        setGameStat(prevState => ({
            ...prevState,
            money: { points: (prevState.money.points) - cost, drain: Daily_Pay },
            hunger: { points: hunger, drain: hungerDrain },
            entertainment: { points: entertainment, drain: Daily_Entertainment },
            health: { points: health, drain: healthDrain },
            softwareSkills: { points: softwareSkillsPoints, drain: softwareSkillsDrain },
            applications: { points: applicationsPoints, drain: applicationsDrain },
            bills: { points: prevState.bills.points, drain: (Rent_Cost) },
            job: { title: Job }
        }))
        console.log(gameStat)
    }

    const handleClick = () => {
        setGameStat(prevState => ({
            ...prevState, money: { points: (prevState.money.points + gameStat.money.drain), drain: gameStat.money.drain },
            clicks: prevState.clicks + 1
        }))
    };


    const handleHouseClick = (upgrade) => {
        console.log('null')
    }

    useEffect(() => {

        const intervalId = setInterval(() => {

            console.log('triggerd')


            setGameStat((prevState) => {
                let updatedState = { ...prevState };

                if ((updatedState.daysElapsed % 10) == 0) {
                    console.log(true)

                    console.log('triggered')
                    updatedState.bills.points = updatedState.bills.points + updatedState.bills.drain / 2
                }
                return updatedState
            })





            setGameStat((prevState) => (
                {
                    ...prevState,
                    daysElapsed: (prevState.daysElapsed + 1),
                    hunger: { points: (prevState.hunger.points + prevState.hunger.drain), drain: prevState.hunger.drain },
                    entertainment: { points: (prevState.entertainment.points + prevState.entertainment.drain), drain: prevState.entertainment.drain },
                    health: { points: (prevState.health.points + prevState.health.drain), drain: prevState.health.drain },
                }))





        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

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
                            {/* {gameStat.musicInit ==  && (
                                <>
                                    <AudioPlayer />
                                    {console.log(gameStat.musicInit)}
                                    {setGameStat(prevState => ({ ...prevState, musicInit: true }))}
                                    {console.log(gameStat.musicInit)}
                                </>
                            )} */}
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
                            <p>Current Pay: ${gameStat.money.drain}</p>
                            <br></br>
                            <p>Days Elapsed: {gameStat.daysElapsed} </p>
                            <p>Software Applications: {gameStat.applications.points}</p>
                            <p>Rent and Bills Per 30 Days: ${gameStat.bills.drain}</p>
                            <p>Rent and Bills Accumulated: ${gameStat.bills.points}</p>
                            <br></br>
                            <p>Total Clicks: {gameStat.clicks}</p>
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


                            {/* {<gameFunctions.UpgradeCollection3
                                gameStat={gameStat}
                                conditional={"gameStat.clicks >= 10 && (gameStat.job.title == 'begger')"}
                                functionHandler={handleStats}
                                upgradeText={'Get a Part Time Job'}
                                collection={[
                                    {
                                        collection1: [{ Image: 'driver', Job: 'driver', Daily_Pay: 50 },
                                        { Image: 'retail', Job: 'retail', Daily_Pay: 50 },
                                        { Image: 'food', Job: 'food', Daily_Pay: 50 },
                                        { Image: 'warehouse', Job: 'warehouse', Daily_Pay: 50 }], 
                                        conditional: "gameStat.clicks >= 10 && (gameStat.job.title == 'begger')", 
                                        upgradeText: 'Get a Part Time Job'
                                    },
                                    { Image: 'retail', Job: 'retail', Daily_Pay: 50 },
                                    { Image: 'food', Job: 'food', Daily_Pay: 50 },
                                    { Image: 'warehouse', Job: 'warehouse', Daily_Pay: 50 }
                                ]} />} */}


                            {gameStat.clicks >= 10 && (gameStat.job.title == 'begger') && (
                                <div >
                                    {
                                        <gameFunctions.UpgradeCollection2
                                            collection={[
                                                { Image: 'driver', Job: 'driver', Daily_Pay: 50 },
                                                { Image: 'retail', Job: 'retail', Daily_Pay: 50 },
                                                { Image: 'food', Job: 'food', Daily_Pay: 50 },
                                                { Image: 'warehouse', Job: 'warehouse', Daily_Pay: 50 }

                                            ]}
                                            functionHandler={handleStats}
                                            upgradeText={'Get a Part Time Job'} />
                                    }
                                </div>)}

                            {gameStat.clicks >= 15 && (gameStat.fulltime == false) && (<div onClick={() => setGameStat((prevState) => ({
                                ...prevState,
                                fulltime: true
                            }))}>
                                <gameFunctions.UpgradeCollection2
                                    collection={[
                                        { Image: 'Full Time Driver', Job: 'Full Time Driver', Daily_Pay: 100 },
                                        { Image: 'Full Time Retail', Job: 'Full Time Retail', Daily_Pay: 100 },
                                        { Image: 'Full Time Food', Job: 'Full Time Food', Daily_Pay: 100 },
                                        { Image: 'Full Time Warehouse', Job: 'Full Time Warehouse', Daily_Pay: 100 }

                                    ]}
                                    functionHandler={handleStats}
                                    upgradeText={'You Have Been Promoted to Manager!'} />

                            </div>)}

                            {gameStat.clicks >= 30 && (gameStat.manager == false) && (<div onClick={() => setGameStat((prevState) => ({
                                ...prevState,
                                manager: true
                            }))}>
                                <gameFunctions.UpgradeCollection2
                                    collection={[
                                        { Image: 'Restaurant Manager', Job: 'Restaurant Manager', Daily_Pay: 200 },
                                        { Image: 'Retail Manager', Job: 'Retail Manager', Daily_Pay: 200 },
                                        { Image: 'Warehouse Manager', Job: 'Warehouse Manager', Daily_Pay: 200 },
                                        { Image: 'Driver Manager', Job: 'Driver Manager', Daily_Pay: 200 }

                                    ]}
                                    functionHandler={handleStats}
                                    upgradeText={'You Have Been Promoted to Manager!'} />

                            </div>)}
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

                            {gameStat.house == false && (<div onClick={() => setGameStat((prevState) => ({
                                ...prevState,
                                house: true
                            }))}>
                                <gameFunctions.UpgradeCollection2
                                    collection={[
                                        { Image: 'broke house', Name: 'broke house', Rent_Cost: 700, Daily_Health: 1, Daily_Entertainment: 0 },
                                        { Image: 'medium house', Name: 'medium house', Rent_Cost: 1200 },
                                        { Image: 'rich house', Name: 'rich house', Rent_Cost: 2000, Daily_Health: 2, Daily_Entertainment: 4 },
                                    ]}
                                    functionHandler={handleStats}
                                    upgradeText={'Rent a Home!'} />

                            </div>)}
                        </div>
                    </div >
                </header >
            </div >
        </Container >
    );
}


