import React, {useState, useReducer} from "react";
import "./list.css"

export const List = ({
                         items = [],
                         controls = {
                             expand: {
                                 before: true},
                             include: {
                                 after: true,
                                 includeCallback: (i) => console.log("include", i.title)}}
                     }) => {

    const list = useList(items);

    return (
        <ListItems items={list.items} controls={controls} />
    )
};

export const ListItems = ({items, controls}) => {
    return (
            <ul className="list">
                {items.map((item, i) =>
                    <ListItem key={i} origin={item} controls={controls} />)}
            </ul>
    )
};

export const ListItem = ({controls, origin}) => {
    const [item, setItem] = useState(origin);

    controls.expand.toggleExpand = () => {
        setItem({...item, expanded: !item.expanded})
    };

    function filterControls(property) {
        return Object.keys(controls).reduce((p, c) => {
            if (controls[c][property]) p[c] = controls[c];
            return p;
        }, {})
    }

    return (
        <li>
            <Controls
                item={item}
                controls={filterControls("before")}
            />
            <span>{item.title}</span>
            <Controls
                item={item}
                controls={filterControls("after")}
            />
            {console.log("render item hidden", item.hidden)}
            {item.expanded && <ListItems items={item.children} controls={controls} />}
        </li>
    )
};

export const Controls = ({item, controls = {}}) => {
    console.log("controls", controls);
    return (
        <span>
            {controls.include &&
                <input type="checkbox" name="include"
                        onClick={() => controls.include.includeCallback(item)} />
            }
            {controls.expand && item.children && item.children.length > 0 &&
                <button onClick={controls.expand.toggleExpand} >
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
