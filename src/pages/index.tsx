import Image from 'next/image'
import {Inter} from 'next/font/google'
import GameSummary from "@/components/GameSummary";
import GameHistory from "@/components/GameHistory";
import Controls from "@/components/Controls";
import {useEffect, useState} from "react";
import axios from "axios";

interface ResultType{
    UserMove : string,
    CompMove : string,
    Result : string
}



export default function Home() {


    const [result , setResult] = useState<ResultType[]>();

    useEffect(()=>{
        async function getResult(){
            const res = await axios.get("/api/GetResult");
            setResult(res.data.result)
        }
        getResult()
    },[])

    const reFetch = async () =>{
        const res = await axios.get("/api/GetResult");
        setResult(res.data.result)
    }

    return (
        <>
            <div className={'HomeWrapper'}>
                <h1 className={'text-4xl'}>RPS GAME</h1>
                <Controls reFetch={reFetch} />
                <GameSummary result={result}/>
                <GameHistory result={result}/>
            </div>
        </>
    )
}
