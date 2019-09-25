import React, {useState} from "react";
import "./list.css"

export const List = ({items = [],
                         controls = {
                             before: {
                                 expand: true
                             },
                             after: {
                                 include: true,
                                 includeCallback: (i) => console.log("include", i)
                             }}}) => {
    console.log("controls1", controls);
    return (
        <ul className="list">
            {items.map((item, i) =>
                <ListItem key={i}
                          title={item.title}
                          children={item.children}
                          hidden={item.hidden}
                          controls={controls}
                />)}
        </ul>
    )
};

export const ListItem = ({title = "Title", children = [],
                             hidden = true, controls}) => {
    console.log("controls2", controls);

    const [expand, setExpand] = useState(!hidden);

    return (
        <li>
            <Controls
                controls={controls.before}
                hasChildren={children.length > 0}
                expand={() => setExpand(!expand)}
            />
            <span style={{width:"300px"}}>{title}</span>
            <Controls
                controls={controls.after}
                hasChildren={children.length > 0}
                setExpand={() => setExpand(!expand)}
                expand={expand}
            />
            {expand && <List items={children} />}
        </li>
    )
};

export const Controls = ({controls, hasChildren, setExpand, expand}) => {
    console.log("controls3", controls);

    return (
        <span>
    {controls.include &&
    <input type="checkbox" name="include"
           onClick={() => controls.includeCallback("me")} />
    }
            {controls.expand && hasChildren &&
            <button onClick={setExpand} disabled={!hasChildren}>
                {expand ? "ᐃ" : "ᐁ"}
            </button>
            }
    </span>)
}