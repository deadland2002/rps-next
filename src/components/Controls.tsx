import React, {useEffect, useState} from 'react';
import axios from "axios";

const Controls = ({reFetch}:{reFetch:()=>void}) => {
    const [isPlaying , setIsPlaying] = useState<boolean>(false);
    const [selectedHand , setSelectedHand] = useState<string>();
    const [gameHand , setGamedHand] = useState<string>();
    const [result , setResult] = useState<string>()

    const imgArr = [
        '/jpg/paper.png',
        '/jpg/rock.png',
        '/jpg/scissors.png',
        '/jpg/reset.jpg'
    ]

    const movesArr = [
        "Paper",
        "Rock",
        "Scissors"
    ]

    const delay = async (time:number) => {
        await new Promise((res,rej)=>{
            setTimeout(()=>{
                res(1)
            },time)
        })
    }
    const PlayGame = async (val:number)=>{
        if(isPlaying)
            return;
        try{
            if(val == 3){
                const result = await axios.get("/api/ResetResult");
                console.log(result.data)
                if(result.data.status === 200){
                    reFetch();
                }
                return;
            }

            setIsPlaying(true)
            setSelectedHand(imgArr[val])

            const handRandom = (Math.floor(Math.random() * 3))
            console.log(handRandom);


            for(let i=0;i<20;i++){
                const tempHand = (Math.floor(Math.random() * 3))
                setGamedHand(imgArr[tempHand]);

                await delay(10*i)
            }

            setGamedHand(imgArr[handRandom]);

            await delay(500);

            let result = "";

            if(val == handRandom){
                setResult("Draw")
                result = "Draw";
            }else if(val == 0 && handRandom == 1){
                setResult("You Won")
                result = "User Won";
            }else if(val == 1 && handRandom == 2){
                setResult("You Won")
                result = "User Won";
            }else if(val == 2 && handRandom == 0){
                setResult("You Won")
                result = "User Won";
            }else{
                setResult("You Loose")
                result = "User Lost";
            }

            const res = await axios.post("/api/AddResult",{
                UserMove : movesArr[val],
                CompMove : movesArr[handRandom],
                Result : result
            });

            await delay(2000);

            reFetch();

        }catch (err){

        }finally {
            setIsPlaying(false);
            setGamedHand(undefined);
            setSelectedHand(undefined);
            setResult(undefined);
        }
    }
    return (
        <div className={' flex flex-col gap-10'}>
            <div className={`btnWrapper flex flex-row gap-10 overflow-hidden ${isPlaying ? "h-[0px]" : "h-[200px] p-4"} items-center`}>
                <img src={imgArr[0]}  onClick={()=>PlayGame(0)}/>
                <img src={imgArr[1]}  onClick={()=>PlayGame(1)}/>
                <img src={imgArr[2]}  onClick={()=>PlayGame(2)}/>
                <img src={imgArr[3]}  onClick={()=>PlayGame(3)}/>
            </div>

            {
                isPlaying && selectedHand
                &&
                <div className={'flex flex-col gap-4'}>
                    <div className={'flex flex-row justify-center items-center'}>
                        <span className={'text-4xl'}>{result}</span>
                    </div>
                    <div className={'showHands flex flex-row gap-10 justify-center'}>
                        <span><img src={selectedHand} /></span>
                        <span><img src={gameHand} /></span>
                    </div>
                </div>
            }
        </div>
    );
};

export default Controls;
