import React, {useState, useReducer} from "react";
import "./list.css"

export const List = ({items = [],
                         controls = {
                             before: {
                                 expand: true
                             },
                             after: {
                                 include: true,
                                 includeCallback: (i) => console.log("include", i.title)
                             }}}) => {

    const list = useList(items);

    return (
        <ListItems items={list.items} controls={controls} />
    )
};

export const ListItems = ({items = [],
                         controls = {
                             before: {
                                 expand: true
                             },
                             after: {
                                 include: true,
                                 includeCallback: (i) => console.log("include", i)
                             }}}) => {

    const list = useList(items);

    return (
            <ul className="list">
                {list.items.map((item, i) =>
                    <ListItem key={i} origin={item} controls={controls} />)}
            </ul>
    )
};

export const ListItem = ({controls, origin}) => {
    const [item, setItem] = useState(origin);

    function toggleExpand() {
        setItem({...item, expanded: !item.expanded})
    }

    return (
        <li>
            <Controls
                item={item}
                controls={controls.before}
                toggleExpand={toggleExpand}
            />
            <span>{item.title}</span>
            <Controls
                item={item}
                controls={controls.after}
                toggleExpand={toggleExpand}
            />
            {console.log("render item hidden", item.hidden)}
            {item.expanded && <ListItems items={item.children} controls={controls} />}
        </li>
    )
};

export const Controls = ({item, controls, toggleExpand}) => {
    return (
        <span>
            {controls.include &&
                <input type="checkbox" name="include"
                        onClick={() => controls.includeCallback(item)} />
            }
            {controls.expand && item.children && item.children.length > 0 &&
                <button onClick={toggleExpand} >
                    {item.hidden ? "ᐃ" : "ᐁ"}
                </button>
            }
    </span>)
};

export const useList = (init) => {
    function itemsReducer(state, {action, data}) {
        switch (action) {
            case "reset": {
                return init;
            }
            default:
                return state;
        }
    }
    const [items, modify] = useReducer(itemsReducer, init);

    return {items, modify};
};
