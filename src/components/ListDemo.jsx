
import React from "react";

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
        }
    ];

    return (
        <div className="page">
            <h3>List demo</h3>
            <List items={listItems} />
        </div>
    );
};


export const List = ({items = []}) => {

    return (<ul>
            {items.map((item, i) =>
                <ListItem key={i}
                          title={item.title}
                          children={item.children}
                          hidden={item.hidden}/>)}
        </ul>
    )
};

export const ListItem = ({title = "Title", children = [], hidden = true}) => {
    return (
        <li>
            <h4>{title}</h4>
            {!hidden && <List items={children} />}
        </li>
    )
};