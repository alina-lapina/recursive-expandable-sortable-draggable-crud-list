import React, {useEffect, useReducer} from "react";
import "./list.css";

export const List = ({listitems = [],
                         controls = [
                             {name: "expand", order: -1},
                             {name: "include", order: 1, callback: (i) => console.log("include", i.title)}
                         ]}) => {

    function listReducer(state, {action, data = {}}) {
        switch (action) {
            case "update": {
                return [...data];
            }
            case "expand": {
                data.expanded = !data.expanded;
                return [...state];
            }
            case "include": {
                data.checked = !data.checked;
                return [...state];
            }
            default:
                return state;
    }}

    const [items, dispatch] = useReducer(listReducer, listitems);
    useEffect(() => console.log({ list: items }),[items]);
    useEffect(() => dispatch({action: "update", data: listitems}),[listitems]);

    return (
        <ListItems items={items} controls={controls} dispatch={(o) => dispatch(o)} />
    )
};

export const ListItems = ({controls, items, dispatch}) => {
    return (
        <ul className="list">
            {items.map((item, i) =>
                <ListItem key={i} item={item} controls={controls} dispatch={dispatch} />)}
        </ul>
    )
};

export const ListItem = ({controls, item, dispatch}) => {
    return (
        <li>
            <Controls
                item={item}
                dispatch={dispatch}
                controls={controls.filter(control => control.order < 0)}
            />
            <span>{item.title}</span>
            <Controls
                item={item}
                dispatch={dispatch}
                controls={controls.filter(control => control.order > 0)}
            />
            {item.expanded && <ListItems items={item.children} controls={controls} dispatch={dispatch} />}
        </li>
    )
};

export const Controls = ({item, dispatch, controls}) => {
    return (
        <span>
            {controls.find(c => c.name === "expand") && item.children && item.children.length > 0 &&
            <button onClick={() => dispatch({action: "expand", data: item})}
            >{item.expanded ? "ᐃ" : "ᐁ"}
            </button>
            }

            {controls.find(c => c.name === "include") &&
            <input type="checkbox" name="include" checked={item.checked}
                   onChange={(e) => {
                       dispatch({action: "include", data: item});
                       controls.find(c => c.name === "include").callback(item);
                   }} />
            }
    </span>)
};
