
import React, {useState} from "react";

export const ListDemo = () => {

    //useEffect(() => console.log({ newState: chosen }),[chosen]);

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
                    { title: '1 dfg' },
                    { title: '2 xfdggfh' },
                    { title: '3 xc' },
                    { title: '4 dfgs' },
                    { title: '5 salølæsødlfæsød' },
                    { title: '6 Zzzsødlfæsød' },
                ],
            hidden: false
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
            <List items={listItems} />
        </div>
    );
};


export const List = ({items = []}) => {

    return (
        <ul>
            {items.map((item, i) =>
                <ListItem key={i}
                          title={item.title}
                          children={item.children}
                          hidden={item.hidden}/>)}
        </ul>
    )
};

export const ListItem = ({title = "Title", children = [], hidden = true}) => {

    const [expand, setExpand] = useState(!hidden);

    return (
        <li>
            <span>{title}</span>
            {children.length > 0 && <button onClick={() => setExpand(!expand)}>+</button>}
            {expand && <List items={children} />}
        </li>
    )
};