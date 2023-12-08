import React from 'react';
interface ResultType{
    UserMove : string,
    CompMove : string,
    Result : string
}

const GameSummary = ({result}:{result:ResultType[]|undefined}) => {
    return (
        <div className={'HomeSummary'}>
            <table>
                <tbody>
                <tr>
                    <td>Wins</td>
                    <td>Lose</td>
                    <td>Ties</td>
                    <td>Game Played</td>
                </tr>
                <tr>
                    <td>{result && result.reduce((a,b)=>{
                        if(b.Result == "User Won"){
                            return a + 1;
                        }
                        return a
                    },0)}</td>
                    <td>{result && result.reduce((a,b)=>{
                        if(b.Result == "User Lost"){
                            return a + 1;
                        }
                        return a
                    },0)}</td>
                    <td>{result && result.reduce((a,b)=>{
                        if(b.Result == "Draw"){
                            return a + 1;
                        }
                        return a
                    },0)}</td>
                    <td>{result?.length}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GameSummary;
