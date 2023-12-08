import React, {useEffect, useState} from 'react';
import axios from "axios";


interface ResultType{
    UserMove : string,
    CompMove : string,
    Result : string
}

const GameHistory = ({result}:{result:ResultType[]|undefined}) => {


    return (
        <div className={'HomeHistory'}>
                <table>
                    <tbody>
                    <tr>
                        <td>S No.</td>
                        <td>User Move</td>
                        <td>Computer Move</td>
                        <td>Result</td>
                    </tr>
                    {
                        result?.map((single,index)=>(
                            <tr key={`td_history_${index}`}>
                                <td>{index + 1}</td>
                                <td>{single.UserMove}</td>
                                <td>{single.CompMove}</td>
                                <td>{single.Result}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
        </div>
    );
};

export default GameHistory;
