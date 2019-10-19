import React from "react";
import "../modules/list/list.css";
import {List} from "../modules/list/List";

export const ListDemo = () => {

    const listItems = [
        { title: 'Arbeid', children:
                [
                    { title: 'A dfg' },
                    { title: 'B xfdggfh' },
                    { title: 'C xc' },
                    { title: 'D dfgs' },
                    { title: 'E salølæsødlfæsød' },
                ]
        },
        { title: 'Yrke', children:
                [
                    { title: 'dfg' },
                    { title: 'xfdggfh' },
                    { title: 'xc' },
                    { title: 'dfgs' },
                    { title: 'salølæsødlfæsød' },
                    { title: 'Zzzsødlfæsød' },
                ],
            expanded: false
        },
        { title: 'Commune', children:
                [
                    { title: 'I dfg' },
                    { title: 'II xfdggfh' },
                    { title: 'III xczzpppsk' },
                    { title: 'IV dfgs 1233' },
                    { title: 'V salæsød' },
                    { title: 'VI salølæsø' },
                    { title: 'VII aalokdk' },
                    { title: 'VIII domdomd', children:
                            [
                                { title: 'A dfg' },
                                { title: 'B xfdggfh' },
                                { title: 'C xc' },
                                { title: 'D dfgs' },
                                { title: 'E salølæsødlfæsød' },
                            ]},
                    { title: 'IX Pjfklsvnnn' },
                    { title: 'X AKOKO' },
                ]
        },
    ];

    return (
        <div className="page">
            <h3>List demo</h3>
            <List listitems={listItems} />
            <button onClick={() => console.log("current state", listItems)}>Show data</button>
        </div>
    );
};
